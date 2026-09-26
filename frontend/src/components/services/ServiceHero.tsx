'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { getIcon } from '@/lib/icon-map';
import { getImageProps, type ImageKey } from '@/lib/image-map';
import type { ServiceHeroData } from '@/lib/service-pages/types';

interface ServiceHeroProps {
  data: ServiceHeroData;
  serviceName: string;
  iconName: string;
}

export function ServiceHero({ data, serviceName, iconName }: ServiceHeroProps) {
  const Icon = getIcon(iconName);
  const ChevronRight = getIcon('ChevronRight');
  const imageProps = getImageProps(data.imageKey as ImageKey);

  return (
    <section className="relative min-h-[85vh] flex items-center-safe overflow-hidden bg-brand-navy-deep">
      {/* Background Image */}
      <div className="absolute inset-0">
        {imageProps && (
          <Image
            {...imageProps}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 w-full pt-hero pb-section">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-meta text-on-dark">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>{ChevronRight && <ChevronRight className="w-3.5 h-3.5" />}</li>
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li>{ChevronRight && <ChevronRight className="w-3.5 h-3.5" />}</li>
            <li className="text-white font-medium">{serviceName}</li>
          </ol>
        </motion.nav>

        <div className="max-w-3xl">
          {/* Tagline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#00CEFA] to-[#00A1FD] rounded-lg flex items-center justify-center shadow-lg shadow-[#00A1FD]/30">
              {Icon && <Icon className="text-white" size={20} />}
            </div>
            <span className="text-eyebrow uppercase text-brand-cyan font-medium">
              {data.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-display text-white mb-8"
          >
            {data.headline}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lead text-on-dark mb-12 font-light"
          >
            {data.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <motion.a
              href={data.ctaHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00CEFA] to-[#00A1FD] text-brand-navy-deep rounded-full text-body font-semibold shadow-2xl shadow-[#00A1FD]/40 hover:shadow-[#00A1FD]/60 transition-shadow"
            >
              {data.ctaText}
              {ChevronRight && <ChevronRight className="w-5 h-5" />}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
