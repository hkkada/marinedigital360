'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { ComponentType } from 'react';
import { Presentation, Workflow, Search, MousePointerClick, RefreshCw } from 'lucide-react';
import { Card, CardTitle, CardBody, IconBox } from '@/components/shared';
import { SERVICE_GROUPS } from '@/lib/service-groups';

/**
 * Role/capability cards — the "team" section. The brief asked for detailed
 * team breakdowns, but nothing in this repo or the domain-knowledge base
 * names any person, role title, headcount, credential, or headshot, so this
 * section deliberately describes functions instead of people.
 *
 * The first four cards are `SERVICE_GROUPS` verbatim (label/tagline/
 * description), which is itself already grounded in
 * domain-knowledge §6 Services and §3 Brand Positioning (see that file's own
 * doc comment). The fifth card describes the delivery/client-success
 * function from domain-knowledge §8 Service Delivery Methodology (the five
 * phases) and its Client Communication Standards (weekly status updates,
 * a dedicated communication channel, bi-weekly syncs, monthly strategy
 * sessions) — no cadence, phase, or channel is invented beyond what §8
 * states.
 */
type IconComponent = ComponentType<{ className?: string }>;

const GROUP_ICONS: Record<string, IconComponent> = {
  Presentation,
  Workflow,
  Search,
  MousePointerClick,
};

interface CapabilityCard {
  id: string;
  label: string;
  tagline: string;
  description: string;
  icon: IconComponent;
}

const capabilityCards: CapabilityCard[] = [
  ...SERVICE_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    tagline: group.tagline,
    description: group.description,
    icon: GROUP_ICONS[group.iconName] ?? Workflow,
  })),
  {
    id: 'delivery',
    label: 'Delivery & Client Success',
    tagline: 'Every engagement, delivered in five phases',
    description:
      'From discovery and strategy through execution, launch, and ongoing optimization, every engagement follows a structured methodology — backed by weekly status updates, a dedicated communication channel, bi-weekly syncs, and monthly strategy sessions to keep every deliverable on track.',
    icon: RefreshCw,
  },
];

export function AboutCapabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about-capabilities"
      aria-labelledby="about-capabilities-heading"
      className="py-section bg-brand-navy-deep relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-cyan/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand-cyan/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
            <span className="text-eyebrow uppercase text-brand-cyan">
              Capability Areas
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan via-transparent to-transparent" />
          </div>
          <h2
            id="about-capabilities-heading"
            className="text-h2 text-white"
          >
            The functions behind every engagement
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {capabilityCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            >
              <Card variant="glass" size="md" className="h-full">
                <IconBox icon={card.icon} surface="dark" className="mb-5" />
                <span className="block text-eyebrow font-semibold uppercase text-brand-cyan mb-2">
                  {card.tagline}
                </span>
                <CardTitle className="mb-3">{card.label}</CardTitle>
                <CardBody>{card.description}</CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
