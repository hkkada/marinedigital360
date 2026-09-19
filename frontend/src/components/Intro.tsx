'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Introductory band directly below the Hero. The hero is a full-screen video
 * slider with no room for body copy, so the site's introductory paragraphs
 * live here instead.
 *
 * Copy is grounded in domain-knowledge/MarineDigital360_Domain_Knowledge.md
 * §3 (Brand Positioning) and §13 (Messaging Frameworks — Elevator Pitch /
 * Objection Handling). No invented metrics, clients, awards, or
 * certifications.
 */
export function Intro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="intro" aria-labelledby="intro-heading" className="pt-section pb-section-sm bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div ref={ref} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-5 sm:mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              Who We Are
            </span>
          </motion.div>

          <motion.h2
            id="intro-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-gray-900 mb-block"
          >
            We don&apos;t just market —
            <br />
            <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
              we productize
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-5 sm:mb-6"
          >
            {SITE_CONFIG.name} is a specialized marine commercialization agency for boat
            manufacturers, marine technology companies, dealers, and charter operators. We take
            what your business already does and transform it into a fully packaged, sellable
            product — complete with naming, pricing, positioning, and AI-powered sales systems —
            so you can go to market faster and generate more revenue.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-gray-500 leading-relaxed"
          >
            Most marine marketing agencies run campaigns for what you already sell. We build the
            product itself — pairing deep marine industry expertise with an AI-powered process
            that delivers finished, revenue-ready systems in weeks, not months — so you leave
            with something ready to sell, not just a plan.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
