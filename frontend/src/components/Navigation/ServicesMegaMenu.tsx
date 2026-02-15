'use client';

import { getVisibleServices } from '@/lib/services';
import { ServiceCard } from './ServiceCard';
import { motion } from 'motion/react';
import Link from 'next/link';
import { durations, staggers } from '@/lib/animations';

export function ServicesMegaMenu() {
  const services = getVisibleServices();

  return (
    <motion.div
      className="w-[calc(100vw-2rem)] max-w-[960px] p-4 md:p-6 lg:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-gray-200/60 shadow-2xl"
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: durations.instant, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 gap-3"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggers.tight,
              delayChildren: 0.05
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </motion.div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link
          href="/#services"
          className="text-sm text-[var(--nav-link-blue)] hover:underline font-medium"
        >
          Explore All Services →
        </Link>
      </div>
    </motion.div>
  );
}
