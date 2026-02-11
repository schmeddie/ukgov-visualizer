import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { NodeData, LinkData, EntityType, GraphData } from "@/types/graph";

function staffToVal(staffCount: number): number {
  if (staffCount <= 0) return 2;
  return Math.max(2, Math.log10(staffCount) * 3);
}

// --- Seed Data ---
function createSeedData(): GraphData {
  const cabinetOffice: NodeData = {
    id: uuidv4(),
    label: "Cabinet Office",
    type: "Ministerial Department",
    val: staffToVal(8930),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 8930,
    description:
      "Supports the Prime Minister and ensures the effective running of government.",
    websiteUrl: "https://www.gov.uk/government/organisations/cabinet-office",
  };

  const hmTreasury: NodeData = {
    id: uuidv4(),
    label: "HM Treasury",
    type: "Ministerial Department",
    val: staffToVal(2100),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 2100,
    description:
      "The government's economic and finance ministry, maintaining control over public spending.",
    websiteUrl: "https://www.gov.uk/government/organisations/hm-treasury",
  };

  const homeOffice: NodeData = {
    id: uuidv4(),
    label: "Home Office",
    type: "Ministerial Department",
    val: staffToVal(36000),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 36000,
    description:
      "The lead government department for immigration and passports, drugs policy, crime, fire, counter-terrorism and police.",
    websiteUrl: "https://www.gov.uk/government/organisations/home-office",
  };

  const mod: NodeData = {
    id: uuidv4(),
    label: "Ministry of Defence",
    type: "Ministerial Department",
    val: staffToVal(57000),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 57000,
    description:
      "Protects the security, independence and interests of the UK at home and abroad.",
    websiteUrl:
      "https://www.gov.uk/government/organisations/ministry-of-defence",
  };

  const dfe: NodeData = {
    id: uuidv4(),
    label: "Department for Education",
    type: "Ministerial Department",
    val: staffToVal(7200),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 7200,
    description:
      "Responsible for children's services and education in England.",
    websiteUrl:
      "https://www.gov.uk/government/organisations/department-for-education",
  };

  const dhsc: NodeData = {
    id: uuidv4(),
    label: "Dept of Health & Social Care",
    type: "Ministerial Department",
    val: staffToVal(3200),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 3200,
    description:
      "Responsible for government policy on health and adult social care in England.",
    websiteUrl:
      "https://www.gov.uk/government/organisations/department-of-health-and-social-care",
  };

  const hmrc: NodeData = {
    id: uuidv4(),
    label: "HMRC",
    type: "Non-Ministerial Department",
    val: staffToVal(66000),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 66000,
    description:
      "Responsible for the collection of taxes, the payment of some forms of state support, and the administration of other regulatory regimes.",
    websiteUrl: "https://www.gov.uk/government/organisations/hm-revenue-customs",
  };

  const ofsted: NodeData = {
    id: uuidv4(),
    label: "Ofsted",
    type: "Non-Ministerial Department",
    val: staffToVal(1700),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 1700,
    description:
      "Inspects and regulates services that care for children and young people, and services providing education and skills.",
    websiteUrl: "https://www.gov.uk/government/organisations/ofsted",
  };

  const dvla: NodeData = {
    id: uuidv4(),
    label: "DVLA",
    type: "Executive Agency",
    val: staffToVal(6000),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 6000,
    description:
      "Maintains registers of drivers and vehicles, and collects vehicle excise duty.",
    websiteUrl:
      "https://www.gov.uk/government/organisations/driver-and-vehicle-licensing-agency",
  };

  const nhs: NodeData = {
    id: uuidv4(),
    label: "NHS England",
    type: "Public Body",
    val: staffToVal(7500),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 7500,
    description:
      "Leads the National Health Service in England, overseeing the budget, planning, and delivery of NHS services.",
    websiteUrl: "https://www.england.nhs.uk/",
  };

  const ukBorderForce: NodeData = {
    id: uuidv4(),
    label: "UK Border Force",
    type: "Executive Agency",
    val: staffToVal(8000),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount: 8000,
    description:
      "A law enforcement command within the Home Office, securing the UK border.",
    websiteUrl:
      "https://www.gov.uk/government/organisations/border-force",
  };

  const nodes = [
    cabinetOffice,
    hmTreasury,
    homeOffice,
    mod,
    dfe,
    dhsc,
    hmrc,
    ofsted,
    dvla,
    nhs,
    ukBorderForce,
  ];

  const links: LinkData[] = [
    { source: hmTreasury.id, target: hmrc.id },
    { source: dfe.id, target: ofsted.id },
    { source: homeOffice.id, target: ukBorderForce.id },
    { source: dhsc.id, target: nhs.id },
    { source: cabinetOffice.id, target: hmTreasury.id },
    { source: cabinetOffice.id, target: homeOffice.id },
    { source: cabinetOffice.id, target: mod.id },
    { source: cabinetOffice.id, target: dfe.id },
    { source: cabinetOffice.id, target: dhsc.id },
    { source: homeOffice.id, target: dvla.id },
  ];

  return { nodes, links };
}

// --- Store ---
interface GraphStore extends GraphData {
  selectedNode: NodeData | null;
  setSelectedNode: (node: NodeData | null) => void;

  addNode: (
    node: Omit<NodeData, "id" | "val"> & { staffCount: number }
  ) => void;
  updateNode: (
    id: string,
    data: Partial<Omit<NodeData, "id" | "val">> & { staffCount?: number }
  ) => void;
  removeNode: (id: string) => void;

  addLink: (source: string, target: string) => void;
  removeLink: (source: string, target: string) => void;
}

export const useGraphStore = create<GraphStore>((set) => {
  const seed = createSeedData();

  return {
    nodes: seed.nodes,
    links: seed.links,
    selectedNode: null,

    setSelectedNode: (node) => set({ selectedNode: node }),

    addNode: (data) => {
      const newNode: NodeData = {
        ...data,
        id: uuidv4(),
        val: staffToVal(data.staffCount),
      };
      set((s) => ({ nodes: [...s.nodes, newNode] }));
    },

    updateNode: (id, data) => {
      set((s) => ({
        nodes: s.nodes.map((n) => {
          if (n.id !== id) return n;
          const updated = { ...n, ...data };
          if (data.staffCount !== undefined) {
            updated.val = staffToVal(data.staffCount);
          }
          return updated;
        }),
      }));
    },

    removeNode: (id) => {
      set((s) => ({
        nodes: s.nodes.filter((n) => n.id !== id),
        links: s.links.filter((l) => l.source !== id && l.target !== id),
        selectedNode: s.selectedNode?.id === id ? null : s.selectedNode,
      }));
    },

    addLink: (source, target) => {
      set((s) => {
        const exists = s.links.some(
          (l) => l.source === source && l.target === target
        );
        if (exists) return s;
        return { links: [...s.links, { source, target }] };
      });
    },

    removeLink: (source, target) => {
      set((s) => ({
        links: s.links.filter(
          (l) => !(l.source === source && l.target === target)
        ),
      }));
    },
  };
});
