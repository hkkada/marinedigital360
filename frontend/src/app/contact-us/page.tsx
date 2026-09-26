import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation/Navigation';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SITE_CONFIG, CONTACT_CONFIG } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = SITE_CONFIG.url;
  const title = `Contact ${SITE_CONFIG.name} — Start a Project`;
  const description = `Tell us about your project and we'll respond within ${CONTACT_CONFIG.responseTime}. Book a free ${CONTACT_CONFIG.booking.consultationDuration}-minute discovery call with ${SITE_CONFIG.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: '/contact-us',
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/contact-us`,
      type: 'website',
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header>
        <Navigation />
      </header>
      {/*
        The nav is fixed and transparent until scrolled, so this page — which has
        no dark hero to sit under it — needs its own top padding to clear it.
      */}
      <main className="pt-28 lg:pt-32">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
