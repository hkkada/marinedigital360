import { SITE_CONFIG } from '../constants';
import type { ServicePageData } from './types';

export const geoAeoPage: ServicePageData = {
  slug: 'geo-aeo',
  title: 'GEO/AEO',
  iconName: 'Sparkles',
  metadata: {
    title: 'Marine GEO & AEO Services — AI Citations, Featured Snippets & Voice Search',
    description: `${SITE_CONFIG.name} delivers Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) — ensuring your marine business is cited by ChatGPT, Perplexity, Google AI Overviews, featured snippets, and voice search.`,
    keywords: [
      'marine GEO optimization',
      'marine AEO',
      'generative engine optimization marine',
      'marine AI search visibility',
      'marine voice search optimization',
      'marine featured snippets',
      'AI citations marine business',
      'marine answer engine optimization',
      'marine entity building',
    ],
  },
  sections: [
    {
      type: 'service-hero',
      data: {
        tagline: 'GEO / AEO Services',
        headline: 'Get cited by AI and voice search platforms',
        description: `${SITE_CONFIG.name} ensures your marine business appears in AI-generated answers (ChatGPT, Perplexity, Google AI Overviews), featured snippets, People Also Ask boxes, and voice assistant responses — reaching buyers through every next-generation search channel.`,
        ctaText: 'Get Your AI Visibility Audit',
        ctaHref: '#contact',
        imageKey: 'serviceHero.seo-geo',
      },
    },
    {
      type: 'service-overview',
      data: {
        headline: 'What is GEO and AEO?',
        description:
          'GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) are two complementary disciplines that ensure your marine business is cited as a direct answer — not just a search result. AEO targets featured snippets, People Also Ask boxes, and voice assistant responses. GEO targets AI-generated answers in ChatGPT, Perplexity, Google AI Overviews, and Gemini. Together, they capture the fastest-growing segment of search: zero-click and AI-driven discovery.',
        cards: [
          {
            iconName: 'MessageSquare',
            title: 'Answer Engine (AEO)',
            description:
              'Featured snippets, People Also Ask, and voice search targeting with answer-first content formatting and structured schema markup.',
          },
          {
            iconName: 'Sparkles',
            title: 'Generative Engine (GEO)',
            description:
              'AI citation optimization for ChatGPT, Perplexity, and Google AI Overviews through entity building and citation-ready content.',
          },
          {
            iconName: 'Shield',
            title: 'E-E-A-T Signals',
            description:
              'Experience, expertise, authoritativeness, and trustworthiness signals that make AI platforms confident citing your brand.',
          },
          {
            iconName: 'Database',
            title: 'Structured Data',
            description:
              'FAQPage, HowTo, Speakable, and Organization schema markup optimized for AI extraction and voice readback.',
          },
        ],
      },
    },
    {
      type: 'discipline-breakdown',
      data: {
        headline: 'Two disciplines, one strategy',
        description:
          'AEO and GEO target different search surfaces but share foundational content requirements. We build a unified strategy that compounds results across both.',
        disciplines: [
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
        ],
      },
    },
    {
      type: 'metrics-results',
      data: {
        headline: 'Results you can measure',
        description:
          'Our GEO/AEO strategies target the fastest-growing search surfaces — AI answers and zero-click results.',
        metrics: [
          {
            value: '357%',
            label: 'AI Referral Growth',
            description: 'Year-over-year surge in AI platform referrals (industry avg)',
          },
          {
            value: '60%',
            label: 'Zero-Click Searches',
            description: 'Google searches that never result in a click — captured by AEO',
          },
          {
            value: '5+',
            label: 'AI Platforms Covered',
            description: 'ChatGPT, Perplexity, Google AI Overviews, Gemini, Bing Copilot',
          },
          {
            value: '100+',
            label: 'Featured Snippet Targets',
            description: 'Question-based queries targeted for snippet acquisition',
          },
        ],
      },
    },
    {
      type: 'process-timeline',
      data: {
        headline: 'How we deliver GEO/AEO results',
        description:
          'Our GEO/AEO methodology builds AI and voice search visibility over 3–6 months.',
        steps: [
          {
            iconName: 'Search',
            title: 'AI Visibility Audit',
            duration: 'Weeks 1–2',
            description:
              'Assess current AI citation presence, featured snippet ownership, voice search coverage, entity recognition, and competitor AI visibility.',
            deliverables: ['AI visibility audit report', 'Citation gap analysis'],
          },
          {
            iconName: 'Map',
            title: 'Strategy & Content Framework',
            duration: 'Weeks 2–3',
            description:
              'Design answer-first content framework, identify target questions and snippets, plan schema markup, and define entity building roadmap.',
            deliverables: ['GEO/AEO strategy document', 'Target question map'],
          },
          {
            iconName: 'FileText',
            title: 'Content & Schema Implementation',
            duration: 'Weeks 3–6',
            description:
              'Create citation-ready content, implement FAQPage/HowTo/Speakable schema, optimize existing pages for answer formats, and build entity signals.',
            deliverables: ['Optimized content library', 'Schema markup deployment'],
          },
          {
            iconName: 'Globe',
            title: 'Entity Building & Distribution',
            duration: 'Weeks 4–8',
            description:
              'Strengthen brand entity across web properties — LinkedIn, directories, marine publications, press. Verify AI crawler access and build E-E-A-T signals.',
            deliverables: ['Entity presence audit', 'Multi-platform brand consistency'],
          },
          {
            iconName: 'TrendingUp',
            title: 'Monitoring & Optimization',
            duration: 'Ongoing',
            description:
              'Track AI citations, featured snippet performance, voice search captures, and entity recognition. Refine content and expand coverage based on data.',
            deliverables: ['Monthly AI visibility reports', 'Citation tracking dashboard'],
          },
        ],
      },
    },
    {
      type: 'tech-stack',
      data: {
        headline: 'Tools we use',
        description:
          'Specialized tools for tracking AI visibility, featured snippets, and entity presence.',
        categories: [
          {
            name: 'AI & Entity Monitoring',
            tools: [
              { name: 'Ahrefs', iconName: 'Search', description: 'Featured snippet tracking, content gap analysis, SERP feature monitoring' },
              { name: 'Semrush', iconName: 'BarChart3', description: 'Position tracking, SERP feature reports, content optimization' },
            ],
          },
          {
            name: 'Schema & Structured Data',
            tools: [
              { name: 'Schema.org Validator', iconName: 'CheckCircle', description: 'JSON-LD schema validation and testing' },
              { name: 'Google Rich Results Test', iconName: 'Code', description: 'Rich result eligibility testing for FAQ, HowTo, Speakable' },
            ],
          },
          {
            name: 'Analytics & Tracking',
            tools: [
              { name: 'Google Search Console', iconName: 'Activity', description: 'Search performance, featured snippet tracking, impression data' },
              { name: 'Google Analytics 4', iconName: 'TrendingUp', description: 'AI referral traffic tracking, conversion attribution' },
            ],
          },
        ],
      },
    },
    {
      type: 'service-faq',
      data: {
        headline: 'GEO/AEO FAQ',
        description: 'Common questions about AI and answer engine optimization.',
        items: [
          {
            question: 'What is the difference between GEO and AEO?',
            answer:
              'AEO (Answer Engine Optimization) targets featured snippets, People Also Ask boxes, and voice assistant answers on Google. GEO (Generative Engine Optimization) targets AI-generated responses in ChatGPT, Perplexity, Google AI Overviews, and Gemini. Both focus on getting your brand cited as the direct answer rather than just ranking as a link.',
          },
          {
            question: 'What is Generative Engine Optimization (GEO)?',
            answer:
              'GEO ensures your marine business is cited by AI platforms when users ask questions about your industry, products, or services. It involves building strong entity signals, E-E-A-T credibility, and structured content that AI can reliably extract and attribute to your brand.',
          },
          {
            question: 'Do I need SEO before starting GEO/AEO?',
            answer:
              'GEO/AEO works best when layered on top of a solid SEO foundation, but it\'s not a strict requirement. If you already have decent organic visibility, GEO/AEO can extend your reach to AI and voice platforms. If you\'re starting from scratch, we recommend our SEO service as a foundation and adding GEO/AEO once your site is technically sound.',
          },
          {
            question: 'How do you measure AI visibility?',
            answer:
              'We track AI citation rates (how often your brand appears in AI-generated answers), referral traffic from AI platforms, entity recognition coverage, featured snippet ownership, and brand mention frequency. Tools like Ahrefs and custom monitoring scripts help us measure GEO/AEO performance.',
          },
          {
            question: 'How long does it take to see GEO/AEO results?',
            answer:
              'Featured snippet improvements (AEO) can appear within 4–8 weeks as content is optimized. AI citation improvements (GEO) typically take 3–6 months as entity signals build and AI platforms re-crawl your content. Results compound over time as your brand becomes a recognized authority.',
          },
          {
            question: 'What schema markup do you implement?',
            answer:
              'We implement FAQPage schema for question-answer content, HowTo schema for process guides, Speakable schema for voice-eligible content, Organization and LocalBusiness schema for entity signals, and sameAs links connecting your brand across platforms.',
          },
        ],
      },
    },
    {
      type: 'service-cta',
      data: {
        headline: 'Ready for AI and voice search visibility?',
        description:
          'Start with a free AI visibility audit. We\'ll show you where your marine business stands in AI search results and map out a strategy to get cited.',
        ctaText: 'Get Your Free AI Visibility Audit',
        ctaHref: '#contact',
      },
    },
  ],
};
