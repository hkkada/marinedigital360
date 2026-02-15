'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ServiceData } from '@/lib/services';
import * as LucideIcons from 'lucide-react';

interface ServiceCardProps {
  service: ServiceData;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = LucideIcons[service.iconName as keyof typeof LucideIcons] as React.FC<{ className?: string }>;
  const href = service.isVisible ? `/services/${service.slug}` : '/#services';

  return (
    <Link href={href}>
      <motion.div
        className="p-5 border border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.05 },
          },
        }}
        aria-label={`Learn more about ${service.title}`}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-3">
          {Icon && <Icon className="w-5 h-5 text-white" />}
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {service.tagline}
        </p>
      </motion.div>
    </Link>
  );
}
