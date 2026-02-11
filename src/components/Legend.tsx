"use client";

import type { EntityType } from "@/types/graph";

const LEGEND: { type: EntityType; color: string }[] = [
  { type: "Ministerial Department", color: "#3b82f6" },
  { type: "Non-Ministerial Department", color: "#a855f7" },
  { type: "Executive Agency", color: "#22c55e" },
  { type: "Public Body", color: "#f59e0b" },
];

export default function Legend() {
  return (
    <div className="absolute bottom-6 left-6 z-10 rounded-xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-md p-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Entity Types
      </h3>
      <div className="space-y-2">
        {LEGEND.map((item) => (
          <div key={item.type} className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-slate-300">{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
