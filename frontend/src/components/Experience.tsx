'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

const badges = [
  {
    src: '/badges/ai-104.png',
    alt: 'Microsoft Certified: Azure AI Engineer Associate',
  },
  {
    src: '/badges/AZ-204.png',
    alt: 'Microsoft Certified: Azure Developer Associate',
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="pt-0 pb-section-sm bg-white" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-transparent to-[#1877F2]" />
            <h2 className="text-h2 text-gray-900 whitespace-nowrap">
              Our{' '}
              <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 mt-3 sm:mt-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={112}
                  height={112}
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                  className="object-contain w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
