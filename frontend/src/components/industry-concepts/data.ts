import {
  BedDouble,
  Clapperboard,
  Cloud,
  Factory,
  FlagTriangleRight,
  GraduationCap,
  HardHat,
  Home,
  Newspaper,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  Utensils,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Single source of truth for the "Industries We Serve" section.
 *
 * All eight concept components under `components/industry-concepts/` read from this
 * array — nothing hardcodes an industry name, order, or count. When a concept
 * is chosen and promoted to the home page, this file moves with it unchanged.
 *
 * NOTE ON `metric`: these are market-level, directional statements about how
 * digital demand behaves in each sector. They are deliberately QUALITATIVE —
 * no percentages, no dollar figures, no conversion rates — because nothing
 * here has been sourced and this copy now renders on the public home page.
 * They are also NOT our own results.
 *
 * If you want hard numbers, they need a citation each and the line should say
 * where it came from. Do not reintroduce a statistic without one.
 */
export interface Industry {
  /** Display name. */
  name: string;
  /** Lucide icon. Imported directly rather than via `lib/icon-map`, which
   *  doesn't carry these fifteen — promoting a concept can register them there. */
  icon: LucideIcon;
  /** One-line proof: what we actually do in this market. */
  proof: string;
  /** Market-level context line. See the placeholder warning above. */
  metric: string;
  /** Short monospace status token — used only by the Market Board concept. */
  signal: string;
  /** SERP-style snippet — used only by the SERP Simulator concept. */
  snippet: string;
}

export const INDUSTRIES: Industry[] = [
  {
    name: 'Real Estate',
    icon: Home,
    proof: 'Listing pages that rank, and tours that fill.',
    metric: 'The search starts online, long before the office',
    signal: 'SEARCH-LED',
    snippet: 'Listings that surface before the agent does.',
  },
  {
    name: 'Education',
    icon: GraduationCap,
    proof: 'Enrolment funnels that fill every intake.',
    metric: 'Most enquiries now start on search or social',
    signal: 'INTAKE-DRIVEN',
    snippet: 'Enrolment pages built around the questions applicants actually ask.',
  },
  {
    name: 'Construction',
    icon: HardHat,
    proof: 'Bid-ready proof on every project page.',
    metric: 'Buyers shortlist long before the first call',
    signal: 'PRE-SHORTLISTED',
    snippet: 'Project proof that wins the bid before the meeting.',
  },
  {
    name: 'Retail',
    icon: Store,
    proof: 'Foot traffic that starts on a screen.',
    metric: 'Local search precedes a large share of visits',
    signal: 'LOCAL-INTENT',
    snippet: 'Local search that puts your door on the map.',
  },
  {
    name: 'E-commerce',
    icon: ShoppingCart,
    proof: 'Product pages built to convert cold traffic.',
    metric: 'Traffic is the easy part; conversion is the margin',
    signal: 'CONVERSION-CAP',
    snippet: 'Product pages that earn the click and close it.',
  },
  {
    name: 'Industrial',
    icon: Settings,
    proof: 'Technical buyers find specs, not slogans.',
    metric: 'Spec-led search drives industrial shortlists',
    signal: 'SPEC-LED',
    snippet: 'Spec-first content technical buyers can actually use.',
  },
  {
    name: 'B2B SaaS',
    icon: Cloud,
    proof: 'Demand gen that shortens the sales cycle.',
    metric: 'Buyers self-educate through most of the cycle',
    signal: 'SELF-SERVE',
    snippet: 'Demand gen that does the selling before the demo.',
  },
  {
    name: 'Media',
    icon: Newspaper,
    proof: 'Audience growth that survives the algorithm.',
    metric: 'Discovery is shifting to answer engines',
    signal: 'SHIFTING',
    snippet: 'Audience you own, not audience you rent.',
  },
  {
    name: 'Entertainment',
    icon: Clapperboard,
    proof: 'Launch windows that sell out.',
    metric: 'Attention peaks in the week before release',
    signal: 'WINDOWED',
    snippet: 'Launch campaigns timed to the attention curve.',
  },
  {
    name: 'Hospitality',
    icon: BedDouble,
    proof: 'Direct bookings instead of OTA commission.',
    metric: 'Direct channels keep the margin an OTA takes',
    signal: 'MARGIN-LEAK',
    snippet: 'Direct bookings that keep the commission in-house.',
  },
  {
    name: 'Logistics',
    icon: Truck,
    proof: 'Capacity marketed to the shippers who need it.',
    metric: 'Procurement starts with a search, not an RFP',
    signal: 'PROCUREMENT',
    snippet: 'Capacity put in front of shippers at the moment they look.',
  },
  {
    name: 'Manufacturing',
    icon: Factory,
    proof: 'Distribution and direct demand, working together.',
    metric: 'Digital is now the first touch for most orders',
    signal: 'FIRST-TOUCH',
    snippet: 'Direct demand that works with your distributors, not against them.',
  },
  {
    name: 'Food & Beverage',
    icon: Utensils,
    proof: 'Menus, reviews and maps as one funnel.',
    metric: 'Reviews and maps decide most dining choices',
    signal: 'REVIEW-WEIGHTED',
    snippet: 'Menus, maps and reviews pulling in the same direction.',
  },
  {
    name: 'GolfTech',
    icon: FlagTriangleRight,
    proof: 'Niche products, precisely targeted buyers.',
    metric: 'Small audience, high intent, very low waste',
    signal: 'HIGH-INTENT',
    snippet: 'A small, high-intent audience reached without waste.',
  },
  {
    name: 'Home Services',
    icon: Wrench,
    proof: 'Booked jobs the moment demand appears.',
    metric: 'Urgent jobs go to whoever ranks first',
    signal: 'URGENT',
    snippet: 'Booked jobs from the moment someone needs you.',
  },
];

/** URL slug for an industry, e.g. "Food & Beverage" → "food-beverage". */
export function industrySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
