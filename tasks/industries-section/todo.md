# Industries Section — concept preview page

## Goal
Ship a deployable, shareable route inside the Next.js app showing all 7 concepts
for the "Industries We Serve" section, so stakeholders can review it live on Vercel.
Eight concepts as of the latest round (H = G at 60% + B at 40%, B's belt bent into a wheel).
Whichever concept wins gets promoted into the home page after `<Experience />`.

## Route
`/concepts/industries` — `noindex, nofollow` so it never competes with `/` in search.

## Files
- [x] `src/components/industries/data.ts` — single `INDUSTRIES` source of truth (15 entries)
- [x] `src/components/industries/concepts.css` — keyframes + orbit geometry Tailwind can't express
- [x] `src/components/industries/SectionHeading.tsx` — shared gradient heading (matches `Experience.tsx`)
- [x] `src/components/industries/ConceptSpotlightMosaic.tsx` — A
- [x] `src/components/industries/ConceptDriftingMarquee.tsx` — B
- [x] `src/components/industries/ConceptOrbitalConstellation.tsx` — C
- [x] `src/components/industries/ConceptMarketBoard.tsx` — D
- [x] `src/components/industries/ConceptElasticSlats.tsx` — E
- [x] `src/components/industries/ConceptIndexWall.tsx` — F
- [x] `src/components/industries/ConceptSerpSimulator.tsx` — G
- [x] `src/components/industries/SerpAnswer.tsx` — shared `SearchField` + `SerpAnswer`, used by G and H
- [x] `src/components/industries/ConceptSearchWheel.tsx` — H (G 60% + B 40%, circular drift)
- [x] `src/components/industries/index.ts` — barrel
- [x] `src/app/concepts/industries/page.tsx` — preview page shell

## Constraints
- Reuse existing design language: `#1877F2 → #0D5DBF`, gradient-text headings with
  hairline rules, `rounded-2xl`, `sectionTiming`/`easings` from `lib/animations.ts`.
- No new npm dependency — `motion/react` + `lucide-react` cover all seven.
- Every concept: keyboard-operable, honours `prefers-reduced-motion`, no horizontal
  page scroll at 400px.
- Each concept component is production-shaped so the winner moves to the home page
  with only an import change.

## Verification
- [x] `npm run build` passes clean — route is static, 9.01 kB / 139 kB First Load JS
- [x] Served HTML checked: all 8 anchors present, all 15 industries server-rendered
      inside every concept, `<meta name="robots" content="noindex, nofollow, nocache">`
- [x] H specifically: 15 chip buttons + 1 marker on the ring, both SERP fields render
- [ ] Visual check at 1440 / 768 / 390 — **not done by me**: the Playwright browser
      profile was locked by another session, so no screenshots were taken. Needs a
      human pass in the browser.
- [x] Concept chosen: **A — Spotlight Mosaic**

## Open items
- **Metrics are unverified placeholders.** Market-level statements written to
  demonstrate layout. Must be sourced or reworded before the winning concept ships.

## Promotion — concept A shipped to the home page

- `src/components/Industries.tsx` — new home page section. Owns the landmark
  (`id="industries"`), the vertical rhythm and the scroll reveal; renders
  `ConceptSpotlightMosaic` from the variants folder. One implementation, two
  call sites — editing the grid updates both the home page and the review page.
- `src/app/page.tsx` — `<Industries />` added after `<Experience />`,
  lazy-loaded via `next/dynamic` like every other below-fold section.
- Rhythm: `pt-section-sm` (same white background as `Experience` above)
  + `pb-section` (background changes to dark at `About` below).

### Folder rename
`src/components/industries/` → `src/components/industry-concepts/`.

On Windows' case-insensitive filesystem, the new `components/Industries.tsx`
shadowed the `components/industries/` directory, so `@/components/industries`
started resolving to the file instead of the folder's `index.ts` and every
concept import broke. The rename removes the ambiguity and makes the split
obvious: one production section, one folder of reference variants.

### Metric copy hardened for public release
Two lines carried hard numbers that were never sourced and would now render on
the public home page. Replaced with qualitative equivalents:

| Industry | Was | Now |
|---|---|---|
| Real Estate | `~95% of buyers begin the search online` | `The search starts online, long before the office` |
| E-commerce | `Typical store converts 2–3% of sessions` | `Traffic is the easy part; conversion is the margin` |

No `metric` line now contains a digit. The header comment in `data.ts` records
the rule: no statistic goes back in without a citation attached.

## Review
- `npx tsc --noEmit` clean; `npm run build` clean.
- Home page: `id="industries"` present, all 15 names server-rendered, section
  order verified in the served HTML — Experience → Industries → About.
- `/concepts/industries` still 200 with all 8 variants intact.
- **Known limit of concept A:** only the active tile's `proof` and `metric`
  are in the server HTML; the other 14 appear on interaction. All 15 industry
  *names* are always present, so the crawlable surface is fine — but if the
  proof lines matter for SEO, that's the trade-off F would have avoided.
- Not verified: visual pass at 1440 / 768 / 390 (Playwright profile locked).
