import { Metadata } from 'next';
import {
  getMarkdownContent,
  extractMarkdownMetadata,
  getTemplateVariables,
  processMarkdownTemplate,
} from '@/lib/markdown';
import { MarkdownPage } from '@/components/legal/MarkdownPage';
import { SITE_CONFIG } from '@/lib/constants';

const pageUrl = `${SITE_CONFIG.url}/legal/privacy-policy`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy',
    description:
      `${SITE_CONFIG.company.name} Privacy Policy: Learn how we collect, use, and protect your personal information. GDPR, CCPA, and DPDP Act compliant.`,
    keywords: [
      'privacy policy',
      'data protection',
      'GDPR compliance',
      'CCPA compliance',
      'personal information',
      'data privacy',
      `${SITE_CONFIG.company.name} privacy`,
    ],
    alternates: {
      canonical: '/legal/privacy-policy',
    },
    openGraph: {
      title: `Privacy Policy | ${SITE_CONFIG.name}`,
      description: `Learn how ${SITE_CONFIG.company.name} collects, uses, and protects your personal information.`,
      url: pageUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
    },
  };
}

export default async function PrivacyPolicyPage() {
  const rawContent = await getMarkdownContent('privacy-policy.md');
  const variables = getTemplateVariables();
  const content = processMarkdownTemplate(rawContent, variables);
  const metadata = extractMarkdownMetadata(content);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `Privacy Policy - ${SITE_CONFIG.name}`,
    description: `Privacy Policy for ${SITE_CONFIG.company.name}: How we collect, use, and protect your information.`,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: pageUrl },
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
