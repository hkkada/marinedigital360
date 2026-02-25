import { SITE_CONFIG } from '../constants';
import type { ServicePageData } from './types';

export const productizationPage: ServicePageData = {
  slug: 'productization',
  title: 'Productization',
  iconName: 'Package',
  metadata: {
    title: 'Marine Productization Services — Transform Capabilities into Products',
    description:
      `${SITE_CONFIG.name} productization services transform marine business capabilities into fully packaged, market-ready products with naming, pricing, positioning, and sales enablement.`,
    keywords: [
      'marine productization',
      'marine product development',
      'boat manufacturer productization',
      'marine service packaging',
      'marine product naming',
      'marine pricing strategy',
      'marine competitive positioning',
    ],
  },
  sections: [
    {
      type: 'service-hero',
      data: {
        tagline: 'Productization Services',
        headline: 'Transform capabilities into market-ready products',
        description:
          'Stop selling hours. Start selling outcomes. We package your marine expertise into named, priced, and positioned products that sell themselves — shortening sales cycles and increasing deal size.',
        ctaText: 'Start Your Productization',
        ctaHref: '#contact',
        imageKey: 'serviceHero.productization',
      },
    },
    {
      type: 'service-overview',
      data: {
        headline: 'What is marine productization?',
        description:
          'Marine productization is the process of transforming your business capabilities — custom services, expertise, and know-how — into clearly defined, repeatable products with distinct names, pricing tiers, and market positioning. Instead of custom-quoting every engagement, you offer packaged solutions that buyers can evaluate, compare, and purchase with confidence.',
        cards: [
          {
            iconName: 'Tag',
            title: 'Product Naming & Identity',
            description:
              'Memorable, market-tested product names with brand messaging that resonates with marine buyers.',
          },
          {
            iconName: 'DollarSign',
            title: 'Pricing & Tier Design',
            description:
              'Strategic pricing structures with Starter, Growth, and Enterprise tiers that maximize revenue per client.',
          },
          {
            iconName: 'Target',
            title: 'Competitive Positioning',
            description:
              'Differentiation frameworks and battle cards that make your products the obvious choice vs. competitors.',
          },
          {
            iconName: 'FileText',
            title: 'Sales Playbooks',
            description:
              'Complete sales documentation — objection handling, feature/benefit maps, and pitch frameworks.',
          },
        ],
      },
    },
    {
      type: 'transformation-showcase',
      data: {
        headline: 'From vague capabilities to clear products',
        description:
          'See the transformation that productization delivers for marine businesses.',
        before: {
          label: 'Before Productization',
          items: [
            'Vague service descriptions',
            'Custom pricing for every deal',
            'Inconsistent sales messaging',
            'Long sales cycles with many meetings',
            'Difficulty differentiating from competitors',
            'Revenue unpredictability',
          ],
        },
        after: {
          label: 'After Productization',
          items: [
            '3–5 named, branded products',
            'Clear tiered pricing (Starter → Enterprise)',
            'Consistent messaging across all channels',
            'Shortened sales cycles — buyers self-qualify',
            'Battle cards that win competitive deals',
            'Predictable, scalable revenue streams',
          ],
        },
      },
    },
    {
      type: 'deliverables-grid',
      data: {
        headline: 'What you get',
        description:
          'Every productization engagement delivers a complete package of market-ready assets.',
        items: [
          {
            iconName: 'Package',
            title: '3–5 Named Products',
            description: 'Fully defined products with memorable names, clear descriptions, and target market profiles.',
          },
          {
            iconName: 'DollarSign',
            title: 'Pricing Structures',
            description: 'Tier-based pricing with Starter, Growth, and Enterprise levels — tested against market expectations.',
          },
          {
            iconName: 'Map',
            title: 'Positioning Guides',
            description: 'Product differentiation frameworks, value propositions, and competitive positioning documents.',
          },
          {
            iconName: 'BookOpen',
            title: 'Sales Playbooks',
            description: 'Objection handling scripts, discovery question frameworks, and closing strategies per product.',
          },
          {
            iconName: 'Swords',
            title: 'Competitive Battle Cards',
            description: 'Head-to-head comparison cards for your top 3–5 competitors with win/loss strategies.',
          },
          {
            iconName: 'FileCheck',
            title: 'Product Documentation',
            description: 'Complete specs, FAQs, feature/benefit matrices, and one-pagers ready for sales and marketing.',
          },
        ],
      },
    },
    {
      type: 'client-segments',
      data: {
        headline: 'Who is productization for?',
        description:
          'Productization works for marine businesses that have proven expertise but struggle to package and sell it consistently.',
        segments: [
          {
            iconName: 'Ship',
            title: 'Boat Manufacturers',
            description:
              'Package your customization options, warranty programs, and dealer support into clear product tiers.',
            benefits: [
              'Standardized option packages',
              'Dealer-ready product catalogs',
              'Simplified configurator inputs',
            ],
          },
          {
            iconName: 'Cpu',
            title: 'Marine Technology Companies',
            description:
              'Transform custom integrations and consulting into repeatable SaaS or service products.',
            benefits: [
              'Scalable product tiers',
              'Self-serve onboarding paths',
              'Clear feature differentiation',
            ],
          },
          {
            iconName: 'Anchor',
            title: 'Charter Operators',
            description:
              'Create tiered experience packages that maximize per-booking revenue and simplify marketing.',
            benefits: [
              'Named experience packages',
              'Seasonal pricing strategies',
              'Upsell path design',
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
          'Our 5-phase productization methodology transforms your capabilities into market-ready products in 6–8 weeks.',
        steps: [
          {
            iconName: 'Search',
            title: 'Discovery & Alignment',
            duration: 'Weeks 1–2',
            description:
              'Deep-dive into your business capabilities, current sales process, competitive landscape, and target market segments.',
            deliverables: ['Capability audit', 'Market opportunity report'],
          },
          {
            iconName: 'Map',
            title: 'Strategy & Architecture',
            duration: 'Weeks 2–3',
            description:
              'Define product portfolio architecture — which capabilities become which products, at which price points, for which segments.',
            deliverables: ['Product portfolio blueprint'],
          },
          {
            iconName: 'Package',
            title: 'Naming & Packaging',
            duration: 'Weeks 3–4',
            description:
              'Create product names, tier structures, feature sets, and messaging frameworks. Test naming with market feedback.',
            deliverables: ['Named products', 'Tier pricing'],
          },
          {
            iconName: 'Presentation',
            title: 'Sales Enablement',
            duration: 'Weeks 4–6',
            description:
              'Build complete sales collateral — playbooks, battle cards, one-pagers, objection handling guides, and pitch decks.',
            deliverables: ['Sales playbook', 'Battle cards', 'Pitch deck'],
          },
          {
            iconName: 'Rocket',
            title: 'Launch & Optimization',
            duration: 'Weeks 6–8',
            description:
              'Launch products to market, train your sales team, and iterate based on initial market feedback and conversion data.',
            deliverables: ['Market launch', 'Performance dashboard'],
          },
        ],
      },
    },
    {
      type: 'service-faq',
      data: {
        headline: 'Productization FAQ',
        description: 'Common questions about our marine productization services.',
        items: [
          {
            question: 'What is the difference between productization and packaging?',
            answer:
              'Packaging is putting a label on existing services. Productization goes deeper — it involves redefining your capabilities into distinct products with unique names, specific deliverables, tiered pricing, competitive positioning, and complete sales enablement. The result is a product that can be marketed, sold, and delivered consistently.',
          },
          {
            question: 'How long does a productization engagement take?',
            answer:
              'A typical productization engagement takes 6–8 weeks from discovery to launch. This includes the capability audit, product architecture, naming, pricing, sales enablement materials, and launch support. Complex portfolios with 5+ products may take 10–12 weeks.',
          },
          {
            question: 'Do I need to stop selling custom services?',
            answer:
              'No. Productization creates a standard offering that handles 70–80% of your market. You can still offer custom engagements for unique requirements, but the productized offerings become your lead generation and qualification engine.',
          },
          {
            question: 'How many products should my marine business have?',
            answer:
              'Most marine businesses benefit from 3–5 core products. Fewer than 3 limits your market coverage; more than 5 creates decision paralysis for buyers. We help you find the right number based on your capabilities and market segments.',
          },
          {
            question: 'What ROI can I expect from productization?',
            answer:
              'Marine businesses that productize typically see 20–40% shorter sales cycles, 15–30% increase in average deal size (through tiered upselling), and more predictable revenue forecasting. The sales enablement materials alone can pay for the engagement within 2–3 months.',
          },
          {
            question: 'Can you productize services that involve significant customization?',
            answer:
              'Yes. The key is identifying the repeatable core (80% of the work that is similar across clients) and packaging that, while keeping a defined customization layer. Many marine tech companies and boat manufacturers operate this way — standard base product with configurable options.',
          },
        ],
      },
    },
    {
      type: 'service-cta',
      data: {
        headline: 'Ready to productize your marine business?',
        description:
          'Stop custom-quoting every deal. Let us transform your capabilities into products that sell themselves.',
        ctaText: 'Start Your Productization',
        ctaHref: '#contact',
      },
    },
  ],
};
