'use client';

import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from './data';
import { INDUSTRIES_SUBHEAD, SectionHeading } from './SectionHeading';

/**
 * Concept F — Editorial Index Wall.
 *
 * No cards. Fifteen full-width rows of oversized uppercase type separated by
 * hairlines — an index, not a grid. Hovering or focusing a row washes brand
 * colour across it from the left, fills the name with the gradient, and slides
 * the proof line and market stat in from the right.
 *
 * Everything here is real text in the DOM at rest: no canvas, no continuous
 * animation, nothing hidden behind an observer. It's the strongest of the
 * seven for crawlability and for answer-engine extraction, which is the work
 * this site sells.
 *
 * The 01–15 numbering earns its place — the count is the claim the heading
 * makes ("fifteen markets"), so the index numbers carry information rather
 * than decorate.
 */
export function ConceptIndexWall() {
  return (
    <section aria-labelledby="ic-f-heading">
      <SectionHeading
        id="ic-f-heading"
        lead="Industries We"
        accent="Serve"
        sub={INDUSTRIES_SUBHEAD}
      />

      <ul className="mx-auto max-w-[1000px] border-t border-gray-200">
        {INDUSTRIES.map((industry, k) => (
          <li key={industry.name} className="border-b border-gray-200">
            <button
              type="button"
              className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 overflow-hidden px-3 py-3.5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1877F2] md:grid-cols-[auto_1fr_auto_auto] md:gap-[18px] md:px-[18px]"
            >
              {/* Colour wash, scaled in from the left edge. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#1877F2]/[0.09] to-transparent to-70% transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />

              <span className="relative font-mono text-[11px] tabular-nums text-gray-500">
                {String(k + 1).padStart(2, '0')}
              </span>

              <span className="relative truncate text-[clamp(1.05rem,4.2vw,2.5rem)] font-bold uppercase leading-none tracking-tighter text-gray-900 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#1877F2] group-hover:via-[#42A5F5] group-hover:to-[#1877F2] group-hover:bg-clip-text group-hover:text-transparent group-focus-visible:bg-gradient-to-r group-focus-visible:from-[#1877F2] group-focus-visible:via-[#42A5F5] group-focus-visible:to-[#1877F2] group-focus-visible:bg-clip-text group-focus-visible:text-transparent">
                {industry.name}
              </span>

              <span className="relative hidden max-w-[30ch] translate-x-3.5 text-right opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
                <span className="block text-[13px] leading-snug text-gray-600">
                  {industry.proof}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-[#1877F2]">
                  {industry.metric}
                </span>
              </span>

              <ArrowRight
                aria-hidden="true"
                className="relative h-5 w-5 text-gray-200 transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[#1877F2] group-focus-visible:translate-x-1 group-focus-visible:text-[#1877F2]"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
