"use client";

import { useState } from "react";
import { useGraphStore } from "@/store/graph-store";
import type { EntityType, NodeData } from "@/types/graph";
import {
  Plus,
  Trash2,
  Pencil,
  Link as LinkIcon,
  Unlink,
  ArrowLeft,
} from "lucide-react";
import NextLink from "next/link";

const ENTITY_TYPES: EntityType[] = [
  "Ministerial Department",
  "Non-Ministerial Department",
  "Executive Agency",
  "Public Body",
];

// --- Reusable input classes ---
const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500";
const labelClass = "block text-xs font-medium text-slate-400 mb-1";
const btnPrimary =
  "inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors cursor-pointer";
const btnDanger =
  "inline-flex items-center gap-1 rounded-lg bg-red-600/20 border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-600/30 transition-colors cursor-pointer";

// ---------- Node Form ----------
function NodeForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: NodeData;
  onSave: (data: Omit<NodeData, "id" | "val">) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [type, setType] = useState<EntityType>(
    initial?.type ?? "Ministerial Department"
  );
  const [headOfEntity, setHead] = useState(initial?.headOfEntity ?? "PLACEHOLDER");
  const [budget, setBudget] = useState(initial?.budget ?? "PLACEHOLDER");
  const [staffCount, setStaff] = useState(initial?.staffCount ?? 0);
  const [description, setDesc] = useState(
    initial?.description ?? "PLACEHOLDER"
  );
  const [websiteUrl, setUrl] = useState(initial?.websiteUrl ?? "#");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    onSave({ label, type, headOfEntity, budget, staffCount, description, websiteUrl });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Name *</label>
        <input
          className={inputClass}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Entity name"
          required
        />
      </div>

      <div>
        <label className={labelClass}>Entity Type</label>
        <select
          className={inputClass}
          value={type}
          onChange={(e) => setType(e.target.value as EntityType)}
        >
          {ENTITY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Head of Entity</label>
          <input
            className={inputClass}
            value={headOfEntity}
            onChange={(e) => setHead(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Budget</label>
          <input
            className={inputClass}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Staff Count</label>
        <input
          className={inputClass}
          type="number"
          min={0}
          value={staffCount}
          onChange={(e) => setStaff(Number(e.target.value))}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          className={inputClass + " min-h-[80px]"}
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Website URL</label>
        <input
          className={inputClass}
          value={websiteUrl}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className={btnPrimary}>
          {initial ? "Update" : "Add"} Entity
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---------- Link Form ----------
function LinkForm({ onClose }: { onClose: () => void }) {
  const nodes = useGraphStore((s) => s.nodes);
  const addLink = useGraphStore((s) => s.addLink);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (source && target && source !== target) {
      addLink(source, target);
      onClose();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Source (Parent)</label>
        <select
          className={inputClass}
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">Select…</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Target (Child)</label>
        <select
          className={inputClass}
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        >
          <option value="">Select…</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className={btnPrimary}>
          <LinkIcon size={14} /> Add Connection
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---------- Admin Page ----------
export default function AdminPage() {
  const nodes = useGraphStore((s) => s.nodes);
  const links = useGraphStore((s) => s.links);
  const addNode = useGraphStore((s) => s.addNode);
  const updateNode = useGraphStore((s) => s.updateNode);
  const removeNode = useGraphStore((s) => s.removeNode);
  const removeLink = useGraphStore((s) => s.removeLink);

  const [panel, setPanel] = useState<
    "none" | "add" | "link" | { editing: string }
  >("none");

  const editingNode =
    typeof panel === "object" && "editing" in panel
      ? nodes.find((n) => n.id === panel.editing)
      : undefined;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <NextLink
              href="/"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </NextLink>
            <div>
              <h1 className="text-lg font-bold">Admin Panel</h1>
              <p className="text-xs text-slate-500">
                Manage entities &amp; connections
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPanel("add")}
              className={btnPrimary}
            >
              <Plus size={14} /> Add Entity
            </button>
            <button
              onClick={() => setPanel("link")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            >
              <LinkIcon size={14} /> Add Connection
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Slide-over panel */}
        {panel !== "none" && (
          <div className="mb-8 rounded-xl border border-slate-700/60 bg-slate-900/60 p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">
              {panel === "add"
                ? "Add New Entity"
                : panel === "link"
                  ? "Add Connection"
                  : "Edit Entity"}
            </h2>
            {panel === "link" ? (
              <LinkForm onClose={() => setPanel("none")} />
            ) : (
              <NodeForm
                initial={editingNode}
                onSave={(data) => {
                  if (editingNode) {
                    updateNode(editingNode.id, data);
                  } else {
                    addNode(data);
                  }
                  setPanel("none");
                }}
                onCancel={() => setPanel("none")}
              />
            )}
          </div>
        )}

        {/* Entity Table */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Entities ({nodes.length})
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-right px-4 py-3">Staff</th>
                  <th className="text-left px-4 py-3">Head</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {nodes.map((node) => (
                  <tr
                    key={node.id}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {node.label}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{node.type}</td>
                    <td className="px-4 py-3 text-right text-slate-300">
                      {node.staffCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {node.headOfEntity}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            setPanel({ editing: node.id })
                          }
                          className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => removeNode(node.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Connections Table */}
        <section>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Connections ({links.length})
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Source</th>
                  <th className="text-left px-4 py-3">Target</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {links.map((link, i) => {
                  const srcLabel =
                    nodes.find((n) => n.id === link.source)?.label ??
                    link.source;
                  const tgtLabel =
                    nodes.find((n) => n.id === link.target)?.label ??
                    link.target;
                  return (
                    <tr
                      key={`${link.source}-${link.target}-${i}`}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-300">{srcLabel}</td>
                      <td className="px-4 py-3 text-slate-300">{tgtLabel}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            removeLink(link.source, link.target)
                          }
                          className={btnDanger}
                        >
                          <Unlink size={12} /> Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {links.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      No connections yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
