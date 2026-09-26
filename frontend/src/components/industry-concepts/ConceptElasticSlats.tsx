'use client';

import { useState } from 'react';
import { INDUSTRIES } from './data';
import { INDUSTRIES_SUBHEAD, SectionHeading } from './SectionHeading';

/**
 * Concept E — Elastic Slats.
 *
 * Fifteen vertical slats standing shoulder to shoulder with their names set
 * sideways. Point at one and it stretches open into a full brand-gradient
 * panel while the others compress — one continuous elastic gesture driven
 * entirely by `flex-grow`, so nothing reflows or jumps.
 *
 * Under `lg` the slats rotate to horizontal and become a plain accordion, so
 * there is no separate mobile design to maintain. Because the open/closed
 * states are pure CSS classes on a real <button>, keyboard Tab walks the set
 * and opens each slat in turn.
 */
export function ConceptElasticSlats() {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="ic-e-heading">
      <SectionHeading
        id="ic-e-heading"
        lead="Industries We"
        accent="Serve"
        sub={INDUSTRIES_SUBHEAD}
      />

      <div className="mx-auto flex max-w-[1000px] flex-col gap-1.5 lg:h-[380px] lg:flex-row lg:gap-2">
        {INDUSTRIES.map((industry, k) => {
          const Icon = industry.icon;
          const isOpen = k === open;

          return (
            <button
              key={industry.name}
              type="button"
              aria-expanded={isOpen}
              aria-label={industry.name}
              onMouseEnter={() => setOpen(k)}
              onFocus={() => setOpen(k)}
              onClick={() => setOpen(k)}
              className={[
                'group relative min-h-[58px] overflow-hidden rounded-2xl border text-left',
                'transition-[flex-grow,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]',
                'lg:flex lg:min-h-0 lg:min-w-0 lg:basis-0 lg:items-end',
                isOpen
                  ? 'border-transparent bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] shadow-xl shadow-[#1877F2]/25 lg:grow-[7]'
                  : 'border-gray-200 bg-white hover:border-[#1877F2]/50 lg:grow',
              ].join(' ')}
            >
              {/* Closed state — sideways on desktop, a plain row on mobile. */}
              {!isOpen && (
                <span className="flex items-center gap-3 px-5 py-4 lg:absolute lg:inset-0 lg:flex-col lg:justify-between lg:px-0 lg:py-4">
                  <Icon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-brand-azure" />
                  <span className="text-meta font-semibold text-ink-body lg:[writing-mode:vertical-rl] lg:rotate-180 lg:whitespace-nowrap">
                    {industry.name}
                  </span>
                </span>
              )}

              {/* Open state. */}
              {isOpen && (
                <span className="flex flex-col justify-end p-5 lg:absolute lg:inset-0 lg:p-[22px]">
                  <Icon
                    aria-hidden="true"
                    className="mb-3 h-[26px] w-[26px] text-white lg:absolute lg:left-[22px] lg:top-[22px] lg:mb-0"
                  />
                  <span className="mb-2 block text-h3 font-bold text-white">
                    {industry.name}
                  </span>
                  <span className="mb-3 block max-w-[34ch] text-meta text-white">
                    {industry.proof}
                  </span>
                  <span className="block max-w-[40ch] border-t border-white/30 pt-2.5 font-mono text-meta uppercase tracking-wide text-white">
                    {industry.metric}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
