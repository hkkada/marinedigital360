'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'nav-glass' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo with scale animation */}
          <Link href="/">
            <motion.span
              whileHover={{ opacity: 0.8 }}
              animate={{ scale: isScrolled ? 0.75 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex items-center gap-3"
            >
              <span className={`text-2xl tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                MARINE<span className="font-light">FORGE</span>
              </span>
            </motion.span>
          </Link>

          {/* Desktop Navigation (lg+ only — tablets get mobile menu) */}
          <div className="hidden lg:flex items-center gap-12">
            <DesktopNav isScrolled={isScrolled} />
          </div>

          {/* CTA Button */}
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
    </motion.nav>
  );
}
