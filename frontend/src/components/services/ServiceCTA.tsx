'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ServiceCTAData } from '@/lib/service-pages/types';

interface ServiceCTAProps {
  data: ServiceCTAData;
}

export function ServiceCTA({ data }: ServiceCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-section bg-brand-navy-deep relative overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="relative p-6 sm:p-10 md:p-20 bg-gradient-to-br from-brand-navy via-brand-navy-raised to-brand-navy-deep rounded-3xl border border-white/10 overflow-hidden"
        >
          {/* Animated background dots */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, #0FF1FD 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          {/* Gradient glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-cyan/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-h2 text-white mb-6"
            >
              {data.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="text-lead text-on-dark font-light mb-10"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.6 }}
            >
              <motion.a
                href={data.ctaHref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 py-4 sm:px-9 sm:py-5 md:px-12 md:py-6 bg-gradient-to-r from-[#00CEFA] to-[#00A1FD] text-brand-navy-deep rounded-full text-body font-semibold shadow-2xl shadow-[#00A1FD]/40 hover:shadow-[#00A1FD]/60 transition-shadow"
              >
                {data.ctaText}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
