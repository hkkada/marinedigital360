'use client';

import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import { getIcon } from '@/lib/icon-map';
import type { ProcessTimelineData } from '@/lib/service-pages/types';

interface TimelineStepProps {
  step: ProcessTimelineData['steps'][number];
  index: number;
}

function TimelineStep({ step, index }: TimelineStepProps) {
  const stepRef = useRef(null);
  const isInView = useInView(stepRef, { once: true, margin: '-80px' });
  const Icon = getIcon(step.iconName);
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <div ref={stepRef} className="relative grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6">
      {/* Milestone node column */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`relative z-10 w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-500 ${
            isInView
              ? 'bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] border-2 border-[#1877F2] text-white shadow-lg shadow-[#1877F2]/30'
              : 'bg-white/5 border-2 border-white/20 text-gray-500'
          }`}
        >
          {stepNumber}
        </motion.div>
      </div>

      {/* Card column */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ y: -2 }}
        className="pb-8 md:pb-12"
      >
        <div className="p-5 md:p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#1877F2]/30 hover:shadow-lg hover:shadow-[#1877F2]/5 transition-all duration-300">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="w-10 h-10 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-lg flex items-center justify-center shadow-md shadow-[#1877F2]/20 flex-shrink-0">
                  <Icon className="text-white" size={20} />
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                {step.title}
              </h3>
            </div>
            <span className="sm:ml-auto px-3 py-1 bg-[#1877F2]/10 text-[#42A5F5] text-xs font-semibold tracking-wide rounded-full border border-[#1877F2]/20 w-fit">
              {step.duration}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed mt-4">
            {step.description}
          </p>

          {/* Deliverables */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/10">
            {step.deliverables.map((deliverable, i) => (
              <motion.span
                key={deliverable}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2]/10 rounded-full text-sm text-[#42A5F5]"
              >
                <Check size={14} className="flex-shrink-0" />
                {deliverable}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ProcessTimelineProps {
  data: ProcessTimelineData;
}

export function ProcessTimeline({ data }: ProcessTimelineProps) {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const fillScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/10 rounded-full blur-3xl" />

      <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
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
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-400 font-light max-w-2xl mx-auto"
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Progress rail */}
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1877F2] to-[#42A5F5] origin-top shadow-[0_0_8px_rgba(24,119,242,0.4)]"
              style={{ scaleY: fillScaleY }}
            />
          </div>

          {/* Steps */}
          <div>
            {data.steps.map((step, index) => (
              <TimelineStep
                key={step.title}
                step={step}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
