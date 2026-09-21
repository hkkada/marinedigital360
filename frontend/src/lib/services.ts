/**
 * Service group taxonomy — every service belongs to exactly one group.
 * Group membership and copy live in `lib/service-groups.ts`.
 */
export type ServiceGroupId = 'sales' | 'administration' | 'marketing' | 'advertising';

export interface ServiceData {
  slug: string;
  title: string;
  iconName: string;
  description: string;
  tagline: string;
  schemaDescription: string;
  serviceType: string;
  group: ServiceGroupId;
  isVisible?: boolean;
  /**
   * Where the service links to. Defaults to `/services/<slug>` via
   * `getServiceHref()`. Set it when a service is a section of another
   * service's page rather than a page of its own.
   */
  href?: string;
}

const allServices: ServiceData[] = [
  {
    slug: 'productization',
    title: 'Productization',
    iconName: 'Package',
    tagline: 'Transform capabilities into market-ready products',
    description:
      'Transform your capabilities into fully packaged, market-ready products with naming, pricing, and competitive positioning.',
    schemaDescription:
      'Marine productization services that transform business capabilities into fully packaged, market-ready products with defined naming, pricing, positioning, and differentiation for boat manufacturers and marine technology companies.',
    serviceType: 'Marine Product Development',
    group: 'sales',
    isVisible: false,
  },
  {
    slug: 'go-to-market',
    title: 'Go-To-Market Strategy',
    iconName: 'Rocket',
    tagline: 'Launch with precision and purpose',
    description:
      'Comprehensive GTM frameworks with buyer personas, market segmentation, channel strategy, and 90-day launch plans.',
    schemaDescription:
      'Go-to-market strategy services for marine businesses including buyer persona development, market segmentation, channel strategy, and 90-day launch plans for boat manufacturers and marine technology companies.',
    serviceType: 'Go-To-Market Strategy',
    group: 'sales',
    isVisible: false,
  },
  {
    slug: 'sales-enablement',
    title: 'Sales Enablement',
    iconName: 'Presentation',
    tagline: 'Equip your team to close more deals',
    description:
      'Landing pages, pitch decks, demo scripts, sales playbooks, and battle cards that shorten sales cycles and increase win rates.',
    schemaDescription:
      'Marine sales enablement services including landing pages, pitch decks, demo scripts, sales playbooks, and competitive battle cards designed to shorten sales cycles and increase win rates for marine businesses.',
    serviceType: 'Sales Enablement',
    group: 'sales',
    isVisible: false,
  },
  {
    slug: 'revenue-enablement',
    title: 'Revenue Enablement',
    iconName: 'Workflow',
    tagline: 'Build scalable revenue systems',
    description:
      'CRM configuration, AI-powered outreach sequences, lead scoring, pipeline management, and revenue forecasting dashboards.',
    schemaDescription:
      'Revenue enablement and CRM services for marine businesses including CRM configuration, AI-powered outreach sequences, lead scoring, pipeline management, and revenue forecasting dashboards.',
    serviceType: 'Revenue Enablement & CRM',
    group: 'administration',
    isVisible: false,
  },
  {
    slug: 'seo',
    title: 'SEO',
    iconName: 'Search',
    tagline: 'Dominate search rankings on Google and Bing',
    description:
      'Technical SEO, keyword strategy, content optimization, local search, and link building to drive organic traffic and top rankings for marine businesses.',
    schemaDescription:
      'Marine SEO services including technical audits, keyword research, content strategy, local search optimization, and link building to drive organic traffic growth for boat manufacturers and marine technology companies.',
    serviceType: 'Search Engine Optimization',
    group: 'marketing',
    isVisible: true,
  },
  {
    slug: 'geo-aeo',
    title: 'GEO/AEO',
    iconName: 'Sparkles',
    tagline: 'Get cited by AI and voice search platforms',
    description:
      'AI citation optimization, featured snippets, voice search, and entity building to ensure your marine business is found on ChatGPT, Perplexity, and Google AI Overviews.',
    schemaDescription:
      'Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) services for marine businesses — AI citations, featured snippets, voice search optimization, and entity building across ChatGPT, Perplexity, and Google AI Overviews.',
    serviceType: 'AI & Answer Engine Optimization',
    group: 'marketing',
    isVisible: true,
  },
  {
    slug: 'ppc',
    title: 'Paid Ads',
    iconName: 'MousePointerClick',
    tagline: 'Every dollar tracked. Every click optimized.',
    description:
      'Strategic paid advertising across Google, Bing, and social platforms with bid optimization and ROAS tracking.',
    schemaDescription:
      'PPC advertising management for marine businesses including strategic paid campaigns across Google, Bing, and social platforms with bid optimization, audience targeting, and ROAS tracking.',
    serviceType: 'PPC Advertising',
    group: 'advertising',
    isVisible: true,
  },
  {
    // Lives as a section of the Paid Ads page (`#ppc-management`), so it has
    // an explicit `href` and no entry in `lib/service-pages`.
    slug: 'ppc-management',
    title: 'PPC',
    iconName: 'Target',
    tagline: 'Campaigns managed daily, not set and forgotten',
    description:
      'Ongoing PPC strategy, campaign management, bid and budget optimization, and conversion tracking across Google, Bing, and social.',
    schemaDescription:
      'Ongoing PPC management for marine businesses including PPC strategy and planning, day-to-day campaign management across Google Ads, Bing Ads, and social platforms, shopping and remarketing campaigns, landing page optimization, bid and budget optimization, and conversion tracking.',
    serviceType: 'PPC Management',
    group: 'advertising',
    isVisible: true,
    href: '/services/ppc#ppc-management',
  },
  {
    slug: 'web-design',
    title: 'Web Design & Development',
    iconName: 'Monitor',
    tagline: 'Fast, mobile-first sites built to convert boat buyers',
    description:
      'Custom marine websites with mobile-first responsive design, conversion-focused UX, and high-performance optimization.',
    schemaDescription:
      'Custom marine web design and development services with mobile-first responsive design, conversion-focused UX, and high-performance optimization for boat manufacturers, dealers, and marine technology companies.',
    serviceType: 'Web Design & Development',
    group: 'marketing',
    isVisible: true,
  },
   {
    slug: 'affiliate',
    title: 'Affiliate Marketing',
    iconName: 'Share2',
    tagline: 'Performance-based growth through partnerships',
    description:
      'Affiliate marketing offers social promotions, accelerated sales, and performance-based revenue growth to our clients products.',
    schemaDescription:
      'Marine affiliate marketing services including affiliate program setup, partner recruitment, commission structure design, and performance-based revenue growth strategies for the boating industry.',
    serviceType: 'Affiliate Marketing',
    group: 'marketing',
    isVisible: true,
  },
  {
    slug: 'marketing-strategy',
    title: 'Marketing Strategy',
    iconName: 'BarChart3',
    tagline: 'Data-driven growth roadmaps',
    description:
      'Market analysis, competitive intelligence, brand positioning, multi-channel planning, and growth roadmaps.',
    schemaDescription:
      'Marine marketing strategy services including market analysis, competitive intelligence, brand positioning, multi-channel planning, and growth roadmaps for boat manufacturers and marine businesses.',
    serviceType: 'Marketing Strategy',
    group: 'marketing',
    isVisible: false,
  }
];

export function getServices(): ServiceData[] {
  return allServices;
}

export function getVisibleServices(): ServiceData[] {
  return allServices.filter((s) => s.isVisible);
}

/** Canonical link target for a service card anywhere in the UI. */
export function getServiceHref(service: ServiceData): string {
  return service.href ?? `/services/${service.slug}`;
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return allServices.find((s) => s.slug === slug);
}
