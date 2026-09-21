'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, Gauge, Zap } from 'lucide-react';
import { getImageSrc } from '@/lib/image-map';
import { sectionTiming } from '@/lib/animations';

/**
 * A hero background slide. `type` decides how it renders: video slides play a
 * muted looping <video>, image slides paint a next/image fill. Both share the
 * same crossfade, controls, swipe and dot navigation.
 */
type Slide = {
  type: 'video' | 'image';
  src: string;
  label: string;
  industry?: string;
};

// Video slides are kept here (commented) so the background can be switched back
// to footage by swapping which entries are active.
// { type: 'video', src: '/clips/iStock-1716746648.mp4', label: 'Boating footage' },
// { type: 'video', src: '/clips/iStock-1481894582.mp4', label: 'Marine lifestyle footage' },
const SLIDES: readonly Slide[] = [
  { type: 'image', src: '/images/hero/wine_istockphoto-2268784010-1024x1024.jpg', label: 'Winery and hospitality', industry: 'F&B' },
  { type: 'image', src: '/images/hero/oil_istockphoto-2251140507-1024x1024.jpg', label: 'Oil and energy operations', industry: 'Manufacturing' },
  { type: 'image', src: '/images/hero/aerial_istockphoto-1418267688-1024x1024.jpg', label: 'Aerial coastline', industry: 'Maritime' },
  { type: 'image', src: '/images/hero/istockphoto-2155498776-1024x1024.jpg', label: 'Shopping coastline', industry: 'Retail' },
] as const;

const SWIPE_THRESHOLD = 50;

// Dwell time per slide before auto-advancing. Paused under reduced motion and
// while only one slide exists.
const SLIDE_DURATION_MS = 7000;

// Proof points shown between the hero copy and the CTAs. Distinct icons rather
// than two identical checkmarks so each claim reads on its own.
const PROOF_POINTS = [
  { label: 'No delays', Icon: Gauge },
  { label: 'Instant bookings', Icon: Zap },
] as const;

export function Hero() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const go = useCallback((dir: 1 | -1) => {
    setActive((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  // Play only the active clip; pause the rest (and everything under reduced
  // motion). Image slides never register a ref, so they're simply skipped.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && !prefersReducedMotion) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, prefersReducedMotion]);

  // Auto-advance the slideshow. Restarts on every `active` change so manual
  // navigation gets a full dwell before the next automatic step.
  useEffect(() => {
    if (prefersReducedMotion || SLIDES.length < 2) return;
    const timer = window.setTimeout(() => go(1), SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [active, go, prefersReducedMotion]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    touchStart.current = null;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Horizontal intent only — never hijack vertical scrolling
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const arrowClass =
    'items-center justify-center w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

  return (
    <div
      className="relative h-screen overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background slider — aria-hidden since it's decorative */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => {
          const layerClass = `absolute inset-0 w-full h-full object-cover will-change-[opacity] pointer-events-none transition-opacity duration-700 ease-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`;
          const layerStyle = { filter: 'contrast(1.1) saturate(1.05)' };

          return slide.type === 'video' ? (
            <video
              key={slide.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              autoPlay={i === 0}
              muted
              loop
              playsInline
              preload={i === 0 ? 'auto' : 'metadata'}
              poster={getImageSrc('hero.main-background')}
              aria-hidden="true"
              className={layerClass}
              style={layerStyle}
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              aria-hidden="true"
              className={layerClass}
              style={layerStyle}
            />
          );
        })}

        {/* Elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content — h1 is outside motion.div so it paints immediately for LCP */}
      <div className="relative h-full flex items-center">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 w-full">
          <div className="max-w-4xl mx-auto sm:mx-0">
            {/* Elegant subtitle */}
            <div className="mb-8 hero-animate hero-animate-delay-1 text-center sm:text-left">
              <span className="text-white/80 text-sm tracking-[0.3em] uppercase drop-shadow(0 2px 8px rgba(0,0,0,0.5))">
                Premium Digital
              </span>
            </div>

            {/* Hero headline — no animation classes or motion wrapper to ensure LCP detection */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.95] tracking-tight drop-shadow(0 4px 12px rgba(0,0,0,0.6)) select-none text-center sm:text-left"
            >
              Where visibility
              <br />
              meets growth
            </h1>

            {/* Description */}
            <p
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl leading-relaxed font-light drop-shadow(0 2px 8px rgba(0,0,0,0.5)) hero-animate hero-animate-delay-3 text-center sm:text-left mx-auto sm:mx-0"
            >
              We ignite growth through visibility for the world's best businesses.
            </p>

            {/* Quick proof points, directly above the CTAs. Gradient-edged glass
                pills rather than plain text: the video behind them is too busy
                for low-contrast body copy, and the live pulse on each icon is
                what sells "instant" before the words are even read. Each pill
                carries its own entrance so they arrive in sequence. */}
            <ul className="flex flex-col gap-3.5 mb-10 items-center sm:items-start">
              {PROOF_POINTS.map(({ label, Icon }, i) => (
                <motion.li
                  key={label}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.45 + i * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                  className="group relative rounded-full p-px bg-gradient-to-r from-[#1877F2]/80 via-white/25 to-white/5 shadow-lg shadow-black/25 transition-shadow hover:shadow-[#1877F2]/30"
                >
                  <div className="relative flex items-center gap-3 rounded-full bg-black/40 backdrop-blur-xl pl-2 pr-6 py-2 overflow-hidden">
                    {/* Light sweep — a slow, occasional shine across the glass */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                      animate={prefersReducedMotion ? undefined : { x: ['-150%', '400%'] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 5,
                        delay: 1.6 + i * 0.4,
                        ease: 'easeInOut',
                      }}
                    />

                    <span className="relative flex items-center justify-center w-7 h-7 shrink-0">
                      {/* Pulsing halo behind the icon */}
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-[#1877F2]"
                        animate={
                          prefersReducedMotion ? { opacity: 0 } : { scale: [1, 1.9], opacity: [0.55, 0] }
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 0.6,
                          delay: i * 0.5,
                          ease: 'easeOut',
                        }}
                      />
                      <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#42A5F5] to-[#1877F2] ring-1 ring-white/30">
                        <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    </span>

                    <span className="relative text-white text-sm md:text-base font-medium tracking-wide whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 hero-animate hero-animate-delay-4 items-center sm:items-start">
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
      </div>

      {/* Slider arrows — edge-anchored from lg up, where the layout gutter has room */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous background slide"
        className={`${arrowClass} hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next background slide"
        className={`${arrowClass} hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20`}
      >
        <ChevronRight size={20} />
      </button>

      {/* Compact control cluster — arrows collapse here below lg so they never overlap the copy */}
      <div className="absolute bottom-5 sm:bottom-10 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous background slide"
          className={`${arrowClass} flex lg:hidden`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots hidden on the narrowest screens so the cluster clears the centered scroll cue */}
        <div className="hidden sm:flex items-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${slide.label}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next background slide"
          className={`${arrowClass} flex lg:hidden`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hero-animate hero-animate-delay-5">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: sectionTiming.hero.animationDuration * 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </div>
  );
}
