"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
} from "react-force-graph-2d";
import { useGraphStore } from "@/store/graph-store";
import type { NodeData, EntityType } from "@/types/graph";

const TYPE_COLORS: Record<EntityType, string> = {
  "Ministerial Department": "#3b82f6",
  "Non-Ministerial Department": "#a855f7",
  "Executive Agency": "#22c55e",
  "Public Body": "#f59e0b",
};

export default function ForceGraph() {
  const nodes = useGraphStore((s) => s.nodes);
  const links = useGraphStore((s) => s.links);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("charge")?.strength(-300);
      graphRef.current.d3Force("link")?.distance(100);
    }
  }, []);

  const handleNodeClick = useCallback(
    (node: object) => {
      const n = node as NodeData;
      setSelectedNode(n);
    },
    [setSelectedNode]
  );

  const paintNode = useCallback(
    (node: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const n = node as NodeData & { x: number; y: number };
      const radius = Math.sqrt(n.val) * 4;
      const color = TYPE_COLORS[n.type] || "#64748b";

      // Glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius + 2, 0, 2 * Math.PI);
      ctx.fillStyle = color + "33";
      ctx.fill();

      // Circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff22";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label
      const fontSize = Math.max(10 / globalScale, 3);
      ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f1f5f9";
      ctx.fillText(n.label, n.x, n.y + radius + fontSize + 1);
    },
    []
  );

  const graphData = {
    nodes: nodes.map((n) => ({ ...n })),
    links: links.map((l) => ({ ...l })),
  };

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={graphData}
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor="#0f172a"
      nodeCanvasObject={paintNode}
      nodePointerAreaPaint={(node, color, ctx) => {
        const n = node as NodeData & { x: number; y: number };
        const radius = Math.sqrt(n.val) * 4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius + 4, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }}
      onNodeClick={handleNodeClick}
      linkColor={() => "#334155"}
      linkWidth={1.5}
      linkDirectionalArrowLength={4}
      linkDirectionalArrowRelPos={1}
      cooldownTicks={100}
      enableNodeDrag={true}
      enableZoomInteraction={true}
    />
  );
}
