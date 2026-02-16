// ─── Per-Section Data Types ──────────────────────────────────────────

export interface ServiceHeroData {
  tagline: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageKey: string; // Reference to centralized image in image-map.ts
}

export interface ServiceOverviewData {
  headline: string;
  description: string;
  cards: Array<{
    iconName: string;
    title: string;
    description: string;
  }>;
}

export interface ProcessTimelineData {
  headline: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
    iconName: string;
    duration: string;
    deliverables: string[];
  }>;
}

export interface ServiceFAQData {
  headline: string;
  description: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ServiceCTAData {
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface TransformationShowcaseData {
  headline: string;
  description: string;
  before: {
    label: string;
    items: string[];
  };
  after: {
    label: string;
    items: string[];
  };
}

export interface DeliverablesGridData {
  headline: string;
  description: string;
  items: Array<{
    iconName: string;
    title: string;
    description: string;
  }>;
}

export interface ClientSegmentsData {
  headline: string;
  description: string;
  segments: Array<{
    iconName: string;
    title: string;
    description: string;
    benefits: string[];
  }>;
}

export interface DisciplineBreakdownData {
  headline: string;
  description: string;
  disciplines: Array<{
    id: string;
    name: string;
    fullName: string;
    iconName: string;
    description: string;
    tactics: string[];
    metrics: string[];
  }>;
}

export interface MetricsResultsData {
  headline: string;
  description: string;
  metrics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}

export interface TechStackData {
  headline: string;
  description: string;
  categories: Array<{
    name: string;
    tools: Array<{
      name: string;
      iconName: string;
      description: string;
    }>;
  }>;
}

export interface PortfolioShowcaseData {
  headline: string;
  description: string;
  projects: Array<{
    title: string;
    category: string;
    description: string;
    imageKey: string; // Reference to centralized image in image-map.ts
    metrics?: string;
  }>;
}

export interface PricingTiersData {
  headline: string;
  description: string;
  tiers: Array<{
    name: string;
    description: string;
    price?: string;
    priceLabel?: string;
    features: string[];
    highlighted?: boolean;
    ctaText: string;
  }>;
}

export interface PlatformCoverageData {
  headline: string;
  description: string;
  platforms: Array<{
    name: string;
    iconName: string;
    description: string;
    features: string[];
  }>;
}

export interface PartnerNetworkData {
  headline: string;
  description: string;
  partnerTypes: Array<{
    iconName: string;
    title: string;
    description: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

// ─── Section Discriminated Union ─────────────────────────────────────

export type ServiceSection =
  | { type: 'service-hero'; data: ServiceHeroData }
  | { type: 'service-overview'; data: ServiceOverviewData }
  | { type: 'process-timeline'; data: ProcessTimelineData }
  | { type: 'service-faq'; data: ServiceFAQData }
  | { type: 'service-cta'; data: ServiceCTAData }
  | { type: 'transformation-showcase'; data: TransformationShowcaseData }
  | { type: 'deliverables-grid'; data: DeliverablesGridData }
  | { type: 'client-segments'; data: ClientSegmentsData }
  | { type: 'discipline-breakdown'; data: DisciplineBreakdownData }
  | { type: 'metrics-results'; data: MetricsResultsData }
  | { type: 'tech-stack'; data: TechStackData }
  | { type: 'portfolio-showcase'; data: PortfolioShowcaseData }
  | { type: 'pricing-tiers'; data: PricingTiersData }
  | { type: 'platform-coverage'; data: PlatformCoverageData }
  | { type: 'partner-network'; data: PartnerNetworkData };

// ─── Service Page Data ───────────────────────────────────────────────

export interface ServicePageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  iconName: string;
  metadata: ServicePageMetadata;
  sections: ServiceSection[];
}
