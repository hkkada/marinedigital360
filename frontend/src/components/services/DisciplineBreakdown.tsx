'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { getIcon } from '@/lib/icon-map';
import type { DisciplineBreakdownData } from '@/lib/service-pages/types';

interface DisciplineBreakdownProps {
  data: DisciplineBreakdownData;
}

export function DisciplineBreakdown({ data }: DisciplineBreakdownProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(data.disciplines[0]?.id ?? '');

  const activeDiscipline = data.disciplines.find((d) => d.id === activeTab) ?? data.disciplines[0];
  const Check = getIcon('Check');

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1877F2]/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0D5DBF]/15 to-transparent rounded-full blur-3xl" />

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
              The Three Disciplines
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mb-12 max-w-3xl mx-auto"
        >
          {data.disciplines.map((discipline) => {
            const Icon = getIcon(discipline.iconName);
            const isActive = discipline.id === activeTab;
            return (
              <button
                key={discipline.id}
                onClick={() => setActiveTab(discipline.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] text-white shadow-lg shadow-[#1877F2]/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {Icon && <Icon size={20} />}
                <span>{discipline.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active discipline detail */}
        {activeDiscipline && (
          <motion.div
            key={activeDiscipline.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <div className="p-8 md:p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left: description */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {activeDiscipline.fullName}
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    {activeDiscipline.description}
                  </p>

                  {/* Metrics */}
                  <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#42A5F5] mb-4">
                    Expected Results
                  </h4>
                  <ul className="space-y-3">
                    {activeDiscipline.metrics.map((metric, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        {Check && <Check className="w-5 h-5 text-[#42A5F5] flex-shrink-0 mt-0.5" />}
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: tactics */}
                <div>
                  <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#42A5F5] mb-4">
                    What We Do
                  </h4>
                  <ul className="space-y-3">
                    {activeDiscipline.tactics.map((tactic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#1877F2]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-[#42A5F5]">
                            {i + 1}
                          </span>
                        </div>
                        <span className="text-gray-300">{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
