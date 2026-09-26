'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import { Card, IconBox } from '@/components/shared';
import type { TechStackData } from '@/lib/service-pages/types';

interface TechStackProps {
  data: TechStackData;
}

export function TechStack({ data }: TechStackProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-section bg-gradient-to-b from-brand-navy to-brand-navy-deep relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan to-transparent" />
            <span className="text-eyebrow uppercase text-brand-cyan">
              Technology
            </span>
          </motion.div>

          <h2 className="text-h2 text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-lead text-on-dark font-light max-w-3xl">
            {data.description}
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-block">
          {data.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.15 }}
            >
              <h3 className="text-h3 text-brand-cyan mb-6">
                {category.name}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.tools.map((tool, toolIndex) => {
                  const Icon = getIcon(tool.iconName);
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + catIndex * 0.15 + toolIndex * 0.05 }}
                      className="group"
                    >
                      <Card variant="glass" size="none" hoverable className="flex items-start gap-4 p-5">
                        <IconBox icon={Icon} variant="glass" size="sm" />
                        <div>
                          <h4 className="text-h4 text-white mb-1 group-hover:text-brand-cyan transition-colors">
                            {tool.name}
                          </h4>
                          <p className="text-meta text-on-dark-muted">
                            {tool.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
