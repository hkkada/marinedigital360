'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import type { ClientSegmentsData } from '@/lib/service-pages/types';

interface ClientSegmentsProps {
  data: ClientSegmentsData;
}

export function ClientSegments({ data }: ClientSegmentsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1877F2]/10 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              Who It&#39;s For
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl">
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
                <div className="h-full p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#1877F2]/40 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-[#1877F2]/30">
                    {Icon && <Icon className="text-white" size={24} />}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#1877F2] transition-colors">
                    {segment.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-5">
                    {segment.description}
                  </p>

                  <ul className="space-y-2">
                    {segment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        {Check && <Check className="w-4 h-4 text-[#42A5F5] flex-shrink-0" />}
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
