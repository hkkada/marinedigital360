import { SITE_CONFIG } from '../constants';
import type { ServicePageData } from './types';

export const ppcPage: ServicePageData = {
  slug: 'ppc',
  title: 'Paid Ads',
  iconName: 'MousePointerClick',
  metadata: {
    title: 'Paid Ads for Businesses — Google Ads & Bing PPC Management',
    description:
      `Paid Ads managed by ${SITE_CONFIG.name} — Google Ads, Bing, and social media advertising for businesses — optimizing ROAS, reducing wasted spend, and driving qualified leads for boat manufacturers, dealers, and e-commerce.`,
    keywords: [
      'PPC management',
      'boat advertising Google Ads',
      'paid search',
      'social media advertising',
      'boat dealer PPC',
      'Google Ads management',
      'ROAS optimization',
      'remarketing',
    ],
  },
  sections: [
    {
      type: 'service-hero',
      data: {
        tagline: 'Paid Ads',
        headline: 'Every dollar tracked. Every click optimized.',
        description:
          'advertising requires precision — high-value products, long sales cycles, and savvy buyers. We manage your paid campaigns across Google, Bing, and social platforms to maximize return on ad spend and drive qualified leads.',
        ctaText: 'Get Your PPC Audit',
        ctaHref: '#contact',
        imageKey: 'serviceHero.ppc',
      },
    },
    {
      type: 'content-block',
      id: 'what-is-paid-advertising',
      navLabel: 'What It Is',
      data: {
        eyebrow: 'Definition',
        headline: 'What Is Paid Advertising?',
        surface: 'light',
        paragraphs: [
          'Paid advertising for businesses is the practice of buying placement in search results, shopping listings, and social feeds — through platforms like Google Ads and Microsoft/Bing Ads — so a boat manufacturer, dealer, or technology company appears in front of in-market buyers on demand, rather than waiting for organic traffic to arrive.',
          `For businesses, that means running search, shopping, display, and social campaigns tuned to a buyer journey that looks nothing like typical e-commerce — long consideration windows, seasonal demand tied to boating season, and purchase decisions often shaped by photos and video well before a showroom visit. ${SITE_CONFIG.name} plans, builds, and manages those campaigns across Google Ads, Bing Ads, and social platforms so ad spend is aimed at buyers who are ready to browse inventory, request a quote, or talk to a dealer.`,
        ],
      },
    },
    {
      type: 'platform-coverage',
      id: 'platforms',
      navLabel: 'Platforms',
      data: {
        headline: 'Every platform, managed',
        description:
          'We manage paid advertising across all major platforms — meeting your buyers wherever they search and browse.',
        platforms: [
          {
            name: 'Google Ads',
            iconName: 'Search',
            description:
              'Search, display, shopping, and YouTube campaigns targeting buyers at every stage of the funnel.',
            features: [
              'Search campaigns for high-intent queries',
              'Display ads for brand awareness',
              'Shopping ads for e-commerce',
              'YouTube video campaigns',
              'Performance Max campaigns',
            ],
          },
          {
            name: 'Microsoft/Bing Ads',
            iconName: 'Globe',
            description:
              'Often overlooked, Bing captures 10–15% of searches at lower CPCs and higher conversion rates.',
            features: [
              'Search campaigns mirroring Google',
              'Lower CPC (20–30% cheaper on average)',
              'LinkedIn audience integration',
              'Higher-income demographic skew',
            ],
          },
          {
            name: 'PPC (Amazon)',
            iconName: 'Users',
            description:
              'Marketplace advertising that puts parts, gear, and accessories in front of buyers at the moment of purchase intent.',
            features: [
              'Sponsored Products and Sponsored Brands',
              'Keyword and ASIN targeting',
              'Product detail page retargeting',
              'Category and competitor placements',
              'Listing and catalog optimization',
            ],
          },
          {
            name: 'Display & Remarketing',
            iconName: 'Monitor',
            description:
              'Stay visible across the web with display ads on and lifestyle publications, plus remarketing to past visitors.',
            features: [
              'Programmatic display advertising',
              'publication placements',
              'Dynamic remarketing ads',
              'Cross-device tracking',
            ],
          },
        ],
      },
    },
        {
      type: 'service-overview',
      data: {
        headline: 'What is PPC management?',
        description:
          'PPC management is the strategic planning, execution, and optimization of paid advertising campaigns for businesses across search engines and social platforms. Unlike generic PPC agencies, we understand the buyer journey — high consideration, seasonal demand cycles, and the importance of visual storytelling for vessel sales. We optimize every campaign for maximum return on ad spend, reducing wasted clicks and focusing budget on qualified buyers.',
        cards: [
          {
            iconName: 'Target',
            title: 'Precision Targeting',
            description:
              'Industry-specific audience targeting — boat enthusiasts, in-market buyers, fishing communities, and luxury lifestyle segments.',
          },
          {
            iconName: 'TrendingUp',
            title: 'ROAS Optimization',
            description:
              'Continuous bid management, budget allocation, and creative testing to maximize return on every dollar spent.',
          },
          {
            iconName: 'BarChart3',
            title: 'Full-Funnel Tracking',
            description:
              'End-to-end conversion tracking from click to lead to sale — attribution modeling for high-value purchases.',
          },
          {
            iconName: 'RefreshCw',
            title: 'Remarketing & Retargeting',
            description:
              'Stay in front of high-intent visitors with dynamic remarketing across display, social, and video channels.',
          },
        ],
      },
    },
    {
      type: 'content-block',
      id: 'ppc-management',
      navLabel: 'Management',
      data: {
        eyebrow: 'Ongoing Management',
        headline: 'PPC Management',
        paragraphs: [
          `Ongoing PPC management is what happens after a campaign goes live — it starts with PPC strategy and planning, deciding which platforms, audiences, and budget allocations make sense for a given boat manufacturer, dealer, or technology company, and carries through into day-to-day campaign management across Google Ads, Bing Ads, and Facebook/Instagram Ads, plus display and remarketing campaigns that keep a brand in front of buyers who have already shown interest.`,
          `For e-commerce and parts catalogs, that also includes shopping ads built around product feeds, alongside landing page optimization so traffic lands on pages built to convert rather than a generic homepage. Underneath all of it sits bid management and budget optimization — shifting spend toward what is working — and conversion tracking and analytics that connect every dollar spent back to the leads and sales it produces. ${SITE_CONFIG.name} runs this as a continuous cycle across every platform in the account, not a one-time setup.`,
        ],
      },
    },
    {
      type: 'content-block',
      id: 'google-ads',
      navLabel: 'Google Ads',
      data: {
        eyebrow: 'Search & Shopping',
        headline: 'Google Ads Campaign Management',
        surface: 'light',
        paragraphs: [
          `On Google Ads, ${SITE_CONFIG.name} builds search, shopping, and Performance Max campaigns structured around how  buyers actually search — model-specific queries, comparison terms, and local dealer intent — then puts conversion tracking behind every campaign so form fills, phone calls, and quote requests tie back to the keyword and ad that produced them.`,
          'Shopping campaigns run on product feeds tuned for  e-commerce and parts catalogs, and landing pages are built and tested to match ad intent rather than sending traffic to a generic homepage. From there, bid management and budget optimization shift spend toward the campaigns and audiences producing qualified leads and away from clicks that do not convert for a high-value  purchase.',
        ],
      },
    },
    {
      type: 'content-block',
      id: 'bing-ads',
      navLabel: 'Bing Ads',
      data: {
        eyebrow: 'Microsoft Advertising',
        headline: 'Bing Ads Campaign Management',
        paragraphs: [
          `${SITE_CONFIG.name} mirrors Google Ads campaign structures over to Microsoft/Bing Ads rather than treating the platform as an afterthought — search campaigns, keyword targeting, and conversion tracking are rebuilt for Bing's audience and auction dynamics, since a channel with a different cost and buyer profile needs its own bid strategy to perform.`,
          'Because Bing reaches a smaller, often lower-cost slice of  searchers, we manage it as a budget-efficient complement to Google rather than a replacement — expanding spend there once Google campaigns are converting, and applying the same bid management, conversion tracking, and reporting cadence across both platforms.',
        ],
      },
    },
    {
      type: 'metrics-results',
      id: 'results',
      navLabel: 'Results',
      data: {
        headline: 'Performance that proves itself',
        description:
          'Our PPC campaigns consistently outperform industry benchmarks.',
        metrics: [
          {
            value: '4–8x',
            label: 'Average ROAS',
            description: 'Return on ad spend across client portfolio',
          },
          {
            value: '-35%',
            label: 'Wasted Spend Reduction',
            description: 'Average decrease in irrelevant clicks within first 90 days',
          },
          {
            value: '+60%',
            label: 'Qualified Lead Increase',
            description: 'More leads that match your ideal buyer profile',
          },
          {
            value: '< 48hrs',
            label: 'Optimization Cycles',
            description: 'Campaigns reviewed and optimized every 48 hours minimum',
          },
        ],
      },
    },
    {
      type: 'pricing-tiers',
      id: 'pricing',
      navLabel: 'Pricing',
      data: {
        headline: 'Transparent pricing',
        description:
          'Management fees based on your monthly ad spend. No hidden costs, no long-term contracts.',
        tiers: [
          {
            name: 'Starter',
            description: 'For businesses testing paid advertising.',
            priceLabel: 'Up to $5K ad spend/mo',
            features: [
              '1–2 platform management',
              'Campaign setup & optimization',
              'Keyword research & targeting',
              'Monthly performance reports',
              'Bi-weekly optimization cycles',
              'Conversion tracking setup',
            ],
            ctaText: 'Get Started',
          },
          {
            name: 'Growth',
            description: 'For established businesses scaling paid acquisition.',
            priceLabel: '$5K–$20K ad spend/mo',
            features: [
              '3–4 platform management',
              'Advanced audience targeting',
              'A/B creative testing',
              'Remarketing campaigns',
              'Landing page optimization',
              'Weekly optimization cycles',
              'Bi-weekly strategy calls',
              'Detailed performance dashboards',
            ],
            highlighted: true,
            ctaText: 'Most Popular',
          },
          {
            name: 'Enterprise',
            description: 'For large brands with significant ad budgets.',
            priceLabel: '$20K+ ad spend/mo',
            features: [
              'All platform management',
              'Dedicated account strategist',
              'Custom attribution modeling',
              'Competitor intelligence monitoring',
              'Dynamic creative optimization',
              'Daily optimization cycles',
              'Weekly strategy calls',
              'Executive reporting & insights',
            ],
            ctaText: 'Contact Us',
          },
        ],
      },
    },
    {
      type: 'tech-stack',
      id: 'tools',
      navLabel: 'Tools',
      data: {
        headline: 'Campaign management tools',
        description:
          'We use industry-leading tools for campaign management, tracking, and optimization.',
        categories: [
          {
            name: 'Ad Platforms',
            tools: [
              { name: 'Google Ads', iconName: 'Search', description: 'Search, display, shopping, YouTube, Performance Max' },
              { name: 'Meta Business Suite', iconName: 'Users', description: 'Facebook & Instagram ad management' },
              { name: 'Microsoft Advertising', iconName: 'Globe', description: 'Bing search and LinkedIn audience ads' },
            ],
          },
          {
            name: 'Analytics & Tracking',
            tools: [
              { name: 'Google Analytics 4', iconName: 'TrendingUp', description: 'Conversion tracking, attribution, audience analysis' },
              { name: 'Google Tag Manager', iconName: 'Code', description: 'Tag deployment, event tracking, data layer' },
              { name: 'Looker Studio', iconName: 'BarChart3', description: 'Custom reporting dashboards and visualizations' },
            ],
          },
          {
            name: 'Optimization',
            tools: [
              { name: 'Optmyzr', iconName: 'Settings', description: 'Automated bid management and rule-based optimization' },
              { name: 'Unbounce', iconName: 'FileText', description: 'Landing page creation and A/B testing' },
            ],
          },
        ],
      },
    },
    {
      type: 'process-timeline',
      id: 'process',
      navLabel: 'Process',
      data: {
        headline: 'How we manage your campaigns',
        description:
          'Our PPC management process is structured for rapid results and continuous improvement.',
        steps: [
          {
            iconName: 'Search',
            title: 'Audit & Strategy',
            duration: 'Week 1',
            description:
              'Review existing campaigns (if any), analyze competitors, research specific keywords, and define targeting strategy and budget allocation.',
            deliverables: ['PPC audit report', 'Campaign strategy'],
          },
          {
            iconName: 'Target',
            title: 'Campaign Build',
            duration: 'Weeks 1–2',
            description:
              'Build campaign structures, write ad copy, create audience segments, set up conversion tracking, and configure bid strategies.',
            deliverables: ['Launch-ready campaigns', 'Tracking setup'],
          },
          {
            iconName: 'Rocket',
            title: 'Launch & Monitor',
            duration: 'Week 3',
            description:
              'Launch campaigns, monitor performance in real-time, and make initial adjustments based on early data signals.',
            deliverables: ['Live campaigns', 'Monitoring dashboard'],
          },
          {
            iconName: 'TrendingUp',
            title: 'Optimize & Scale',
            duration: 'Weeks 3–8',
            description:
              'Continuous A/B testing, bid optimization, audience refinement, negative keyword expansion, and budget reallocation to top performers.',
            deliverables: ['Optimization log', 'Performance improvements'],
          },
          {
            iconName: 'BarChart3',
            title: 'Report & Strategize',
            duration: 'Monthly',
            description:
              'Detailed performance reporting, ROAS analysis, and strategic recommendations for scaling budget and expanding to new platforms.',
            deliverables: ['Monthly performance report', 'Scaling roadmap'],
          },
        ],
      },
    },
    {
      type: 'service-faq',
      id: 'faq',
      navLabel: 'FAQ',
      data: {
        headline: 'PPC Management FAQ',
        description: 'Common questions about paid advertising.',
        items: [
          {
            question: 'What ROAS can I expect from PPC?',
            answer:
              'PPC campaigns typically achieve 4–8x ROAS once optimized. The first 30–60 days are a learning period where we gather data and refine targeting. By month 3, campaigns are usually hitting target ROAS consistently. Higher-value products (boats, yachts) often see even higher returns.',
          },
          {
            question: 'What is the minimum ad budget to get started?',
            answer:
              'We recommend a minimum of $2,000–$3,000 per month in ad spend to generate meaningful data and results. Below that threshold, it is difficult to test enough variations and gather sufficient conversion data for optimization. Our management fee is separate from ad spend.',
          },
          {
            question: 'Which platforms should I advertise on?',
            answer:
              'It depends on your goals. Google Search is essential for capturing high-intent buyers. Facebook/Instagram work well for visual products and brand awareness. Bing often delivers lower CPCs with similar intent. We recommend starting with 1–2 platforms and expanding based on results.',
          },
          {
            question: 'How quickly can campaigns be launched?',
            answer:
              'We can launch initial campaigns within 1–2 weeks of engagement. The audit and strategy phase takes 3–5 days, campaign build takes 5–7 days, and then we go live. Ongoing optimization begins immediately after launch.',
          },
          {
            question: 'Do you require long-term contracts?',
            answer:
              'No long-term contracts required. We work on monthly agreements because we believe our results should earn your continued business. That said, PPC optimization is a continuous process — most clients see the best results after 3–6 months of consistent management.',
          },
          {
            question: 'How do you track conversions for high-value products?',
            answer:
              'We set up comprehensive conversion tracking — form submissions, phone calls, live chat interactions, catalog downloads, and dealer inquiries. For high-value items like boats, we implement offline conversion tracking to connect ad clicks to actual sales, giving you true ROAS visibility.',
          },
        ],
      },
    },
    {
      type: 'service-cta',
      data: {
        headline: 'Ready to maximize your ad spend?',
        description:
          'Stop wasting budget on unqualified clicks. Let us build campaigns that drive real buyers to your business.',
        ctaText: 'Get Your PPC Audit',
        ctaHref: '#contact',
      },
    },
  ],
};
