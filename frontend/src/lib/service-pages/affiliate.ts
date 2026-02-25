import type { ServicePageData } from './types';

export const affiliatePage: ServicePageData = {
  slug: 'affiliate',
  title: 'Affiliate Marketing',
  iconName: 'Share2',
  metadata: {
    title: 'Marine Affiliate Marketing — Build Performance-Based Partner Networks',
    description:
      'MarineForge builds and manages affiliate marketing programs for marine businesses — partner recruitment, commission design, platform setup, and performance-based revenue growth.',
    keywords: [
      'marine affiliate marketing',
      'marine affiliate program',
      'boat affiliate program',
      'marine partner network',
      'marine influencer marketing',
      'performance-based marine marketing',
      'marine e-commerce affiliate',
    ],
  },
  sections: [
    {
      type: 'service-hero',
      data: {
        tagline: 'Affiliate Marketing',
        headline: 'Performance-based growth through strategic partnerships',
        description:
          'Expand your reach without expanding your risk. We build affiliate programs that recruit the right partners, design the right commissions, and drive revenue you only pay for when it converts.',
        ctaText: 'Build Your Affiliate Program',
        ctaHref: '#contact',
        imageKey: 'serviceHero.affiliate',
      },
    },
    {
      type: 'service-overview',
      data: {
        headline: 'What is marine affiliate marketing?',
        description:
          'Marine affiliate marketing is a performance-based strategy where partners (affiliates) promote your marine products or services and earn commissions on resulting sales or leads. Unlike traditional advertising where you pay upfront, affiliate marketing means you only pay for actual results. MarineForge builds, manages, and scales affiliate programs for marine e-commerce retailers, boat accessory brands, fishing gear companies, and marine service providers.',
        cards: [
          {
            iconName: 'Network',
            title: 'Program Strategy',
            description:
              'Complete affiliate program design — commission structures, partner tiers, tracking setup, and growth roadmaps.',
          },
          {
            iconName: 'UserPlus',
            title: 'Partner Recruitment',
            description:
              'Targeted recruitment of marine bloggers, fishing influencers, boating YouTubers, and industry publications.',
          },
          {
            iconName: 'DollarSign',
            title: 'Commission Design',
            description:
              'Optimized commission structures — flat-rate, percentage, tiered, and performance bonuses that motivate partners.',
          },
          {
            iconName: 'Shield',
            title: 'Fraud Detection',
            description:
              'Compliance monitoring, fraud prevention, and quality control to protect your program from bad actors.',
          },
        ],
      },
    },
    {
      type: 'deliverables-grid',
      data: {
        headline: 'What you get',
        description:
          'A complete affiliate program — from strategy document to live platform with recruited partners and marketing assets.',
        items: [
          {
            iconName: 'FileText',
            title: 'Program Strategy Document',
            description: 'Complete program blueprint with goals, KPIs, commission structures, and growth roadmap.',
          },
          {
            iconName: 'Settings',
            title: 'Platform Configuration',
            description: 'Fully configured affiliate platform (ShareASale, Impact, or custom) with tracking, payouts, and reporting.',
          },
          {
            iconName: 'UserPlus',
            title: 'Partner Recruitment Plan',
            description: 'Targeted outreach strategy with identified prospects — marine bloggers, influencers, publications, and reviewers.',
          },
          {
            iconName: 'DollarSign',
            title: 'Commission Structures',
            description: 'Optimized payout models — percentage, flat-rate, tiered, and bonus structures designed for your margins.',
          },
          {
            iconName: 'Image',
            title: 'Marketing Asset Library',
            description: 'Banners, email templates, social assets, and product feeds ready for partners to use.',
          },
          {
            iconName: 'BookOpen',
            title: 'Partner Onboarding Kit',
            description: 'Welcome guide, brand guidelines, best practices, and training materials for new affiliates.',
          },
          {
            iconName: 'Shield',
            title: 'Fraud Detection Setup',
            description: 'Click fraud prevention, traffic quality monitoring, and compliance rules to protect your program.',
          },
          {
            iconName: 'BarChart3',
            title: 'Performance Dashboards',
            description: 'Real-time reporting on partner performance, revenue attribution, and program health metrics.',
          },
        ],
      },
    },
    {
      type: 'partner-network',
      data: {
        headline: 'Building your partner ecosystem',
        description:
          'We recruit and manage partners across the marine industry — from niche fishing bloggers to major marine publications.',
        partnerTypes: [
          {
            iconName: 'PenTool',
            title: 'Marine Content Creators',
            description: 'Boating bloggers, fishing journalists, and marine lifestyle writers with engaged audiences.',
          },
          {
            iconName: 'Video',
            title: 'Boating YouTubers & Influencers',
            description: 'Video creators covering boat reviews, fishing trips, sailing, and marine product unboxings.',
          },
          {
            iconName: 'Newspaper',
            title: 'Industry Publications',
            description: 'Marine trade magazines, boating news sites, and industry review platforms with authority traffic.',
          },
          {
            iconName: 'Star',
            title: 'Review & Comparison Sites',
            description: 'Product review sites, comparison platforms, and buying guide publishers in the marine niche.',
          },
          {
            iconName: 'Users',
            title: 'Boating Communities',
            description: 'Forum moderators, Facebook group admins, and community leaders in boating and fishing spaces.',
          },
          {
            iconName: 'Mail',
            title: 'Email Newsletter Operators',
            description: 'Marine and outdoor lifestyle newsletter publishers with dedicated subscriber bases.',
          },
        ],
        stats: [
          { value: '50+', label: 'Marine partner prospects per program' },
          { value: '15–25', label: 'Active partners in first 90 days' },
          { value: '3–5x', label: 'Typical partner ROI within 6 months' },
          { value: '< 2%', label: 'Fraud rate with our monitoring' },
        ],
      },
    },
    {
      type: 'client-segments',
      data: {
        headline: 'Who is affiliate marketing for?',
        description:
          'Affiliate marketing works best for marine businesses with products that can be promoted, reviewed, and sold through partner channels.',
        segments: [
          {
            iconName: 'ShoppingCart',
            title: 'Marine E-Commerce',
            description:
              'Online stores selling boat parts, marine electronics, fishing tackle, safety gear, and accessories.',
            benefits: [
              'Performance-based — pay only for sales',
              'Leverage product review content',
              'Scale through partner networks',
            ],
          },
          {
            iconName: 'Package',
            title: 'Marine Product Brands',
            description:
              'Manufacturers of marine electronics, outboard engines, boat covers, marine paint, and accessories.',
            benefits: [
              'Reach new audiences through influencers',
              'Build product awareness at scale',
              'Drive traffic to dealer networks',
            ],
          },
          {
            iconName: 'Anchor',
            title: 'Charter & Experience Operators',
            description:
              'Fishing charters, yacht rentals, sailing schools, and marine adventure experience providers.',
            benefits: [
              'Tap into travel & lifestyle audiences',
              'Seasonal promotion campaigns',
              'Commissions on bookings only',
            ],
          },
        ],
      },
    },
    {
      type: 'process-timeline',
      data: {
        headline: 'How we build your program',
        description:
          'From strategy to scaling, our 5-phase approach gets your affiliate program generating revenue in 8–12 weeks.',
        steps: [
          {
            iconName: 'Map',
            title: 'Strategy & Program Design',
            duration: 'Weeks 1–2',
            description:
              'Define program goals, commission structures, partner criteria, competitive analysis, and technology selection.',
            deliverables: ['Program strategy document'],
          },
          {
            iconName: 'Settings',
            title: 'Platform Setup & Configuration',
            duration: 'Weeks 2–3',
            description:
              'Configure your chosen affiliate platform — tracking, attribution, payout rules, partner portal, and reporting dashboards.',
            deliverables: ['Live affiliate platform', 'Tracking setup'],
          },
          {
            iconName: 'UserPlus',
            title: 'Asset Creation & Recruitment',
            duration: 'Weeks 3–6',
            description:
              'Create marketing assets for partners, build the onboarding kit, and launch targeted partner recruitment campaigns.',
            deliverables: ['Asset library', '50+ prospect outreach'],
          },
          {
            iconName: 'Users',
            title: 'Partner Onboarding & Activation',
            duration: 'Weeks 6–8',
            description:
              'Onboard recruited partners, provide training, distribute assets, and activate initial campaigns with top partners.',
            deliverables: ['15–25 active partners', 'Campaign activation'],
          },
          {
            iconName: 'TrendingUp',
            title: 'Optimization & Scaling',
            duration: 'Ongoing',
            description:
              'Monitor partner performance, optimize commission structures, expand recruitment, and scale top-performing partnerships.',
            deliverables: ['Monthly performance reports', 'Scaling plan'],
          },
        ],
      },
    },
    {
      type: 'service-faq',
      data: {
        headline: 'Affiliate Marketing FAQ',
        description: 'Common questions about marine affiliate programs.',
        items: [
          {
            question: 'Which affiliate platform should I use?',
            answer:
              'It depends on your business size and needs. ShareASale and CJ Affiliate are great for mid-size e-commerce. Impact is ideal for larger programs with complex attribution needs. For smaller programs, we can set up cost-effective solutions using Refersion or PartnerStack. We recommend the best fit during the strategy phase.',
          },
          {
            question: 'What commission rates should I offer?',
            answer:
              'Marine product commission rates typically range from 5–15% for physical products and 10–30% for digital products or services. The right rate depends on your margins, average order value, and competitive landscape. We design commission structures with tiered rates that reward top performers.',
          },
          {
            question: 'How many affiliate partners do I need?',
            answer:
              'Quality over quantity. A program with 15–25 engaged, relevant partners will outperform one with 500 inactive affiliates. We focus on recruiting partners who genuinely reach your target marine audience. Most programs hit meaningful revenue with 20–30 active partners.',
          },
          {
            question: 'How do you prevent affiliate fraud?',
            answer:
              'We implement multi-layer fraud detection — click fraud monitoring, traffic quality scoring, commission validation rules, and manual review of suspicious activity. Our setup includes automated flagging for unusual patterns (sudden traffic spikes, cookie stuffing, brand bidding violations) and regular audits.',
          },
          {
            question: 'How long until the program generates revenue?',
            answer:
              'Most marine affiliate programs start generating revenue in 8–12 weeks — the first 4–6 weeks are setup and recruitment, then partners need 2–4 weeks to create content and start driving traffic. Revenue ramps up as partners produce more content and optimization kicks in.',
          },
          {
            question: 'Can affiliate marketing work for high-ticket marine items?',
            answer:
              'Yes, but the model shifts from direct sales to lead generation. For boats and yachts, affiliates drive qualified leads (form fills, calls, showroom visits) rather than direct purchases. Commission structures shift to per-lead or per-qualified-appointment models. This works well with marine publications and review sites.',
          },
        ],
      },
    },
    {
      type: 'service-cta',
      data: {
        headline: 'Ready to build your partner network?',
        description:
          'Grow your marine business through performance-based partnerships. Only pay for results that matter.',
        ctaText: 'Build Your Affiliate Program',
        ctaHref: '#contact',
      },
    },
  ],
};
