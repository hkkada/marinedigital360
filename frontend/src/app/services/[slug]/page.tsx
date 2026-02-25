import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation/Navigation';
import { Contact } from '@/components/Contact';
import { SectionRenderer } from '@/components/services/SectionRenderer';
import { RelatedServices } from '@/components/services/RelatedServices';
import { ServiceStructuredData } from '@/components/services/ServiceStructuredData';
import { getServicePageData, getAllServicePageSlugs } from '@/lib/service-pages';
import { getServiceBySlug } from '@/lib/services';
import { SITE_CONFIG } from '@/lib/constants';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServicePageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getServicePageData(slug);
  if (!pageData) return {};

  const baseUrl = SITE_CONFIG.url;

  return {
    title: pageData.metadata.title,
    description: pageData.metadata.description,
    keywords: pageData.metadata.keywords,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: pageData.metadata.title,
      description: pageData.metadata.description,
      url: `${baseUrl}/services/${slug}`,
      type: 'website',
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.metadata.title,
      description: pageData.metadata.description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const pageData = getServicePageData(slug);
  const serviceData = getServiceBySlug(slug);

  if (!pageData || !serviceData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ServiceStructuredData pageData={pageData} serviceData={serviceData} />
      <header>
        <Navigation />
      </header>
      <main>
        <SectionRenderer
          sections={pageData.sections}
          serviceName={pageData.title}
          iconName={pageData.iconName}
        />
        <RelatedServices currentSlug={slug} />
      </main>
      <Contact />
    </div>
  );
}
