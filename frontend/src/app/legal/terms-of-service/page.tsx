import { Metadata } from 'next';
import {
  getMarkdownContent,
  extractMarkdownMetadata,
  getTemplateVariables,
  processMarkdownTemplate,
} from '@/lib/markdown';
import { MarkdownPage } from '@/components/legal/MarkdownPage';
import { SITE_CONFIG } from '@/lib/constants';

const pageUrl = `${SITE_CONFIG.url}/legal/terms-of-service`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Service',
    description:
      `${SITE_CONFIG.company.name} Terms of Service: Review our service agreements, intellectual property rights, payment terms, and legal obligations.`,
    keywords: [
      'terms of service',
      'service agreement',
      'consulting terms',
      'legal terms',
      'marine marketing contract',
      `${SITE_CONFIG.company.name} terms`,
    ],
    alternates: {
      canonical: '/legal/terms-of-service',
    },
    openGraph: {
      title: `Terms of Service | ${SITE_CONFIG.name}`,
      description: `Review ${SITE_CONFIG.company.name} service agreements, intellectual property rights, payment terms, and legal obligations.`,
      url: pageUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
    },
  };
}

export default async function TermsOfServicePage() {
  const rawContent = await getMarkdownContent('terms-of-service.md');
  const variables = getTemplateVariables();
  const content = processMarkdownTemplate(rawContent, variables);
  const metadata = extractMarkdownMetadata(content);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `Terms of Service - ${SITE_CONFIG.name}`,
    description: `Terms of Service for ${SITE_CONFIG.company.name}: Service agreements and legal obligations.`,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: pageUrl },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <MarkdownPage
        content={content}
        title={metadata.title}
        lastUpdated={metadata.lastUpdated}
        effectiveDate={metadata.effectiveDate}
        documentUrl={pageUrl}
      />
    </>
  );
}
