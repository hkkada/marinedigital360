'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/components/ui/utils';

/**
 * Standardized card surface. Owns the shared radius, padding, surface
 * treatment, and hover/lift motion so callers never need to re-skin a card
 * by hand — see `.superpowers/sdd/todo/task-2-report.md` for worked examples.
 */
const cardVariants = cva('relative rounded-2xl border transition-colors duration-300', {
  variants: {
    /** Surface family. `light` = white card on a light section; `glass` = translucent card on a dark section; `solid` = opaque dark card on a light section. */
    variant: {
      light: 'bg-white border-gray-200 text-ink',
      glass: 'bg-white/5 backdrop-blur-sm border-white/10 text-white',
      solid: 'bg-brand-navy border-brand-navy-line text-white',
    },
    /**
     * Padding only. `md` is the default per the audit. Font size used to be
     * welded in here (`md` and `lg` had identical padding and differed *only*
     * in body text size), which meant you could not restate a card's padding
     * without also changing its typography. Type now comes from the scale in
     * `globals.css` via `CardTitle`/`CardBody`.
     * `none` emits no padding classes at all — use it when the
     * caller supplies its own padding via `className`. `tailwind-merge`
     * only dedupes classes that share the exact same responsive modifier,
     * so overriding e.g. `p-6 sm:p-7 md:p-8` with a plain `className="p-8
     * md:p-10"` would leave the orphaned `sm:p-7` in place and create a
     * padding notch — `size="none"` sidesteps that instead of asking
     * callers to write matching per-breakpoint overrides.
     */
    size: {
      sm: 'p-5 sm:p-6',
      md: 'p-6 sm:p-7 md:p-8',
      lg: 'p-6 sm:p-7 md:p-8',
      none: '',
    },
    /** Semantic border/accent only — does not touch the surface. `neutral` leaves the variant's own border untouched. */
    tone: {
      neutral: '',
      negative: 'border-red-500/20',
      positive: 'border-brand-cyan/30',
    },
  },
  defaultVariants: {
    variant: 'light',
    size: 'md',
    tone: 'neutral',
  },
});

export type CardVariant = VariantProps<typeof cardVariants>['variant'];
export type CardSize = VariantProps<typeof cardVariants>['size'];
export type CardTone = VariantProps<typeof cardVariants>['tone'];

type ResolvedCardVariant = 'light' | 'glass' | 'solid';
type ResolvedCardSize = 'sm' | 'md' | 'lg' | 'none';

/**
 * Lets `CardTitle`/`CardBody` pick the right typography without every
 * caller re-stating the parent `Card`'s `variant`/`size`. Not exported —
 * an implementation detail of the title/body slots.
 */
const CardContext = React.createContext<{
  variant: ResolvedCardVariant;
  size: ResolvedCardSize;
}>({
  variant: 'light',
  size: 'md',
});

const HIGHLIGHTED_CLASSES =
  'border-2 border-[#1877F2] bg-gradient-to-b from-[#1877F2]/5 to-white shadow-xl shadow-[#1877F2]/10';

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'className'>,
    VariantProps<typeof cardVariants> {
  /**
   * Featured/recommended treatment (e.g. a highlighted pricing tier):
   * border-2, brand-blue border, a subtle gradient wash, and an elevated
   * shadow. Overrides `tone` and the standard hover border-tint.
   */
  highlighted?: boolean;
  /**
   * Enables the standard hover treatment — `hover:border-[#1877F2]/50` plus
   * a `y: -4` lift. Defaults to true; set false for static cards that
   * shouldn't react to hover (e.g. a before/after comparison pair).
   */
  hoverable?: boolean;
  className?: string;
}

export function Card({
  variant,
  size,
  tone,
  highlighted = false,
  hoverable = true,
  className,
  transition,
  children,
  ...props
}: CardProps) {
  const resolvedVariant: ResolvedCardVariant = variant ?? 'light';
  const resolvedSize: ResolvedCardSize = size ?? 'md';

  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={transition ?? { duration: 0.3 }}
      className={cn(
        cardVariants({ variant, size, tone }),
        hoverable &&
          !highlighted &&
          (resolvedVariant === 'light'
            ? 'hover:border-[#1877F2]/50'
            : 'hover:border-brand-cyan/50'),
        highlighted && HIGHLIGHTED_CLASSES,
        className,
      )}
      {...props}
    >
      <CardContext.Provider value={{ variant: resolvedVariant, size: resolvedSize }}>
        {children as React.ReactNode}
      </CardContext.Provider>
    </motion.div>
  );
}

/** Title typography per the standard: the shared `text-h3` step. Color is inherited from the parent `Card`'s variant text color — not restated here. */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading tag to render. Defaults to `h3`, the level used by every existing card grid. */
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function CardTitle({ as: Tag = 'h3', className, ...props }: CardTitleProps) {
  return <Tag className={cn('text-h3 font-semibold', className)} {...props} />;
}

/**
 * Body typography: the shared `text-body` step, plus the variant's muted body
 * color — gray-600 on `light`, gray-400 on `glass`/`solid`.
 *
 * This used to be a `CARD_BODY_TEXT_SIZE` lookup keyed on the parent card's
 * `size`, duplicating the font size already baked into `cardVariants.size` so
 * the two could drift. Card body copy is one size everywhere now; it also
 * clears the 14px that `sm`/`md` cards were rendering, which is below the
 * readable floor for body text on a phone.
 */
export interface CardBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function CardBody({ className, ...props }: CardBodyProps) {
  const { variant } = React.useContext(CardContext);
  return (
    <p
      className={cn(
        'text-body',
        variant === 'light' ? 'text-ink-body' : 'text-on-dark',
        className,
      )}
      {...props}
    />
  );
}
