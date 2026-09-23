'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { durations, sectionTiming } from '@/lib/animations';
import { SITE_CONFIG } from '@/lib/constants';
import { StatCard } from '@/components/shared';

/**
 * Homepage teaser for the company story. The full narrative, values grid,
 * capability cards, and image showcase now live on `/about`
 * (`src/app/about/page.tsx` + `src/components/about/*`) — this section only
 * keeps the eyebrow, headline, two intro paragraphs, the stats row, and a
 * link out to the full page, so the two don't duplicate content.
 */
export function About() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const stats = [
    { number: '12+', label: 'Years', sublabel: 'Marine expertise' },
    { number: '100%', label: 'Retention', sublabel: 'Client satisfaction' }
  ];

  return (
    <section id="about" className="py-section bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden" ref={sectionRef} aria-labelledby="about-heading">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#1877F2]/20 rounded-full blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#0D5DBF]/20 rounded-full blur-3xl"
        style={{ y: y2 }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(#1877F2 1px, transparent 1px), linear-gradient(90deg, #1877F2 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: sectionTiming.about.headerDuration }}
          className="mb-block"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: sectionTiming.about.headerDuration, delay: 0.1 }}
            className="flex items-center gap-4 mb-5 sm:mb-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              About {SITE_CONFIG.name}
            </span>
          </motion.div>

          <h2 id="about-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-white mb-4 sm:mb-6">
            Built by
            <br />
            <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
              industry experts
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: sectionTiming.about.headerDuration, delay: 0.2 }}
                className="text-xl text-gray-500 leading-relaxed mb-4"
              >
                Our approach combines deep industry knowledge with cutting-edge digital strategy to create experiences that captivate and convert.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: sectionTiming.about.headerDuration, delay: 0.25 }}
                className="text-xl text-gray-500 leading-relaxed"
              >
                {/* Based in {SITE_CONFIG.company.address.city}, {SITE_CONFIG.company.address.stateName}, {SITE_CONFIG.name} is the only
                industry-focused commercialization agency that combines productization,
                sales enablement, and AI-powered marketing to drive revenue for
                businesses across the Mid-Atlantic and Southeast United States. */}
  
                Based in {SITE_CONFIG.company.address.city}, {SITE_CONFIG.company.address.stateName}, {SITE_CONFIG.name} focus combines digital visibility, sales enablement, and AI-powered marketing to drive revenue for businesses across the Sun belt cities in the United States. 
                <br></br>
                Our capabilities range from productization and brand strategy to SEO, sales enablement, and AI-powered search & marketing.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats + link out to the full about page */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.smooth, delay: 0.4 }}
          className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16"
        >
          <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-md">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: sectionTiming.about.statDuration, delay: sectionTiming.about.statStagger(index) }}
              >
                <StatCard
                  variant="glass"
                  value={stat.number}
                  label={stat.label}
                  description={stat.sublabel}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: durations.smooth, delay: 0.7 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-[#1877F2] transition-colors duration-300"
            >
              <span>Learn more about us</span>
              <ArrowRight className="w-5 h-5 text-[#1877F2] group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
