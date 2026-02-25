'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import type { PlatformCoverageData } from '@/lib/service-pages/types';

interface PlatformCoverageProps {
  data: PlatformCoverageData;
}

export function PlatformCoverage({ data }: PlatformCoverageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1877F2]/15 to-transparent rounded-full blur-3xl" />

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
              Platforms
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl">
            {data.description}
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {data.platforms.map((platform, index) => {
            const Icon = getIcon(platform.iconName);
            const Check = getIcon('Check');
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
                className="group"
              >
                <div className="h-full p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#1877F2]/40 transition-all duration-300">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center shadow-lg shadow-[#1877F2]/30 flex-shrink-0">
                      {Icon && <Icon className="text-white" size={24} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#1877F2] transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {platform.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        {Check && <Check className="w-4 h-4 text-[#42A5F5] flex-shrink-0" />}
                        {feature}
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
