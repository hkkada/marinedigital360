'use client';

import { motion, useInView } from 'motion/react';
import { useId, useRef } from 'react';
import { cn } from '@/components/ui/utils';
import type { ContentBlockData } from '@/lib/service-pages/types';

interface ContentBlockProps {
  data: ContentBlockData;
}

/**
 * A long-form prose band on a service page — the section type that carries the
 * definitional / "what this service actually is" copy, and the only one that
 * takes an anchor id and feeds `ServiceSubNav`.
 *
 * Layout follows the site's shipped prose-band pattern:
 * the full `max-w-[1600px]` section container with the reading column
 * constrained to `max-w-3xl` *inside* it and left-aligned — not a centered
 * `max-w-3xl` container. That distinction is what keeps this block's left edge
 * on the same line as the card grids and headers above and below it; centering
 * the narrow column instead floats it against nothing.
 */
const SURFACE_CLASSES = {
  white: 'bg-white',
  light: 'bg-gray-50',
} as const;

export function ContentBlock({ data }: ContentBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const headingId = useId();
  const surface = data.surface ?? 'white';

  return (
    <section
      // The anchor id and its scroll offset belong to `SectionRenderer`, which
      // wraps every linkable section the same way — this component only draws
      // the band.
      className={cn('py-section relative overflow-hidden', SURFACE_CLASSES[surface])}
      aria-labelledby={headingId}
      ref={ref}
    >
      {/* Background accent — matches the sibling light sections */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#1877F2]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-5 sm:mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            {data.eyebrow ? (
              <span className="text-eyebrow uppercase text-ink-accent">
                {data.eyebrow}
              </span>
            ) : null}
          </motion.div>

          <motion.h2
            id={headingId}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-h2 text-ink mb-block"
          >
            {data.headline}
          </motion.h2>

          <div className="space-y-5 sm:space-y-6">
            {data.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
                // The opening paragraph carries the definition and reads as the
                // lead; the rest are supporting detail. Same two-tier prose
                // treatment as the who-we-are block in `Services.tsx`, which stops a multi-paragraph
                // block from rendering as one flat wall of identical text.
                className={
                  index === 0
                    ? 'text-lead text-ink-body font-light'
                    : 'text-body text-ink-body'
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
