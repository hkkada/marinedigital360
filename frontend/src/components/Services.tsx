'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { durations, sectionTiming } from '@/lib/animations';
import {
  Compass,
  Package,
  Rocket,
  Presentation,
  Workflow,
  Search,
  Monitor,
  MousePointerClick,
  BarChart3,
  Share2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getVisibleServices } from '@/lib/services';
import { SITE_CONFIG } from '@/lib/constants';

const iconMap: Record<string, LucideIcon> = {
  Package,
  Rocket,
  Presentation,
  Workflow,
  Search,
  Monitor,
  MousePointerClick,
  BarChart3,
  Share2,
  Sparkles,
};

const services = getVisibleServices();

export function Services() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="services" ref={sectionRef} aria-labelledby="services-heading">
      {/* Section header — dark background */}
      <div className="pt-section pb-section bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#1877F2]/10 to-transparent rounded-full blur-3xl"
          style={{ y, opacity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D5DBF]/10 to-transparent rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
        />

        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: sectionTiming.services.headerDuration }}
            className="relative"
          >
            <div className="grid xl:grid-cols-2 gap-8 md:gap-12 xl:gap-16">
              {/* Left column — eyebrow + heading */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: sectionTiming.services.headerDuration, delay: 0.1 }}
                  className="flex items-center gap-4 mb-5 sm:mb-6"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
                  <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
                    What We Do
                  </span>
                </motion.div>

                <h2 id="services-heading" className="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl tracking-tight leading-[0.9] text-gray-900">
                  Navigate the
                  <br />
                  <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
                    digital ocean
                  </span>
                </h2>
              </div>

              {/* Right column — supporting copy */}
              <div className="xl:pt-2">
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: sectionTiming.services.headerDuration, delay: 0.15 }}
                  className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-5 sm:mb-6"
                >
                  Full-spectrum marine digital services. From strategic positioning
                  to breathtaking execution—we deliver results that move millions.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: sectionTiming.services.headerDuration, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-500 leading-relaxed"
                >
                  {SITE_CONFIG.name} is a specialized marine marketing agency that transforms
                  marine business capabilities into market-ready products. We deliver
                  end-to-end digital services for boat manufacturers, marine technology
                  companies, dealers, and charter operators — from productization and
                  brand strategy to SEO, sales enablement, and AI-powered marketing.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services grid + CTA — white background */}
      <div className="pt-section pb-section-sm bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          {/* Services grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.iconName];
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: sectionTiming.services.cardDuration, delay: sectionTiming.services.cardStagger(index) }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <Link href={`/services/${service.slug}`} className="block h-full">
                    <div className="relative h-full p-6 sm:p-7 md:p-8 bg-gray-900 backdrop-blur-sm border border-gray-800 rounded-2xl transition-all duration-300 overflow-hidden hover:border-[#1877F2]/50">
                      {/* Icon box */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-[#1877F2]/30">
                        {Icon && <Icon className="text-white" size={24} />}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-[#1877F2] transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-gray-400 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Learn more indicator */}
                      <div className="flex items-center gap-2 text-sm font-medium text-[#42A5F5] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: durations.smooth, delay: sectionTiming.services.ctaDelay }}
            className="mt-20 text-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] text-white rounded-full text-lg font-semibold shadow-2xl shadow-[#1877F2]/50 hover:shadow-[#1877F2]/70 transition-all"
            >
              Start Your Project
              <Compass className="w-6 h-6" />
            </motion.a>
          </motion.div> */}

          <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.smooth, delay: 0.8 }}
          className='mt-block relative'
        >
          <div className="relative p-6 sm:p-10 md:p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, #1877F2 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-5">
                Ready to make waves?
              </h3>
              <p className="text-lg sm:text-xl text-gray-400 mb-7 md:mb-8 max-w-2xl mx-auto">
                Let's create a digital experience that dominates your market
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 py-3.5 sm:px-9 sm:py-4 md:px-12 md:py-5 bg-white text-gray-900 rounded-full text-base sm:text-lg font-semibold whitespace-nowrap shadow-2xl hover:bg-gray-100 transition-all"
              >
                Start Your Project
                <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        </div>
      </div>
    </section>
  );
}
