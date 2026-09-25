'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { getIcon } from '@/lib/icon-map';
import { getVisibleServices, getServiceHref } from '@/lib/services';
import { Card, IconBox } from '@/components/shared';

interface RelatedServicesProps {
  currentSlug: string;
}

export function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Excludes the current service and anything that only links to a section of
  // this same page (e.g. PPC → /services/ppc#ppc-management).
  const otherServices = getVisibleServices().filter(
    (s) => s.slug !== currentSlug && !getServiceHref(s).startsWith(`/services/${currentSlug}#`)
  );

  return (
    <section className="py-section bg-gray-50 relative overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-block"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1877F2]" />
            <span className="text-eyebrow uppercase text-[#1877F2]">
              More Services
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1877F2]" />
          </div>
          <h2 className="text-h2 text-gray-900">
            Explore More Services
          </h2>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
                <Card variant="light" size="none" className="h-full">
                  <Link
                    href={getServiceHref(service)}
                    className="group block h-full p-6"
                  >
                    {/* Icon */}
                    <IconBox icon={Icon} className="mb-4" />

                    {/* Title */}
                    <h3 className="text-h3 text-gray-900 mb-2 group-hover:text-[#1877F2] transition-colors">
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-body text-gray-500 mb-4">
                      {service.tagline}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-1.5 text-meta font-medium text-[#42A5F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      {ArrowRight && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </div>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
