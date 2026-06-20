import { useEffect, useMemo, useState } from "react";
import { Coffee, Heart, Map, Search, Sparkles } from "lucide-react";
import { fetchCafe, fetchCafes, fetchFeaturedCafes } from "./api";
import CafeDetail from "./pages/CafeDetail.jsx";
import CafeGrid from "./components/CafeGrid.jsx";
import FilterBar from "./components/FilterBar.jsx";
import MapView from "./components/MapView.jsx";

const defaultFilters = {
  quiet: false,
  groups: false,
  openLate: false,
  outlets: false,
  wifi: false,
  parking: false,
  cozy: false,
};

export default function App() {
  const [cafes, setCafes] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("studyspots:favorites") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("studyspots:favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchFeaturedCafes().then(setFeatured).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchCafes({ city, q: query, ...filters })
      .then(setCafes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [city, query, filters]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  async function openCafe(id) {
    const cafe = await fetchCafe(id);
    setSelectedCafe(cafe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function useNearMe() {
    setCity("near me");
    setFilters((current) => ({ ...current, wifi: true, outlets: true }));
  }

  if (selectedCafe) {
    return (
      <CafeDetail
        cafe={selectedCafe}
        isFavorite={favoriteSet.has(selectedCafe.id)}
        onBack={() => setSelectedCafe(null)}
        onFavorite={() => toggleFavorite(selectedCafe.id)}
        onReviewCreated={(review) =>
          setSelectedCafe((current) => ({
            ...current,
            reviews: [review, ...(current.reviews || [])],
          }))
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-matcha">
                <Coffee size={21} />
              </span>
              StudySpots
            </div>
            <button
              className="flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20"
              onClick={() => setFilters(defaultFilters)}
            >
              <Sparkles size={16} />
              Fresh Search
            </button>
          </nav>

          <div className="flex flex-1 flex-col justify-end pb-8 pt-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
              Cafe discovery for study days
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
              StudySpots
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Find local cafes with the right Wi-Fi, outlets, noise level, seating,
              late hours, and vibe for the thing you actually came to do.
            </p>

            <div className="mt-8 max-w-4xl rounded-2xl bg-white p-3 text-ink shadow-soft">
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <label className="flex items-center gap-3 rounded-xl bg-stone-100 px-4 py-3">
                  <Map size={19} className="text-matcha" />
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="City or near me"
                    className="w-full bg-transparent outline-none"
                  />
                </label>
                <label className="flex items-center gap-3 rounded-xl bg-stone-100 px-4 py-3">
                  <Search size={19} className="text-matcha" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, neighborhood, vibe"
                    className="w-full bg-transparent outline-none"
                  />
                </label>
                <button
                  onClick={useNearMe}
                  className="rounded-xl bg-matcha px-5 py-3 font-bold text-white"
                >
                  Near Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-4 shadow-soft">
          <FilterBar filters={filters} setFilters={setFilters} />
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-4">
            <div>
              <p className="text-sm font-semibold text-stone-500">Featured nearby</p>
              <h2 className="text-2xl font-black">Cafe matches</h2>
            </div>
            <div className="grid grid-cols-2 rounded-xl bg-stone-100 p-1">
              {["list", "map"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setView(mode)}
                  className={`rounded-lg px-4 py-2 text-sm font-bold capitalize ${
                    view === mode ? "bg-white shadow-sm" : "text-stone-500"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-black">Featured cafes</h2>
              <span className="text-sm font-semibold text-matcha">{featured.length} editor picks</span>
            </div>
            <CafeGrid
              cafes={featured}
              favoriteSet={favoriteSet}
              onFavorite={toggleFavorite}
              onOpen={openCafe}
              compact
            />
          </div>
        )}

        <div className="mt-10">
          {view === "list" ? (
            <CafeGrid
              cafes={cafes}
              favoriteSet={favoriteSet}
              onFavorite={toggleFavorite}
              onOpen={openCafe}
              loading={loading}
            />
          ) : (
            <MapView
              cafes={cafes}
              favoriteSet={favoriteSet}
              onFavorite={toggleFavorite}
              onOpen={openCafe}
            />
          )}
        </div>

        {favorites.length > 0 && (
          <div className="mt-10 rounded-2xl bg-ink px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <Heart size={20} className="fill-white" />
              <p className="font-semibold">
                {favorites.length} saved spot{favorites.length > 1 ? "s" : ""} ready for your next session.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
