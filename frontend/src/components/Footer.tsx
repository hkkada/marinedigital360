'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Waves } from 'lucide-react';
import Link from 'next/link';
import { getVisibleServices } from '@/lib/services';
import { durations } from '@/lib/animations';
import { SITE_CONFIG, NAVIGATION } from '@/lib/constants';
import { BrandWordmark } from '@/components/BrandWordmark';

/**
 * Site-wide footer. Extracted out of `Contact` when the contact section moved to
 * its own `/contact-us` page — every page still needs the footer, only the
 * contact form is exclusive to that page.
 */
export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: durations.smooth }}
      className="bg-brand-navy-deep border-t border-brand-navy-line"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-block">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-10">
          {/* Column 1: Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00CEFA] to-[#00A1FD] rounded-xl flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <BrandWordmark className="text-wordmark text-white" />
            </div>
            <p className="text-meta text-white/60">
              Full-spectrum digital agency. Strategy, design, and growth for the industry.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-h4 text-white uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {getVisibleServices().map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-meta text-white/70 hover:text-brand-cyan transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-h4 text-white uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {/*
                Derived from NAVIGATION.main so the footer cannot drift from the
                header the way it did when About moved to its own page. Services
                is excluded — column 2 already lists them individually.
              */}
              {[
                ...NAVIGATION.main.filter((link) => link.label !== 'Services'),
                { label: 'Privacy Policy', href: '/legal/privacy-policy' },
                { label: 'Terms of Service', href: '/legal/terms-of-service' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-meta text-white/70 hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-h4 text-white uppercase mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {['LinkedIn', 'Instagram', 'Behance'].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-meta text-white/70 hover:text-brand-cyan transition-colors"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-brand-navy-line flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-meta text-white/60">
            © 2026 {SITE_CONFIG.name}. {SITE_CONFIG.company.slogan}.
          </p>
          <p className="text-meta text-white/45">
            {SITE_CONFIG.company.address.city}, {SITE_CONFIG.company.address.stateName}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
