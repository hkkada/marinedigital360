'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { getImageProps } from '@/lib/image-map';

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  const heroImageProps = getImageProps('hero.main-background');

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        {/* Hero background image */}
        {heroImageProps && (
          <Image
            {...heroImageProps}
            fill
            className="object-cover flip-horizontal"
          />
        )}

        {/* Elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative h-full flex items-center"
        style={{ opacity }}
      >
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 w-full">
          <div className="max-w-4xl">
            {/* Elegant subtitle */}
            <div className="mb-8 hero-animate hero-animate-delay-1">
              <span className="text-white/80 text-sm tracking-[0.3em] uppercase drop-shadow(0 2px 8px rgba(0,0,0,0.5))">
                Premium Marine Digital
              </span>
            </div>

            {/* Hero headline — renders immediately for LCP (no animation to avoid NO_LCP) */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.95] tracking-tight drop-shadow(0 4px 12px rgba(0,0,0,0.6)) select-none"
            >
              Where craft meets
              <br />
              digital excellence
            </h1>

            {/* Description */}
            <p
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl leading-relaxed font-light drop-shadow(0 2px 8px rgba(0,0,0,0.5)) hero-animate hero-animate-delay-3"
            >
              We create immersive digital experiences for the world's finest
              boat and yacht manufacturers.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 hero-animate hero-animate-delay-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-gray-900 rounded-full text-sm tracking-wide hover:bg-gray-100 transition-all inline-flex items-center justify-center"
              >
                Start Your Project
              </motion.a>

              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-full text-sm tracking-wide border border-white/20 hover:bg-white/20 transition-all inline-flex items-center justify-center"
              >
                View Our Work
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hero-animate hero-animate-delay-5">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </div>
  );
}
