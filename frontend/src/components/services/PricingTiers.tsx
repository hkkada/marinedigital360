'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import type { PricingTiersData } from '@/lib/service-pages/types';

interface PricingTiersProps {
  data: PricingTiersData;
}

export function PricingTiers({ data }: PricingTiersProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#1877F2]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              Pricing
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-gray-900 mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className={`grid gap-6 ${
          data.tiers.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'
        } max-w-6xl mx-auto`}>
          {data.tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div
                className={`h-full flex flex-col p-8 rounded-2xl border-2 transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-[#1877F2]/5 to-white border-[#1877F2] shadow-xl shadow-[#1877F2]/10'
                    : 'bg-white border-gray-200 hover:border-[#1877F2]/50 hover:shadow-lg'
                }`}
              >
                {tier.highlighted && (
                  <div className="inline-flex self-start px-3 py-1 bg-[#1877F2] text-white text-xs font-semibold rounded-full mb-4">
                    Recommended
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{tier.description}</p>

                {tier.price && (
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                  </div>
                )}
                {tier.priceLabel && (
                  <div className="text-sm text-[#1877F2] font-semibold mb-6">
                    {tier.priceLabel}
                  </div>
                )}

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#1877F2] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block text-center py-4 px-6 rounded-xl font-semibold transition-all ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] text-white shadow-lg shadow-[#1877F2]/30'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {tier.ctaText}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
