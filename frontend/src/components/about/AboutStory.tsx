'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Company narrative section.
 *
 * Copy is deliberately industry-agnostic — the brand is being repurposed away
 * from the industry-agnostic positioning, so no vertical is named here.
 *
 * The former third paragraph listed the Mid-Atlantic/Southeast
 * markets from the old domain-knowledge doc. It was dropped rather than
 * reworded: that list is both vertical-specific and geographically at odds
 * with the real HQ. A replacement service area needs to come from the
 * business, not be inferred.
 *
 * NOTE: city/state are read from SITE_CONFIG.company.address, never
 * hardcoded — that string had already drifted across four files once.
 */
export function AboutStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about-story"
      aria-labelledby="about-story-heading"
      className="py-section bg-white relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1877F2]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-block">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
              <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
                Who We Are
              </span>
            </motion.div>

            <motion.h2
              id="about-story-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-gray-900"
            >
              Your industry&rsquo;s commercialization partner
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed font-light lg:pt-12"
          >
            {SITE_CONFIG.name} is a commercialization agency that turns business
            capabilities into finished, sellable products — complete with naming, pricing,
            positioning, sales systems, and AI-powered enablement tools. We don&rsquo;t just
            market what you do; we productize it.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Our mission is to empower businesses by transforming their capabilities into
            fully-realized, market-ready products that drive sales and revenue growth — every
            deliverable is designed to drive revenue, not vanity metrics.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Headquartered in {SITE_CONFIG.company.address.city}, {SITE_CONFIG.company.address.stateName}, we work across sectors rather than
            specialising in one. The engagement model stays the same whichever industry you
            are in: understand what you sell, package it properly, then build the systems
            that put it in front of buyers.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
