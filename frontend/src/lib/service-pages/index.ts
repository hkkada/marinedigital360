import type { ServicePageData } from './types';
import { productizationPage } from './productization';
import { seoPage } from './seo';
import { geoAeoPage } from './geo-aeo';
import { webDesignPage } from './web-design';
import { ppcPage } from './ppc';
import { affiliatePage } from './affiliate';

export type { ServicePageData, ServiceSection } from './types';
export type * from './types';

const servicePages: Record<string, ServicePageData> = {
  productization: productizationPage,
  seo: seoPage,
  'geo-aeo': geoAeoPage,
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
