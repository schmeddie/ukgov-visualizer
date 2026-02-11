# UK Government Structure Visualiser

An interactive network graph that visualises the structure of the UK Government as a force-directed diagram, with a built-in admin panel for managing entities and connections.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## Features

### Public Visualiser (`/`)

- **Force-directed graph** powered by `react-force-graph-2d` with animated, draggable nodes
- **Color-coded entity types** — Ministerial (blue), Non-Ministerial (purple), Executive Agency (green), Public Body (amber)
- **Logarithmic node sizing** based on staff count so small agencies remain visible alongside large departments
- **Click-to-inspect** — click any node to open a detail modal showing head of entity, budget, staff count, description, and website link
- **Dark theme** — deep slate background (`#0f172a`) with crisp typography

### Admin Panel (`/admin`)

- **Entity management** — add, edit, and delete government entities with full metadata (name, type, head, budget, staff count, description, URL)
- **Connection management** — create and remove directional links between entities (source → target)
- **Live updates** — all changes reflect immediately in the visualiser via shared Zustand store

## Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Framework        | Next.js 15 (App Router)|
| Language         | TypeScript             |
| Styling          | Tailwind CSS 4         |
| Visualization    | react-force-graph-2d   |
| State Management | Zustand                |
| Icons            | Lucide React           |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) for the visualiser and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Project Structure

```
src/
├── types/graph.ts            # TypeScript types (NodeData, LinkData, EntityType)
├── store/graph-store.ts      # Zustand store with seed data + CRUD operations
├── components/
│   ├── ForceGraph.tsx        # Force-directed 2D graph (canvas-rendered)
│   ├── NodeModal.tsx         # Detail popup on node click
│   └── Legend.tsx            # Color legend overlay
├── app/
│   ├── layout.tsx            # Root layout (dark theme)
│   ├── globals.css           # Tailwind import
│   ├── page.tsx              # Public visualiser page
│   └── admin/page.tsx        # Admin CRUD dashboard
```

## Seed Data

The store initialises with 11 UK Government entities and 10 hierarchical connections:

- **Ministerial Departments** — Cabinet Office, HM Treasury, Home Office, Ministry of Defence, Department for Education, Dept of Health & Social Care
- **Non-Ministerial Departments** — HMRC, Ofsted
- **Executive Agencies** — DVLA, UK Border Force
- **Public Bodies** — NHS England

## Data Schema

```typescript
type EntityType =
  | "Ministerial Department"
  | "Non-Ministerial Department"
  | "Executive Agency"
  | "Public Body";

interface NodeData {
  id: string;
  label: string;
  type: EntityType;
  val: number;           // Derived from staffCount (log scale)
  headOfEntity: string;
  budget: string;
  staffCount: number;
  description: string;
  websiteUrl: string;
}

interface LinkData {
  source: string;        // Parent node ID
  target: string;        // Child node ID
}
```
