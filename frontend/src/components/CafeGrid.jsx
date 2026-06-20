import CafeCard from "./CafeCard.jsx";

export default function CafeGrid({
  cafes,
  favoriteSet,
  onFavorite,
  onOpen,
  loading = false,
  compact = false,
}) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-96 animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
    );
  }

  if (!cafes.length) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
        <h3 className="text-xl font-black">No cafes found</h3>
        <p className="mt-2 text-stone-600">Try a different city or loosen a few filters.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${compact ? "md:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {cafes.map((cafe) => (
        <CafeCard
          key={cafe.id}
          cafe={cafe}
          compact={compact}
          isFavorite={favoriteSet.has(cafe.id)}
          onFavorite={() => onFavorite(cafe.id)}
          onOpen={() => onOpen(cafe.id)}
        />
      ))}
    </div>
  );
}
