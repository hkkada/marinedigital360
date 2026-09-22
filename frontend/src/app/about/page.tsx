import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation/Navigation';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutCapabilities } from '@/components/about/AboutCapabilities';
import { AboutStats } from '@/components/about/AboutStats';
import { AboutCTA } from '@/components/about/AboutCTA';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = SITE_CONFIG.url;
  const title = `About ${SITE_CONFIG.name} — Digital Marketing Agency`;
  const description = `${SITE_CONFIG.name} turns what a business already does into market-ready products — productization, sales enablement, SEO/GEO, and AI-powered marketing. Learn our mission, values, and how we deliver.`;

  return {
    title,
    description,
    alternates: {
      canonical: '/about',
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/about`,
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header>
        <Navigation />
      </header>
      <main>
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutCapabilities />
        <AboutStats />
        <AboutCTA />
      </main>
      <Contact />
      <Footer />
    </div>
  );
}
