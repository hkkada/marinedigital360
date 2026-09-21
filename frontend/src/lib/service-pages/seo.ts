import { SITE_CONFIG } from '../constants';
import type { ServicePageData } from './types';

export const seoPage: ServicePageData = {
  slug: 'seo',
  title: 'SEO',
  iconName: 'Search',
  metadata: {
    title: 'Marine SEO Services — Search Engine Optimization for Marine Businesses',
    description: `${SITE_CONFIG.name} delivers SEO services — technical audits, keyword strategy, content optimization, local search, and link building to drive organic traffic growth for boat manufacturers and businesses.`,
    keywords: [
      'SEO',
      'boat manufacturer SEO',
      'content strategy',
      'local SEO',
      'keyword research',
      'link building',
      'boat dealer SEO',
      'search engine optimization',
      'technical SEO',
    ],
  },
  sections: [
    {
      type: 'service-hero',
      data: {
        tagline: 'SEO Services',
        headline: 'Dominate Google rankings for your business',
        description: `${SITE_CONFIG.name} drives organic traffic and top search rankings for businesses through technical SEO, keyword strategy, content optimization, local search, and authority-building link campaigns.`,
        ctaText: 'Get Your SEO Audit',
        ctaHref: '#contact',
        imageKey: 'serviceHero.seo-geo',
      },
    },
    {
      type: 'service-overview',
      data: {
        headline: 'What is SEO?',
        description:
          'Marine SEO is the practice of optimizing your website and online presence to rank higher in Google and Bing search results for marine-industry keywords. It combines technical optimization, content strategy, local search, and link building to drive qualified organic traffic to your business — whether you sell boats, electronics, charter services, or accessories.',
        cards: [
          {
            iconName: 'Search',
            title: 'Technical SEO',
            description:
              'Site audits, Core Web Vitals optimization, schema markup, crawl efficiency, indexation management, and mobile-first performance.',
          },
          {
            iconName: 'FileText',
            title: 'Content Strategy',
            description:
              'Keyword research, buyer guides, comparison content, how-to articles, and seasonal content calendars tailored to your niche.',
          },
          {
            iconName: 'MapPin',
            title: 'Local & Map SEO',
            description:
              'Google Business Profile optimization, local citations, directory submissions, review management, and location page strategy.',
          },
          {
            iconName: 'Link',
            title: 'Link Building',
            description:
              'Authority-building backlinks from publications, boating directories, industry partners, and relevant business sites.',
          },
        ],
      },
    },
    {
      type: 'metrics-results',
      data: {
        headline: 'Results you can measure',
        description:
          'Our SEO strategies deliver compounding organic growth over 6–12 months.',
        metrics: [
          {
            value: '50–100%',
            label: 'Organic Traffic Growth',
            description: 'Typical increase within 6–12 months of engagement',
          },
          {
            value: 'Top 3',
            label: 'Keyword Rankings',
            description: 'For priority industry keywords',
          },
          {
            value: '200–500',
            label: 'Keywords Targeted',
            description: 'Marine-specific keyword research per engagement',
          },
          {
            value: '12–24',
            label: 'Content Pieces',
            description: 'SEO-optimized articles, guides, and pages delivered',
          },
          {
            value: '10–20',
            label: 'Quality Links / Month',
            description: 'Authority-building backlinks from and business publications',
          },
          {
            value: '90+',
            label: 'Core Web Vitals Score',
            description: 'Performance target for mobile and desktop after optimization',
          },
        ],
      },
    },
    {
      type: 'process-timeline',
      data: {
        headline: 'How we deliver SEO results',
        description:
          'Our SEO methodology builds a compounding organic growth engine over 6–12 months.',
        steps: [
          {
            iconName: 'Search',
            title: 'Audit & Discovery',
            duration: 'Weeks 1–2',
            description:
              'Comprehensive technical SEO audit, keyword research (200–500 keywords), competitor analysis, and current rankings assessment.',
            deliverables: ['Technical audit report', 'Keyword opportunity map'],
          },
          {
            iconName: 'Map',
            title: 'Strategy & Architecture',
            duration: 'Weeks 2–3',
            description:
              'Site architecture optimization, content calendar planning, schema markup strategy, and on-page optimization roadmap.',
            deliverables: ['SEO strategy document', 'Content roadmap'],
          },
          {
            iconName: 'Settings',
            title: 'Technical Fixes & On-Page',
            duration: 'Weeks 3–6',
            description:
              'Implement technical fixes (Core Web Vitals, crawl issues, indexation), on-page optimization, internal linking, and schema markup deployment.',
            deliverables: ['Optimized site architecture', 'Schema implementation'],
          },
          {
            iconName: 'FileText',
            title: 'Content & Link Building',
            duration: 'Weeks 6–12',
            description:
              'Publish optimized content (buyer guides, comparisons, how-tos), build quality backlinks, and optimize Google Business Profile.',
            deliverables: ['12–24 content pieces', 'Link building campaign'],
          },
          {
            iconName: 'TrendingUp',
            title: 'Optimization & Scaling',
            duration: 'Ongoing',
            description:
              'Monitor rankings, refine content based on performance data, expand keyword targets, and scale what works.',
            deliverables: ['Monthly performance reports', 'Optimization playbook'],
          },
        ],
      },
    },
    {
      type: 'tech-stack',
      data: {
        headline: 'Tools we use',
        description:
          'Industry-leading SEO and analytics tools power our optimization strategy.',
        categories: [
          {
            name: 'SEO & Research',
            tools: [
              { name: 'Ahrefs', iconName: 'Search', description: 'Backlink analysis, keyword research, competitor tracking' },
              { name: 'Semrush', iconName: 'BarChart3', description: 'Technical audits, position tracking, content gap analysis' },
              { name: 'Screaming Frog', iconName: 'Bug', description: 'Technical crawl audits, redirect mapping, schema validation' },
              { name: 'Surfer SEO', iconName: 'FileText', description: 'Content optimization, NLP analysis, SERP modeling' },
            ],
          },
          {
            name: 'Analytics & Tracking',
            tools: [
              { name: 'Google Search Console', iconName: 'Activity', description: 'Index coverage, search performance, Core Web Vitals' },
              { name: 'Google Analytics 4', iconName: 'TrendingUp', description: 'Traffic analysis, conversion tracking, audience insights' },
              { name: 'Google Tag Manager', iconName: 'Code', description: 'Event tracking, tag deployment, conversion pixels' },
            ],
          },
          {
            name: 'Local SEO',
            tools: [
              { name: 'Google Business Profile', iconName: 'MapPin', description: 'Local listing management, review responses, posts' },
              { name: 'BrightLocal', iconName: 'Map', description: 'Local rank tracking, citation building, review monitoring' },
            ],
          },
        ],
      },
    },
    {
      type: 'service-faq',
      data: {
        headline: 'SEO FAQ',
        description: 'Common questions about search engine optimization.',
        items: [
          {
            question: 'How long does it take to see SEO results?',
            answer:
              'Most businesses see measurable improvements within 3–4 months (technical fixes and quick wins), with significant traffic growth at 6–12 months. SEO is a compounding investment — results accelerate over time as domain authority builds.',
          },
          {
            question: 'What marine-specific keywords do you target?',
            answer:
              'We research 200–500 keywords per engagement, including product-specific terms (e.g., "center console boats for sale"), service queries ("electronics installation near me"), comparison searches ("Yamaha vs Mercury outboard"), and informational queries ("how to winterize a boat"). The strategy is tailored to your specific niche.',
          },
          {
            question: 'Do you handle local SEO for businesses?',
            answer:
              'Yes. Local SEO is critical for dealers, charter operators, and service providers. We optimize your Google Business Profile, build local citations in directories, manage reviews, and create location-specific pages to drive local traffic and map pack visibility.',
          },
          {
            question: 'What does a technical SEO audit include?',
            answer:
              'Our audit covers Core Web Vitals, mobile responsiveness, crawl efficiency, indexation issues, site architecture, internal linking, schema markup, page speed, redirect chains, duplicate content, and security (HTTPS). We deliver a prioritized action plan with expected impact.',
          },
          {
            question: 'How do you measure SEO success?',
            answer:
              'We track organic traffic growth, keyword ranking positions, domain authority, click-through rates from SERPs, local pack appearances, and conversion metrics. Monthly reports break down progress by keyword cluster, page, and traffic source.',
          },
          {
            question: 'Can you also help with AI and voice search visibility?',
            answer:
              'Yes — we offer a dedicated GEO/AEO (Generative Engine Optimization / Answer Engine Optimization) service that covers AI citations, featured snippets, and voice search. It pairs perfectly with SEO and shares much of the foundational work.',
          },
        ],
      },
    },
    {
      type: 'service-cta',
      data: {
        headline: 'Ready to grow your organic traffic?',
        description:
          'Start with a free SEO audit. We\'ll identify your biggest opportunities and build a roadmap to top rankings for your business.',
        ctaText: 'Get Your Free SEO Audit',
        ctaHref: '#contact',
      },
    },
  ],
};
