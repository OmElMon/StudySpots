import { Car, Coffee, Moon, Plug, Sofa, Users, Volume2, Wifi } from "lucide-react";

const filters = [
  ["quiet", "Quiet", Volume2],
  ["groups", "Groups", Users],
  ["openLate", "Open late", Moon],
  ["outlets", "Outlets", Plug],
  ["wifi", "Wi-Fi", Wifi],
  ["parking", "Parking", Car],
  ["cozy", "Cozy", Sofa],
];

export default function FilterBar({ filters: activeFilters, setFilters }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filters.map(([key, label, Icon]) => {
        const active = activeFilters[key];
        return (
          <button
            key={key}
            onClick={() => setFilters((current) => ({ ...current, [key]: !current[key] }))}
            className={`flex min-w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
              active ? "bg-ink text-white" : "bg-white text-stone-600 ring-1 ring-stone-200"
            }`}
            title={label}
          >
            <Icon size={16} />
            {label}
          </button>
        );
      })}
      <span className="grid h-9 min-w-9 place-items-center rounded-full bg-clay/12 text-clay">
        <Coffee size={16} />
      </span>
    </div>
  );
}
