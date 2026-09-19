'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import { Card, CardBody, IconBox, StatCard } from '@/components/shared';
import type { PartnerNetworkData } from '@/lib/service-pages/types';

interface PartnerNetworkProps {
  data: PartnerNetworkData;
}

export function PartnerNetwork({ data }: PartnerNetworkProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-section bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#1877F2]/10 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-block"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-block">
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
                <Card variant="glass" size="md" className="h-full">
                  <IconBox icon={Icon} className="mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#1877F2] transition-colors">
                    {partner.title}
                  </h3>
                  <CardBody className="leading-relaxed">{partner.description}</CardBody>
                </Card>
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
              <StatCard
                variant="glass"
                hoverable={false}
                value={stat.value}
                label={stat.label}
                valueClassName="text-3xl md:text-4xl bg-gradient-to-r from-[#1877F2] to-[#42A5F5] mb-2"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
