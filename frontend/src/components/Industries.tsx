'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { durations } from '@/lib/animations';
import { ConceptSpotlightMosaic } from '@/components/industry-concepts';

/**
 * "Industries We Serve" — the home page section.
 *
 * Owns the section landmark, the vertical rhythm and the scroll reveal; the
 * grid itself is `ConceptSpotlightMosaic` (concept A), which stays in
 * `components/industry-concepts/` alongside the seven other variants so the internal
 * review page at `/concepts/industries` keeps working. One implementation, two
 * call sites — editing the grid updates both.
 *
 * Rhythm: sits between `Experience` (white, `pb-section-sm`) and `About`
 * (dark, `py-section`). Same background as the section above, so the join uses
 * `pt-section-sm`; the background changes below, so the foot takes the full
 * `pb-section` band. See the spacing notes in `styles/globals.css`.
 */
export function Industries() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="industries" ref={ref} className="scroll-mt-nav pt-section-sm pb-section bg-white">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.smooth }}
        >
          <ConceptSpotlightMosaic />
        </motion.div>
      </div>
    </section>
  );
}
