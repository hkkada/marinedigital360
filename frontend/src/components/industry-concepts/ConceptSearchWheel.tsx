'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { INDUSTRIES } from './data';
import { SectionHeading } from './SectionHeading';
import { SearchField, SerpAnswer } from './SerpAnswer';

/**
 * Concept H — Search Wheel. G (60%) + B (40%), with B's belt bent into a circle.
 *
 * The right-hand wheel carries all fifteen industries as chips on a ring. The
 * chip sitting at the marker drives the query on the left: the wheel turns one
 * notch, the search field types that industry, the answer resolves, then it
 * turns again. The rotation isn't ambient decoration — it *is* the selector,
 * which is the thing B's horizontal drift could never claim.
 *
 * Marker position follows the layout, because the wheel should always point at
 * the answer it's driving:
 *   · lg and up — two columns, wheel on the right, marker at 9 o'clock (270°)
 *   · below lg  — stacked, wheel above the search, marker at 6 o'clock (180°)
 *
 * Mobile keeps the full wheel rather than degrading to a list: chips are
 * icon-only at every size and the industry name lives in the hub, so the ring
 * only has to shrink, not restructure. Hover, tap and Tab all take the wheel
 * off auto-advance and hand it to the visitor.
 */
const STEP_DEG = 360 / INDUSTRIES.length;
const MARKER_DESKTOP = 270; // 9 o'clock — points left, at the SERP beside it
const MARKER_MOBILE = 180; // 6 o'clock — points down, at the SERP beneath it

const TYPE_MS = 58;
const DELETE_MS = 28;
const HOLD_MS = 3200;
const ANSWER_DELAY_MS = 220;

type Phase = 'typing' | 'deleting';

export function ConceptSearchWheel() {
  const reduceMotion = useReducedMotion();

  /** Drives the query + answer. */
  const [index, setIndex] = useState(0);
  /** Drives the wheel. Runs one notch ahead of `index` while the query erases. */
  const [wheelIndex, setWheelIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [answered, setAnswered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [marker, setMarker] = useState(MARKER_DESKTOP);
  const wheelRef = useRef<HTMLDivElement>(null);

  const industry = INDUSTRIES[index];
  const query = industry.name.toLowerCase();

  // Marker follows the breakpoint, so the wheel always points at the answer.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setMarker(mq.matches ? MARKER_DESKTOP : MARKER_MOBILE);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Type → answer → hold → erase (wheel turns) → repeat.
  useEffect(() => {
    if (reduceMotion) {
      setChars(query.length);
      setAnswered(true);
      return;
    }
    if (paused) return;

    if (phase === 'typing') {
      if (chars < query.length) {
        const id = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
        return () => clearTimeout(id);
      }
      const reveal = setTimeout(() => setAnswered(true), ANSWER_DELAY_MS);
      const hold = setTimeout(() => {
        // Start the wheel turning before the query finishes erasing — the
        // wheel leads, the query follows, which is how a real dial feels.
        setWheelIndex((w) => (w + 1) % INDUSTRIES.length);
        setPhase('deleting');
      }, HOLD_MS);
      return () => {
        clearTimeout(reveal);
        clearTimeout(hold);
      };
    }

    if (chars > 0) {
      if (answered) setAnswered(false);
      const id = setTimeout(() => setChars((c) => c - 1), DELETE_MS);
      return () => clearTimeout(id);
    }
    setIndex(wheelIndex);
    setPhase('typing');
  }, [phase, chars, query.length, answered, paused, wheelIndex, reduceMotion]);

  /** Visitor grabs the wheel: jump straight to that industry, fully answered. */
  const pick = useCallback((k: number) => {
    setPaused(true);
    setWheelIndex(k);
    setIndex(k);
    setChars(INDUSTRIES[k].name.length);
    setPhase('typing');
    setAnswered(true);
  }, []);

  const release = useCallback(() => {
    setPaused(false);
    setPhase('typing');
  }, []);

  const rotation = marker - wheelIndex * STEP_DEG;

  return (
    <section aria-labelledby="ic-h-heading">
      <SectionHeading
        id="ic-h-heading"
        lead="Every Market,"
        accent="Answered"
        sub="Turn the dial to any of the fifteen. Wherever the question gets asked — Google, ChatGPT, Perplexity — the answer should be you."
      />

      <div className="mx-auto grid max-w-[1060px] items-center gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
        {/* ---- 40% · the wheel. First on mobile, second on desktop. ---- */}
        <div
          ref={wheelRef}
          className="order-1 grid place-items-center lg:order-2"
          onMouseLeave={release}
          onBlur={(e) => {
            if (!wheelRef.current?.contains(e.relatedTarget as Node | null)) release();
          }}
        >
          <div className="ic-wheel relative aspect-square w-full max-w-[300px] sm:max-w-[340px]">
            {/* Track */}
            <div className="absolute inset-0 m-auto rounded-full border border-dashed border-gray-200 [height:calc(var(--ic-wr)*2)] [width:calc(var(--ic-wr)*2)]" />

            {/* Marker — the notch the active chip rides into. */}
            <span
              aria-hidden="true"
              className="ic-node absolute left-1/2 top-1/2 h-0 w-0"
              style={{ '--ic-a': `${marker}deg`, '--ic-r': 'var(--ic-wr)' } as CSSProperties}
            >
              <span className="absolute h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1877F2]/35" />
            </span>

            {/* The ring of chips */}
            <div
              className="ic-wheel-turn absolute inset-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {INDUSTRIES.map((item, k) => {
                const Icon = item.icon;
                const isOn = k === wheelIndex;
                return (
                  <span
                    key={item.name}
                    className="ic-node absolute left-1/2 top-1/2 h-0 w-0"
                    style={
                      { '--ic-a': `${k * STEP_DEG}deg`, '--ic-r': 'var(--ic-wr)' } as CSSProperties
                    }
                  >
                    <button
                      type="button"
                      aria-label={item.name}
                      aria-current={isOn ? 'true' : undefined}
                      onMouseEnter={() => pick(k)}
                      onFocus={() => pick(k)}
                      onClick={() => pick(k)}
                      /* Counter-rotate so chips stay upright as the ring turns. */
                      style={{ transform: `translate(-50%, -50%) rotate(${-rotation}deg)` }}
                      className={[
                        'ic-chip-turn absolute grid h-11 w-11 place-items-center rounded-full border',
                        'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1877F2]',
                        isOn
                          ? 'border-transparent bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] text-white shadow-lg shadow-[#1877F2]/35'
                          : 'border-gray-200 bg-white text-ink-muted hover:border-[#1877F2]/50 hover:text-brand-azure',
                      ].join(' ')}
                    >
                      <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                    </button>
                  </span>
                );
              })}
            </div>

            {/* Hub — carries the name, so the chips never need labels. */}
            <div className="pointer-events-none absolute inset-0 m-auto flex h-[58%] w-[58%] flex-col items-center justify-center rounded-full bg-white px-3 text-center">
              <span className="mb-1 font-mono text-meta uppercase tracking-[0.16em] text-ink-muted">
                {String(wheelIndex + 1).padStart(2, '0')} / {INDUSTRIES.length}
              </span>
              <span className="text-body font-bold text-ink">
                {INDUSTRIES[wheelIndex].name}
              </span>
              <span className="mt-1.5 h-px w-8 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent" />
            </div>
          </div>

          <p className="mt-3 text-center text-meta text-ink-muted">
            Hover, tap or Tab a chip to take the dial.
          </p>
        </div>

        {/* ---- 60% · the answer ---- */}
        <div className="order-2 min-w-0 lg:order-1">
          <SearchField query={query} chars={chars} compact />
          <div aria-live="polite" className="min-h-[240px]">
            {answered && <SerpAnswer key={industry.name} industry={industry} compact />}
          </div>
        </div>
      </div>
    </section>
  );
}
