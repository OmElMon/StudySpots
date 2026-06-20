const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

export async function fetchCafes(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== false) {
      search.set(key, value);
    }
  });
  const response = await fetch(`${API_BASE}/cafes?${search.toString()}`);
  if (!response.ok) throw new Error("Unable to load cafes");
  return response.json();
}

export async function fetchFeaturedCafes() {
  const response = await fetch(`${API_BASE}/cafes/featured`);
  if (!response.ok) throw new Error("Unable to load featured cafes");
  return response.json();
}

export async function fetchCafe(id) {
  const response = await fetch(`${API_BASE}/cafes/${id}`);
  if (!response.ok) throw new Error("Unable to load cafe");
  return response.json();
}

export async function createReview(cafeId, payload) {
  const response = await fetch(`${API_BASE}/cafes/${cafeId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Unable to create review");
  }
  return response.json();
}
