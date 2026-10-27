export interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
  subLabel?: string;
}

export interface PhilosophyItem {
  number: string;
  title: string;
  keyword: string;
  summary: string;
  quote: string;
  description: string;
  practices: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  category: "all" | "new_biz" | "infra" | "b2b_erp";
  categoryLabel: string;
  role: string;
  period: string;
  organization: string;
  summary: string;
  keyMetrics: { label: string; value: string; detail: string }[];
  problem: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    points: string[];
  };
  businessImpact: {
    title: string;
    description: string;
    points: string[];
  };
  techSpecs: {
    title: string;
    description: string;
    items: string[];
  };
  tags: string[];
}

export interface CapabilityCategory {
  title: string;
  subtitle: string;
  iconName: string;
  items: {
    name: string;
    level?: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  description: string;
  highlights: string[];
  domains: string[];
}
