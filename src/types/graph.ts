export type EntityType =
  | "Ministerial Department"
  | "Non-Ministerial Department"
  | "Executive Agency"
  | "Public Body";

export interface NodeData {
  id: string;
  label: string;
  type: EntityType;
  val: number;

  headOfEntity: string;
  budget: string;
  staffCount: number;
  description: string;
  websiteUrl: string;
}

export interface LinkData {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: NodeData[];
  links: LinkData[];
}
