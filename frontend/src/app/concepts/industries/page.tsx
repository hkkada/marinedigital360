import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import {
  ConceptDriftingMarquee,
  ConceptElasticSlats,
  ConceptIndexWall,
  ConceptMarketBoard,
  ConceptOrbitalConstellation,
  ConceptSearchWheel,
  ConceptSerpSimulator,
  ConceptSpotlightMosaic,
  INDUSTRIES,
} from '@/components/industry-concepts';
import '@/components/industry-concepts/concepts.css';

/**
 * Internal review page for the "Industries We Serve" section.
 *
 * Eight live concepts, each built in the site's real design language so the
 * chosen one moves to the home page (after `<Experience />`) with an import
 * change and nothing else. Deployable and shareable, but never indexed — it
 * must not compete with `/` in search.
 */
export const metadata: Metadata = {
  title: 'Industries Section — Concept Review',
  description: 'Internal review: eight live concepts for the Industries We Serve section.',
  robots: { index: false, follow: false, nocache: true },
};

interface Concept {
  id: string;
  letter: string;
  name: string;
  blurb: string;
  Component: ComponentType;
}

const CONCEPTS: Concept[] = [
  {
    id: 'spotlight-mosaic',
    letter: 'A',
    name: 'Spotlight Mosaic',
    blurb:
      'All fifteen on screen, one lit. The active tile grows to 2×2, fills with the brand gradient and reveals its proof line and market stat. Auto-advances every 4s, hands control over on hover, tap or Tab — and the other tiles physically reflow around the open one.',
    Component: ConceptSpotlightMosaic,
  },
  {
    id: 'serp-simulator',
    letter: 'G',
    name: 'SERP Simulator',
    blurb:
      'The section is a search engine. A query types itself, and the page answers with an AI Overview panel carrying the market stat, then a ranked result that is our own industry page. We sell being cited in AI answers — this performs that rather than describing it. Boldest, and the furthest from a conventional section.',
    Component: ConceptSerpSimulator,
  },
  {
    id: 'search-wheel',
    letter: 'H',
    name: 'Search Wheel',
    blurb:
      'G at 60% and B at 40%, with B’s belt bent into a circle. Fifteen chips ride a ring; the one sitting at the marker drives the query beside it — the wheel turns a notch, the field types that industry, the answer resolves, then it turns again. The rotation is the selector, not ambient decoration, which is the one thing a horizontal drift could never claim. Two columns on desktop with the marker at 9 o’clock pointing straight at the answer; stacked on mobile with the marker swung round to 6 o’clock — same wheel, no restructure.',
    Component: ConceptSearchWheel,
  },
  {
    id: 'drifting-marquee',
    letter: 'B',
    name: 'Drifting Marquee',
    blurb:
      'Two rows of pills drift past each other in opposite directions, edges dissolving into the white. Reads as a breadth statement rather than a wall of cards, and costs almost nothing in height or code. Trade-off: no room for the market stat.',
    Component: ConceptDriftingMarquee,
  },
  {
    id: 'orbital-constellation',
    letter: 'C',
    name: 'Orbital Constellation',
    blurb:
      'Fifteen nodes on two counter-rotating rings around the brand core. Hover or focus halts both rings and writes that industry into the centre. High wow factor — but rotating nodes are a harder hit-target than a tile, and ambient motion is what accessibility guidance pushes back on hardest.',
    Component: ConceptOrbitalConstellation,
  },
  {
    id: 'market-board',
    letter: 'D',
    name: 'Live Market Board',
    blurb:
      'A dark trading-terminal panel dropped into the white section — the only surface inversion on the page, which is why it sticks. Every 2.2s one row goes hot: it tints brand-blue and its signal scrambles through characters before resettling. We sell market intelligence, so a board that looks like it is reading the market is the message, not decoration.',
    Component: ConceptMarketBoard,
  },
  {
    id: 'elastic-slats',
    letter: 'E',
    name: 'Elastic Slats',
    blurb:
      'Fifteen vertical slats with names set sideways. Point at one and it stretches open into a full gradient panel while the others compress — one continuous elastic gesture, nothing jumping. The most tactile of the seven, and it rotates into a clean accordion on mobile with no second layout to maintain.',
    Component: ConceptElasticSlats,
  },
  {
    id: 'index-wall',
    letter: 'F',
    name: 'Editorial Index Wall',
    blurb:
      'No cards at all. Fifteen full-width rows of oversized uppercase type on hairlines. Hover washes brand colour in from the left and slides the stat in from the right. The only pure-text concept — every name is real crawlable content at rest, which makes it the strongest option for the SEO/AEO/GEO work this site sells, and the cheapest to maintain.',
    Component: ConceptIndexWall,
  }
];

export default function IndustriesConceptsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-[1160px] px-5 pb-20 pt-10 sm:px-8">
        <header className="mb-6 border-b border-gray-300 pb-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-500">
            Internal review · not indexed
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Eight ways to show {INDUSTRIES.length} industries
          </h1>
          <p className="max-w-[62ch] leading-relaxed text-gray-600">
            Every section below is live — hover, tap and keyboard focus all work. All eight reuse
            the site&rsquo;s existing language: white section, <code className="font-mono text-[13px]">#1877F2 → #0D5DBF</code>{' '}
            gradient, gradient-text heading with hairline rules, 16px card radius, the same motion
            curve. None adds a dependency. Whichever wins drops into the home page after{' '}
            <code className="font-mono text-[13px]">&lt;Experience /&gt;</code>.
          </p>
          <p className="mt-5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-[13px] leading-relaxed text-gray-800">
            <strong>On the numbers:</strong> every metric shown is a market-level placeholder
            written to demonstrate layout — not a verified figure and not one of our own
            results. Pick a concept first; each stat gets sourced or reworded before it ships.
          </p>
        </header>

        <nav aria-label="Concepts" className="mb-11 flex flex-wrap gap-2">
          {CONCEPTS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="inline-flex items-baseline gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-[13px] font-medium text-gray-900 transition-colors hover:border-[#1877F2] hover:text-[#1877F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
            >
              <b className="font-mono text-[11px] font-semibold text-gray-500">{c.letter}</b>
              {c.name}
            </a>
          ))}
        </nav>

        {CONCEPTS.map(({ id, letter, name, blurb, Component }) => (
          <section key={id} id={id} className="mb-14 scroll-mt-5">
            <div className="mb-2 flex flex-wrap items-baseline gap-x-3.5 gap-y-2.5">
              <span className="rounded-md bg-gray-900 px-2 py-1 font-mono text-[11px] font-semibold tracking-widest text-gray-100">
                {letter}
              </span>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                {name}
              </h2>
            </div>
            <p className="mb-4 max-w-[74ch] text-sm leading-relaxed text-gray-600">{blurb}</p>

            {/* Artboard — white, so each concept is judged on the real surface. */}
            <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-xl shadow-gray-900/5">
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400">
                  {letter} · live
                </span>
              </div>
              <div className="px-4 pb-11 pt-10 sm:px-6">
                <Component />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
