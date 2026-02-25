'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { getImageProps, type ImageKey } from '@/lib/image-map';
import type { PortfolioShowcaseData } from '@/lib/service-pages/types';

interface PortfolioShowcaseProps {
  data: PortfolioShowcaseData;
}

export function PortfolioShowcase({ data }: PortfolioShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1877F2]/10 rounded-full blur-3xl" />

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
              Portfolio
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
                transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                className="group"
              >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#1877F2]/40 transition-all duration-300">
                {/* Browser frame mockup */}
                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center truncate">
                      {project.title.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                  </div>
                </div>

                {/* Screenshot area */}
                <div className="relative aspect-[16/10] bg-gray-700">
                  {isPlaceholder ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500 max-w-[200px]">
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
                    <span className="px-3 py-1 bg-[#1877F2]/10 text-[#42A5F5] text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                    {project.metrics && (
                      <span className="text-sm font-semibold text-green-400">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#1877F2] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
