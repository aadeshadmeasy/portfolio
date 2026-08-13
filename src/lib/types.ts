export type ThemeMode = "day" | "night" | "dark";

export type MetricStatus =
  | "verified"
  | "client-reported"
  | "founder-reported"
  | "estimated"
  | "illustrative"
  | "private";

export interface Metric {
  value: string;
  label: string;
  status: MetricStatus;
  source: string;
  public: boolean;
  lastVerified: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  dates: string;
  role: string;
  problem: string;
  intervention: string;
  outcome: string;
  outcomeStatus: MetricStatus;
  url: string;
  repository: string;
  image: string;
  stack: string[];
  services: string[];
  featured: boolean;
}

export interface ClientCase {
  id: string;
  client: string;
  challenge: string;
  delivered: string;
  metric: string;
  metricStatus: MetricStatus;
  narrative: string;
  image: string;
  url: string;
}

export interface Testimonial {
  id: string;
  title: string;
  client: string;
  duration: string;
  embedUrl: string;
  thumbnail: string;
  context: string;
  externalUrl: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  story: string;
  skill: string;
  projectId?: string;
}

export interface SocialLink {
  network: string;
  handle: string;
  metric: string;
  purpose: string;
  url: string;
  status: "active" | "backup" | "hidden";
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  badge?: string;
  icon: string;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  zIndex: number;
  maximized: boolean;
}
