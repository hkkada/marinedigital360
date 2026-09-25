'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { easings } from '@/lib/animations';
import { INDUSTRIES } from './data';
import { INDUSTRIES_SUBHEAD, SectionHeading } from './SectionHeading';

/**
 * Concept A — Spotlight Mosaic.
 *
 * All fifteen industries on screen at once, exactly one lit. The active tile
 * spans 2×2, fills with the brand gradient and reveals its proof line and
 * market stat; the rest stay quiet outlines. Auto-advances every 4s and hands
 * control to the visitor on hover, tap or Tab.
 *
 * The reflow is the point: `grid-flow-row-dense` repacks the remaining tiles
 * around the open one, and Framer Motion's `layout` prop animates every tile
 * from its old box to its new one (a FLIP) for free.
 *
 * 6 columns × 3 rows on desktop and 3 columns × 6 rows on mobile both come to
 * exactly 18 cells — 14 single tiles plus the 4 the active one occupies — so
 * the grid packs with no holes at either size.
 */
const ADVANCE_MS = 4000;

export function ConceptSpotlightMosaic() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => setActive((k) => (k + 1) % INDUSTRIES.length), ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const take = useCallback((k: number) => {
    setPaused(true);
    setActive(k);
  }, []);

  return (
    <section aria-labelledby="ic-a-heading">
      <SectionHeading
        id="ic-a-heading"
        lead="Industries We"
        accent="Serve"
        sub={INDUSTRIES_SUBHEAD}
      />

      <div
        ref={gridRef}
        className="mx-auto grid max-w-[960px] grid-flow-row-dense grid-cols-3 gap-2.5 md:grid-cols-6"
        onMouseLeave={() => setPaused(false)}
        onBlur={(e) => {
          if (!gridRef.current?.contains(e.relatedTarget as Node | null)) setPaused(false);
        }}
      >
        {INDUSTRIES.map((industry, k) => {
          const Icon = industry.icon;
          const isActive = k === active;

          return (
            <motion.button
              key={industry.name}
              type="button"
              layout={!reduceMotion}
              transition={{ duration: 0.42, ease: easings.easeOut }}
              onMouseEnter={() => take(k)}
              onFocus={() => take(k)}
              onClick={() => take(k)}
              aria-label={industry.name}
              aria-current={isActive ? 'true' : undefined}
              className={[
                'relative aspect-square overflow-hidden rounded-2xl border text-left',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]',
                'transition-colors duration-300',
                isActive
                  ? 'col-span-2 row-span-2 cursor-default border-transparent bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] p-[18px] shadow-xl shadow-[#1877F2]/25'
                  : 'flex cursor-pointer flex-col items-center justify-center gap-2 border-gray-200 bg-white p-2 text-center hover:border-[#1877F2]/50',
              ].join(' ')}
            >
              <Icon
                aria-hidden="true"
                className={
                  isActive
                    ? 'absolute left-[18px] top-[18px] h-[22px] w-[22px] text-white'
                    : 'h-[22px] w-[22px] text-[#1877F2]'
                }
              />

              {isActive ? (
                <span className="absolute inset-x-[18px] bottom-[18px] block">
                  <span className="mb-1.5 block text-h3 font-bold text-white">
                    {industry.name}
                  </span>
                  <span className="mb-2.5 block text-meta text-white/90">
                    {industry.proof}
                  </span>
                  <span className="block border-t border-white/30 pt-2 font-mono text-meta uppercase tracking-wide text-white">
                    {industry.metric}
                  </span>
                </span>
              ) : (
                <span className="text-meta font-medium text-gray-600">
                  {industry.name}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
