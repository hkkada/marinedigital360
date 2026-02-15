'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, Waves } from 'lucide-react';
import Link from 'next/link';
import { getVisibleServices } from '@/lib/services';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@marineforge.com',
      href: 'mailto:hello@marineforge.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (215) 555-0199',
      href: 'tel:+12155550199',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Philadelphia, Pennsylvania',
      href: null,
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <section id="contact" className="py-32 md:py-40 bg-white relative overflow-hidden" ref={ref} aria-labelledby="contact-heading">
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
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            <Waves className="w-8 h-8 text-[#1877F2]" />
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </motion.div>

          <h2 id="contact-heading" className="text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-gray-900 mb-8">
            Ready to
            <br />
            <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#0D5DBF] bg-clip-text text-transparent">
              chart your course?
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto"
          >
            Let's create something exceptional. Start the conversation and 
            discover how we can elevate your marine brand.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact form - bold and modern */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-3"
          >
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
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
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      onFocus={() => setHoveredField('name')}
                      onBlur={() => setHoveredField(null)}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 text-lg focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 placeholder:text-gray-400"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Your Boat Company"
                      onFocus={() => setHoveredField('company')}
                      onBlur={() => setHoveredField(null)}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 text-lg focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 placeholder:text-gray-400"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    onFocus={() => setHoveredField('email')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 text-lg focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 placeholder:text-gray-400"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Project Type
                  </label>
                  <select
                    onFocus={() => setHoveredField('type')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 text-lg focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Your Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us about your vision and goals..."
                    onFocus={() => setHoveredField('message')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 text-lg focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all duration-300 resize-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Submit button - bold and animated */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(24, 119, 242, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="group w-full px-12 py-6 bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] text-white rounded-2xl text-lg font-semibold shadow-2xl shadow-[#1877F2]/30 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Send Message</span>
                <Send 
                  size={22} 
                  className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" 
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info - visual and bold */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact methods with gradients */}
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="group"
              >
                <a
                  href={method.href || undefined}
                  className={`block relative p-8 bg-gradient-to-br ${method.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                    method.href ? 'cursor-pointer' : ''
                  }`}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-white/0"
                    whileHover={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <method.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <p className="text-sm text-white/80 uppercase tracking-wide mb-2">
                        {method.label}
                      </p>
                      <p className="text-xl md:text-2xl text-white font-semibold">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="relative p-8 bg-gray-900 rounded-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Prefer a Quick Call?
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Schedule a 30-minute discovery session with our team to 
                  discuss your project in detail.
                </p>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all"
                >
                  <span>Book a Call</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                Trusted By Leading Manufacturers
              </p>
              <div className="flex flex-wrap gap-3">
                {['Velocity Marine', 'Oceanic Yachts', 'Horizon Boats'].map((brand) => (
                  <span
                    key={brand}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-32 pt-16 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Logo + tagline */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] rounded-xl flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl tracking-tight text-gray-900">
                  MARINE<span className="font-light">FORGE</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Full-spectrum marine digital agency. Strategy, design, and growth for the marine industry.
              </p>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Services
              </h4>
              <ul className="space-y-3">
                {getVisibleServices().map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm text-gray-600 hover:text-[#1877F2] transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Work', href: '/#work' },
                  { label: 'About', href: '/#about' },
                  { label: 'Contact', href: '/#contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#1877F2] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                {['LinkedIn', 'Instagram', 'Behance'].map((social) => (
                  <li key={social}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-[#1877F2] transition-colors"
                    >
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 MarineForge. Navigating digital excellence.
            </p>
            <p className="text-sm text-gray-400">
              Philadelphia, Pennsylvania
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
