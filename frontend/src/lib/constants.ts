export const CONTACT_EMAIL = 'hello@marineforge.com';
export const SUPPORT_EMAIL = 'hello@marineforge.com';
export const PRIVACY_EMAIL = 'privacy@marineforge.com';
export const LEGAL_EMAIL = 'legal@marineforge.com';
export const BILLING_EMAIL = 'billing@marineforge.com';
export const FROM_EMAIL = 'notifications@marineforge.com';

export const SITE_CONFIG = {
  name: 'MarineForge',
  description:
    'MarineForge is a specialized marine marketing agency that transforms boat manufacturer, dealer, and marine technology capabilities into market-ready products through productization, sales enablement, SEO, and AI-powered digital marketing.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://marineforge.com',
  ogImage: '/og-default.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/company/marineforge',
  },
  creator: 'MarineForge Team',
  company: {
    name: 'MarineForge',
    legalName: 'MarineForge LLC',
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
