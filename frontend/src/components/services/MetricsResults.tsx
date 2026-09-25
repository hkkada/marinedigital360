'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { StatCard } from '@/components/shared';
import type { MetricsResultsData } from '@/lib/service-pages/types';

interface MetricsResultsProps {
  data: MetricsResultsData;
}

export function MetricsResults({ data }: MetricsResultsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="pt-section-sm pb-section bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#1877F2]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            <span className="text-eyebrow uppercase text-[#1877F2]">
              Results
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </div>
          <h2 className="text-h2 text-gray-900 mb-6">
            {data.headline}
          </h2>
          <p className="text-lead text-gray-600 font-light max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <StatCard
                variant="light"
                className="h-full"
                value={metric.value}
                label={metric.label}
                description={metric.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
