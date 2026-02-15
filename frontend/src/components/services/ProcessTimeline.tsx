'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { ProcessTimelineData } from '@/lib/service-pages/types';

interface ProcessTimelineProps {
  data: ProcessTimelineData;
}

export function ProcessTimeline({ data }: ProcessTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/10 rounded-full blur-3xl" />

      <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              Our Process
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-white mb-6">
            {data.headline}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-400 font-light max-w-2xl mx-auto"
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#1877F2]/50 via-[#1877F2]/30 to-transparent hidden md:block" />
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#1877F2]/50 via-[#1877F2]/30 to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-16">
            {data.steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Phase number dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1877F2] border-4 border-gray-900 shadow-lg shadow-[#1877F2]/50 z-10" />

                  {/* Spacer for mobile */}
                  <div className="w-16 flex-shrink-0 md:hidden" />

                  {/* Content card */}
                  <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#1877F2]/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-[#1877F2]/20 text-[#42A5F5] text-xs font-semibold tracking-wide uppercase rounded-full">
                          {step.phase}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#42A5F5]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        <span className="font-medium">{step.deliverable}</span>
                      </div>
                    </div>
                  </div>

                  {/* Empty spacer for the other side on desktop */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
