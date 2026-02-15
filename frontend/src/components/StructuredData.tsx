const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://marineforge.com/#organization',
  name: 'MarineForge',
  legalName: 'MarineForge LLC',
  url: 'https://marineforge.com',
  description:
    'MarineForge is a specialized marine marketing agency that transforms boat manufacturer, dealer, and marine technology capabilities into market-ready products through productization, sales enablement, SEO, and AI-powered digital marketing.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Philadelphia',
    addressRegion: 'PA',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@marineforge.com',
    contactType: 'sales',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.linkedin.com/company/marineforge',
  ],
  knowsAbout: [
    'Marine marketing',
    'Marine productization',
    'Boat manufacturer marketing',
    'Marine sales enablement',
    'Marine SEO',
    'Marine GEO optimization',
    'Marine web design',
    'Yacht marketing',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://marineforge.com/#localbusiness',
  name: 'MarineForge',
  description:
    'Specialized marine marketing agency offering productization, sales enablement, SEO, GEO, and AI-powered digital marketing for boat manufacturers, dealers, and marine technology companies.',
  url: 'https://marineforge.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Philadelphia',
    addressRegion: 'PA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.9526,
    longitude: -75.1652,
  },
  areaServed: [
    { '@type': 'State', name: 'Pennsylvania' },
    { '@type': 'State', name: 'North Carolina' },
    { '@type': 'State', name: 'South Carolina' },
    { '@type': 'State', name: 'New Jersey' },
    { '@type': 'State', name: 'Maryland' },
    { '@type': 'State', name: 'Virginia' },
    { '@type': 'State', name: 'Georgia' },
  ],
  priceRange: '$$$$',
  parentOrganization: { '@id': 'https://marineforge.com/#organization' },
};

import { getServices } from '@/lib/services';

const serviceSchemas = getServices().map((service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.schemaDescription,
  provider: { '@id': 'https://marineforge.com/#organization' },
  serviceType: service.serviceType,
  areaServed: 'United States',
}));

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MarineForge',
  url: 'https://marineforge.com',
  publisher: { '@id': 'https://marineforge.com/#organization' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://marineforge.com',
    },
  ],
};

export const faqData = [
  {
    question: 'What does a marine marketing agency do?',
    answer:
      'A marine marketing agency specializes in marketing services for the boating and marine industry. MarineForge goes beyond traditional marketing by offering productization, sales enablement, SEO, GEO optimization, and AI-powered digital marketing specifically for boat manufacturers, marine technology companies, dealers, and charter operators.',
  },
  {
    question: 'What is marine productization?',
    answer:
      'Marine productization is the process of transforming a marine business\'s capabilities and services into fully packaged, market-ready products with defined naming, pricing, positioning, and differentiation. MarineForge delivers finished products — not just plans — so clients can sell immediately upon delivery.',
  },
  {
    question: 'How much does marine marketing cost?',
    answer:
      'Marine marketing costs vary based on scope and services. MarineForge offers scalable packages from startup to enterprise, with project-based, retainer, and hybrid pricing models. Services range from single landing pages to full-service enterprise engagements including productization, sales enablement, and ongoing revenue optimization.',
  },
  {
    question: 'What is the difference between a marine marketing agency and a general marketing agency?',
    answer:
      'A marine marketing agency has deep expertise in the boating industry — understanding boat manufacturers, dealers, marine technology, and the high-net-worth buyer journey. MarineForge combines marine industry specialization with productization and AI-powered acceleration, delivering results 3-5x faster than general agencies unfamiliar with the marine market.',
  },
  {
    question: 'How can I improve my boat dealership\'s online presence?',
    answer:
      'Improving a boat dealership\'s online presence requires local SEO, Google Business Profile optimization, inventory marketing, and conversion-focused web design. MarineForge provides marine-specific SEO, GEO optimization for AI search results, and digital systems that generate leads automatically for boat dealers.',
  },
  {
    question: 'What is GEO optimization for marine businesses?',
    answer:
      'GEO (Generative Engine Optimization) ensures your marine business appears in AI-generated search results from platforms like ChatGPT, Perplexity, and Google AI Overviews. MarineForge optimizes content structure, schema markup, and entity signals so marine businesses are cited as authoritative sources by AI systems.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const allSchemas = [
  organizationSchema,
  localBusinessSchema,
  ...serviceSchemas,
  webSiteSchema,
  breadcrumbSchema,
  faqSchema,
];

export function StructuredData() {
  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
