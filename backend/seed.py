from database import encode_list, get_connection, init_db


CAFES = [
    {
        "name": "Elm & Ember Coffee",
        "city": "Seattle",
        "address": "1421 Pine St, Seattle, WA",
        "photos": [
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        ],
        "hours": "Mon-Thu 7 AM-10 PM, Fri-Sat 7 AM-12 AM, Sun 8 AM-9 PM",
        "has_wifi": 1,
        "has_outlets": 1,
        "noise_level": "Low",
        "seating_comfort": "Soft booths and long communal tables",
        "parking": "Street parking and nearby garage",
        "good_parking": 0,
        "price_level": "$$",
        "study_rating": 9.3,
        "hangout_rating": 8.5,
        "open_late": 1,
        "latitude": 47.6152,
        "longitude": -122.3211,
        "vibe_tags": ["quiet", "cozy", "deep work", "laptop friendly"],
        "best_for": ["studying", "remote work", "late-night grind"],
        "study_score": 9.4,
        "is_featured": 1,
    },
    {
        "name": "Northline Social Cafe",
        "city": "Chicago",
        "address": "2210 N Milwaukee Ave, Chicago, IL",
        "photos": [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
        ],
        "hours": "Daily 8 AM-11 PM",
        "has_wifi": 1,
        "has_outlets": 1,
        "noise_level": "Medium",
        "seating_comfort": "Cafe tables, window bar, and lounge chairs",
        "parking": "Metered street parking",
        "good_parking": 0,
        "price_level": "$$",
        "study_rating": 8.4,
        "hangout_rating": 9.2,
        "open_late": 1,
        "latitude": 41.9211,
        "longitude": -87.6925,
        "vibe_tags": ["aesthetic", "date spot", "group study", "laptop friendly"],
        "best_for": ["first date", "group hangout", "remote work"],
        "study_score": 8.1,
        "is_featured": 1,
    },
    {
        "name": "Paper Plane Espresso",
        "city": "Austin",
        "address": "507 E 6th St, Austin, TX",
        "photos": [
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
        ],
        "hours": "Mon-Fri 6 AM-8 PM, Sat-Sun 7 AM-9 PM",
        "has_wifi": 1,
        "has_outlets": 0,
        "noise_level": "Medium",
        "seating_comfort": "Bright tables and patio seating",
        "parking": "Small private lot",
        "good_parking": 1,
        "price_level": "$",
        "study_rating": 7.6,
        "hangout_rating": 8.8,
        "open_late": 0,
        "latitude": 30.2678,
        "longitude": -97.7382,
        "vibe_tags": ["sunny", "cozy", "group study", "good parking"],
        "best_for": ["group hangout", "casual studying"],
        "study_score": 7.3,
        "is_featured": 0,
    },
    {
        "name": "Midnight Mug",
        "city": "New York",
        "address": "88 W 3rd St, New York, NY",
        "photos": [
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        ],
        "hours": "Daily 10 AM-2 AM",
        "has_wifi": 1,
        "has_outlets": 1,
        "noise_level": "High",
        "seating_comfort": "Compact tables and late-night booths",
        "parking": "Limited street parking",
        "good_parking": 0,
        "price_level": "$$",
        "study_rating": 8.0,
        "hangout_rating": 9.4,
        "open_late": 1,
        "latitude": 40.7297,
        "longitude": -73.9998,
        "vibe_tags": ["late night", "date spot", "aesthetic", "laptop friendly"],
        "best_for": ["late-night grind", "first date", "group hangout"],
        "study_score": 8.0,
        "is_featured": 1,
    },
    {
        "name": "Quiet Bloom Cafe",
        "city": "Portland",
        "address": "633 SE Belmont St, Portland, OR",
        "photos": [
            "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1513267048331-5611cad62e41?auto=format&fit=crop&w=1200&q=80",
        ],
        "hours": "Daily 7 AM-7 PM",
        "has_wifi": 1,
        "has_outlets": 1,
        "noise_level": "Low",
        "seating_comfort": "Plants, armchairs, and quiet corners",
        "parking": "Bike racks and easy street parking",
        "good_parking": 1,
        "price_level": "$$",
        "study_rating": 9.6,
        "hangout_rating": 8.1,
        "open_late": 0,
        "latitude": 45.5167,
        "longitude": -122.6595,
        "vibe_tags": ["quiet", "cozy", "aesthetic", "deep work"],
        "best_for": ["studying", "remote work", "first date"],
        "study_score": 9.1,
        "is_featured": 1,
    },
    {
        "name": "Campus Corner Roasters",
        "city": "Boston",
        "address": "19 Brattle St, Cambridge, MA",
        "photos": [
            "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1482350325005-eda5e677279b?auto=format&fit=crop&w=1200&q=80",
        ],
        "hours": "Mon-Sat 6 AM-11 PM, Sun 7 AM-9 PM",
        "has_wifi": 1,
        "has_outlets": 1,
        "noise_level": "Medium",
        "seating_comfort": "Large tables, stools, and study nooks",
        "parking": "Garage within two blocks",
        "good_parking": 1,
        "price_level": "$",
        "study_rating": 8.9,
        "hangout_rating": 8.7,
        "open_late": 1,
        "latitude": 42.3736,
        "longitude": -71.1205,
        "vibe_tags": ["group study", "laptop friendly", "deep work", "good parking"],
        "best_for": ["studying", "group hangout", "late-night grind"],
        "study_score": 8.8,
        "is_featured": 0,
    },
]

REVIEWS = [
    (1, "Maya", 5, "Studying", "Quiet enough for two focused hours, and every other table had outlet access."),
    (1, "Jon", 4.5, "Remote work", "The Wi-Fi stayed solid through video calls. Best after the morning rush."),
    (2, "Priya", 5, "Hangout", "Warm lighting, easy conversation noise, and a great table setup for four people."),
    (4, "Sam", 4, "Late-night study", "Busy, but open ridiculously late. Headphones make it a perfect finals-week spot."),
    (5, "Elena", 5, "Deep work", "Soft music, lots of greenery, and no pressure to give up your seat."),
]


def seed():
    init_db()
    with get_connection() as conn:
        conn.execute("DELETE FROM reviews")
        conn.execute("DELETE FROM cafes")
        conn.execute("DELETE FROM sqlite_sequence WHERE name IN ('cafes', 'reviews')")
        for cafe in CAFES:
            conn.execute(
                """
                INSERT INTO cafes (
                    name, city, address, photos, hours, has_wifi, has_outlets,
                    noise_level, seating_comfort, parking, good_parking, price_level,
                    study_rating, hangout_rating, open_late, latitude, longitude,
                    vibe_tags, best_for, study_score, is_featured
                ) VALUES (
                    :name, :city, :address, :photos, :hours, :has_wifi, :has_outlets,
                    :noise_level, :seating_comfort, :parking, :good_parking, :price_level,
                    :study_rating, :hangout_rating, :open_late, :latitude, :longitude,
                    :vibe_tags, :best_for, :study_score, :is_featured
                )
                """,
                {
                    **cafe,
                    "photos": encode_list(cafe["photos"]),
                    "vibe_tags": encode_list(cafe["vibe_tags"]),
                    "best_for": encode_list(cafe["best_for"]),
                },
            )
        conn.executemany(
            """
            INSERT INTO reviews (cafe_id, author, rating, visit_type, body)
            VALUES (?, ?, ?, ?, ?)
            """,
            REVIEWS,
        )
    print("Seeded StudySpots database.")


if __name__ == "__main__":
    seed()
