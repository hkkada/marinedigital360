'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '@/components/shared';
import type { ServiceFAQData } from '@/lib/service-pages/types';

function FAQItem({
  question,
  answer,
  index,
  isInView,
}: {
  question: string;
  answer: string;
  index: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <Card variant="glass" size="none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 md:p-8 group"
          aria-expanded={isOpen}
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-h3 text-white group-hover:text-brand-cyan transition-colors pr-4">
              {question}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 mt-1"
            >
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-brand-cyan transition-colors" />
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
              marginTop: isOpen ? 16 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-body text-gray-400">
              {answer}
            </p>
          </motion.div>
        </button>
      </Card>
    </motion.div>
  );
}

interface ServiceFAQProps {
  data: ServiceFAQData;
}

export function ServiceFAQ({ data }: ServiceFAQProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      className="py-section bg-gradient-to-b from-brand-navy-deep to-brand-navy relative overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-block text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
            <HelpCircle className="w-8 h-8 text-brand-cyan" />
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan via-transparent to-transparent" />
          </motion.div>

          <h2 className="text-h2 text-white mb-6">
            {data.headline}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-lead text-gray-400 font-light max-w-2xl mx-auto"
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
