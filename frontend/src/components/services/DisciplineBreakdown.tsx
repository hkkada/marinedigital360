'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { getIcon } from '@/lib/icon-map';
import { Card } from '@/components/shared';
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
    <section className="py-section bg-brand-navy-deep relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-cyan/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#00A1FD]/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
            <span className="text-eyebrow uppercase text-brand-cyan">
              The Three Disciplines
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan via-transparent to-transparent" />
          </div>
          <h2 className="text-h2 text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-lead text-gray-400 font-light max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mb-block max-w-3xl mx-auto"
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
                    ? 'bg-gradient-to-r from-[#00CEFA] to-[#00A1FD] text-brand-navy-deep shadow-lg shadow-[#00A1FD]/30'
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
            <Card variant="glass" size="none" hoverable={false} className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left: description */}
                <div>
                  <h3 className="text-h3 text-white mb-2">
                    {activeDiscipline.fullName}
                  </h3>
                  <p className="text-body text-gray-400 mb-8">
                    {activeDiscipline.description}
                  </p>

                  {/* Metrics */}
                  <h4 className="text-eyebrow uppercase text-brand-cyan mb-4">
                    Expected Results
                  </h4>
                  <ul className="space-y-3">
                    {activeDiscipline.metrics.map((metric, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        {Check && <Check className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />}
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: tactics */}
                <div>
                  <h4 className="text-eyebrow uppercase text-brand-cyan mb-4">
                    What We Do
                  </h4>
                  <ul className="space-y-3">
                    {activeDiscipline.tactics.map((tactic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-meta font-bold text-brand-cyan">
                            {i + 1}
                          </span>
                        </div>
                        <span className="text-gray-300">{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
