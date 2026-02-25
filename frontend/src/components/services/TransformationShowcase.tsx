'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { X, Check } from 'lucide-react';
import type { TransformationShowcaseData } from '@/lib/service-pages/types';

interface TransformationShowcaseProps {
  data: TransformationShowcaseData;
}

export function TransformationShowcase({ data }: TransformationShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1877F2]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-red-500/10 to-transparent rounded-full blur-3xl" />

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
              The Transformation
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Before / After grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-semibold mb-6">
                <X className="w-4 h-4" />
                {data.before.label}
              </div>
              <ul className="space-y-4">
                {data.before.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-[#1877F2]/30 rounded-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2]/10 text-[#42A5F5] rounded-full text-sm font-semibold mb-6">
                <Check className="w-4 h-4" />
                {data.after.label}
              </div>
              <ul className="space-y-4">
                {data.after.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-[#42A5F5] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
