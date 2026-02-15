import type { ServicePageData } from '@/lib/service-pages/types';
import type { ServiceData } from '@/lib/services';

interface ServiceStructuredDataProps {
  pageData: ServicePageData;
  serviceData: ServiceData;
}

export function ServiceStructuredData({ pageData, serviceData }: ServiceStructuredDataProps) {
  const baseUrl = 'https://marineforge.com';
  const pageUrl = `${baseUrl}/services/${pageData.slug}`;

  // Extract FAQ data from sections
  const faqSection = pageData.sections.find((s) => s.type === 'service-faq');
  const faqItems = faqSection?.type === 'service-faq' ? faqSection.data.items : [];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: serviceData.title,
    description: serviceData.schemaDescription,
    provider: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'MarineForge',
      url: baseUrl,
    },
    serviceType: serviceData.serviceType,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    url: pageUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${baseUrl}/#services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: serviceData.title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
