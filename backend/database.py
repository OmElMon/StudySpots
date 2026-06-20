import json
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).with_name("studyspots.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def encode_list(values):
    return json.dumps(values or [])


def decode_list(value):
    if not value:
        return []
    return json.loads(value)


def row_to_cafe(row):
    cafe = dict(row)
    for key in ("photos", "vibe_tags", "best_for"):
        cafe[key] = decode_list(cafe.get(key))
    cafe["has_wifi"] = bool(cafe["has_wifi"])
    cafe["has_outlets"] = bool(cafe["has_outlets"])
    cafe["good_parking"] = bool(cafe["good_parking"])
    cafe["open_late"] = bool(cafe["open_late"])
    cafe["is_featured"] = bool(cafe["is_featured"])
    return cafe


def init_db():
    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS cafes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                city TEXT NOT NULL,
                address TEXT NOT NULL,
                photos TEXT NOT NULL,
                hours TEXT NOT NULL,
                has_wifi INTEGER NOT NULL,
                has_outlets INTEGER NOT NULL,
                noise_level TEXT NOT NULL,
                seating_comfort TEXT NOT NULL,
                parking TEXT NOT NULL,
                good_parking INTEGER NOT NULL,
                price_level TEXT NOT NULL,
                study_rating REAL NOT NULL,
                hangout_rating REAL NOT NULL,
                open_late INTEGER NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                vibe_tags TEXT NOT NULL,
                best_for TEXT NOT NULL,
                study_score REAL NOT NULL,
                is_featured INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cafe_id INTEGER NOT NULL,
                author TEXT NOT NULL,
                rating REAL NOT NULL,
                visit_type TEXT NOT NULL,
                body TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (cafe_id) REFERENCES cafes(id) ON DELETE CASCADE
            );
            """
        )
