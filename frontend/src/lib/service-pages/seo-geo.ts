import { SITE_CONFIG } from '../constants';
import type { ServicePageData } from './types';

export const seoGeoPage: ServicePageData = {
  slug: 'seo-geo',
  title: 'SEO/GEO/AEO',
  iconName: 'Search',
  metadata: {
    title: 'Marine SEO, GEO & AEO Services — Search, AI & Voice Optimization',
    description:
      `${SITE_CONFIG.name} delivers marine SEO, Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO) — ensuring your business is found on Google, AI platforms, and voice search.`,
    keywords: [
      'marine SEO',
      'marine GEO optimization',
      'marine AEO',
      'boat manufacturer SEO',
      'marine content strategy',
      'marine local SEO',
      'generative engine optimization marine',
      'marine AI search visibility',
      'marine voice search optimization',
    ],
  },
  sections: [
    {
      type: 'service-hero',
      data: {
        tagline: 'SEO / GEO / AEO Services',
        headline: 'Be found everywhere — Google, AI, and voice',
        description:
          `${SITE_CONFIG.name} ensures your marine business is found on Google, AI platforms, and voice search — so you get found no matter how your buyers search.`,
        ctaText: 'Get Your SEO Audit',
        ctaHref: '#contact',
        imageKey: 'serviceHero.seo-geo',
      },
    },
    {
      type: 'service-overview',
      data: {
        headline: 'What is marine SEO, GEO, and AEO?',
        description:
          'Marine SEO, GEO, and AEO are three complementary disciplines that ensure your marine business appears across every search surface. SEO drives traditional Google/Bing rankings. AEO targets featured snippets, voice search, and People Also Ask boxes. GEO ensures AI platforms like ChatGPT, Perplexity, and Google AI Overviews cite your business as a trusted source. Together, they deliver comprehensive search visibility for boat manufacturers, marine technology companies, and marine retailers.',
        cards: [
          {
            iconName: 'Search',
            title: 'Technical SEO',
            description:
              'Site audits, Core Web Vitals optimization, schema markup, crawl efficiency, and indexation management.',
          },
          {
            iconName: 'FileText',
            title: 'Content Strategy',
            description:
              'Keyword research, buyer guides, comparison content, how-to articles, and seasonal marine content calendars.',
          },
          {
            iconName: 'MapPin',
            title: 'Local & Map SEO',
            description:
              'Google Business Profile optimization, local citations, marine directory submissions, and review management.',
          },
          {
            iconName: 'Bot',
            title: 'AI Visibility (GEO)',
            description:
              'Entity building, E-E-A-T signals, citation-ready content, and structured data optimized for AI extraction.',
          },
        ],
      },
    },
    {
      type: 'discipline-breakdown',
      data: {
        headline: 'Three disciplines, one strategy',
        description:
          'Each discipline targets a different search surface. We build a unified strategy that compounds results across all three.',
        disciplines: [
          {
            id: 'seo',
            name: 'SEO',
            fullName: 'Search Engine Optimization',
            iconName: 'Search',
            description:
              'Traditional search rankings on Google and Bing. Drives click-through traffic to your website through organic positions. The foundation of all search visibility — without strong SEO, GEO and AEO have less to work with.',
            tactics: [
              'Technical audit & Core Web Vitals optimization',
              'Keyword research (200–500 marine-specific keywords)',
              'On-page optimization (title tags, headers, internal linking)',
              'Content creation (buyer guides, comparisons, how-tos)',
              'Link building (10–20 quality links per month)',
              'Local SEO & Google Business Profile optimization',
              'Schema markup (Organization, Service, Product, Review)',
            ],
            metrics: [
              '50–100% organic traffic increase in 6–12 months',
              'Top 3 rankings for priority keywords',
              'Improved domain authority score',
              'Higher click-through rates from SERPs',
            ],
          },
          {
            id: 'aeo',
            name: 'AEO',
            fullName: 'Answer Engine Optimization',
            iconName: 'MessageSquare',
            description:
              'Featured snippets, People Also Ask boxes, and voice assistant responses. Captures mindshare in zero-click searches — about 60% of Google searches never result in a click. AEO ensures your brand is the direct answer.',
            tactics: [
              'Answer-first content formatting (40–60 word direct answers)',
              'Question-based H2/H3 headings targeting PAA queries',
              'FAQ sections with FAQPage JSON-LD schema',
              'HowTo schema for process and step-based content',
              'Speakable schema markup for voice readback',
              'Long-tail question phrase targeting',
              'Structured snippet-winning formats (lists, tables, steps)',
            ],
            metrics: [
              'Featured snippet acquisitions for target queries',
              'People Also Ask box appearances',
              'Voice search result captures',
              'Zero-click brand impression growth',
            ],
          },
          {
            id: 'geo',
            name: 'GEO',
            fullName: 'Generative Engine Optimization',
            iconName: 'Sparkles',
            description:
              'AI-generated citations in ChatGPT, Perplexity, Google AI Overviews, and Gemini. AI referrals surged 357% year-over-year. GEO ensures AI platforms cite your marine business as a trusted authority when answering questions about your products, services, and industry.',
            tactics: [
              'Entity building (consistent brand identity across web properties)',
              'E-E-A-T signal strengthening (author bios, credentials, dates)',
              'Citation-ready sentences (standalone, quotable facts)',
              'Structured content for AI extraction (tables, lists, labeled sections)',
              'Original data and insights (non-duplicative information gain)',
              'Multi-platform brand presence (LinkedIn, directories, Google Business)',
              'AI crawler access verification (GPTBot, ClaudeBot, PerplexityBot)',
            ],
            metrics: [
              'AI citation rate in generative results',
              'Brand mention frequency in AI platforms',
              'Referral traffic from AI-powered search',
              'Entity recognition coverage across platforms',
            ],
          },
        ],
      },
    },
    {
      type: 'metrics-results',
      data: {
        headline: 'Results you can measure',
        description:
          'Our SEO/GEO/AEO strategies deliver compounding returns across all three search surfaces.',
        metrics: [
          {
            value: '50–100%',
            label: 'Organic Traffic Growth',
            description: 'Typical increase within 6–12 months of engagement',
          },
          {
            value: 'Top 3',
            label: 'Keyword Rankings',
            description: 'For priority marine industry keywords',
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
            value: '357%',
            label: 'AI Referral Growth',
            description: 'Year-over-year surge in AI platform referrals (industry avg)',
          },
          {
            value: '10–20',
            label: 'Quality Links / Month',
            description: 'Authority-building backlinks from marine and business publications',
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
            name: 'Local & GEO',
            tools: [
              { name: 'Google Business Profile', iconName: 'MapPin', description: 'Local listing management, review responses, posts' },
              { name: 'BrightLocal', iconName: 'Map', description: 'Local rank tracking, citation building, review monitoring' },
            ],
          },
        ],
      },
    },
    {
      type: 'process-timeline',
      data: {
        headline: 'How we deliver',
        description:
          'Our SEO/GEO/AEO methodology builds a compounding visibility engine over 6–12 months.',
        steps: [
          {
            iconName: 'Search',
            title: 'Audit & Discovery',
            duration: 'Weeks 1–2',
            description:
              'Comprehensive technical SEO audit, keyword research (200–500 keywords), competitor analysis, and current AI visibility assessment.',
            deliverables: ['Technical audit report', 'Keyword opportunity map'],
          },
          {
            iconName: 'Map',
            title: 'Strategy & Architecture',
            duration: 'Weeks 2–3',
            description:
              'Site architecture optimization, content calendar planning, schema markup strategy, and GEO/AEO content framework design.',
            deliverables: ['SEO/GEO/AEO strategy document', 'Content roadmap'],
          },
          {
            iconName: 'Settings',
            title: 'Technical Fixes & On-Page',
            duration: 'Weeks 3–6',
            description:
              'Implement technical fixes (Core Web Vitals, crawl issues, indexation), on-page optimization, and schema markup deployment.',
            deliverables: ['Optimized site architecture', 'Schema implementation'],
          },
          {
            iconName: 'FileText',
            title: 'Content & Link Building',
            duration: 'Weeks 6–12',
            description:
              'Publish optimized content (buyer guides, comparisons, FAQs), build quality backlinks, and optimize Google Business Profile.',
            deliverables: ['12–24 content pieces', 'Link building campaign'],
          },
          {
            iconName: 'TrendingUp',
            title: 'Optimization & Scaling',
            duration: 'Ongoing',
            description:
              'Monitor rankings, refine content for featured snippets, expand GEO signals, and scale what works based on performance data.',
            deliverables: ['Monthly performance reports', 'Optimization playbook'],
          },
        ],
      },
    },
    {
      type: 'service-faq',
      data: {
        headline: 'SEO/GEO/AEO FAQ',
        description: 'Common questions about marine search optimization.',
        items: [
          {
            question: 'What is the difference between SEO, AEO, and GEO?',
            answer:
              'SEO targets traditional search engine rankings (Google, Bing). AEO targets featured snippets, People Also Ask, and voice assistant answers. GEO targets AI-generated responses in ChatGPT, Perplexity, and Google AI Overviews. Together, they cover every way your customers search for marine products and services.',
          },
          {
            question: 'How long does it take to see SEO results?',
            answer:
              'Most marine businesses see measurable improvements within 3–4 months (technical fixes and quick wins), with significant traffic growth at 6–12 months. SEO is a compounding investment — results accelerate over time as domain authority builds.',
          },
          {
            question: 'What is Generative Engine Optimization (GEO)?',
            answer:
              'GEO ensures your marine business is cited by AI platforms when users ask questions about your industry, products, or services. It involves building strong entity signals, E-E-A-T credibility, and structured content that AI can reliably extract and attribute to your brand.',
          },
          {
            question: 'Do I need all three (SEO + AEO + GEO)?',
            answer:
              'SEO is the foundation — you need it regardless. AEO and GEO build on that foundation. We recommend starting with SEO + AEO (they share 80% of the work), then layering GEO as your content authority grows. All three disciplines reinforce each other.',
          },
          {
            question: 'How do you measure AI visibility?',
            answer:
              'We track AI citation rates (how often your brand appears in AI-generated answers), referral traffic from AI platforms, entity recognition coverage, and brand mention frequency. Tools like Ahrefs and custom monitoring scripts help us measure GEO performance alongside traditional SEO metrics.',
          },
          {
            question: 'What marine-specific keywords do you target?',
            answer:
              'We research 200–500 keywords per engagement, including product-specific terms (e.g., "center console boats for sale"), service queries ("marine electronics installation near me"), comparison searches ("Yamaha vs Mercury outboard"), and informational queries ("how to winterize a boat"). The strategy is tailored to your specific marine niche.',
          },
        ],
      },
    },
    {
      type: 'service-cta',
      data: {
        headline: 'Ready to dominate search — and AI?',
        description:
          'Get found on Google, featured snippets, voice assistants, and AI platforms. Start with a free SEO audit.',
        ctaText: 'Get Your Free Audit',
        ctaHref: '#contact',
      },
    },
  ],
};
