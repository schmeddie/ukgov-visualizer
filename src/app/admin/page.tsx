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
  Network,
  Users,
  Building2,
  Search,
} from "lucide-react";
import NextLink from "next/link";

const ENTITY_TYPES: EntityType[] = [
  "Ministerial Department",
  "Non-Ministerial Department",
  "Executive Agency",
  "Public Body",
];

const TYPE_DOT_COLORS: Record<EntityType, string> = {
  "Ministerial Department": "#6366f1",
  "Non-Ministerial Department": "#a855f7",
  "Executive Agency": "#06b6d4",
  "Public Body": "#f59e0b",
};

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 transition-all";
const labelClass = "block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

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
  const [type, setType] = useState<EntityType>(initial?.type ?? "Ministerial Department");
  const [headOfEntity, setHead] = useState(initial?.headOfEntity ?? "PLACEHOLDER");
  const [budget, setBudget] = useState(initial?.budget ?? "PLACEHOLDER");
  const [staffCount, setStaff] = useState(initial?.staffCount ?? 0);
  const [description, setDesc] = useState(initial?.description ?? "PLACEHOLDER");
  const [websiteUrl, setUrl] = useState(initial?.websiteUrl ?? "#");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    onSave({ label, type, headOfEntity, budget, staffCount, description, websiteUrl });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Name *</label>
          <input className={inputClass} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Entity name" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Entity Type</label>
          <select className={inputClass} value={type} onChange={(e) => setType(e.target.value as EntityType)}>
            {ENTITY_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Head of Entity</label>
          <input className={inputClass} value={headOfEntity} onChange={(e) => setHead(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Budget</label>
          <input className={inputClass} value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Staff Count</label>
        <input className={inputClass} type="number" min={0} value={staffCount} onChange={(e) => setStaff(Number(e.target.value))} />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea className={inputClass + " min-h-[80px] resize-none"} value={description} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Website URL</label>
        <input className={inputClass} value={websiteUrl} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 cursor-pointer">
          {initial ? "Update" : "Add"} Entity
        </button>
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm text-slate-400 hover:text-white hover:border-white/[0.15] transition-all cursor-pointer">
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
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Source (Parent)</label>
          <select className={inputClass} value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select…</option>
            {nodes.map((n) => (<option key={n.id} value={n.id}>{n.label}</option>))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Target (Child)</label>
          <select className={inputClass} value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">Select…</option>
            {nodes.map((n) => (<option key={n.id} value={n.id}>{n.label}</option>))}
          </select>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 cursor-pointer">
          <LinkIcon size={14} /> Add Connection
        </button>
        <button type="button" onClick={onClose} className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm text-slate-400 hover:text-white hover:border-white/[0.15] transition-all cursor-pointer">
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

  const [panel, setPanel] = useState<"none" | "add" | "link" | { editing: string }>("none");
  const [search, setSearch] = useState("");

  const editingNode =
    typeof panel === "object" && "editing" in panel
      ? nodes.find((n) => n.id === panel.editing)
      : undefined;

  const filteredNodes = search
    ? nodes.filter((n) => n.label.toLowerCase().includes(search.toLowerCase()))
    : nodes;

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-indigo-600/[0.04] rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[15%] w-[40%] h-[40%] bg-purple-600/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#060a14]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <NextLink
              href="/"
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12] transition-all"
            >
              <ArrowLeft size={16} />
            </NextLink>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Network size={18} className="text-indigo-400" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">Admin Panel</h1>
                <p className="text-[11px] text-slate-500 font-medium">Manage entities & connections</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPanel("add")}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
            >
              <Plus size={14} /> Add Entity
            </button>
            <button
              onClick={() => setPanel("link")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:border-white/[0.15] transition-all cursor-pointer"
            >
              <LinkIcon size={14} /> Add Connection
            </button>
          </div>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in">
          {[
            { icon: Building2, label: "Total Entities", value: nodes.length, color: "indigo" },
            { icon: LinkIcon, label: "Connections", value: links.length, color: "purple" },
            { icon: Users, label: "Total Staff", value: nodes.reduce((sum, n) => sum + n.staffCount, 0).toLocaleString(), color: "cyan" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <stat.icon size={13} />
                {stat.label}
              </div>
              <p className="text-2xl font-bold text-white tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Form panel */}
        {panel !== "none" && (
          <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 animate-fade-in-up">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">
              {panel === "add" ? "Add New Entity" : panel === "link" ? "Add Connection" : "Edit Entity"}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Entities ({nodes.length})
            </h2>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="text"
                placeholder="Search entities…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 w-56 transition-all"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Name</th>
                  <th className="text-left px-5 py-3">Type</th>
                  <th className="text-right px-5 py-3">Staff</th>
                  <th className="text-left px-5 py-3">Head</th>
                  <th className="text-right px-5 py-3 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredNodes.map((node) => (
                  <tr key={node.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: TYPE_DOT_COLORS[node.type], boxShadow: `0 0 6px ${TYPE_DOT_COLORS[node.type]}40` }}
                        />
                        <span className="font-medium text-white">{node.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{node.type}</td>
                    <td className="px-5 py-3 text-right text-slate-400 tabular-nums">{node.staffCount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{node.headOfEntity}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setPanel({ editing: node.id })}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => removeNode(node.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={13} />
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
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Connections ({links.length})
          </h2>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Source</th>
                  <th className="text-center px-2 py-3 w-8"></th>
                  <th className="text-left px-5 py-3">Target</th>
                  <th className="text-right px-5 py-3 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {links.map((link, i) => {
                  const srcLabel = nodes.find((n) => n.id === link.source)?.label ?? link.source;
                  const tgtLabel = nodes.find((n) => n.id === link.target)?.label ?? link.target;
                  return (
                    <tr key={`${link.source}-${link.target}-${i}`} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-3 text-slate-300">{srcLabel}</td>
                      <td className="text-center text-slate-700">→</td>
                      <td className="px-5 py-3 text-slate-300">{tgtLabel}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => removeLink(link.source, link.target)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-red-400/70 hover:text-red-400 bg-red-500/0 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <Unlink size={11} /> Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {links.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-slate-600">
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
