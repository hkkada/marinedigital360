'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { getImageProps } from '@/lib/image-map';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * About page hero. First section on the route, so it reserves clearance for
 * the fixed nav via `pt-hero` (see `--spacing-hero` in globals.css) rather
 * than the ordinary `py-section` band used between interior sections.
 *
 * Copy is deliberately industry-agnostic: the brand is being repurposed away
 * from the marine-only positioning, so nothing here names a vertical. The
 * structure still follows the §13 "Elevator Pitch (Short)" shape.
 * CTA label matches the real booking type in lib/constants.ts
 * (CONTACT_CONFIG.booking.consultationType = "Free Discovery Call").
 */
export function AboutHero() {
  const imageProps = getImageProps('about.yacht-lifestyle');

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative min-h-[70vh] flex items-center-safe overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        {imageProps && <Image {...imageProps} fill priority className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 w-full pt-hero pb-section">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#42A5F5] font-medium">
              About {SITE_CONFIG.name}
            </span>
          </motion.div>

          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[0.95] tracking-tight"
          >
            Turning what your business already does into market-ready products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-light"
          >
            We take the capabilities you already have and package them into something
            sellable — pricing, positioning, sales systems, and AI-powered automation —
            so you can go to market faster and generate more revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] text-white rounded-full text-lg font-semibold shadow-2xl shadow-[#1877F2]/40 hover:shadow-[#1877F2]/60 transition-shadow"
            >
              Schedule a Free Discovery Call
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
