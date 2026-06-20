import { useState } from "react";
import { ArrowLeft, Car, Clock, Heart, MapPin, Plug, Send, Star, Users, Wifi } from "lucide-react";
import { createReview } from "../api";

export default function CafeDetail({ cafe, isFavorite, onBack, onFavorite, onReviewCreated }) {
  const [form, setForm] = useState({
    author: "",
    rating: 5,
    visit_type: "Studying",
    body: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function submitReview(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const review = await createReview(cafe.id, form);
      onReviewCreated(review);
      setForm({ author: "", rating: 5, visit_type: "Studying", body: "" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream pb-14">
      <section className="relative min-h-[62vh] overflow-hidden bg-ink text-white">
        <img src={cafe.photos[0]} alt={cafe.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/55 to-ink" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="grid h-11 w-11 place-items-center rounded-full bg-white/14 ring-1 ring-white/20">
              <ArrowLeft size={21} />
            </button>
            <button onClick={onFavorite} className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink">
              <Heart size={20} className={isFavorite ? "fill-clay text-clay" : ""} />
            </button>
          </div>
          <div className="pb-7">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-white/75">
              <MapPin size={16} />
              {cafe.address}
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-none sm:text-6xl">{cafe.name}</h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {cafe.vibe_tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/16 px-3 py-1 text-sm font-bold ring-1 ring-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <aside className="space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="grid grid-cols-2 gap-3">
              <Metric label="Study" value={`${cafe.study_rating}/10`} icon={Star} />
              <Metric label="Hangout" value={`${cafe.hangout_rating}/10`} icon={Users} />
              <Metric label="Score" value={`${cafe.study_score}/10`} icon={Wifi} />
              <Metric label="Price" value={cafe.price_level} icon={CoffeeIcon} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-xl font-black">Best for</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {cafe.best_for.map((item) => (
                <span key={item} className="rounded-full bg-matcha/10 px-3 py-2 text-sm font-bold text-matcha">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-xl font-black">Amenities</h2>
            <div className="mt-4 space-y-3 text-sm font-semibold text-stone-600">
              <Amenity icon={Clock} label={cafe.hours} />
              <Amenity icon={Wifi} label={cafe.has_wifi ? "Wi-Fi available" : "No public Wi-Fi"} />
              <Amenity icon={Plug} label={cafe.has_outlets ? "Outlet friendly" : "Limited outlets"} />
              <Amenity icon={Car} label={cafe.parking} />
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {cafe.photos.map((photo) => (
              <img key={photo} src={photo} alt="" className="h-64 w-full rounded-2xl object-cover shadow-sm" />
            ))}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-xl font-black">Study notes</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Info label="Noise" value={cafe.noise_level} />
              <Info label="Seating" value={cafe.seating_comfort} />
              <Info label="Late-night" value={cafe.open_late ? "Available" : "Not late"} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-xl font-black">Reviews</h2>
            <form onSubmit={submitReview} className="mt-4 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <input
                  value={form.author}
                  onChange={(event) => setForm({ ...form, author: event.target.value })}
                  placeholder="Name"
                  className="rounded-xl bg-stone-100 px-4 py-3 outline-none"
                />
                <select
                  value={form.visit_type}
                  onChange={(event) => setForm({ ...form, visit_type: event.target.value })}
                  className="rounded-xl bg-stone-100 px-4 py-3 outline-none"
                >
                  <option>Studying</option>
                  <option>Remote work</option>
                  <option>Hangout</option>
                  <option>First date</option>
                  <option>Late-night study</option>
                </select>
                <select
                  value={form.rating}
                  onChange={(event) => setForm({ ...form, rating: event.target.value })}
                  className="rounded-xl bg-stone-100 px-4 py-3 outline-none"
                >
                  {[5, 4.5, 4, 3.5, 3].map((rating) => (
                    <option key={rating}>{rating}</option>
                  ))}
                </select>
              </div>
              <textarea
                required
                value={form.body}
                onChange={(event) => setForm({ ...form, body: event.target.value })}
                placeholder="How was it for studying, work, or hanging out?"
                className="min-h-28 rounded-xl bg-stone-100 px-4 py-3 outline-none"
              />
              <button
                disabled={submitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 font-black text-white disabled:opacity-60"
              >
                <Send size={17} />
                Add review
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {(cafe.reviews || []).map((review) => (
                <article key={review.id} className="rounded-xl bg-stone-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black">{review.author}</p>
                    <p className="text-sm font-bold text-matcha">{review.rating}/5</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-stone-500">{review.visit_type}</p>
                  <p className="mt-2 text-stone-700">{review.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl bg-stone-100 p-4">
      <Icon size={19} className="text-matcha" />
      <p className="mt-3 text-sm font-semibold text-stone-500">{label}</p>
      <p className="text-xl font-black">{value}</p>
    </div>
  );
}

function Amenity({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-matcha/10 text-matcha">
        <Icon size={17} />
      </span>
      <span>{label}</span>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-stone-100 p-4">
      <p className="text-sm font-semibold text-stone-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function CoffeeIcon(props) {
  return <span className="text-lg font-black text-matcha" {...props}>$</span>;
}
