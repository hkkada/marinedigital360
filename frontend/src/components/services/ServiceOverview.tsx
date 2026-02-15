'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import type { ServiceOverviewData } from '@/lib/service-pages/types';

interface ServiceOverviewProps {
  data: ServiceOverviewData;
}

export function ServiceOverview({ data }: ServiceOverviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1877F2]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
                <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
                  Overview
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-gray-900">
                {data.headline}
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed font-light lg:pt-12"
            >
              {data.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Value cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.cards.map((card, index) => {
            const Icon = getIcon(card.iconName);
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 bg-gray-50 border border-gray-200 rounded-2xl hover:border-[#1877F2]/50 hover:shadow-lg hover:shadow-[#1877F2]/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-[#1877F2]/20">
                    {Icon && <Icon className="text-white" size={22} />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#1877F2] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
