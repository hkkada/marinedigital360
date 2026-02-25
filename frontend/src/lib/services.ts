export interface ServiceData {
  slug: string;
  title: string;
  iconName: string;
  description: string;
  tagline: string;
  schemaDescription: string;
  serviceType: string;
  isVisible?: boolean;
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
    isVisible: true,
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
    isVisible: false,
  },
  {
    slug: 'seo-geo',
    title: 'SEO/GEO/AEO',
    iconName: 'Search',
    tagline: 'Be found everywhere — Google, AI, and voice',
    description:
      'Technical SEO, content strategy, local search optimization, and generative engine optimization for AI search visibility.',
    schemaDescription:
      'Marine SEO and GEO optimization services including technical SEO, content strategy, local search optimization, and generative engine optimization ensuring marine businesses appear in AI-generated search results.',
    serviceType: 'SEO & Digital Marketing',
    isVisible: true,
  },
  {
    slug: 'web-design',
    title: 'Web Design',
    iconName: 'Monitor',
    tagline: 'Websites that move vessels',
    description:
      'Custom marine websites with mobile-first responsive design, conversion-focused UX, and high-performance optimization.',
    schemaDescription:
      'Custom marine web design and development services with mobile-first responsive design, conversion-focused UX, and high-performance optimization for boat manufacturers, dealers, and marine technology companies.',
    serviceType: 'Web Design & Development',
    isVisible: true,
  },
  {
    slug: 'ppc',
    title: 'PPC Management',
    iconName: 'MousePointerClick',
    tagline: 'Every dollar tracked. Every click optimized.',
    description:
      'Strategic paid advertising across Google, Bing, and social platforms with bid optimization and ROAS tracking.',
    schemaDescription:
      'PPC advertising management for marine businesses including strategic paid campaigns across Google, Bing, and social platforms with bid optimization, audience targeting, and ROAS tracking.',
    serviceType: 'PPC Advertising',
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
    isVisible: false,
  },
  {
    slug: 'affiliate',
    title: 'Affiliate Marketing',
    iconName: 'Share2',
    tagline: 'Performance-based growth through partnerships',
    description:
      'Affiliate program setup, partner recruitment, commission structure design, and performance-based revenue growth.',
    schemaDescription:
      'Marine affiliate marketing services including affiliate program setup, partner recruitment, commission structure design, and performance-based revenue growth strategies for the boating industry.',
    serviceType: 'Affiliate Marketing',
    isVisible: true,
  },
];

export function getServices(): ServiceData[] {
  return allServices;
}

export function getVisibleServices(): ServiceData[] {
  return allServices.filter((s) => s.isVisible);
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return allServices.find((s) => s.slug === slug);
}
