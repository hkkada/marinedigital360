import type { MetadataRoute } from 'next';
import { getAllServicePageSlugs } from '@/lib/service-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = getAllServicePageSlugs().map((slug) => ({
    url: `https://marineforge.com/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://marineforge.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...servicePages,
  ];
}
