'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { getImageProps, type ImageKey } from '@/lib/image-map';
import { Card, CardBody, CardTitle } from '@/components/shared';
import type { PortfolioShowcaseData } from '@/lib/service-pages/types';

interface PortfolioShowcaseProps {
  data: PortfolioShowcaseData;
}

export function PortfolioShowcase({ data }: PortfolioShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-section bg-brand-navy-deep relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-cyan/10 rounded-full blur-3xl" />

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
              Portfolio
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan via-transparent to-transparent" />
          </div>
          <h2 className="text-h2 text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-lead text-gray-400 font-light max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => {
            const imageProps = getImageProps(project.imageKey as ImageKey);
            const isPlaceholder = project.imageKey.includes('placeholder');

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + index * 0.15 }}
                className="group"
              >
              <Card variant="glass" size="none" className="relative overflow-hidden">
                {/* Browser frame mockup */}
                <div className="bg-brand-navy-raised px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-brand-navy-raised rounded-md px-3 py-1 text-meta text-gray-400 text-center truncate">
                      {project.title.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                  </div>
                </div>

                {/* Screenshot area */}
                <div className="relative aspect-[16/10] bg-brand-navy-raised">
                  {isPlaceholder ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-navy-raised to-brand-navy-raised">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-meta text-gray-500 max-w-[200px]">
                          {imageProps?.alt}
                        </p>
                      </div>
                    </div>
                  ) : imageProps ? (
                    <Image
                      {...imageProps}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : null}
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan text-meta font-semibold rounded-full">
                      {project.category}
                    </span>
                    {project.metrics && (
                      <span className="text-meta font-semibold text-green-400">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                  <CardTitle className="mb-2 group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardBody className="leading-relaxed">{project.description}</CardBody>
                </div>
              </Card>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
