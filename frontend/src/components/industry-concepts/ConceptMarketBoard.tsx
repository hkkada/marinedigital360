'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { INDUSTRIES } from './data';
import { SectionHeading } from './SectionHeading';

/**
 * Concept D — Live Market Board.
 *
 * A dark trading-terminal panel dropped into the white section — the only
 * surface inversion on the page. Fifteen rows, each carrying its industry,
 * what we do there, and a market signal in monospace.
 *
 * Every 2.2s one row goes "hot": it tints brand-blue and its signal scrambles
 * through characters before resettling, like a departure board flipping. Only
 * ever one row at a time, so the board stays readable throughout — and the
 * whole effect is skipped under `prefers-reduced-motion`, leaving the final
 * text in place.
 */
const ROTATE_MS = 2200;
const SCRAMBLE_FRAMES = 11;
const SCRAMBLE_MS = 42;
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·%';

/**
 * The scrambling signal cell. Scrambles only on the false→true edge of
 * `active`; going quiet again just restores the text without a second pass.
 */
function Signal({ text, active }: { text: string; active: boolean }) {
  const [shown, setShown] = useState(text);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active || reduceMotion) {
      setShown(text);
      return;
    }
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / SCRAMBLE_FRAMES) * text.length);
      setShown(
        text.slice(0, settled) +
          text
            .slice(settled)
            .replace(/\S/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
      );
      if (frame >= SCRAMBLE_FRAMES) {
        clearInterval(id);
        setShown(text);
      }
    }, SCRAMBLE_MS);
    return () => clearInterval(id);
  }, [active, text, reduceMotion]);

  return (
    <span className="text-right font-mono text-meta tabular-nums tracking-wide text-emerald-300 max-md:max-w-[44vw] md:whitespace-nowrap">
      {shown}
    </span>
  );
}

export function ConceptMarketBoard() {
  const [hot, setHot] = useState(-1);
  const [clock, setClock] = useState('--:--:--');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setHot((k) => (k + 1) % INDUSTRIES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Rendered client-side only — a server-rendered time would hydrate mismatched.
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section aria-labelledby="ic-d-heading">
      <SectionHeading
        id="ic-d-heading"
        lead="Markets We"
        accent="Move"
        sub="Fifteen industries on the board. Every one of them has demand already searching — the job is showing up for it."
      />

      <div className="mx-auto max-w-[1000px] overflow-hidden rounded-2xl border border-[#1E2936] bg-brand-navy-deep">
        <div className="flex items-center gap-2.5 border-b border-[#1E2936] bg-brand-navy px-[18px] py-3">
          <span className="ic-live-dot h-[7px] w-[7px] rounded-full bg-emerald-400" />
          <span className="font-mono text-meta uppercase tracking-[0.16em] text-[#93A6BC]">
            <b className="font-semibold text-[#E6EEF8]">Demand board</b> · {INDUSTRIES.length} markets
          </span>
          <span
            className="ml-auto font-mono text-meta tabular-nums tracking-widest text-[#5C6F86]"
            suppressHydrationWarning
          >
            {clock}
          </span>
        </div>

        {INDUSTRIES.map((industry, k) => {
          const Icon = industry.icon;
          const isHot = k === hot;
          return (
            <div
              key={industry.name}
              className={[
                'grid items-center gap-2.5 border-b border-[#18222E] px-3.5 py-[11px] transition-colors duration-500 last:border-b-0',
                'grid-cols-[18px_minmax(0,1fr)_auto] md:grid-cols-[22px_minmax(0,1.05fr)_minmax(0,1.5fr)_auto] md:gap-3.5 md:px-[18px]',
                isHot ? 'bg-gradient-to-r from-brand-cyan/15 to-transparent to-70%' : '',
              ].join(' ')}
            >
              <span className="font-mono text-meta tabular-nums text-[#43566C]">
                {String(k + 1).padStart(2, '0')}
              </span>
              <span className="flex items-center gap-2.5 text-meta font-semibold text-[#E6EEF8]">
                <Icon
                  aria-hidden="true"
                  className={`h-[17px] w-[17px] transition-colors duration-500 ${
                    isHot ? 'text-white' : 'text-brand-cyan'
                  }`}
                />
                {industry.name}
              </span>
              <span className="hidden text-meta text-[#8497AC] md:block">{industry.proof}</span>
              <Signal text={`${industry.signal} · ${industry.metric}`} active={isHot} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
