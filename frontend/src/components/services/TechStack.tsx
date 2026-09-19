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
    <section className="py-section bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1877F2]/10 rounded-full blur-3xl" />

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
              Technology
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl">
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
              <h3 className="text-lg font-semibold text-[#42A5F5] mb-6 tracking-wide">
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
                          <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-[#42A5F5] transition-colors">
                            {tool.name}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
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
