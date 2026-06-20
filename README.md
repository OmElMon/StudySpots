# StudySpots

StudySpots is a mobile-first café discovery app for finding places to study, work, go on casual dates, hang out with groups, or stay productive late at night.

It includes a Flask REST API, SQLite seed data, and a React + Vite + Tailwind frontend with list and map-style views.

## Features

- Search cafés by city, name, address, or "near me"
- Filter by quiet study spot, groups, open late, outlets, Wi-Fi, parking, and cozy/aesthetic vibes
- Featured cafés homepage
- Café detail pages with photos, hours, vibe tags, best-for use cases, amenities, and reviews
- Save favorite cafés locally in the browser
- Leave study/hangout-focused reviews
- Study score out of 10 based on Wi-Fi, outlets, noise, seating, and hours
- REST API backed by SQLite
- Optional map integration placeholder with coordinate-ready café records

## Project Structure

```text
studyspots/
  backend/
    app.py
    database.py
    seed.py
    requirements.txt
    studyspots.db  # generated after running seed.py
  frontend/
    index.html
    package.json
    postcss.config.js
    tailwind.config.js
    vite.config.js
    src/
      App.jsx
      api.js
      main.jsx
      styles.css
      components/
      pages/
  README.md
```

## Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python seed.py
python app.py
```

The seed command creates the local SQLite database. The API runs at `http://localhost:5001`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## API Endpoints

- `GET /api/health`
- `GET /api/cafes`
- `GET /api/cafes/featured`
- `GET /api/cafes/<id>`
- `GET /api/cafes/<id>/reviews`
- `POST /api/cafes/<id>/reviews`

Example café query:

```bash
curl "http://localhost:5001/api/cafes?city=Seattle&quiet=true&wifi=true&outlets=true"
```

## Map Integration

The MVP includes latitude and longitude for each café and a polished map placeholder. To integrate a live map later, replace `MapView.jsx` with Mapbox, Google Maps, or Leaflet markers using each café's `latitude` and `longitude`.
