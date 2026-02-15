/**
 * Centralized Image Configuration
 *
 * This file manages all images across the MarineForge site.
 * Update images here without modifying component code.
 *
 * Following the pattern from icon-map.ts — semantic keys, type-safe lookups.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface ImageConfig {
  /** Image source path (local /images/* or external URL) */
  src: string;
  /** Descriptive alt text for accessibility and SEO */
  alt: string;
  /** Priority loading for LCP optimization (hero images) */
  priority?: boolean;
  /** Image quality (1-100, default 75) */
  quality?: number;
  /** Responsive sizes attribute for Next.js Image */
  sizes?: string;
}

export interface ImageCategory {
  hero: Record<string, ImageConfig>;
  about: Record<string, ImageConfig>;
  portfolio: Record<string, ImageConfig>;
  serviceHero: Record<string, ImageConfig>;
  servicePortfolio: Record<string, ImageConfig>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Image Registry — Single Source of Truth
// ─────────────────────────────────────────────────────────────────────────────

const affliateImage = '/images/photo-1522071820081-009f0129c71c.jpg';
const webDesignImage = '/images/photo-1547658719-da2b51169166.jpg';
const ppcImage = '/images/photo-1551288049-bebda4e38f71.jpg';
const seoGeoImage = '/images/photo-1460925895917-afdab827c52f.jpg';
const productizationImage = '/images/photo-1454165804606-c3d57bc86b40.jpg';

const velocityMarineImage = '/images/photo-1717940729001-f8662bd515dd.jpg';
const oceanicYachtsImage = '/images/photo-1761047726527-6f263d10e09d.jpg';
const horizonBoatsImage = '/images/photo-1653467213158-f6a896e813a1.jpg';

const imageRegistry: ImageCategory = {
  // ═══════════════════════════════════════════════════════════════════════════
  // Main Page Hero
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    'main-background': {
      src: '/images/nicol-JrMzz7jUD5s-unsplash.jpg',
      alt: 'MarineForge marine marketing agency — luxury yacht cruising on open blue ocean water',
      priority: true, // LCP optimization
      quality: 75,
      sizes: '100vw',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // About Section Images
  // ═══════════════════════════════════════════════════════════════════════════
  about: {
    'yacht-lifestyle': {
      src: '/images/IMG_1822.PNG',
      alt: 'MarineForge team — premium yacht lifestyle and ocean adventure experience',
      sizes: '(max-width: 768px) 100vw, 66vw',
    },
    'cockpit-technology': {
      src: '/images/dmitrii-e-sWCmHYAWUvc-unsplash.jpg',
      alt: 'Marine technology innovation — yacht cockpit controls and digital navigation systems',
      sizes: '(max-width: 768px) 100vw, 33vw',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Portfolio Projects (Main Page)
  // ═══════════════════════════════════════════════════════════════════════════
  portfolio: {
    'velocity-marine': {
      src: velocityMarineImage,
      alt: 'Velocity Marine case study — high-performance speedboat racing across open ocean, digital experience and brand project by MarineForge',
      sizes: '(max-width: 1024px) 100vw, 50vw',
    },
    'oceanic-yachts': {
      src: oceanicYachtsImage,
      alt: 'Oceanic Yachts case study — luxury yacht at sunset on calm waters, complete brand transformation by MarineForge',
      sizes: '(max-width: 1024px) 100vw, 50vw',
    },
    'horizon-boats': {
      src: horizonBoatsImage,
      alt: 'Horizon Boats case study — adventure boat cutting through ocean waves, e-commerce platform project by MarineForge',
      sizes: '(max-width: 1024px) 100vw, 50vw',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Service Page Hero Backgrounds
  // ═══════════════════════════════════════════════════════════════════════════
  serviceHero: {
    'web-design': {
      src: webDesignImage,
      alt: 'Modern web design workspace — custom marine website development',
      priority: true, // Hero images are LCP candidates
      sizes: '100vw',
    },
    'ppc': {
      src: ppcImage,
      alt: 'Digital advertising analytics — PPC campaign management for marine businesses',
      priority: true,
      sizes: '100vw',
    },
    'seo-geo': {
      src: seoGeoImage,
      alt: 'Digital analytics dashboard — SEO and search optimization for marine businesses',
      priority: true,
      sizes: '100vw',
    },
    'affiliate': {
      src: affliateImage,
      alt: 'Business partnership meeting — affiliate marketing strategy for marine companies',
      priority: true,
      sizes: '100vw',
    },
    'productization': {
      src: productizationImage,
      alt: 'Business strategy session — productization planning for marine companies',
      priority: true,
      sizes: '100vw',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Service Page Portfolio Showcases
  // ═══════════════════════════════════════════════════════════════════════════
  servicePortfolio: {
    'web-design-velocity': {
      src: '/images/Placeholder_Sail-Yacht.jpg',
      alt: 'Velocity Marine Group website — boat manufacturer website with interactive boat builder | Placeholder: search "luxury yacht website mockup on laptop"',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },
    'web-design-oceanic': {
      src: '/images/Placeholder_Sail-Yacht.jpg',
      alt: 'Oceanic Yachts website — luxury yacht dealer with virtual tours | Placeholder: search "yacht dealer website design modern"',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },
    'web-design-horizon': {
      src: '/images/Placeholder_Sail-Yacht.jpg',
      alt: 'Horizon Marine Supply e-commerce — marine parts store | Placeholder: search "marine e-commerce website modern design"',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Type-Safe Image Keys
// ─────────────────────────────────────────────────────────────────────────────

export type ImageKey =
  | `hero.${string}`
  | `about.${string}`
  | `portfolio.${string}`
  | `serviceHero.${string}`
  | `servicePortfolio.${string}`;

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get image configuration by semantic key.
 *
 * @param key - Dot-notation image key (e.g., "hero.main-background", "portfolio.velocity-marine")
 * @returns ImageConfig object or undefined if not found
 *
 * @example
 * const heroImg = getImage('hero.main-background');
 * // { src: '/images/...', alt: '...', priority: true, quality: 75, sizes: '100vw' }
 */
export function getImage(key: ImageKey): ImageConfig | undefined {
  const [category, name] = key.split('.') as [keyof ImageCategory, string];
  return imageRegistry[category]?.[name];
}

/**
 * Get all images from a specific category.
 *
 * @param category - Image category (hero, about, portfolio, etc.)
 * @returns Record of all images in that category
 *
 * @example
 * const allPortfolioImages = getImagesByCategory('portfolio');
 */
export function getImagesByCategory(
  category: keyof ImageCategory
): Record<string, ImageConfig> {
  return imageRegistry[category] || {};
}

/**
 * Get only the src URL for backward compatibility.
 *
 * @param key - Dot-notation image key
 * @returns Image src string or undefined
 */
export function getImageSrc(key: ImageKey): string | undefined {
  return getImage(key)?.src;
}

/**
 * Type-safe wrapper for Next.js Image component props.
 * Spreads image config directly into <Image> component.
 *
 * @param key - Dot-notation image key
 * @returns Object ready to spread into Next.js Image component
 *
 * @example
 * <Image {...getImageProps('hero.main-background')} fill className="..." />
 */
export function getImageProps(key: ImageKey) {
  const config = getImage(key);
  if (!config) {
    console.warn(`Image not found: ${key}`);
    return null;
  }

  return {
    src: config.src,
    alt: config.alt,
    ...(config.priority && { priority: config.priority }),
    ...(config.quality && { quality: config.quality }),
    ...(config.sizes && { sizes: config.sizes }),
  };
}
