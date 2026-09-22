'use client';

import { Search, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { industrySlug, type Industry } from './data';

/**
 * The two presentational halves of the SERP concepts, shared by the standalone
 * SERP Simulator (G) and the Search Wheel (H) so the answer copy and markup
 * only exist once.
 */

const host = () => SITE_CONFIG.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** The query field. `chars` is how much of `query` has been typed so far. */
export function SearchField({
  query,
  chars,
  compact = false,
}: {
  query: string;
  chars: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-gray-200 bg-white shadow-lg shadow-gray-900/5 ${
        compact ? 'px-4 py-3' : 'px-5 py-3.5'
      }`}
    >
      <Search aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-500" />
      <p
        className={`min-w-0 font-medium text-gray-900 ${
          compact ? 'text-[13px] sm:text-[15px]' : 'text-sm sm:text-base md:text-lg'
        }`}
      >
        <span className="font-normal text-gray-500">digital marketing for</span>{' '}
        <span className="font-bold text-[#1877F2]">{query.slice(0, chars)}</span>
        <span className="ic-caret inline-block h-[1.05em] w-0.5 translate-y-[0.16em] bg-[#1877F2]" />
      </p>
    </div>
  );
}

/**
 * The answer: an AI Overview panel carrying the market stat, then a ranked
 * result pointing at our own industry page. Keyed by caller so the entrance
 * animation replays when the industry changes.
 */
export function SerpAnswer({ industry, compact = false }: { industry: Industry; compact?: boolean }) {
  const slug = industrySlug(industry.name);
  const query = industry.name.toLowerCase();
  const domain = host();

  return (
    <>
      <div
        className={`ic-serp-in rounded-2xl border border-[#1877F2]/25 bg-gradient-to-br from-[#1877F2]/[0.07] to-transparent to-65% ${
          compact ? 'mt-3.5 p-3.5' : 'mt-[18px] p-4 sm:px-[18px]'
        }`}
      >
        <p className="mb-2 flex items-center gap-2">
          <Sparkles aria-hidden="true" className="h-4 w-4 text-[#1877F2]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1877F2]">
            AI Overview
          </span>
        </p>
        <p className={`leading-relaxed text-gray-900 ${compact ? 'text-[13.5px]' : 'text-[14.5px]'}`}>
          For <b className="font-bold">{query}</b>, {industry.metric.replace(/^~/, '').toLowerCase()}{' '}
          — so the brands that win are the ones answering that search first.
        </p>
        <p className="mt-2 text-[11.5px] text-gray-500">
          Cited from {domain} › industries › {slug}
        </p>
      </div>

      <div className={`ic-serp-in [animation-delay:0.12s] ${compact ? 'mt-4' : 'mt-5'}`}>
        <p className="mb-1 flex items-center gap-2 text-[12.5px] text-gray-500">
          <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1877F2] to-[#0D5DBF] font-mono text-[9px] font-bold text-white">
            {SITE_CONFIG.abv?.slice(0, 2) ?? 'CC'}
          </span>
          <span className="truncate">
            {domain} › industries › {slug}
          </span>
        </p>
        <h3
          className={`mb-1 font-semibold leading-snug text-[#1A0DAB] ${
            compact ? 'text-[15px]' : 'text-base sm:text-lg'
          }`}
        >
          {industry.name} Marketing — {industry.proof.replace(/\.$/, '')}
        </h3>
        <p className={`leading-relaxed text-gray-600 ${compact ? 'text-[13px]' : 'text-[13.5px]'}`}>
          {industry.snippet}
        </p>
      </div>
    </>
  );
}
