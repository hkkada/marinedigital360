import { BRAND } from './brand';

export const CONTACT_EMAIL = 'info@marinedigital360.com';
export const SUPPORT_EMAIL = 'info@marinedigital360.com';
export const PRIVACY_EMAIL = 'privacy@marinedigital360.com';
export const LEGAL_EMAIL = 'legal@marinedigital360.com';
export const BILLING_EMAIL = 'billing@marinedigital360.com';
export const FROM_EMAIL = 'notifications@marinedigital360.com';

export const SITE_CONFIG = {
  name: BRAND.name,
  sld: BRAND.slug,
  abv: BRAND.abbreviation,
  title: `${BRAND.compact} — Marine Marketing Agency | Productization, SEO & Sales Enablement`,
  description:
    `${BRAND.compact} is a specialized marketing agency that transforms boat manufacturer, dealer, and technology capabilities into market-ready products through productization, sales enablement, SEO, and AI-powered digital marketing.`,
  url: process.env.NEXT_PUBLIC_SITE_URL || `https://${BRAND.slug}.com`,
  ogImage: '/og-default.jpg',
  links: {
    linkedin: `https://www.linkedin.com/company/${BRAND.slug}`,
  },
  ogDescription:
    `${BRAND.compact} transforms business capabilities into market-ready products. Productization, sales enablement, SEO, and AI-powered marketing for boat manufacturers, dealers, and technology companies.`,
  twitterDescription:
    `${BRAND.compact} transforms business capabilities into market-ready products. Productization, sales enablement, SEO, and AI-powered marketing for the industry.`,
  keywords: [
    'marketing agency',
    'productization',
    'boat manufacturer marketing',
    'sales enablement',
    'SEO',
    'digital marketing',
    'boat dealer marketing',
    'commercialization',
    'yacht marketing agency',
    'GEO optimization',
    'web design',
    'fishing charter marketing',
  ],
  themeColor: '#030213',
  creator: `${BRAND.compact} Team`,
  company: {
    name: BRAND.compact,
    legalName: BRAND.legalName,
    slogan: 'Navigating digital excellence',
    email: CONTACT_EMAIL,
    phone: '+1 (215) 555-0199',
    address: {
      street: '',
      city: 'New Orleans',
      state: 'LA',
      /** Spelled-out form for prose; `state` stays the 2-letter code for schema. */
      stateName: 'Louisiana',
      zip: '',
      country: 'US',
      // Consumed by the LocalBusiness/geo schema in StructuredData.tsx. Kept
      // here so the visible NAP and the structured data cannot disagree.
      latitude: 29.9511,
      longitude: -90.0715,
    },
  },
} as const;

export const NAVIGATION = {
  main: [
    { label: 'Services', href: '/#services' },
    { label: 'Industries', href: '/#industries' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact-us' },
  ],
} as const;

export const CONTACT_CONFIG = {
  email: {
    contact: CONTACT_EMAIL,
    support: SUPPORT_EMAIL,
    privacy: PRIVACY_EMAIL,
    legal: LEGAL_EMAIL,
    billing: BILLING_EMAIL,
    from: process.env.EMAIL_FROM_ADDRESS || FROM_EMAIL,
  },
  phone: '+1 (215) 555-0199',
  responseTime: '24-48 hours',
  availability: {
    days: 'Monday - Friday',
    hours: '9:00 AM - 6:00 PM EST',
  },
  booking: {
    consultationDuration: 30,
    consultationType: 'Free Discovery Call',
    platforms: ['Zoom', 'Microsoft Teams', 'Google Meet'],
  },
} as const;
