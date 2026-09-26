'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { StatCard } from '@/components/shared';

/**
 * Stats band. These two figures are copied verbatim from the homepage
 * `About.tsx` stats array (its other two entries are already commented out
 * there) — reused as approved copy rather than inventing new metrics, per
 * the brief.
 */
const stats = [
  { number: '12+', label: 'Years', sublabel: 'Industry expertise' },
  { number: '100%', label: 'Retention', sublabel: 'Client satisfaction' },
];

export function AboutStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about-stats"
      aria-labelledby="about-stats-heading"
      className="py-section bg-white relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            <span className="text-eyebrow uppercase text-ink-accent">
              By The Numbers
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </div>
          <h2
            id="about-stats-heading"
            className="text-h2 text-ink"
          >
            Built on results, not promises
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
            >
              <StatCard
                variant="light"
                value={stat.number}
                label={stat.label}
                description={stat.sublabel}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
