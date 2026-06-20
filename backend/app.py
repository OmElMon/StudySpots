from flask import Flask, jsonify, request
from flask_cors import CORS

from database import get_connection, init_db, row_to_cafe

app = Flask(__name__)
CORS(app)
init_db()


def parse_bool(value):
    return str(value).lower() in {"1", "true", "yes", "on"}


def review_row(row):
    return dict(row)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "StudySpots API"}


@app.get("/api/cafes")
def list_cafes():
    city = request.args.get("city", "").strip()
    query = request.args.get("q", "").strip()

    sql = "SELECT * FROM cafes WHERE 1=1"
    params = []

    if city and city.lower() != "near me":
        sql += " AND LOWER(city) LIKE ?"
        params.append(f"%{city.lower()}%")

    if query:
        sql += " AND (LOWER(name) LIKE ? OR LOWER(address) LIKE ? OR LOWER(city) LIKE ?)"
        params.extend([f"%{query.lower()}%"] * 3)

    filters = {
        "wifi": "has_wifi = 1",
        "outlets": "has_outlets = 1",
        "parking": "good_parking = 1",
        "openLate": "open_late = 1",
        "quiet": "LOWER(noise_level) = 'low'",
    }
    for key, clause in filters.items():
        if parse_bool(request.args.get(key, "false")):
            sql += f" AND {clause}"

    if parse_bool(request.args.get("groups", "false")):
        sql += " AND (LOWER(vibe_tags) LIKE '%group%' OR hangout_rating >= 8.5)"

    if parse_bool(request.args.get("cozy", "false")):
        sql += " AND (LOWER(vibe_tags) LIKE '%cozy%' OR LOWER(vibe_tags) LIKE '%aesthetic%')"

    sql += " ORDER BY study_score DESC, hangout_rating DESC"

    with get_connection() as conn:
        cafes = [row_to_cafe(row) for row in conn.execute(sql, params).fetchall()]
    return jsonify(cafes)


@app.get("/api/cafes/featured")
def featured_cafes():
    with get_connection() as conn:
        cafes = [
            row_to_cafe(row)
            for row in conn.execute(
                "SELECT * FROM cafes WHERE is_featured = 1 ORDER BY study_score DESC"
            ).fetchall()
        ]
    return jsonify(cafes)


@app.get("/api/cafes/<int:cafe_id>")
def get_cafe(cafe_id):
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM cafes WHERE id = ?", (cafe_id,)).fetchone()
        if not row:
            return {"error": "Cafe not found"}, 404
        reviews = [
            review_row(review)
            for review in conn.execute(
                "SELECT * FROM reviews WHERE cafe_id = ? ORDER BY created_at DESC",
                (cafe_id,),
            ).fetchall()
        ]
    cafe = row_to_cafe(row)
    cafe["reviews"] = reviews
    return jsonify(cafe)


@app.get("/api/cafes/<int:cafe_id>/reviews")
def list_reviews(cafe_id):
    with get_connection() as conn:
        reviews = [
            review_row(row)
            for row in conn.execute(
                "SELECT * FROM reviews WHERE cafe_id = ? ORDER BY created_at DESC",
                (cafe_id,),
            ).fetchall()
        ]
    return jsonify(reviews)


@app.post("/api/cafes/<int:cafe_id>/reviews")
def create_review(cafe_id):
    data = request.get_json(force=True)
    author = data.get("author", "").strip() or "Anonymous"
    rating = float(data.get("rating", 5))
    visit_type = data.get("visit_type", "Studying").strip()
    body = data.get("body", "").strip()

    if not body:
        return {"error": "Review body is required"}, 400

    with get_connection() as conn:
        cafe = conn.execute("SELECT id FROM cafes WHERE id = ?", (cafe_id,)).fetchone()
        if not cafe:
            return {"error": "Cafe not found"}, 404
        cursor = conn.execute(
            """
            INSERT INTO reviews (cafe_id, author, rating, visit_type, body)
            VALUES (?, ?, ?, ?, ?)
            """,
            (cafe_id, author, rating, visit_type, body),
        )
        review = conn.execute(
            "SELECT * FROM reviews WHERE id = ?", (cursor.lastrowid,)
        ).fetchone()
    return jsonify(review_row(review)), 201


if __name__ == "__main__":
    app.run(debug=True, port=5001)
