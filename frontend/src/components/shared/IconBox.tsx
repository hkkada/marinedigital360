import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/components/ui/utils';
import type { LucideIcon } from 'lucide-react';

/**
 * Standardized icon chip: a gradient (or glass) rounded box with a
 * fixed-size inner icon. Standardizes on `<Icon className="w-6 h-6" />`
 * rather than the `size={N}` prop, per the audit ruling.
 */
const iconBoxVariants = cva('flex items-center justify-center flex-shrink-0', {
  variants: {
    /** `gradient` is the standard brand chip. `glass` is the subdued chip used on dense, dark lists (e.g. a tech-stack grid). */
    variant: {
      gradient: 'bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] shadow-lg shadow-[#1877F2]/20',
      glass: 'bg-white/10',
    },
    size: {
      sm: 'w-10 h-10 rounded-lg',
      md: 'w-12 h-12 rounded-xl',
      lg: 'w-14 h-14 rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'gradient',
    size: 'md',
  },
});

export type IconBoxVariant = VariantProps<typeof iconBoxVariants>['variant'];
export type IconBoxSize = VariantProps<typeof iconBoxVariants>['size'];

const ICON_SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
};

export interface IconBoxProps extends VariantProps<typeof iconBoxVariants> {
  /** The icon component to render (a Lucide icon, or any component accepting `className`). Renders nothing if omitted/falsy — callers doing dynamic icon lookups don't need an extra guard. */
  icon?: LucideIcon | React.ComponentType<{ className?: string }> | null;
  /** Layout-only passthrough (margins, flex alignment), merged via `cn()`. */
  className?: string;
  /** Icon color override. Defaults to white for `gradient`, brand blue (#42A5F5) for `glass`. */
  iconClassName?: string;
}

export function IconBox({ icon: Icon, variant, size, className, iconClassName }: IconBoxProps) {
  const resolvedSize: 'sm' | 'md' | 'lg' = size ?? 'md';
  const resolvedVariant: 'gradient' | 'glass' = variant ?? 'gradient';

  return (
    <div className={cn(iconBoxVariants({ variant, size }), className)}>
      {Icon ? (
        <Icon
          className={cn(
            ICON_SIZE_CLASSES[resolvedSize],
            iconClassName ?? (resolvedVariant === 'glass' ? 'text-[#42A5F5]' : 'text-white'),
          )}
        />
      ) : null}
    </div>
  );
}
