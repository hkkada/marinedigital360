import type { ServicePageData } from './types';
import { productizationPage } from './productization';
import { seoGeoPage } from './seo-geo';
import { webDesignPage } from './web-design';
import { ppcPage } from './ppc';
import { affiliatePage } from './affiliate';

export type { ServicePageData, ServiceSection } from './types';
export type * from './types';

const servicePages: Record<string, ServicePageData> = {
  productization: productizationPage,
  'seo-geo': seoGeoPage,
  'web-design': webDesignPage,
  ppc: ppcPage,
  affiliate: affiliatePage,
};

export function getServicePageData(slug: string): ServicePageData | undefined {
  return servicePages[slug];
}

export function getAllServicePageSlugs(): string[] {
  return Object.keys(servicePages);
}
