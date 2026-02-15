'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Target, Zap, Globe2, Anchor, Compass } from 'lucide-react';
import Image from 'next/image';
import { getImageProps } from '@/lib/image-map';
import { durations, sectionTiming } from '@/lib/animations';

export function About() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yachtImageProps = getImageProps('about.yacht-lifestyle');
  const cockpitImageProps = getImageProps('about.cockpit-technology');

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const stats = [
    { number: '12+', label: 'Years', sublabel: 'Marine expertise' },
    { number: '50+', label: 'Partners', sublabel: 'Global manufacturers' },
    { number: '$2.5B', label: 'Value', sublabel: 'Vessels marketed' },
    { number: '98%', label: 'Retention', sublabel: 'Client satisfaction' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision First',
      description: 'Like a master shipbuilder, we craft every detail with precision and purpose.',
    },
    {
      icon: Zap,
      title: 'Performance Driven',
      description: 'Speed, power, and efficiency in every digital experience we create.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Award-winning work that sets industry standards and wins markets.',
    },
    {
      icon: Globe2,
      title: 'Global Vision',
      description: 'Thinking beyond borders, reaching buyers and dealers worldwide.',
    },
  ];

  return (
    <section id="about" className="py-32 md:py-40 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden" ref={sectionRef} aria-labelledby="about-heading">
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
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: sectionTiming.about.headerDuration, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              About MarineForge
            </span>
          </motion.div>

          <h2 id="about-heading" className="text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-white mb-12">
            Built by
            <br />
            <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
              marine experts
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: sectionTiming.about.headerDuration, delay: 0.15 }}
              className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed"
            >
              We're not just another digital agency. We're former marine industry 
              executives, boat enthusiasts, and award-winning designers who live 
              and breathe this industry.
            </motion.p>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: sectionTiming.about.headerDuration, delay: 0.2 }}
                className="text-lg text-gray-500 leading-relaxed mb-4"
              >
                From technical specifications to emotional storytelling, we understand
                what moves vessels worth millions. Our approach combines deep maritime
                knowledge with cutting-edge digital strategy to create experiences that
                captivate and convert.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: sectionTiming.about.headerDuration, delay: 0.25 }}
                className="text-base text-gray-500 leading-relaxed"
              >
                Based in Philadelphia, Pennsylvania, MarineForge is the only
                marine-focused commercialization agency that combines productization,
                sales enablement, and AI-powered marketing to drive revenue for marine
                businesses across the Mid-Atlantic and Southeast United States.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats section - bold and animated */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.smooth, delay: 0.4 }}
          className="mb-32"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: sectionTiming.about.statDuration, delay: sectionTiming.about.statStagger(index) }}
                className="relative group"
              >
                <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#1877F2]/50 transition-all duration-500">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/0 to-[#0D5DBF]/0 group-hover:from-[#1877F2]/10 group-hover:to-[#0D5DBF]/10 rounded-2xl transition-all duration-500" />
                  
                  <div className="relative">
                    <motion.div
                      className="text-5xl md:text-6xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm font-semibold text-[#1877F2] uppercase tracking-wide mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {stat.sublabel}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values grid with dramatic visuals */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: durations.smooth, delay: sectionTiming.about.valueStagger(index) }}
              className="group relative"
            >
              <div className="relative h-full p-10 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl hover:border-[#1877F2]/50 transition-all duration-500 overflow-hidden">
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/0 to-[#0D5DBF]/0"
                  whileHover={{
                    background: 'linear-gradient(to bottom right, rgba(24, 119, 242, 0.1), rgba(13, 93, 191, 0.1))'
                  }}
                  transition={{ duration: durations.normal }}
                />

                <div className="relative">
                  {/* Icon with animation */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#1877F2]/50"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <value.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#1877F2] transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-lg text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image showcase with adventure theme */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.smooth, delay: 0.8 }}
          className="relative"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Large featured image */}
            <div className="md:col-span-2 relative aspect-[16/10] rounded-3xl overflow-hidden group">
              <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full relative">
                {yachtImageProps && (
                  <Image
                    {...yachtImageProps}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Anchor className="w-6 h-6 text-[#1877F2]" />
                  <span className="text-sm tracking-wide text-white/80 uppercase">Our Passion</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Exploring digital horizons
                </h3>
              </motion.div>
            </div>

            {/* Side content */}
            <div className="space-y-8">
              <div className="relative aspect-square rounded-3xl overflow-hidden group">
                <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full relative">
                  {cockpitImageProps && (
                    <Image
                      {...cockpitImageProps}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1877F2]/80 to-transparent" />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <Compass className="w-8 h-8 text-white mb-2" />
                  <p className="text-lg font-bold text-white">
                    Technology meets artistry
                  </p>
                </motion.div>
              </div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                className="block p-8 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-3xl text-center shadow-2xl shadow-[#1877F2]/50"
              >
                <h4 className="text-2xl font-bold text-white mb-3">
                  Join the Journey
                </h4>
                <p className="text-white/90 mb-4">
                  Let's navigate your digital future together
                </p>
                <div className="inline-flex items-center gap-2 text-white font-semibold">
                  <span>Get Started</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
