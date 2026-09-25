'use client';

import { INDUSTRIES, type Industry } from './data';
import { INDUSTRIES_SUBHEAD, SectionHeading } from './SectionHeading';

/**
 * Concept B — Drifting Marquee.
 *
 * Two rows of industry pills drift past each other in opposite directions,
 * edges dissolving into the white section. Hover or focus anywhere stops both
 * rows; under `prefers-reduced-motion` the rows wrap into a static cloud
 * (see `concepts.css`).
 *
 * Each row's content is duplicated so the -50% translate loops seamlessly. The
 * duplicate is `aria-hidden` — screen readers and crawlers see each industry
 * exactly once.
 */
function Pill({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  return (
    <span className="inline-flex flex-shrink-0 items-center gap-2.5 rounded-full border border-gray-200 bg-white py-3 pl-3.5 pr-5 text-meta font-semibold whitespace-nowrap text-gray-900 transition-colors duration-300 hover:border-[#1877F2]/55">
      <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] text-white shadow-lg shadow-[#1877F2]/20">
        <Icon aria-hidden="true" className="h-[17px] w-[17px]" />
      </span>
      <span>{industry.name}</span>
      <span className="text-meta font-normal text-gray-500">
        {industry.proof.replace(/\.$/, '')}
      </span>
    </span>
  );
}

function Row({ items, drift }: { items: Industry[]; drift: 'ic-drift-l' | 'ic-drift-r' }) {
  return (
    <div className={`flex w-max gap-3 ${drift}`}>
      {items.map((industry) => (
        <Pill key={industry.name} industry={industry} />
      ))}
      {/* Seamless-loop duplicate — hidden from assistive tech and crawlers. */}
      <span className="flex gap-3" aria-hidden="true">
        {items.map((industry) => (
          <Pill key={`dup-${industry.name}`} industry={industry} />
        ))}
      </span>
    </div>
  );
}

export function ConceptDriftingMarquee() {
  const top = INDUSTRIES.slice(0, 8);
  const bottom = INDUSTRIES.slice(8);

  return (
    <section aria-labelledby="ic-b-heading">
      <SectionHeading
        id="ic-b-heading"
        lead="Industries We"
        accent="Serve"
        sub={INDUSTRIES_SUBHEAD}
      />
      <div className="ic-marquee flex flex-col gap-3">
        <Row items={top} drift="ic-drift-l" />
        <Row items={bottom} drift="ic-drift-r" />
      </div>
    </section>
  );
}
