import { BRAND } from '@/lib/brand';

interface BrandWordmarkProps {
  /** Classes for the wrapping element (size, color, tracking, etc.). */
  className?: string;
}

/**
 * The two-tone brand wordmark: part 1 in the base weight, part 2 in light.
 * Sourced from BRAND so the name lives in exactly one place.
 */
export function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <span className={className}>
      {BRAND.part1.toUpperCase()}
      <span className="font-light"> {BRAND.part2.toUpperCase()}</span>
    </span>
  );
}
