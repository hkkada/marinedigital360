'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqData } from './StructuredData';

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#1877F2]/50 transition-all duration-300 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#1877F2] transition-colors pr-4">
            {question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#1877F2] transition-colors" />
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
          <p className="text-gray-400 leading-relaxed text-base md:text-lg">
            {answer}
          </p>
        </motion.div>
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
      className="py-32 md:py-40 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      aria-labelledby="faq-heading"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#1877F2]/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            <HelpCircle className="w-8 h-8 text-[#1877F2]" />
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] via-transparent to-transparent" />
          </motion.div>

          <h2
            id="faq-heading"
            className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-white mb-8"
          >
            Frequently asked
            <br />
            <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#0D5DBF] bg-clip-text text-transparent">
              questions
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 font-light max-w-2xl mx-auto"
          >
            Answers to common questions about marine marketing, productization,
            and how MarineForge helps marine businesses grow.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
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
