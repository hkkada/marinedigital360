'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { getIcon } from '@/lib/icon-map';
import { Card, CardBody, CardTitle, IconBox } from '@/components/shared';
import type { PlatformCoverageData } from '@/lib/service-pages/types';

interface PlatformCoverageProps {
  data: PlatformCoverageData;
}

export function PlatformCoverage({ data }: PlatformCoverageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-section bg-brand-navy-deep relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-cyan/10 to-transparent rounded-full blur-3xl" />

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
              Platforms
            </span>
          </motion.div>

          <h2 className="text-h2 text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-lead text-on-dark font-light max-w-3xl">
            {data.description}
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {data.platforms.map((platform, index) => {
            const Icon = getIcon(platform.iconName);
            const Check = getIcon('Check');
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
                className="group"
              >
                <Card variant="glass" size="none" className="h-full p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <IconBox icon={Icon} surface="dark" size="lg" className="flex-shrink-0" />
                    <div className="min-w-0">
                      <CardTitle className="mb-1 group-hover:text-brand-cyan transition-colors">
                        {platform.name}
                      </CardTitle>
                      <CardBody className="leading-relaxed">{platform.description}</CardBody>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {platform.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-body text-on-dark">
                        {Check && <Check className="w-4 h-4 text-brand-cyan flex-shrink-0" />}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
