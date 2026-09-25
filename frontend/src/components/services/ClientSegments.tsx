'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import { Card, CardTitle, IconBox } from '@/components/shared';
import type { ClientSegmentsData } from '@/lib/service-pages/types';

interface ClientSegmentsProps {
  data: ClientSegmentsData;
}

export function ClientSegments({ data }: ClientSegmentsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-section bg-gradient-to-b from-brand-navy to-brand-navy-deep relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan to-transparent" />
            <span className="text-eyebrow uppercase text-brand-cyan">
              Who It&#39;s For
            </span>
          </motion.div>

          <h2 className="text-h2 text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-lead text-gray-400 font-light max-w-3xl">
            {data.description}
          </p>
        </motion.div>

        {/* Segment cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.segments.map((segment, index) => {
            const Icon = getIcon(segment.iconName);
            const Check = getIcon('Check');
            return (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="group"
              >
                <Card variant="glass" size="none" className="h-full p-8">
                  <IconBox icon={Icon} surface="dark" size="lg" className="mb-5" />

                  <CardTitle className="mb-3 group-hover:text-brand-cyan transition-colors">
                    {segment.title}
                  </CardTitle>
                  <p className="text-gray-400 leading-relaxed mb-5">
                    {segment.description}
                  </p>

                  <ul className="space-y-2">
                    {segment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-body text-gray-300">
                        {Check && <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />}
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
