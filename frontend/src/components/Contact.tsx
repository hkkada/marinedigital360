'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, Waves } from 'lucide-react';
import { getVisibleServices } from '@/lib/services';
import { BookingModal } from '@/components/BookingModal';
import { durations } from '@/lib/animations';
import { CONTACT_EMAIL, CONTACT_CONFIG, SITE_CONFIG } from '@/lib/constants';
import { Card, IconBox } from '@/components/shared';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    // TODO: Add form submission logic here (validate, send to API, etc.)
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: CONTACT_CONFIG.phone,
      href: `tel:${CONTACT_CONFIG.phone.replace(/[^+\d]/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      // Derived from SITE_CONFIG so the visible NAP cannot drift from the
      // LocalBusiness schema emitted by StructuredData.tsx.
      value: `${SITE_CONFIG.company.address.city}, ${SITE_CONFIG.company.address.stateName}`,
      href: null,
    },
  ];

  // Composed both as the body of `/contact-us` and as the closing section of
  // `/about` and `/services/[slug]` — the home page is the one place it is not
  // rendered. scroll-mt (not top padding) offsets the #contact anchor jump past
  // the fixed nav, so the section keeps the same vertical rhythm as the sections
  // above it.
  //
  // `scroll-mt-nav` (80px) and not `scroll-mt-anchor` (136px), even though this
  // also renders on `/services/[slug]` where a sticky sub-nav sits under the
  // fixed nav: that sub-nav is `sticky` inside `<main>` and this section is
  // rendered *after* `</main>`, so the bar has already scrolled away by the time
  // #contact reaches the top. Only the fixed nav is left to clear on all three
  // pages.
  return (
    <section id="contact" className="scroll-mt-nav py-section bg-white relative overflow-hidden" ref={ref} aria-labelledby="contact-heading">
      {/* Bold background graphics */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#1877F2]/10 via-[#42A5F5]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D5DBF]/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Animated wave pattern */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50 V 100 H 0 Z' fill='%231877F2'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 100px',
          backgroundRepeat: 'repeat-x',
        }}
      />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Dramatic header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.normal }}
          className="mb-8 md:mb-10 lg:mb-4 xl:mb-5 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: durations.normal, delay: 0.1 }}
            className="inline-flex items-center gap-3 md:gap-4 mb-4 md:mb-5 lg:mb-3"
          >
            <div className="h-px w-10 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            <Waves className="w-5 h-5 md:w-6 md:h-6 text-brand-azure" />
            <div className="h-px w-10 sm:w-12 md:w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </motion.div>

          <h2 id="contact-heading" className="text-h2 text-ink mb-3 md:mb-4 text-balance">
            Ready to{' '}
            {/* Stacks on small screens; single line from lg up so the section fits one viewport */}
            <br className="lg:hidden" />
            <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#0D5DBF] bg-clip-text text-transparent">
              Book?
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: durations.normal, delay: 0.15 }}
            className="text-lead text-ink-body font-light max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto text-pretty"
          >
            Let's create something exceptional. Start the conversation and
            discover how we can elevate your brand.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Contact form - bold and modern */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: durations.smooth, delay: 0.4 }}
            className="lg:col-span-3 min-w-0"
          >
            <form className="space-y-5 lg:space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid sm:grid-cols-2 gap-5 lg:gap-4">
                {/* Name */}
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-[#1877F2]/0 to-[#1877F2]/0 rounded-2xl blur-xl transition-all duration-300"
                    animate={{
                      background: hoveredField === 'name' 
                        ? 'linear-gradient(to right, rgba(24, 119, 242, 0.1), rgba(66, 165, 245, 0.1))'
                        : 'linear-gradient(to right, rgba(24, 119, 242, 0), rgba(66, 165, 245, 0))',
                    }}
                  />
                  <div className="relative">
                    <label className="block text-meta font-semibold text-ink-body mb-2 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      onFocus={() => setHoveredField('name')}
                      onBlur={() => setHoveredField(null)}
                      className="w-full px-5 py-3 lg:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-ink text-body focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 placeholder:text-ink-muted"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-[#1877F2]/0 to-[#1877F2]/0 rounded-2xl blur-xl transition-all duration-300"
                    animate={{
                      background: hoveredField === 'company' 
                        ? 'linear-gradient(to right, rgba(24, 119, 242, 0.1), rgba(66, 165, 245, 0.1))'
                        : 'linear-gradient(to right, rgba(24, 119, 242, 0), rgba(66, 165, 245, 0))',
                    }}
                  />
                  <div className="relative">
                    <label className="block text-meta font-semibold text-ink-body mb-2 uppercase tracking-wide">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company Name"
                      onFocus={() => setHoveredField('company')}
                      onBlur={() => setHoveredField(null)}
                      className="w-full px-5 py-3 lg:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-ink text-body focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 placeholder:text-ink-muted"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-[#1877F2]/0 to-[#1877F2]/0 rounded-2xl blur-xl transition-all duration-300"
                  animate={{
                    background: hoveredField === 'email' 
                      ? 'linear-gradient(to right, rgba(24, 119, 242, 0.1), rgba(66, 165, 245, 0.1))'
                      : 'linear-gradient(to right, rgba(24, 119, 242, 0), rgba(66, 165, 245, 0))',
                  }}
                />
                <div className="relative">
                  <label className="block text-meta font-semibold text-ink-body mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    onFocus={() => setHoveredField('email')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-5 py-3 lg:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-ink text-body focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 placeholder:text-ink-muted"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-[#1877F2]/0 to-[#1877F2]/0 rounded-2xl blur-xl transition-all duration-300"
                  animate={{
                    background: hoveredField === 'type' 
                      ? 'linear-gradient(to right, rgba(24, 119, 242, 0.1), rgba(66, 165, 245, 0.1))'
                      : 'linear-gradient(to right, rgba(24, 119, 242, 0), rgba(66, 165, 245, 0))',
                  }}
                />
                <div className="relative">
                  <label className="block text-meta font-semibold text-ink-body mb-2 uppercase tracking-wide">
                    Project Type
                  </label>
                  <select
                    onFocus={() => setHoveredField('type')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-5 py-3 lg:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-ink text-body focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    {getVisibleServices().map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                    <option value="full">Full-Service Package</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-[#1877F2]/0 to-[#1877F2]/0 rounded-2xl blur-xl transition-all duration-300"
                  animate={{
                    background: hoveredField === 'message' 
                      ? 'linear-gradient(to right, rgba(24, 119, 242, 0.1), rgba(66, 165, 245, 0.1))'
                      : 'linear-gradient(to right, rgba(24, 119, 242, 0), rgba(66, 165, 245, 0))',
                  }}
                />
                <div className="relative">
                  <label className="block text-meta font-semibold text-ink-body mb-2 uppercase tracking-wide">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vision and goals..."
                    onFocus={() => setHoveredField('message')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-5 py-3 lg:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-ink text-body focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 resize-none placeholder:text-ink-muted"
                  />
                </div>
              </div>

              {/* Submit button - bold and animated */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(24, 119, 242, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="group w-full px-8 py-3.5 lg:py-3 bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] text-white rounded-xl text-body font-semibold shadow-lg shadow-[#1877F2]/20 transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <span>Send Message</span>
                <Send
                  size={20}
                  className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info - visual and bold */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: durations.smooth, delay: 0.6 }}
            className="lg:col-span-2 space-y-4 lg:space-y-2.5 xl:space-y-3 min-w-0"
          >
            {/* Contact methods */}
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: durations.smooth, delay: 1 + index * 0.1 }}
              >
                <a
                  href={method.href || undefined}
                  className={`block ${method.href ? 'cursor-pointer' : ''}`}
                >
                  <Card variant="light" size="sm" className="flex items-start gap-3.5">
                    <IconBox icon={method.icon} className="flex-shrink-0" />

                    <div className="flex-1 min-w-0">
                      <p className="text-meta text-ink-muted uppercase tracking-wide mb-1.5 font-medium">
                        {method.label}
                      </p>
                      <p className="text-body font-semibold text-ink break-words">
                        {method.value}
                      </p>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: durations.smooth, delay: 1.2 }}
            >
              <Card variant="solid" size="none" hoverable={false} className="p-5 lg:p-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl" />

                <div className="relative">
                  <h3 className="text-h3 text-white mb-2">
                    Prefer a Quick Call?
                  </h3>
                  <p className="text-on-dark-muted text-meta mb-4">
                    Schedule a 30-minute discovery session with our team to
                    discuss your project in detail.
                  </p>
                  <motion.button
                    onClick={() => setIsBookingOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-5 py-3 lg:py-2 bg-white text-ink rounded-full text-meta font-semibold hover:bg-gray-100 transition-all"
                  >
                    <span>Book a Call</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>
              </Card>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: durations.smooth, delay: 1.3 }}
              className="pt-6 lg:pt-5 border-t border-gray-200"
            >
              <p className="text-meta text-ink-muted uppercase tracking-wide mb-3">
                Trusted By Leading Manufacturers
              </p>
              <div className="flex flex-wrap gap-2">
                {['', '', ''].map((brand) => (
                  <span
                    key={brand}
                    className="px-3.5 py-1.5 bg-gray-100 text-ink-body rounded-full text-meta font-medium"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
}
