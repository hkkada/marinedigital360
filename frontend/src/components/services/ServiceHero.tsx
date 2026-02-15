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
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-black">
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
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 w-full py-32">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm text-white/70">
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
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-lg flex items-center justify-center shadow-lg shadow-[#1877F2]/30">
              {Icon && <Icon className="text-white" size={20} />}
            </div>
            <span className="text-sm tracking-[0.2em] uppercase text-[#42A5F5] font-medium">
              {data.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[0.95] tracking-tight"
          >
            {data.headline}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-light"
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
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] text-white rounded-full text-lg font-semibold shadow-2xl shadow-[#1877F2]/40 hover:shadow-[#1877F2]/60 transition-shadow"
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
