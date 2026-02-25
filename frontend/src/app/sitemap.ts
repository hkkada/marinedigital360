import type { MetadataRoute } from 'next';
import { getAllServicePageSlugs } from '@/lib/service-pages';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = getAllServicePageSlugs().map((slug) => ({
    url: `${SITE_CONFIG.url}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...servicePages,
  ];
}
