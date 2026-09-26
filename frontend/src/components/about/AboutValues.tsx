'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Zap, Award, Briefcase } from 'lucide-react';
import { Card, CardTitle, CardBody, IconBox } from '@/components/shared';

/**
 * Values grid.
 *
 * Adapted from the homepage `About.tsx` values array (dead behind
 * `showValues = false`), with two corrections carried forward:
 * - "Premium Quality" originally read "Award-winning work..." — no award is
 *   documented anywhere, so that clause stays dropped.
 * - "Global Vision" originally claimed a worldwide reach that is not
 *   supported; replaced with "Industry Expertise".
 *
 * Copy is deliberately industry-agnostic — the brand is being repurposed away
 * from the industry-agnostic positioning, so no vertical and no nautical metaphor
 * appears here.
 */
const values = [
  {
    icon: Target,
    title: 'Precision First',
    description: 'Every detail is crafted with intent — nothing ships because it was easier to leave in.',
  },
  {
    icon: Zap,
    title: 'Performance Driven',
    description: 'Speed, power, and efficiency in every digital experience we create.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Meticulous craftsmanship and rigorous quality control in every deliverable we ship.',
  },
  {
    icon: Briefcase,
    title: 'Industry Expertise',
    description: 'We learn how your market actually buys before we write a word or place a bid.',
  },
];

export function AboutValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about-values"
      aria-labelledby="about-values-heading"
      className="py-section bg-gray-50 relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
            <span className="text-eyebrow uppercase text-ink-accent">Our Values</span>
          </div>
          <h2
            id="about-values-heading"
            className="text-h2 text-ink"
          >
            What drives every engagement
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            >
              <Card variant="light" size="md" className="h-full">
                <IconBox icon={value.icon} className="mb-5" />
                <CardTitle className="mb-2">{value.title}</CardTitle>
                <CardBody>{value.description}</CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
