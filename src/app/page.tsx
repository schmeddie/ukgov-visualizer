"use client";

import dynamic from "next/dynamic";
import NodeModal from "@/components/NodeModal";
import Legend from "@/components/Legend";

const ForceGraph = dynamic(() => import("@/components/ForceGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0f172a]">
      <div className="text-slate-400 text-sm animate-pulse">
        Loading visualiser…
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0f172a]">
      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-lg font-bold text-white tracking-tight">
          UK Government Structure
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Interactive Network Visualiser
        </p>
      </div>

      <ForceGraph />
      <NodeModal />
      <Legend />
    </main>
  );
}
