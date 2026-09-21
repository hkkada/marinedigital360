/**
 * Brand identity — single source of truth.
 *
 * The brand name is split into two parts because the wordmark styles them
 * differently (part 1 regular weight, part 2 light weight). Change the env
 * vars and every occurrence across the site updates.
 *
 *   NEXT_PUBLIC_BRAND_NAME_PART_1=Marine
 *   NEXT_PUBLIC_BRAND_NAME_PART_2=Digital 360
 *
 * NOTE: these must be NEXT_PUBLIC_* so they are inlined into the client
 * bundle — the wordmark renders inside client components.
 */

const PART_1 = process.env.NEXT_PUBLIC_BRAND_NAME_PART_1?.trim() || 'Marine';
const PART_2 = process.env.NEXT_PUBLIC_BRAND_NAME_PART_2?.trim() || 'Digital 360';
const ABV = process.env.NEXT_PUBLIC_BRAND_NAME_ABV?.trim();

/** "Marine Digital 360" — spaced, human-readable form. */
const FULL_NAME = `${PART_1} ${PART_2}`;

/** "MarineDigital360" — closed-up form used in copy, SEO titles and legal name. */
const COMPACT_NAME = `${PART_1}${PART_2}`.replace(/\s+/g, '');

/** "marinedigital360" — second-level domain / handle form. */
const SLUG = COMPACT_NAME.toLowerCase();

export const BRAND = {
  part1: PART_1,
  part2: PART_2,
  name: FULL_NAME,
  compact: COMPACT_NAME,
  slug: SLUG,
  legalName: `${COMPACT_NAME} LLC`,
  abbreviation: ABV,
} as const;
