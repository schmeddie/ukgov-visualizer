"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
} from "react-force-graph-2d";
import { useGraphStore } from "@/store/graph-store";
import type { NodeData, EntityType } from "@/types/graph";

// Dual-tone gradients per entity type
const TYPE_COLORS: Record<EntityType, { core: string; rim: string; glow: string }> = {
  "Ministerial Department":     { core: "#6366f1", rim: "#818cf8", glow: "99,102,241" },
  "Non-Ministerial Department": { core: "#a855f7", rim: "#c084fc", glow: "168,85,247" },
  "Executive Agency":           { core: "#06b6d4", rim: "#22d3ee", glow: "6,182,212" },
  "Public Body":                { core: "#f59e0b", rim: "#fbbf24", glow: "245,158,11" },
};

let hoverNodeId: string | null = null;
let tickCount = 0;

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
      graphRef.current.d3Force("charge")?.strength(-250);
      graphRef.current.d3Force("link")?.distance(90);
    }
  }, []);

  // Tick animation for glow pulsing
  useEffect(() => {
    const interval = setInterval(() => {
      tickCount++;
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = useCallback(
    (node: object) => {
      setSelectedNode(node as NodeData);
    },
    [setSelectedNode]
  );

  const handleNodeHover = useCallback((node: object | null) => {
    hoverNodeId = node ? (node as NodeData).id : null;
  }, []);

  const paintNode = useCallback(
    (node: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const n = node as NodeData & { x: number; y: number };
      if (!Number.isFinite(n.x) || !Number.isFinite(n.y)) return;
      const baseRadius = Math.sqrt(n.val) * 4;
      const isHovered = n.id === hoverNodeId;
      const radius = isHovered ? baseRadius * 1.15 : baseRadius;
      const colors = TYPE_COLORS[n.type] || TYPE_COLORS["Public Body"];

      // Pulse factor
      const pulse = Math.sin(tickCount * 0.04 + n.val) * 0.15 + 0.85;

      // Outer glow (soft, pulsing)
      const glowRadius = radius * 2.5 * pulse;
      const glowGrad = ctx.createRadialGradient(n.x, n.y, radius * 0.5, n.x, n.y, glowRadius);
      glowGrad.addColorStop(0, `rgba(${colors.glow}, ${isHovered ? 0.25 : 0.12})`);
      glowGrad.addColorStop(1, `rgba(${colors.glow}, 0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowRadius, 0, 2 * Math.PI);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Main circle with radial gradient
      const grad = ctx.createRadialGradient(
        n.x - radius * 0.3, n.y - radius * 0.3, radius * 0.1,
        n.x, n.y, radius
      );
      grad.addColorStop(0, colors.rim);
      grad.addColorStop(1, colors.core);
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.fill();

      // Bright rim
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(${colors.glow}, ${isHovered ? 0.8 : 0.35})`;
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.stroke();

      // Inner highlight (gloss)
      const glossGrad = ctx.createRadialGradient(
        n.x - radius * 0.25, n.y - radius * 0.35, 0,
        n.x - radius * 0.25, n.y - radius * 0.35, radius * 0.7
      );
      glossGrad.addColorStop(0, "rgba(255,255,255,0.25)");
      glossGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = glossGrad;
      ctx.fill();

      // Label
      const fontSize = Math.max(11 / globalScale, 3);
      ctx.font = `600 ${fontSize}px "Inter", "SF Pro Display", system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // Label shadow
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillText(n.label, n.x + 0.5, n.y + radius + 3.5);

      // Label text
      ctx.fillStyle = isHovered ? "#ffffff" : "#cbd5e1";
      ctx.fillText(n.label, n.x, n.y + radius + 3);
    },
    []
  );

  const paintLink = useCallback(
    (link: object, ctx: CanvasRenderingContext2D) => {
      const l = link as { source: { x: number; y: number }; target: { x: number; y: number } };
      if (!Number.isFinite(l.source.x) || !Number.isFinite(l.source.y) ||
          !Number.isFinite(l.target.x) || !Number.isFinite(l.target.y)) return;

      const grad = ctx.createLinearGradient(l.source.x, l.source.y, l.target.x, l.target.y);
      grad.addColorStop(0, "rgba(99, 102, 241, 0.35)");
      grad.addColorStop(0.5, "rgba(139, 92, 246, 0.2)");
      grad.addColorStop(1, "rgba(99, 102, 241, 0.35)");

      ctx.beginPath();
      ctx.moveTo(l.source.x, l.source.y);
      ctx.lineTo(l.target.x, l.target.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Animated particle along link
      const t = (tickCount * 0.008) % 1;
      const px = l.source.x + (l.target.x - l.source.x) * t;
      const py = l.source.y + (l.target.y - l.source.y) * t;
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(165, 180, 252, 0.6)";
      ctx.fill();
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
      backgroundColor="rgba(0,0,0,0)"
      nodeCanvasObject={paintNode}
      nodePointerAreaPaint={(node, color, ctx) => {
        const nd = node as NodeData & { x: number; y: number };
        if (!Number.isFinite(nd.x) || !Number.isFinite(nd.y)) return;
        const radius = Math.sqrt(nd.val) * 4 + 6;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }}
      linkCanvasObject={paintLink}
      onNodeClick={handleNodeClick}
      onNodeHover={handleNodeHover}
      cooldownTicks={120}
      enableNodeDrag={true}
      enableZoomInteraction={true}
    />
  );
}
