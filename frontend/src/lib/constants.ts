export const CONTACT_EMAIL = 'hello@marinedigital360.com';
export const SUPPORT_EMAIL = 'hello@marinedigital360.com';
export const PRIVACY_EMAIL = 'privacy@marinedigital360.com';
export const LEGAL_EMAIL = 'legal@marinedigital360.com';
export const BILLING_EMAIL = 'billing@marinedigital360.com';
export const FROM_EMAIL = 'notifications@marinedigital360.com';

export const SITE_CONFIG = {
  name: 'Marine Digital 360',
  sld: 'marinedigital360',
  title:
    'MarineDigital360 — Marine Marketing Agency | Productization, SEO & Sales Enablement',
  description:
    'MarineDigital360 is a specialized marine marketing agency that transforms boat manufacturer, dealer, and marine technology capabilities into market-ready products through productization, sales enablement, SEO, and AI-powered digital marketing.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://marinedigital360.com',
  ogImage: '/og-default.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/company/marinedigital360',
  },
  ogDescription:
    'MarineDigital360 transforms marine business capabilities into market-ready products. Productization, sales enablement, SEO, and AI-powered marketing for boat manufacturers, dealers, and marine technology companies.',
  twitterDescription:
    'MarineDigital360 transforms marine business capabilities into market-ready products. Productization, sales enablement, SEO, and AI-powered marketing for the marine industry.',
  keywords: [
    'marine marketing agency',
    'marine productization',
    'boat manufacturer marketing',
    'marine sales enablement',
    'marine SEO',
    'marine digital marketing',
    'boat dealer marketing',
    'marine commercialization',
    'yacht marketing agency',
    'marine GEO optimization',
    'marine web design',
    'fishing charter marketing',
  ],
  themeColor: '#030213',
  creator: 'MarineDigital360 Team',
  company: {
    name: 'MarineDigital360',
    legalName: 'MarineDigital360 LLC',
    slogan: 'Navigating digital excellence',
    email: CONTACT_EMAIL,
    phone: '+1 (215) 555-0199',
    address: {
      street: '',
      city: 'Philadelphia',
      state: 'PA',
      zip: '',
      country: 'US',
    },
  },
} as const;

export const NAVIGATION = {
  main: [
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
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
