'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { INDUSTRIES } from './data';
import { SectionHeading } from './SectionHeading';
import { SearchField, SerpAnswer } from './SerpAnswer';

/**
 * Concept G — SERP Simulator.
 *
 * The section *is* a search engine. A query types itself — "digital marketing
 * for hospitality" — and the page answers with an AI Overview panel carrying
 * the market stat, then a ranked result that is our own industry page. Then it
 * backspaces and types the next one.
 *
 * The argument is the form: this site sells AEO and GEO — being the source an
 * answer engine cites. This section performs that rather than describing it.
 *
 * Under `prefers-reduced-motion` the typing and cycling stop entirely and the
 * first industry's answer is rendered statically, so the section still makes
 * its point without any animation.
 */
const TYPE_MS = 58;
const DELETE_MS = 28;
const HOLD_MS = 3600;
const ANSWER_DELAY_MS = 220;

type Phase = 'typing' | 'holding' | 'deleting';

export function ConceptSerpSimulator() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [answered, setAnswered] = useState(false);

  const industry = INDUSTRIES[index];
  const query = industry.name.toLowerCase();

  useEffect(() => {
    if (reduceMotion) {
      setChars(query.length);
      setAnswered(true);
      return;
    }

    if (phase === 'typing') {
      if (chars < query.length) {
        const id = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
        return () => clearTimeout(id);
      }
      const reveal = setTimeout(() => setAnswered(true), ANSWER_DELAY_MS);
      const hold = setTimeout(() => setPhase('deleting'), HOLD_MS);
      return () => {
        clearTimeout(reveal);
        clearTimeout(hold);
      };
    }

    if (phase === 'deleting') {
      if (chars > 0) {
        if (answered) setAnswered(false);
        const id = setTimeout(() => setChars((c) => c - 1), DELETE_MS);
        return () => clearTimeout(id);
      }
      setIndex((i) => (i + 1) % INDUSTRIES.length);
      setPhase('typing');
    }
  }, [phase, chars, query.length, answered, reduceMotion]);

  return (
    <section aria-labelledby="ic-g-heading">
      <SectionHeading
        id="ic-g-heading"
        lead="Ask It About"
        accent="Your Industry"
        sub="Fifteen markets. Wherever the question gets asked — Google, ChatGPT, Perplexity — the answer should be you."
      />

      <div className="mx-auto max-w-[720px]">
        <SearchField query={query} chars={chars} />

        <div aria-live="polite" className="min-h-[260px]">
          {answered && <SerpAnswer key={industry.name} industry={industry} />}
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          Cycles through all {INDUSTRIES.length} industries.
        </p>
      </div>
    </section>
  );
}
