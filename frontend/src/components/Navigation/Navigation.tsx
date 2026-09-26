'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { NavBrand } from './NavBrand';
import { springs } from '@/lib/animations';
import { BRAND } from '@/lib/brand';

/**
 * Fixed top bar. It is always solid navy (per the brand mockup), so it reads
 * the same over the photo hero and over light pages alike — which is also why
 * there is no transparent/"solid" mode any more. Scrolling only adds depth.
 *
 * Height is held at exactly `--spacing-nav` (80px) on every breakpoint:
 * py-4 + 48px mark below `lg`, py-3 + 56px mark from `lg`. The service
 * sub-nav sticks at `top-nav`, so a shorter bar would open a gap above it.
 */
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    // Seed from the current position: a page opened at an anchor starts
    // already scrolled.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-navy-deep transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg shadow-black/25' : ''
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 py-4 lg:py-3 hero-animate hero-animate-delay-1">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${BRAND.part1} ${BRAND.part2} home`}
            className="rounded-md transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
          >
            <NavBrand className="text-white" glow />
          </Link>

          {/* Desktop Navigation (lg+ only — tablets get mobile menu) */}
          <div className="hidden lg:flex items-center">
            <DesktopNav />
          </div>

          {/* CTA — same cyan pill as the hero's primary button */}
          <motion.a
            href="/contact-us"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={springs.bouncy}
            className="group hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cta-from to-brand-cta-to px-7 py-3 text-meta font-semibold tracking-wide text-brand-navy-deep shadow-lg shadow-brand-cta-to/25 transition-shadow hover:shadow-xl hover:shadow-brand-cta-to/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep"
          >
            Start a Project
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </motion.a>

          {/* Mobile Navigation (phones + tablets) */}
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
