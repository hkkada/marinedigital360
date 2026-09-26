import { BRAND } from '@/lib/brand';

interface BrandWordmarkProps {
  /** Classes for the wrapping element (size, color, tracking, etc.). */
  className?: string;
  /**
   * Two-line lockup used beside the logo mark in the nav: every word but the
   * last on line one, the last word on line two ("CRESCENT CITY" / "DIGITAL").
   * Splits the full name rather than part1/part2, whose boundary falls in a
   * different place than the lockup's line break.
   */
  stacked?: boolean;
}

/**
 * The two-tone brand wordmark: part 1 in the base weight, part 2 in light.
 * Sourced from BRAND so the name lives in exactly one place.
 */
export function BrandWordmark({ className, stacked = false }: BrandWordmarkProps) {
  if (stacked) {
    const words = `${BRAND.part1} ${BRAND.part2}`.toUpperCase().split(/\s+/);
    const last = words.pop();
    return (
      <span className={className}>
        <span className="block">{words.join(' ')}</span>
        <span className="block">{last}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      {BRAND.part1.toUpperCase()}
      <span className="font-light"> {BRAND.part2.toUpperCase()}</span>
    </span>
  );
}
