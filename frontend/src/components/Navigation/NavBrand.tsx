import Image from 'next/image';
import { cn } from '@/components/ui/utils';
import { BrandWordmark } from '@/components/BrandWordmark';

interface NavBrandProps {
  /** Wordmark colour — white on the navy bar, ink in the light mobile drawer. */
  className?: string;
  /**
   * The mark's moon is dark navy — the same value as the nav bar — so on a dark
   * surface it needs a cyan rim to read at all (the mockup's luminous edge).
   */
  glow?: boolean;
}

/**
 * Logo lockup: the crescent-moon mark beside the stacked, letter-spaced
 * wordmark. The mark is a tight crop of `crescentmoon-logo.png`
 * (`crescentmoon-mark.png`, 256px) — the source is 1376×768 with the mark
 * occupying a third of it, which would have forced a huge box for a small
 * glyph. It is decorative next to the wordmark, so the alt text is empty.
 */
export function NavBrand({ className, glow = false }: NavBrandProps) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/logo/crescentmoon-mark.png"
        alt=""
        width={256}
        height={252}
        priority
        className={cn(
          'h-12 w-auto lg:h-14',
          glow && '[filter:drop-shadow(0_0_1px_rgba(15,241,253,0.9))_drop-shadow(0_0_8px_rgba(15,241,253,0.45))]',
        )}
      />
      <BrandWordmark
        stacked
        className={cn(
          'text-[1.0625rem] font-bold leading-[1.1] tracking-[0.14em] whitespace-nowrap lg:text-[1.1875rem]',
          className,
        )}
      />
    </span>
  );
}
