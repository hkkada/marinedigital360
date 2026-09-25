'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqData } from './StructuredData';
import { SITE_CONFIG } from '@/lib/constants';
import { Card } from '@/components/shared';

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group"
        aria-expanded={isOpen}
      >
        <Card variant="glass" size="none" className="p-6 md:p-8">
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
            <p className="text-gray-400 text-body">
              {answer}
            </p>
          </motion.div>
        </Card>
      </button>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="faq"
      className="scroll-mt-nav py-section bg-gradient-to-b from-brand-navy to-brand-navy-deep relative overflow-hidden"
      aria-labelledby="faq-heading"
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
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-cyan" />
            <HelpCircle className="w-8 h-8 text-brand-cyan" />
            <div className="h-px w-16 bg-gradient-to-r from-brand-cyan to-transparent" />
          </motion.div>

          <h2
            id="faq-heading"
            className="text-h2 text-white mb-8"
          >
            Frequently asked
            <br />
            <span className="bg-gradient-to-r from-[#00CEFA] via-[#0FF1FD] to-[#00A1FD] bg-clip-text text-transparent">
              questions
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="text-lead text-gray-400 font-light max-w-2xl mx-auto"
          >
            Answers to common questions about marketing, productization,
            and how {SITE_CONFIG.name} helps businesses grow.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
