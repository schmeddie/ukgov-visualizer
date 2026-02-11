"use client";

import { useGraphStore } from "@/store/graph-store";
import {
  X,
  ExternalLink,
  User,
  Banknote,
  Users,
  FileText,
  Building2,
} from "lucide-react";
import type { EntityType } from "@/types/graph";

const TYPE_BADGE_COLORS: Record<EntityType, string> = {
  "Ministerial Department": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Non-Ministerial Department":
    "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Executive Agency": "bg-green-500/20 text-green-400 border-green-500/30",
  "Public Body": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function NodeModal() {
  const selectedNode = useGraphStore((s) => s.selectedNode);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);

  if (!selectedNode) return null;

  const badgeClass =
    TYPE_BADGE_COLORS[selectedNode.type] ||
    "bg-slate-500/20 text-slate-400 border-slate-500/30";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setSelectedNode(null)}
    >
      <div
        className="relative w-full max-w-lg mx-4 rounded-2xl border border-slate-700/60 bg-slate-900/95 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setSelectedNode(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <span
            className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border mb-3 ${badgeClass}`}
          >
            {selectedNode.type}
          </span>
          <h2 className="text-xl font-bold text-white">{selectedNode.label}</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-lg bg-slate-800/70 border border-slate-700/50 p-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <User size={14} />
              Head of Entity
            </div>
            <p className="text-sm font-semibold text-white">
              {selectedNode.headOfEntity}
            </p>
          </div>
          <div className="rounded-lg bg-slate-800/70 border border-slate-700/50 p-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Banknote size={14} />
              Budget
            </div>
            <p className="text-sm font-semibold text-white">
              {selectedNode.budget}
            </p>
          </div>
          <div className="rounded-lg bg-slate-800/70 border border-slate-700/50 p-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Users size={14} />
              Staff Count
            </div>
            <p className="text-sm font-semibold text-white">
              {selectedNode.staffCount.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-slate-800/70 border border-slate-700/50 p-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Building2 size={14} />
              Entity Type
            </div>
            <p className="text-sm font-semibold text-white">
              {selectedNode.type}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-lg bg-slate-800/70 border border-slate-700/50 p-3 mb-5">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <FileText size={14} />
            Description
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedNode.description}
          </p>
        </div>

        {/* Link */}
        <a
          href={selectedNode.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Visit Website <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
