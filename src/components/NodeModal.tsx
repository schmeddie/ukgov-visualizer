"use client";

import { useGraphStore } from "@/store/graph-store";
import {
  X,
  ExternalLink,
  User,
  Banknote,
  Users,
  FileText,
  Crown,
} from "lucide-react";
import type { EntityType } from "@/types/graph";

const TYPE_STYLES: Record<EntityType, { gradient: string; badge: string; icon: string }> = {
  "Ministerial Department": {
    gradient: "from-indigo-500/20 via-indigo-600/5 to-transparent",
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-400/25",
    icon: "#818cf8",
  },
  "Non-Ministerial Department": {
    gradient: "from-purple-500/20 via-purple-600/5 to-transparent",
    badge: "bg-purple-500/15 text-purple-300 border-purple-400/25",
    icon: "#c084fc",
  },
  "Executive Agency": {
    gradient: "from-cyan-500/20 via-cyan-600/5 to-transparent",
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-400/25",
    icon: "#22d3ee",
  },
  "Public Body": {
    gradient: "from-amber-500/20 via-amber-600/5 to-transparent",
    badge: "bg-amber-500/15 text-amber-300 border-amber-400/25",
    icon: "#fbbf24",
  },
};

export default function NodeModal() {
  const selectedNode = useGraphStore((s) => s.selectedNode);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);

  if (!selectedNode) return null;

  const style = TYPE_STYLES[selectedNode.type] || TYPE_STYLES["Public Body"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={() => setSelectedNode(null)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg mx-4 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow behind card */}
        <div
          className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-b ${style.gradient} opacity-60 blur-xl`}
        />

        <div className="relative rounded-2xl border border-white/[0.08] bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Gradient header band */}
          <div className={`h-1 w-full bg-gradient-to-r ${style.gradient.replace("/20", "/60").replace("/5", "/30")}`} />

          <div className="p-6">
            {/* Close */}
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <Crown size={18} style={{ color: style.icon }} />
                </div>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.badge}`}
                >
                  {selectedNode.type}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                {selectedNode.label}
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5 stagger-children">
              {[
                { icon: User, label: "Head of Entity", value: selectedNode.headOfEntity },
                { icon: Banknote, label: "Budget", value: selectedNode.budget },
                { icon: Users, label: "Staff Count", value: selectedNode.staffCount.toLocaleString() },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 animate-fade-in-up"
                >
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium uppercase tracking-wider mb-1.5">
                    <item.icon size={12} />
                    {item.label}
                  </div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                </div>
              ))}
              {/* Website card */}
              <a
                href={selectedNode.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 hover:bg-indigo-500/[0.08] hover:border-indigo-400/20 transition-all duration-300 animate-fade-in-up"
              >
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium uppercase tracking-wider mb-1.5">
                  <ExternalLink size={12} />
                  Website
                </div>
                <p className="text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors truncate">
                  Visit Site
                </p>
              </a>
            </div>

            {/* Description */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 animate-fade-in-up">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium uppercase tracking-wider mb-2">
                <FileText size={12} />
                About
              </div>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
