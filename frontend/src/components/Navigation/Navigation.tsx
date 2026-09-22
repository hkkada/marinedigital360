'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { springs } from '@/lib/animations';
import { BrandWordmark } from '@/components/BrandWordmark';

interface NavigationProps {
  /**
   * Force the opaque, dark-text state. Pages that open on a light background
   * (no dark hero under the fixed nav) need this, or the white wordmark and
   * links render white-on-white until the visitor scrolls.
   */
  solid?: boolean;
}

export function Navigation({ solid = false }: NavigationProps = {}) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const isScrolled = solid || hasScrolled;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    // Seed from the current position, not just from future scroll events: a
    // page opened at an anchor (`/services/ppc#pricing`) starts already
    // scrolled, and without this the nav stays transparent over the content
    // until the visitor happens to scroll.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'nav-glass' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-6 hero-animate hero-animate-delay-1">
        <div className="flex items-center justify-between">
          {/* Logo with scale animation */}
          <Link href="/">
            <motion.span
              whileHover={{ opacity: 0.8 }}
              animate={{ scale: isScrolled ? 0.75 : 1 }}
              transition={springs.smooth}
              className="flex items-center gap-3"
            >
              <BrandWordmark
                className={`text-2xl tracking-tight transition-colors duration-300 whitespace-nowrap ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              />
            </motion.span>
          </Link>

          {/* Desktop Navigation (lg+ only — tablets get mobile menu) */}
          <div className="hidden lg:flex items-center gap-12">
            <DesktopNav isScrolled={isScrolled} />
          </div>

          {/* CTA Button */}
          <motion.a
            href="/contact-us"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.bouncy}
            className={`hidden lg:block px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-300 ${
              isScrolled
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            Start a Project
          </motion.a>

          {/* Mobile Navigation (phones + tablets) */}
          <div className="lg:hidden">
            <MobileNav isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </nav>
  );
}
