/**
 * Centralized animation configuration for Framer Motion
 *
 * Duration Philosophy:
 * - 0.3s: Micro-interactions (hover, tap)
 * - 0.4s: Fast entrance animations (Hero CTAs, critical content)
 * - 0.5s: Standard entrance animations (section headers, cards)
 * - 0.6s: Smooth transitions needing visual polish
 *
 * Stagger Philosophy:
 * - Keep delays minimal to avoid perceived lag
 * - Critical content (CTAs, headlines) appears within 0.5s
 * - Decorative elements can have longer delays
 */

// Duration values (seconds)
export const durations = {
  instant: 0.1,  // Micro-interactions
  fast: 0.2,     // Fast entrance (Hero, CTAs)
  normal: 0.3,   // Standard entrance (headers, cards)
  smooth: 0.5,   // Smooth polish (large images, complex layouts)
} as const;

// Stagger delays (seconds)
export const staggers = {
  tight: 0.05,    // Very tight sequence (stats, metrics)
  normal: 0.08,   // Standard stagger (cards)
  relaxed: 0.1,   // Relaxed stagger (sections)
} as const;

// Easing functions
export const easings = {
  easeOut: [0.16, 1, 0.3, 1],      // Default smooth ease-out
  easeInOut: [0.4, 0, 0.2, 1],     // Material Design standard
  snappy: [0.34, 1.56, 0.64, 1],   // Bouncy spring feel
} as const;

// Spring configurations
export const springs = {
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 20 },
  smooth: { type: 'spring' as const, stiffness: 200, damping: 25 },
  gentle: { type: 'spring' as const, stiffness: 150, damping: 30 },
} as const;

// Common animation variants (reusable presets)
export const variants = {
  // Fade up on entrance
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeUpLarge: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  // Fade from side
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
} as const;

// Section-specific timing configurations
export const sectionTiming = {
  hero: {
    // Hero must be FAST - impacts conversion rates
    animationDuration: durations.instant,      // 0.4s (was 1s)
    subtitleDelay: 0.05,                     // 0.1s (was 0.3s)
    descriptionDelay: 0.1,                  // 0.3s (was 0.9s)
    ctaDelay: 0.1,                          // 0.4s (was 1.2s) → Total: 0.8s appearance
    scrollIndicatorDelay: 0.5,              // 1.5s (was 2s) - not critical
  },
  services: {
    headerDuration: durations.normal,       // 0.5s (was 0.8s)
    cardDuration: durations.normal,         // 0.5s (was 0.8s)
    cardStagger: (index: number) => 0.25 + index * staggers.normal,  // Tighter stagger
    ctaDelay: 0.6,                          // 0.6s (was 0.8s)
  },
  portfolio: {
    projectDuration: durations.smooth,      // 0.6s (was 1s)
    projectStagger: (index: number) => index * 0.2,  // 0.2s per item (was 0.3s)
    metricDuration: durations.fast,         // 0.4s (was 0.6s)
    metricStagger: (index: number) => index * staggers.tight,  // Tighter
  },
  about: {
    headerDuration: durations.normal,       // 0.5s (was 0.8s)
    statDuration: durations.fast,           // 0.4s (was 0.6s)
    statStagger: (index: number) => 0.5 + index * staggers.tight,  // Faster reveal
    valueStagger: (index: number) => 0.6 + index * staggers.normal,  // Faster
  },
} as const;
