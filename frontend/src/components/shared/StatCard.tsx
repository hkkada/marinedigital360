'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/components/ui/utils';
import { Card, type CardProps } from './Card';

export interface StatCardProps
  extends Pick<CardProps, 'variant' | 'size' | 'tone' | 'highlighted' | 'hoverable'> {
  /** The big headline figure, e.g. "3.2x" or "$4.1M". Rendered with the brand gradient text treatment and a hover scale. */
  value: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Layout-only passthrough (grid span, margins), merged via `cn()`. */
  className?: string;
  /** Override for the value's gradient-text classes (rare — prefer the defaults). */
  valueClassName?: string;
}

/**
 * A stat card: big gradient value + label + muted description, centered.
 * Built on `Card` — pass `variant`/`size`/`tone` straight through.
 */
export function StatCard({
  value,
  label,
  description,
  variant,
  size,
  tone,
  highlighted,
  hoverable,
  className,
  valueClassName,
}: StatCardProps) {
  const isDark = variant === 'glass' || variant === 'solid';

  return (
    <Card
      variant={variant}
      size={size}
      tone={tone}
      highlighted={highlighted}
      hoverable={hoverable}
      className={cn('text-center', className)}
    >
      <motion.div
        className={cn(
          'text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] bg-clip-text text-transparent mb-3',
          valueClassName,
        )}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {value}
      </motion.div>
      <div className="text-base font-semibold mb-1">{label}</div>
      {description ? (
        <div className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>
          {description}
        </div>
      ) : null}
    </Card>
  );
}
