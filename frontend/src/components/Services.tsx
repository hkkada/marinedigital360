'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
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
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getVisibleServices } from '@/lib/services';

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
    <section id="services" className="py-32 md:py-40 bg-black relative overflow-hidden" ref={sectionRef} aria-labelledby="services-heading">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#1877F2]/20 to-transparent rounded-full blur-3xl"
        style={{ y, opacity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D5DBF]/20 to-transparent rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
      />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24 relative"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
                <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
                  What We Do
                </span>
              </motion.div>

              <h2 id="services-heading" className="text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-white">
                Navigate the
                <br />
                <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
                  digital ocean
                </span>
              </h2>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-6"
              >
                Full-spectrum marine digital services. From strategic positioning
                to breathtaking execution—we deliver results that move millions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base text-gray-500 leading-relaxed"
              >
                MarineForge is a specialized marine marketing agency that transforms
                marine business capabilities into market-ready products. We deliver
                end-to-end digital services for boat manufacturers, marine technology
                companies, dealers, and charter operators — from productization and
                brand strategy to SEO, sales enablement, and AI-powered marketing.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Services grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <div className="relative h-full p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden hover:border-[#1877F2]/50">
                    {/* Icon box */}
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-[#1877F2]/30">
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
                    <div className="flex items-center gap-2 text-sm font-medium text-[#42A5F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
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
        </motion.div>
      </div>
    </section>
  );
}
