import { Clock, Heart, MapPin, Plug, Star, Users, Wifi } from "lucide-react";

export default function CafeCard({ cafe, compact, isFavorite, onFavorite, onOpen }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3]">
        <img src={cafe.photos[0]} alt={cafe.name} className="h-full w-full object-cover" />
        <button
          onClick={(event) => {
            event.stopPropagation();
            onFavorite();
          }}
          title={isFavorite ? "Remove favorite" : "Save favorite"}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/92 text-ink shadow-sm"
        >
          <Heart size={19} className={isFavorite ? "fill-clay text-clay" : ""} />
        </button>
        <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-black text-matcha">
          {cafe.study_score}/10 study
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black leading-tight">{cafe.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
              <MapPin size={14} />
              {cafe.city}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-matcha/10 px-2 py-1 text-sm font-black text-matcha">
            <Star size={14} className="fill-matcha" />
            {cafe.study_rating}
          </div>
        </div>

        {!compact && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-stone-600">
            <span className="rounded-xl bg-stone-100 px-2 py-2">{cafe.noise_level}</span>
            <span className="rounded-xl bg-stone-100 px-2 py-2">{cafe.price_level}</span>
            <span className="rounded-xl bg-stone-100 px-2 py-2">{cafe.open_late ? "Late" : "Daytime"}</span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {cafe.vibe_tags.slice(0, compact ? 2 : 4).map((tag) => (
            <span key={tag} className="rounded-full bg-skyglass px-3 py-1 text-xs font-bold text-blue-900">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-stone-500">
          {cafe.has_wifi && <Wifi size={18} />}
          {cafe.has_outlets && <Plug size={18} />}
          {cafe.hangout_rating >= 8.5 && <Users size={18} />}
          {cafe.open_late && <Clock size={18} />}
        </div>

        <button
          onClick={onOpen}
          className="mt-5 w-full rounded-xl bg-ink px-4 py-3 text-sm font-black text-white"
        >
          View spot
        </button>
      </div>
    </article>
  );
}
