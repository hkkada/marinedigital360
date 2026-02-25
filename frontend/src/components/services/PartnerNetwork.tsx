'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import type { PartnerNetworkData } from '@/lib/service-pages/types';

interface PartnerNetworkProps {
  data: PartnerNetworkData;
}

export function PartnerNetwork({ data }: PartnerNetworkProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#1877F2]/10 rounded-full blur-3xl" />

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
              Partner Ecosystem
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl">
            {data.description}
          </p>
        </motion.div>

        {/* Partner types grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.partnerTypes.map((partner, index) => {
            const Icon = getIcon(partner.iconName);
            return (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#1877F2]/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#1877F2]/20">
                    {Icon && <Icon className="text-white" size={22} />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#1877F2] transition-colors">
                    {partner.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1877F2] to-[#42A5F5] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
