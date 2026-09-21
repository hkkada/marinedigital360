import type { ServiceData, ServiceGroupId } from './services';
import { getVisibleServices } from './services';

export interface ServiceGroup {
  id: ServiceGroupId;
  label: string;
  tagline: string;
  description: string;
  iconName: string;
  order: number;
}

export interface ServiceGroupWithServices extends ServiceGroup {
  services: ServiceData[];
}

/**
 * Ordered service group taxonomy. Copy is grounded in
 * domain-knowledge/MarineDigital360_Domain_Knowledge.md §6 (Services) and §3
 * (Brand Positioning) — no invented metrics, client names, or capabilities.
 *
 * This list only defines groups and their display copy. Group MEMBERSHIP for
 * a given service lives on that service's `group` field in `services.ts`.
 * `getServicesByGroup()` below derives everything from `getVisibleServices()`
 * — there is no membership list, count, or per-group special case here.
 */
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'sales',
    label: 'Sales',
    tagline: 'Turn capabilities into market-ready products',
    description:
      'Productization, go-to-market strategy, and sales enablement assets that package business capabilities into named, priced, sellable products — plus the pitch decks, playbooks, and battle cards that get them sold.',
    iconName: 'Presentation',
    order: 1,
  },
  {
    id: 'administration',
    label: 'Administration',
    tagline: 'Build scalable revenue systems',
    description:
      'CRM configuration, AI-powered outreach sequences, lead scoring, and pipeline management that keep sales operations running and revenue forecasting accurate.',
    iconName: 'Workflow',
    order: 2,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    tagline: 'Get found, get cited, get chosen',
    description:
      'SEO, GEO/AEO, marketing strategy, web design, and affiliate programs that grow organic visibility, AI search citations, and qualified traffic for businesses.',
    iconName: 'Search',
    order: 3,
  },
  {
    id: 'advertising',
    label: 'Advertising',
    tagline: 'Every dollar tracked. Every click optimized.',
    description:
      'Strategic paid advertising across Google, Bing, and social platforms with bid optimization and ROAS tracking for businesses.',
    iconName: 'MousePointerClick',
    order: 4,
  },
];

/**
 * Groups, in order, each carrying its currently visible services in order.
 * Groups with zero visible services are omitted entirely.
 *
 * Derived entirely from `getVisibleServices()` — flipping a service's
 * `isVisible` flag to `true` is sufficient to have it (and its group, if
 * previously absent) appear here. No code change required.
 */
export function getServicesByGroup(): ServiceGroupWithServices[] {
  const visibleServices = getVisibleServices();

  return SERVICE_GROUPS.map((group) => ({
    ...group,
    services: visibleServices.filter((service) => service.group === group.id),
  })).filter((group) => group.services.length > 0);
}
