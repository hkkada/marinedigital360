'use client';

import { useState, type CSSProperties } from 'react';
import { INDUSTRIES, type Industry } from './data';
import { INDUSTRIES_SUBHEAD, SectionHeading } from './SectionHeading';

/**
 * Concept C — Orbital Constellation.
 *
 * Fifteen nodes on two counter-rotating rings around the brand core. Hover or
 * focus halts both rings and writes that industry into the centre.
 *
 * Geometry lives in `concepts.css`: each node is placed by polar coordinates
 * (`--ic-a` angle, `--ic-r` radius) and counter-rotates at its ring's rate so
 * the icons never turn upside down.
 */
const INNER = INDUSTRIES.slice(0, 6);
const OUTER = INDUSTRIES.slice(6);

function Ring({
  items,
  radiusVar,
  ringClass,
  onPick,
  activeName,
}: {
  items: Industry[];
  radiusVar: '--ic-r1' | '--ic-r2';
  ringClass: 'ic-ring-1' | 'ic-ring-2';
  onPick: (industry: Industry) => void;
  activeName: string;
}) {
  return (
    <div className={`absolute inset-0 ${ringClass}`}>
      {items.map((industry, k) => {
        const Icon = industry.icon;
        const isOn = industry.name === activeName;
        return (
          <span
            key={industry.name}
            className="ic-node absolute left-1/2 top-1/2 h-0 w-0"
            style={
              {
                '--ic-a': `${(360 / items.length) * k}deg`,
                '--ic-r': `var(${radiusVar})`,
              } as CSSProperties
            }
          >
            <button
              type="button"
              aria-label={industry.name}
              onMouseEnter={() => onPick(industry)}
              onFocus={() => onPick(industry)}
              onClick={() => onPick(industry)}
              className={[
                'ic-node-in absolute grid h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[14px] border',
                'transition-[background-color,color,border-color,scale] duration-300',
                'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1877F2]',
                isOn
                  ? 'scale-110 border-transparent bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] text-white shadow-lg shadow-[#1877F2]/30'
                  : 'border-gray-200 bg-white text-[#1877F2] shadow-sm hover:scale-110 hover:border-transparent hover:bg-gradient-to-br hover:from-[#1877F2] hover:to-[#0D5DBF] hover:text-white',
              ].join(' ')}
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
            </button>
          </span>
        );
      })}
    </div>
  );
}

export function ConceptOrbitalConstellation() {
  const [current, setCurrent] = useState<Industry>(INDUSTRIES[0]);

  return (
    <section aria-labelledby="ic-c-heading">
      <SectionHeading
        id="ic-c-heading"
        lead="Industries We"
        accent="Serve"
        sub={INDUSTRIES_SUBHEAD}
      />

      <div className="grid place-items-center">
        <div className="ic-orbit relative aspect-square w-full max-w-[520px]">
          <div className="absolute inset-0 m-auto rounded-full border border-dashed border-gray-200 [height:calc(var(--ic-r1)*2)] [width:calc(var(--ic-r1)*2)]" />
          <div className="absolute inset-0 m-auto rounded-full border border-dashed border-gray-200 [height:calc(var(--ic-r2)*2)] [width:calc(var(--ic-r2)*2)]" />

          <Ring
            items={INNER}
            radiusVar="--ic-r1"
            ringClass="ic-ring-1"
            onPick={setCurrent}
            activeName={current.name}
          />
          <Ring
            items={OUTER}
            radiusVar="--ic-r2"
            ringClass="ic-ring-2"
            onPick={setCurrent}
            activeName={current.name}
          />

          <div
            className="absolute inset-0 m-auto flex h-[46%] max-h-[210px] w-[46%] max-w-[210px] flex-col items-center justify-center rounded-full border border-gray-200 bg-white p-4 text-center shadow-lg"
            aria-live="polite"
          >
            <span className="mb-1.5 font-mono text-eyebrow uppercase text-[#1877F2]">
              Industry
            </span>
            <span className="mb-1 text-body font-bold text-gray-900">
              {current.name}
            </span>
            <span className="hidden text-meta text-gray-600 sm:block">
              {current.metric}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-meta text-gray-500">
        Hover or Tab to a node to stop the rings.
      </p>
    </section>
  );
}
