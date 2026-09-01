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
    <section className="py-12 md:py-16 bg-white" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#1877F2]" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text">Our</h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
              Experience
            </h2>
            
            <div className="h-px w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10 mt-6">
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
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
