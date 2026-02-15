'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { getIcon } from '@/lib/icon-map';
import { getVisibleServices } from '@/lib/services';

interface RelatedServicesProps {
  currentSlug: string;
}

export function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const otherServices = getVisibleServices().filter(
    (s) => s.slug !== currentSlug
  );

  return (
    <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1877F2]" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              More Services
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1877F2]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore More Services
          </h2>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherServices.map((service, index) => {
            const Icon = getIcon(service.iconName);
            const ArrowRight = getIcon('ArrowRight');

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#1877F2]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center mb-4 shadow-md shadow-[#1877F2]/20">
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#1877F2] transition-colors">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {service.tagline}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#42A5F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn more</span>
                    {ArrowRight && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
