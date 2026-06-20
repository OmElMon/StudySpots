import { Heart, MapPin } from "lucide-react";

export default function MapView({ cafes, favoriteSet, onFavorite, onOpen }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
      <section className="relative min-h-[520px] overflow-hidden rounded-2xl bg-[#dce8df] ring-1 ring-stone-200">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(47,111,94,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(47,111,94,.18)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-6 rounded-2xl border border-white/70" />
        {cafes.map((cafe, index) => (
          <button
            key={cafe.id}
            onClick={() => onOpen(cafe.id)}
            className="absolute grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-soft ring-4 ring-white"
            style={{
              left: `${18 + ((index * 23) % 64)}%`,
              top: `${18 + ((index * 31) % 58)}%`,
            }}
            title={cafe.name}
          >
            <MapPin size={22} className="fill-white/20" />
          </button>
        ))}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 p-4 shadow-soft">
          <p className="text-sm font-semibold text-stone-500">Map integration placeholder</p>
          <h3 className="text-xl font-black">Coordinates are API-ready</h3>
          <p className="mt-1 text-sm text-stone-600">
            Swap this panel for Mapbox, Google Maps, or Leaflet using each cafe latitude and longitude.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        {cafes.map((cafe) => (
          <article key={cafe.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="flex gap-3">
              <img src={cafe.photos[0]} alt={cafe.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-black">{cafe.name}</h3>
                <p className="text-sm text-stone-500">{cafe.address}</p>
                <p className="mt-1 text-sm font-bold text-matcha">{cafe.study_score}/10 study score</p>
              </div>
              <button
                onClick={() => onFavorite(cafe.id)}
                title={favoriteSet.has(cafe.id) ? "Remove favorite" : "Save favorite"}
                className="grid h-10 w-10 place-items-center rounded-full bg-stone-100"
              >
                <Heart size={18} className={favoriteSet.has(cafe.id) ? "fill-clay text-clay" : ""} />
              </button>
            </div>
            <button
              onClick={() => onOpen(cafe.id)}
              className="mt-3 w-full rounded-xl bg-stone-100 px-4 py-2 text-sm font-black"
            >
              Details
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
