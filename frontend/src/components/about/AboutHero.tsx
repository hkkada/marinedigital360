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
 * Sized `min-h-[100svh]` (matching the home Hero) so the whole hero reads in
 * one viewport. `svh` so mobile browser chrome doesn't cut the CTA off, and
 * `min-h` rather than a fixed height so a very short window scrolls instead
 * of clipping.
 *
 * Copy is deliberately industry-agnostic: the brand is being repurposed away
 * from the industry-agnostic positioning, so nothing here names a vertical. The
 * structure still follows the §13 "Elevator Pitch (Short)" shape.
 * CTA label matches the real booking type in lib/constants.ts
 * (CONTACT_CONFIG.booking.consultationType = "Free Discovery Call").
 */
export function AboutHero() {
  const imageProps = getImageProps('about.hand-smartphone-screen');

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative min-h-[100svh] flex items-center-safe overflow-hidden bg-brand-navy-deep"
    >
      <div className="absolute inset-0">
        {imageProps && (
          <Image
            {...imageProps}
            fill
            priority
            /* Narrow viewports crop to ~31% of the photo's width, and a center
               crop lands on empty street. Frame the right half, where the hand
               and phone are. Restored to center from md up. */
            className="object-cover object-[85%_50%] md:object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 w-full pt-hero pb-section [@media(max-height:880px)]:pt-28 [@media(max-height:880px)]:pb-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex items-center gap-4 mb-6 [@media(max-height:880px)]:mb-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan to-transparent" />
            <span className="text-eyebrow uppercase text-brand-cyan font-medium">
              About {SITE_CONFIG.name}
            </span>
          </motion.div>

          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-display text-white mb-8 [@media(max-height:880px)]:mb-5"
          >
            Turning what your business already does into market-ready products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lead text-white/80 mb-12 font-light [@media(max-height:880px)]:mb-6"
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
              className="inline-flex items-center gap-3 px-10 py-5 [@media(max-height:880px)]:py-3.5 bg-gradient-to-r from-[#00CEFA] to-[#00A1FD] text-brand-navy-deep rounded-full text-body font-semibold shadow-2xl shadow-brand-cyan/30 hover:shadow-brand-cyan/50 transition-shadow"
            >
              Schedule a Free Discovery Call
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
