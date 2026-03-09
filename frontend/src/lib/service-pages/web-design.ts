import { SITE_CONFIG } from '../constants';
import type { ServicePageData, ServiceSection } from './types';

export const webDesignPage: ServicePageData = {
  slug: 'web-design',
  title: 'Web Design',
  iconName: 'Monitor',
  metadata: {
    title: 'Marine Web Design & Development — Custom Websites for Marine Businesses',
    description:
      `${SITE_CONFIG.name} builds custom marine websites with mobile-first responsive design, conversion-focused UX, and high-performance optimization for boat manufacturers, dealers, and marine tech companies.`,
    keywords: [
      'marine web design',
      'boat manufacturer website',
      'marine website development',
      'yacht website design',
      'marine e-commerce website',
      'responsive marine website',
      'marine dealer website',
    ],
  },
  sections: [
    {
      type: 'service-hero',
      data: {
        tagline: 'Web Design & Development',
        headline: 'Websites that move vessels',
        description:
          'Your website is your most powerful salesperson — working 24/7 to attract, qualify, and convert marine buyers. We build custom websites that look stunning, load fast, and turn visitors into customers.',
        ctaText: 'Get a Free Estimate',
        ctaHref: '#contact',
        imageKey: 'serviceHero.web-design',
      }
    },
    {
      type: 'service-overview',
      data: {
        headline: 'What makes a great marine website?',
        description:
          `A great marine website combines stunning visuals with conversion-focused design, fast performance, and search engine visibility. It showcases vessels and marine products with the visual impact they deserve, while guiding buyers through a clear path from discovery to inquiry. ${SITE_CONFIG.name} builds custom websites purpose-built for the marine industry — from single-page dealer sites to full e-commerce platforms with inventory management.`,
        cards: [
          {
            iconName: 'Smartphone',
            title: 'Mobile-First Design',
            description:
              'Over 60% of marine searches happen on mobile. Every site we build starts mobile and scales up to desktop.',
          },
          {
            iconName: 'MousePointerClick',
            title: 'Conversion-Focused UX',
            description:
              'Strategic CTAs, clear navigation, trust signals, and lead capture forms that turn browsers into buyers.',
          },
          {
            iconName: 'Zap',
            title: 'High Performance',
            description:
              'Sub-2.5s load times, optimized images, lazy loading, and Core Web Vitals tuning for speed and SEO.',
          },
          {
            iconName: 'Search',
            title: 'SEO-Ready Architecture',
            description:
              'Semantic HTML, structured data, meta tags, and clean URL structures — ready to rank from day one.',
          },
        ],
      }
    },
    {
      type: 'transformation-showcase',
      data: {
        headline: 'Your website is either closing deals — or losing them to competitors',
        description:
          'Marine buyers today research 3–5 dealerships online before ever picking up the phone. If your site doesn\'t convert that first visit into a conversation, someone else\'s will.',
        before: {
          label: 'What\'s Costing You Sales Right Now',
          items: [
            'Flat photos and cluttered layouts that make six-figure vessels look forgettable',
            'Buyers abandon your site because specs, availability, and pricing are buried or missing',
            'Zero lead capture — visitors browse your inventory and call your competitor instead',
            'Invisible on Google when someone searches "boats for sale near me" or your exact brand',
            'A website that looks like it was built in 2015 — undermining trust before the first conversation',
            'No data on which vessels get the most views, where buyers drop off, or what drives inquiries',
          ],
        },
        after: {
          label: `What Changes With ${SITE_CONFIG.name}`,
          items: [
            'Cinematic vessel galleries and detail pages that make buyers feel like they\'re already on board',
            'A frictionless path from search to inquiry — specs, inventory, and financing options exactly where buyers look',
            'Strategic lead capture on every high-intent page, turning anonymous traffic into booked showings',
            'Search-optimized architecture that puts you in front of buyers actively shopping your market',
            'A premium digital storefront that signals the same quality as the vessels you represent',
            'Real-time analytics showing which listings, campaigns, and pages are generating your pipeline',
          ],
        },
      },
    },
    {
      type: 'pricing-tiers',
      data: {
        headline: 'Packages for every scale',
        description:
          'From landing pages to enterprise platforms, we have a package that fits your goals and budget.',
        tiers: [
          {
            name: 'Landing Page',
            description: 'Perfect for product launches, campaigns, or lead capture.',
            features: [
              'Single-page responsive design',
              'Lead capture form',
              'Mobile-optimized',
              'Basic SEO setup',
              'Analytics integration',
              '2-week delivery',
            ],
            ctaText: 'Get Started',
          },
          {
            name: 'Business Website',
            description: 'Full marketing website for established marine businesses.',
            features: [
              '5–15 custom pages',
              'Mobile-first responsive design',
              'Conversion-optimized UX',
              'CMS integration',
              'Full SEO setup & schema markup',
              'Contact forms & lead routing',
              'Blog / news section',
              '4–6 week delivery',
            ],
            highlighted: true,
            ctaText: 'Most Popular',
          },
          {
            name: 'E-Commerce',
            description: 'Full online store for marine parts, gear, or accessories.',
            features: [
              'Product catalog & filtering',
              'Shopping cart & checkout',
              'Payment processing integration',
              'Inventory management',
              'Customer accounts & order history',
              'Dealer/wholesale pricing tiers',
              'Shipping calculator',
              '6–10 week delivery',
            ],
            ctaText: 'Get Started',
          },
          {
            name: 'Enterprise',
            description: 'Custom platform for manufacturers and large dealer networks.',
            features: [
              'Custom application development',
              'Interactive boat builder/configurator',
              'Dealer locator & portal',
              'Multi-language support',
              'API integrations',
              'Advanced analytics dashboard',
              'Ongoing maintenance & support',
              '10–16 week delivery',
            ],
            ctaText: 'Contact Us',
          },
        ],
      }
    
    },
    {
      type: 'process-timeline',
      data: {
        headline: 'How we build',
        description:
          'Our web design process is transparent, collaborative, and delivers on time.',
        steps: [
          {
            iconName: 'Search',
            title: 'Discovery & Strategy',
            duration: 'Weeks 1–2',
            description:
              'Understand your business goals, target audience, competitive landscape, and technical requirements. Define sitemap and content strategy.',
            deliverables: ['Project brief', 'Sitemap', 'Content plan'],
          },
          {
            iconName: 'PenTool',
            title: 'Wireframes & UX Design',
            duration: 'Weeks 2–3',
            description:
              'Create low-fidelity wireframes for key pages, map user flows, and define the information architecture and conversion paths.',
            deliverables: ['Wireframes', 'User flow diagrams'],
          },
          {
            iconName: 'Image',
            title: 'Visual Design',
            duration: 'Weeks 3–4',
            description:
              'High-fidelity mockups with your brand identity, typography, color palette, and imagery. Desktop and mobile views for approval.',
            deliverables: ['Design mockups', 'Style guide', 'Client approval'],
          },
          {
            iconName: 'Code',
            title: 'Development & Integration',
            duration: 'Weeks 4–6',
            description:
              'Build the site with clean, semantic code. Integrate CMS, forms, analytics, and any third-party tools. Optimize performance and SEO.',
            deliverables: ['Staging site', 'CMS setup', 'SEO configuration'],
          },
          {
            iconName: 'Rocket',
            title: 'QA, Launch & Support',
            duration: 'Weeks 6–7+',
            description:
              'Cross-browser and device testing, performance optimization, SEO validation, and go-live. Post-launch monitoring and support.',
            deliverables: ['Live website', 'QA report', 'Post-launch support'],
          },
        ],
      }
    },
    {
      type: 'service-faq',
      data: {
        headline: 'Web Design FAQ',
        description: 'Common questions about marine web design and development.',
        items: [
          {
            question: 'How long does it take to build a marine website?',
            answer:
              'Timelines vary by scope: Landing pages take 2 weeks, business websites 4–6 weeks, e-commerce sites 6–10 weeks, and enterprise platforms 10–16 weeks. We provide a detailed timeline during the discovery phase and stick to it.',
          },
          {
            question: 'What platform do you build on?',
            answer:
              'We primarily build with Next.js (React) for maximum performance and SEO, with Tailwind CSS for styling. For e-commerce, we integrate with Shopify or custom solutions. For CMS needs, we use headless CMS platforms like Sanity or Contentful. We choose the technology that best fits your specific requirements.',
          },
          {
            question: 'Will my website be mobile-responsive?',
            answer:
              'Absolutely. Every website we build is mobile-first — designed for phones first, then enhanced for tablets and desktops. With over 60% of marine searches happening on mobile devices, this approach ensures the best experience for the majority of your visitors.',
          },
          {
            question: 'Do you handle content and copywriting?',
            answer:
              'Yes. We can provide SEO-optimized copywriting for all pages, product descriptions, and blog content. We work with our domain knowledge of the marine industry to create content that resonates with boaters, dealers, and marine professionals.',
          },
          {
            question: 'What about ongoing maintenance?',
            answer:
              'We offer ongoing maintenance packages that include security updates, performance monitoring, content updates, and technical support. Most clients choose a monthly retainer for peace of mind, but we also handle one-off updates.',
          },
          {
            question: 'Can you redesign my existing marine website?',
            answer:
              'Yes. We frequently redesign existing marine websites — migrating content, improving UX, and optimizing performance while preserving SEO equity. We conduct a thorough audit of your current site before starting to ensure nothing is lost in the transition.',
          },
        ],
      }
    },
    {
      type: 'service-cta',
      data: {
        headline: 'Ready to build your marine digital presence?',
        description:
          'From landing pages to enterprise platforms, we build websites that convert visitors into customers.',
        ctaText: 'Get a Free Estimate',
        ctaHref: '#contact',
      }
    },
  ]
};
