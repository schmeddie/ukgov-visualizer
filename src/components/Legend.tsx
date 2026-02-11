"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGraphStore } from "@/store/graph-store";
import type { EntityType } from "@/types/graph";

const LEGEND: { type: EntityType; color: string; gradient: string }[] = [
  { type: "Ministerial Department", color: "#6366f1", gradient: "from-indigo-500 to-indigo-400" },
  { type: "Non-Ministerial Department", color: "#a855f7", gradient: "from-purple-500 to-purple-400" },
  { type: "Executive Agency", color: "#06b6d4", gradient: "from-cyan-500 to-cyan-400" },
  { type: "Public Body", color: "#f59e0b", gradient: "from-amber-500 to-amber-400" },
];

export default function Legend() {
  const [collapsed, setCollapsed] = useState(false);
  const nodes = useGraphStore((s) => s.nodes);

  const counts = LEGEND.map((item) => ({
    ...item,
    count: nodes.filter((n) => n.type === item.type).length,
  }));

  return (
    <div className="absolute bottom-6 left-6 z-10 animate-slide-in-right">
      <div className="rounded-2xl border border-white/[0.08] bg-slate-950/70 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-1">
              {LEGEND.map((item) => (
                <span
                  key={item.type}
                  className="w-2.5 h-2.5 rounded-full border border-slate-900"
                  style={{ backgroundColor: item.color }}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Entity Types
            </span>
          </div>
          {collapsed ? (
            <ChevronUp size={14} className="text-slate-500" />
          ) : (
            <ChevronDown size={14} className="text-slate-500" />
          )}
        </button>

        {/* Items */}
        {!collapsed && (
          <div className="px-3 pb-3 space-y-1 stagger-children">
            {counts.map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between gap-4 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors animate-fade-in-up"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-slate-950"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}40` }}
                  />
                  <span className="text-xs text-slate-300">{item.type}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 tabular-nums bg-white/[0.04] px-1.5 py-0.5 rounded">
                  {item.count}
                </span>
              </div>
            ))}
            {/* Total */}
            <div className="flex items-center justify-between px-2 pt-2 mt-1 border-t border-white/[0.06]">
              <span className="text-[11px] font-medium text-slate-500">Total entities</span>
              <span className="text-[11px] font-bold text-slate-300 tabular-nums">{nodes.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
