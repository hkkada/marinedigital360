'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, TrendingUp, Users, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getVisibleServices } from '@/lib/services';
import { getImageProps, type ImageKey } from '@/lib/image-map';
import { durations, sectionTiming } from '@/lib/animations';

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const visibleServices = getVisibleServices();

  const projects = [
    {
      title: 'Velocity Marine',
      subtitle: 'Performance Redefined',
      category: 'Digital Experience & Brand',
      services: ['web-design', 'seo-geo'],
      year: '2025',
      imageKey: 'portfolio.velocity-marine',
      metrics: [
        { icon: TrendingUp, label: 'Conversions', value: '+145%' },
        { icon: Users, label: 'Traffic', value: '+230%' },
      ],
      color: 'from-blue-600 to-cyan-500',
    },
    {
      title: 'Oceanic Yachts',
      subtitle: 'Luxury Elevated',
      category: 'Complete Brand Transformation',
      services: ['productization', 'web-design', 'ppc'],
      year: '2025',
      imageKey: 'portfolio.oceanic-yachts',
      metrics: [
        { icon: Award, label: 'Lead Quality', value: '+320%' },
        { icon: TrendingUp, label: 'Revenue', value: '+185%' },
      ],
      color: 'from-indigo-600 to-purple-500',
    },
    {
      title: 'Horizon Boats',
      subtitle: 'Built for Adventure',
      category: 'E-commerce Platform',
      services: ['web-design', 'seo-geo', 'affiliate'],
      year: '2024',
      imageKey: 'portfolio.horizon-boats',
      metrics: [
        { icon: TrendingUp, label: 'Online Sales', value: '+275%' },
        { icon: Users, label: 'Engagement', value: '+410%' },
      ],
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <section id="work" className="py-32 md:py-40 bg-white relative overflow-hidden" ref={ref} aria-labelledby="work-heading">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#1877F2]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[#0D5DBF]/5 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Bold section header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.normal }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: durations.normal, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            <span className="text-sm tracking-[0.3em] uppercase text-[#1877F2]">
              Featured Work
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <h2 id="work-heading" className="text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-gray-900">
              Projects that
              <br />
              <span className="bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] bg-clip-text text-transparent">
                dominate markets
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: durations.normal, delay: 0.15 }}
              className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed"
            >
              Real results for real manufacturers. We don't just build 
              websites—we engineer digital dominance.
            </motion.p>
          </div>
        </motion.div>

        {/* Featured projects with dramatic layouts */}
        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const projectImageProps = getImageProps(project.imageKey as ImageKey);

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: sectionTiming.portfolio.projectDuration, delay: sectionTiming.portfolio.projectStagger(index) }}
                className="group relative"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image side - dramatic with animations */}
                  <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <motion.div
                      className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: durations.smooth }}
                    >
                      {projectImageProps && (
                        <Image
                          {...projectImageProps}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating year badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="absolute top-8 right-8 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl"
                      >
                        <span className="text-lg font-bold text-gray-900">{project.year}</span>
                      </motion.div>

                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    </motion.div>

                    {/* Decorative element */}
                    <motion.div
                      className={`absolute -z-10 w-full h-full bg-gradient-to-br ${project.color} rounded-3xl blur-2xl opacity-20 ${
                        isEven ? '-right-12 -bottom-12' : '-left-12 -bottom-12'
                      }`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>

                  {/* Content side - bold and clear */}
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: durations.smooth, delay: sectionTiming.portfolio.projectStagger(index) + 0.15 }}
                    >
                      <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 mb-3">
                        {project.category}
                      </span>

                      {/* Service tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.services.map((slug) => {
                          const service = visibleServices.find((s) => s.slug === slug);
                          if (!service) return null;
                          return (
                            <Link
                              key={slug}
                              href={`/services/${slug}`}
                              className="inline-block px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] rounded-full text-xs font-medium hover:bg-[#1877F2]/20 transition-colors"
                            >
                              {service.title}
                            </Link>
                          );
                        })}
                      </div>

                      <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-[0.9] group-hover:text-[#1877F2] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-2xl md:text-3xl text-gray-500 font-light mb-12">
                        {project.subtitle}
                      </p>

                      {/* Metrics with icons */}
                      <div className="grid grid-cols-2 gap-8 mb-12">
                        {project.metrics.map((metric, i) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: sectionTiming.portfolio.metricDuration, delay: sectionTiming.portfolio.metricStagger(i) }}
                            className="relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-[#1877F2] transition-colors group/metric"
                          >
                            <metric.icon className="w-8 h-8 text-[#1877F2] mb-3 group-hover/metric:scale-110 transition-transform" />
                            <p className="text-4xl font-bold text-gray-900 mb-1">
                              {metric.value}
                            </p>
                            <p className="text-sm text-gray-600 uppercase tracking-wide">
                              {metric.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05, x: 10 }}
                        className="inline-flex items-center gap-3 text-lg font-semibold text-gray-900 group/link"
                      >
                        <span className="group-hover/link:text-[#1877F2] transition-colors">
                          View Case Study
                        </span>
                        <div className="w-12 h-12 bg-gray-900 group-hover/link:bg-[#1877F2] rounded-full flex items-center justify-center transition-all">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bold CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.smooth, delay: 0.8 }}
          className="mt-32 relative"
        >
          <div className="relative p-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, #1877F2 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            <div className="relative z-10 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to make waves?
              </h3>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Let's create a digital experience that dominates your market
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-6 bg-white text-gray-900 rounded-full text-lg font-semibold shadow-2xl hover:bg-gray-100 transition-all"
              >
                Start Your Project
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
