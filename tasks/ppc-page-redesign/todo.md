# Paid Ads (`/services/ppc`) — align new content with the existing design

Scope: the four new `content-block` sections staged in `frontend/src/lib/service-pages/ppc.ts`,
the `ContentBlock` component they render through, and the `ServiceSubNav` they feed.
Binding constraints: `tasks/website-restructure/todo.md` §Global Constraints + `tasks/lessons.md`.

## Measured baseline (1440x900, dev server)

Page height 11,687px. Section map:

| y | section | background |
|---|---------|------------|
| 0 | hero | black |
| 765 | sticky sub-nav (57px) | white/95 |
| 822 | `#what-is-paid-advertising` | white |
| 1546 | service-overview | white |
| 2269 | platform-coverage | black |
| 3222 | `#ppc-management` | white |
| 4010 | `#google-ads` | white |
| 4720 | `#bing-ads` | white |
| 5396 | metrics-results | white |
| 6119 | pricing-tiers | white |
| 7021 | tech-stack | dark gradient |

## Findings

- [x] F1 — **`ContentBlock` centers its column; every other section left-aligns inside a
  1600px container.** `max-w-3xl mx-auto px-8 lg:px-16` puts the prose left edge at 392px @1440,
  aligning with nothing above or below it. The shipped precedent for a prose band is
  `components/Intro.tsx`: `max-w-[1600px] mx-auto px-8 lg:px-16` wrapping an inner
  `max-w-3xl` (no `mx-auto`).
- [x] F2 — **Naked eyebrow rule.** `ContentBlock` renders the 16px gradient rule with no kicker
  label. Every other section pairs that rule with `text-sm tracking-[0.3em] uppercase text-[#1877F2]`.
  It is the only section on the site with a bare line.
- [x] F3 — **Headline one step below its peers.** `text-3xl md:text-4xl xl:text-5xl leading-[1.05]`
  vs. the house `<h2>` scale `text-4xl sm:text-5xl md:text-6xl leading-[0.95]`, so four peer
  sections read as subordinate sub-headings.
- [x] F4 — **3,800px of unbroken white** from `#ppc-management` through pricing, containing three
  near-identical prose blocks (789 / 709 / 677px) back to back. `#what-is-paid-advertising`
  also butts white-on-white against `service-overview`.
- [x] F5 — **Deep links land under the chrome.** `ContentBlock` owns the sub-nav's anchor targets
  but has no `scroll-mt`, so `/services/ppc#google-ads` on load puts the `<h2>` behind the 96px
  fixed nav + 57px sticky sub-nav. `ServiceSubNav` compensates in JS on click only.
  `components/Contact.tsx` already established `scroll-mt-*` as the house fix.
- [x] F6 — **Sub-nav has no active state** (ui-ux-pro-max `ux` / Navigation / Active State, Medium)
  and carries full headings as labels ("Google Ads Campaign Management").
- [x] F7 — `mb-8` literal for header → content instead of the `mb-block` token (lessons.md).

## Tasks

- [x] T1 — `lib/service-pages/types.ts`: add optional `eyebrow`, `navLabel`, `surface` to
  `ContentBlockData`. All optional, so existing data keeps compiling.
- [x] T2 — `styles/globals.css`: add `--spacing-subnav` and `--spacing-anchor`
  (= nav + sub-nav + breathing room) so the anchor offset has one source of truth.
- [x] T3 — Rewrite `components/services/ContentBlock.tsx` to the house prose-band pattern
  (F1, F2, F3, F7) + `scroll-mt-anchor` (F5) + `surface` variants (F4).
- [x] T4 — `components/services/ServiceSubNav.tsx`: scroll-spy active state, prefer `navLabel`,
  and replace the measured JS offset with `scrollIntoView` so the CSS token drives both the
  click path and the hash-on-load path (F5, F6).
- [x] T5 — `lib/service-pages/ppc.ts`: give each content block an `eyebrow`, a short `navLabel`,
  and a `surface` that alternates against its neighbours.
- [x] T6 — Verify: `npx tsc --noEmit`, `NEXT_DIST_DIR=.next-build npx next build`, then re-measure
  the section map and screenshot at 1440 / 1024 / 390.

## Review

### What changed

`ContentBlock` now speaks the same visual language as the sections around it, and the four new
prose blocks alternate surfaces instead of stacking into one white slab.

| | before | after |
|---|---|---|
| container | `max-w-3xl mx-auto` — column floating at x=392 | `max-w-[1600px] mx-auto px-8 lg:px-16` + inner `max-w-3xl`; left edge x=64, identical to its neighbours at 1440 and 1024 |
| eyebrow | bare 16px rule | rule + uppercase brand kicker from `eyebrow` ("Definition", "Ongoing Management", "Search & Shopping", "Microsoft Advertising") |
| headline | `text-3xl md:text-4xl xl:text-5xl` | `text-4xl sm:text-5xl md:text-6xl leading-[0.95]` — 60px at 1024/1440, 36px at 390, matching peer `<h2>`s |
| paragraphs | all identical `text-lg md:text-xl` | lead (18-20px gray-600) + supporting (16-18px gray-500), the `Intro.tsx` two-tier treatment |
| header gap | `mb-8` literal | `mb-block` token |
| surface | always white | `surface: 'white' \| 'light'`, default white |
| anchor offset | JS measurement, click path only | `scroll-mt-anchor` token, click *and* cold-load paths |
| sub-nav | inert links, full headings, 17px tap targets | scroll-spy active state, short `navLabel`s, 60px tap targets |

### Measured results (dev server)

- **Alignment:** prose column left edge 64px at both 1440 and 1024, equal to the
  `platform-coverage` heading above it (was 392px).
- **Rhythm:** the 3,800px unbroken white run is broken into white / gray-50 / white, and
  `#what-is-paid-advertising` no longer butts white-on-white against `service-overview`.
  The four blocks also got shorter (724/789/709/677 → 642/707/640/611px), so `<main>` ends
  298px earlier despite the larger headlines.
- **Anchors:** at 1440 every block lands with its top 4-5px *behind* the chrome (no sliver of
  the previous section) and its `<h2>` 95-122px clear of it; at 390, -20px and 64-84px clear.
  A cold load of `/services/ppc#bing-ads` now lands correctly — previously the heading sat
  behind the two bars.
- **Scroll-spy:** 16/16 positions resolve to the right link — each block's anchor landing and
  mid-section position, the intervening non-target sections, past the last block, and instant
  jumps in both directions. Nothing highlighted while above the first block.
- **Touch:** sub-nav links 60x60-88px (were 17px tall), bar height unchanged at 1440.
- **Responsive:** no horizontal scroll at 1440 / 1024 / 390.
- **Contrast** (canvas-resolved, so oklch backgrounds measure correctly): h2 16.98:1 on gray-50
  and 17.75:1 on white; lead paragraph 7.23 / 7.56:1; supporting paragraph 4.63 / 4.84:1;
  sub-nav links 7.56:1 inactive, 6.3:1 active. All pass AA.
- `npx tsc --noEmit` passes; `NEXT_DIST_DIR=.next-build npx next build` passes with all 14
  routes prerendered, all four anchor ids and all four eyebrows present in the SSG HTML,
  and `scroll-mt-anchor{scroll-margin-top:9.5rem}` present in the built CSS.
- `tsconfig.json` and `tsconfig.tsbuildinfo` restored after the build (lessons.md), scratch
  dist dir removed, dev server still serving 200.

### Deviations from plan

- **T2 shipped one token, not two.** `--spacing-subnav` was written first but Tailwind v4 only
  emits `@theme` vars that a utility actually consumes, so it was dead on arrival; the
  measurement lives in `--spacing-anchor`'s comment instead.
- **`--spacing-anchor` is 9.5rem (152px), not the 10.5rem first written.** Overshooting the
  chrome parks the tail of the previous section in the gap — an 11px black sliver under the bar
  where `platform-coverage` sits above `#ppc-management`. Undershooting hides the target's top
  edge behind the bar instead, which is invisible, so the token tracks the *smallest* combined
  bar height across breakpoints.
- **The scroll-spy is a rAF-coalesced scroll listener, not an IntersectionObserver.** Two IO
  formulations were built and measured first, and both failed: "topmost intersecting entry"
  let a section clipping the band by 15px outrank the one filling it (`#bing-ads` highlighted
  "Google Ads"), and resolving by geometry inside an IO callback leaves dead zones wherever no
  intersection changes — a thin band misses instant jumps, a wide one misses the boundary
  crossings. The reasoning is recorded in the component so it is not re-litigated.

### Known issues not fixed (deliberate)

- **The eyebrow blue fails WCAG AA.** `text-[#1877F2]` at 14px measures **4.23:1 on white** and
  **4.05:1 on gray-50**, against a 4.5:1 requirement. This is pre-existing and site-wide — the
  same treatment is in `Intro.tsx`, `ServiceOverview`, `MetricsResults` and others, and it
  already failed on white before this work; the new `light` surface only moves it 4.23 → 4.05.
  Fixing it in `ContentBlock` alone would make this one section's kicker a different colour from
  every other section's, which is the opposite of the brief. The one-line site-wide fix is to
  swap the eyebrow colour for `#0D5DBF` — the brand's own darker blue, already used in the icon
  and stat gradients and as `--nav-link-blue`, which measures 6.3:1. That is a visible change to
  every page, so it needs a decision rather than a silent edit.
- **Lead paragraph measure is ~77 characters** at 1440/1024, slightly over the 65-75 guideline.
  `Intro.tsx` has the identical `max-w-3xl` + `text-xl` combination, so tightening it here alone
  would desynchronise the two prose bands. Worth changing in both or neither.
- **`MobileNav` logs a React ref warning** on every service page (`Button` inside `SheetTrigger`
  needs `forwardRef`). Pre-existing, unrelated to this work, and in a component owned by another
  staged change.
- **No `prefers-reduced-motion` handling on the Framer Motion reveals.** The sub-nav's smooth
  scroll now respects it, but the section entrance animations do not — consistent with every
  other section on the site, and a site-wide concern rather than a `ContentBlock` one.

### Follow-ups

- The other eight service pages have no `content-block` sections yet. When they gain them,
  `surface` has to be chosen per page — it depends on the sections above and below, so it is
  data, not something the component can infer.
- `ServiceSubNav` renders only for pages with 2+ identified content blocks, so `/services/ppc`
  is currently the only page exercising the scroll-spy.

---

## Follow-up: sub-nav covering the whole page (2026-09-19)

**Reported:** the sub-nav listed only What It Is / Management / Google Ads / Bing Ads — the four
`content-block` sections — and nothing for the rest of the page.

**Cause:** `ServiceSubNav` derived its links from `content-block` sections specifically, and the
anchor id lived in `ContentBlockData`. No other section type could carry one, so a bar labelled
"Section navigation" stopped a third of the way down a 12,600px page.

### Change

Nav metadata moved off one section's data and onto every section:

- `SectionAnchor` (`id`, `navLabel`) is intersected into `ServiceSection`, so any variant can
  carry it. `ContentBlockData` lost its `id`/`navLabel` — that was the special case.
- `SectionRenderer` now owns the anchor: a section with an `id` is wrapped in
  `<div id className="scroll-mt-anchor">`, one place defining the offset for every section type.
  `ContentBlock` no longer renders an id or a scroll offset of its own. Sections without an `id`
  render through a `Fragment`, so their DOM is byte-for-byte what it was.
- A section joins the bar by carrying **both** fields, so a page can deep-link a section without
  putting it in the bar.
- The bar's container widened from `max-w-5xl` to `max-w-[1600px] px-8 lg:px-16`, so its first
  link now starts at x=64 like the page content (was x=264) and 10 links fit at 1440.
- The bar follows the active link: with 10 links it scrolls horizontally (780px of content in a
  311px bar at 390w), so the highlight was regularly off-screen.

`ppc.ts` now anchors ten sections: What It Is, Platforms, Management, Google Ads, Bing Ads,
Results, Pricing, Tools, Process, FAQ. `service-overview` is deliberately left out — its
"What is PPC management?" heading duplicates the What It Is block.

### Verified

- 10/10 links at 1440: every target lands flush (top 4-5px behind the chrome, no sliver of the
  previous section), heading 92-151px clear, active state matches the link.
- 20/20 on a 390-wide sweep down the page and back up: active state correct and the active link
  scrolled into view in the bar each time.
- Other service pages are untouched: `seo`, `geo-aeo` and `productization` prerender with zero
  `scroll-mt-anchor` wrappers and no sub-nav, exactly as before.
- `npx tsc --noEmit` and `NEXT_DIST_DIR=.next-build npx next build` pass; all ten ids and all ten
  labels are present in the prerendered `ppc.html`.

### Two bugs found and fixed while verifying

- **Bar auto-scroll used `offsetLeft`.** The links' `offsetParent` is the sticky `<nav>`, not the
  scrolling `<ul>`, so `offsetLeft` carried the container's gutter (32px at 390w, 64px at 1440w)
  and did not line up with `scrollLeft`. Now derived from bounding rects, and clamped to the
  scrollable range so the last link does not ask for a scrollLeft past the maximum.
- **`Navigation` loaded transparent on any deep link.** Its scroll state was seeded only by
  future scroll events, so a page opened at an anchor kept `bg-transparent` over the content
  until the visitor scrolled. Pre-existing, but this work turns deep links into a real entry
  point, so it was fixed by calling the handler once on mount. Hero transparency at the top of
  the home page is unchanged (verified transparent → nav-glass → transparent).
