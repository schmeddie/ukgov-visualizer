"use client";

import dynamic from "next/dynamic";
import NextLink from "next/link";
import NodeModal from "@/components/NodeModal";
import Legend from "@/components/Legend";
import { Settings, Network } from "lucide-react";
import { useGraphStore } from "@/store/graph-store";

const ForceGraph = dynamic(() => import("@/components/ForceGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#060a14]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-b-purple-400/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      <p className="text-slate-500 text-xs mt-4 tracking-wider uppercase font-medium">
        Initialising graph…
      </p>
    </div>
  ),
});

function StatsBar() {
  const nodes = useGraphStore((s) => s.nodes);
  const links = useGraphStore((s) => s.links);
  return (
    <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500 tabular-nums">
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
        {nodes.length} nodes
      </span>
      <span className="text-slate-700">|</span>
      <span>{links.length} connections</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#060a14]">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1222] via-[#060a14] to-[#080d1a]" />
        {/* Radial accent top-left */}
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] bg-indigo-600/[0.07] rounded-full blur-[120px]" />
        {/* Radial accent bottom-right */}
        <div className="absolute -bottom-[20%] -right-[15%] w-[50%] h-[50%] bg-purple-600/[0.05] rounded-full blur-[100px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 animate-fade-in">
        <div className="flex items-center justify-between px-6 py-5">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
              <Network size={18} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">
                UK Government Structure
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium tracking-wide">
                Interactive Network Visualiser
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <StatsBar />
            <NextLink
              href="/admin"
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.07] hover:border-white/[0.12] transition-all backdrop-blur-sm"
            >
              <Settings size={16} />
            </NextLink>
          </div>
        </div>
      </div>

      {/* Graph */}
      <ForceGraph />

      {/* Overlays */}
      <NodeModal />
      <Legend />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060a14] to-transparent pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#060a14]/80 to-transparent pointer-events-none z-[1]" />
    </main>
  );
}
