# Website Restructure & Standardization — Implementation Plan

Spec sources: user brief (2026-09-18), `domain-knowledge/MarineDigital360_Domain_Knowledge.md`,
`domain-knowledge/MarineDigital360_SEO_GEO_AEO_Knowledge.md`, `tasks/lessons.md`.
Execution: `superpowers:subagent-driven-development`.

---

## Decisions settled by the user

| # | Question | Decision |
|---|----------|----------|
| D1 | Paid Ads URL | **Keep `/services/ppc`.** Labels and titles change to "Paid Ads"; no slug change, no redirects. |
| D2 | "Administration" group | **Map to Revenue Enablement / CRM ops** (domain knowledge §6.4). No invented service. |
| D3 | About placement | **Condensed teaser on home + full `/about` page.** `#about` anchor keeps working. |
| D4 | Team content | **Role/capability cards, no named people.** No invented identities or headshots. |
| D5 | Workspace | Work directly on branch `brand-rename`. **No commits — the user commits.** |
| D6 | Verification | `npx tsc --noEmit` + `npx next build --distDir .next-build`. No browser/visual gate. |

---

## Global Constraints (bind every task)

1. **NO GIT WRITES.** No `git commit`, no `git add`, no `git stash`, no branch changes.
   Leave everything as unstaged working-tree changes. The user commits.
2. **Verification for every task — both commands, run from `frontend/`:**
   - `npx tsc --noEmit`
   - `NEXT_DIST_DIR=.next-build npx next build`

   Never run `npm run build` or a bare `npx next build`: both write to `.next` and corrupt a
   running dev server (`tasks/lessons.md`). Paste the real output tail; never claim a pass you
   did not see.

   **R8 — Next 14 has no `--distDir` CLI flag.** (Discovered in Task 1; the original constraint
   named a flag that does not exist.) Task 2 makes `next.config.mjs` read
   `distDir: process.env.NEXT_DIST_DIR || '.next'`, after which the env-var form above works
   for every task. Until Task 2 lands, Task 1's workaround stands on the record.
   *Cost if wrong:* one line in `next.config.mjs`; the default `.next` path is unchanged when
   the variable is unset, so production builds on Vercel behave identically.

2b. **NEVER run `git checkout`, `git restore`, `git reset`, or `git stash`** to undo your own
   edits. The user has uncommitted work in this tree and those commands can destroy it. Undo
   your own changes by editing the file back.
3. **Spacing is tokens, never literals.** Use `py-section`, `pt-section-sm`, `pb-section`,
   `mb-block`, `space-y-block`. A section that starts a page uses `pt-hero` (fixed-nav
   clearance), never `pt-section`. Do not add per-breakpoint `py-*`/`pt-*` literals to a
   section wrapper.
4. **`lg` is a tablet (1024px), not a desktop.** Put the densest grid step at `xl` (1280).
   Never jump to 3–4 columns at `lg`.
5. **An eyebrow/kicker takes its headline's alignment at every breakpoint.**
6. **Verify unfamiliar Tailwind utilities.** A class that does not exist fails silently;
   grep the built CSS if a new utility is load-bearing.
7. **Content is grounded in the domain-knowledge docs.** No invented metrics, certifications,
   client names, team members, or awards. If a fact is absent from the docs, write copy that
   does not assert it.
8. **Brand strings come from `lib/brand.ts` / `SITE_CONFIG.name`.** Never hardcode.
9. **Preserve the data-driven architecture.** Page content lives in `lib/service-pages/*.ts`
   as typed `ServiceSection` entries; components stay presentational.
10. **Accessibility:** every new section is a labelled `<section>` (`aria-labelledby`), one
    `<h2>` per section, links keyboard-reachable.

---

## Ruling log

- **R1 — Visibility is driven entirely by the `isVisible` flag; grouping must be
  self-wiring.** (User direction, 2026-09-18.) Only 5 of 10 services are `isVisible: true`,
  and all 5 are Marketing/Advertising, so Sales and Administration have no visible services
  today. Ruling: the group renderer derives everything from `getVisibleServices()` — a group
  with zero visible services is omitted from the DOM entirely, and **flipping any service's
  `isVisible` to `true` later must surface it under its group with no code change of any
  kind.** No hardcoded group lists, no hardcoded counts, no per-group components.
  This is a hard acceptance criterion for Tasks 1 and 6, and the task reviewer must verify it
  by inspection.
  *Cost if wrong:* today the homepage shows two of the four groups. Publishing a Sales or
  Administration service is then a one-flag change.
- **R2 — "Introductory paragraphs on the main homepage section" = a new intro band below the
  hero.** The hero is a full-screen video slider with no room for body copy.
  *Cost if wrong:* one component to move or delete.
- **R3 — The "dedicated sub-navigation link to detailed PPC management content" is an in-page
  anchor**, since D1 keeps one `/services/ppc` URL. Implemented as an in-page sub-nav on the
  Paid Ads page plus a mega-menu child link to `/services/ppc#ppc-management`.
  *Cost if wrong:* if a separate child route was wanted, only the href changes.
- **R4 — Review diffs come from working-tree snapshots, not commit ranges.** D5 forbids commits,
  so SDD's `review-package BASE HEAD` cannot run. Each task is reviewed from `diff -ruN` between
  per-task snapshots of `frontend/src` kept in the SDD workspace.
  *Cost if wrong:* none to the product; a review mechanism only.
- **R5 — Card padding is a ruling, not a majority.** The audit found `p-8` and `p-6` tied at
  5/24 each with no winner. Ruling: the standard card padding is `p-6 sm:p-7 md:p-8` (the
  responsive ramp already used by `Services.tsx`), exposed as size variants rather than
  hardcoded. *Cost if wrong:* one value in one file.
- **R6 — Three surface variants, not two.** The audit found two coherent families (dark/glass,
  light) plus cards using solid `bg-gray-900` on light sections (`Services.tsx:146`,
  `Contact.tsx:326`) that fit neither. Ruling: `light` | `glass` | `solid`.
  *Cost if wrong:* an unused variant.
- **R7 — Semantic card colors survive standardization.** `TransformationShowcase` uses
  red/blue borders to mean before/after. Ruling: expose a `tone` prop
  (`neutral` | `negative` | `positive`) rather than flattening the meaning.
  *Cost if wrong:* the before/after contrast reads weaker.

---

## Card audit baseline (drives Tasks 2–4)

24 card instances across 20 files. Majority value per dimension:

| Dimension | Majority | Standard to adopt |
|---|---|---|
| Radius | `rounded-2xl` (21/24) | `rounded-2xl` |
| Padding | tie `p-6` / `p-8` (5 each) | `p-6 sm:p-7 md:p-8` (**R5**) |
| Background | `bg-white/5` + `backdrop-blur-sm` (13/24) | per variant (**R6**) |
| Border | `border-white/10` (12/24); `border-gray-200` (6/24) | per variant |
| Hover | `hover:border-[#1877F2]/50` (~10/24); lift uses 3 different values | `hover:border-[#1877F2]/50` + `y: -4` |
| Icon box | `w-10`/`w-12` tied; `rounded-xl` (7/13); brand gradient (9/13) | `w-12 h-12 rounded-xl` + `from-[#1877F2] to-[#0D5DBF]` |
| Inner icon | mixes `size={N}` and `className` | `className="w-6 h-6"` |
| Title | `font-semibold` dominant | `text-xl font-semibold` |
| Body | `text-sm` (12/24) | `text-sm` (`text-base` at size `lg`) |

**Known outliers to fix:** `TechStack.tsx:71` (rounded-xl, non-gradient icon, `text-sm` title),
`Navigation/ServiceCard.tsx:20` (**off-brand** `blue-500→cyan-400` gradient, `rounded-xl`, `p-4`),
`PricingTiers.tsx:55` (`border-2`), `RelatedServices.tsx:59` (icon sized by className),
`Contact.tsx:288` (no border, non-brand per-item colors), `Contact.tsx:326` (solid, no hover),
`Services.tsx:146` (solid card on white section).

**Out of scope:** the 4 large one-off CTA banners (`ServiceCTA.tsx:23`, `Services.tsx:198`,
`Portfolio.tsx:269`, `About.tsx:298`) — a different pattern. `Portfolio.tsx` is dead
(commented out of `app/page.tsx`) and is not touched.

---

## Tasks

### Task 1 — Service group taxonomy (data layer)
**Files:** `lib/services.ts`, new `lib/service-groups.ts`

- Add `group: ServiceGroupId` to `ServiceData`;
  `ServiceGroupId = 'sales' | 'administration' | 'marketing' | 'advertising'`.
- New `lib/service-groups.ts` exporting an ordered `SERVICE_GROUPS`:
  `{ id, label, tagline, description, iconName, order }`, grounded in domain knowledge §6.
- Group assignment (D2):
  - `sales` — productization, go-to-market, sales-enablement
  - `administration` — revenue-enablement
  - `marketing` — seo, geo-aeo, web-design, marketing-strategy, affiliate
  - `advertising` — ppc
- Rename the PPC entry's display `title` to `Paid Ads` (slug stays `ppc`, per D1).
- Add `getServicesByGroup()` returning groups in order, each with its **visible** services in
  order, **omitting groups that have no visible services** (R1). Derive entirely from
  `getVisibleServices()` — no hardcoded membership lists, no hardcoded counts.
- `getServices` / `getVisibleServices` / `getServiceBySlug` keep working unchanged. Do not
  change any service's copy, description, or `isVisible` value.

**Done when:** typecheck + build pass. No visual change yet.
**Acceptance (R1):** flipping any one service's `isVisible` to `true` makes
`getServicesByGroup()` include it — and its group, if previously absent — with zero other
edits. Demonstrate this in the report by flipping a flag, printing the result, and reverting.

### Task 2 — Standardized card primitives
**Files:** new `components/shared/{Card.tsx,IconBox.tsx,StatCard.tsx,index.ts}`

- Implement the "Standard to adopt" column above.
- Variants via CVA (already a dependency): `variant` = `light | glass | solid` (**R6**);
  `size` = `sm | md | lg`; `tone` = `neutral | negative | positive` (**R7**).
- `IconBox` standardizes the gradient chip and inner icon sizing.
- One place owns hover/lift motion.
- Accept `className` passthrough for layout (not skin); merge with `cn()`.

**Done when:** primitives compile and export; no caller migrated yet; typecheck + build pass.

### Task 3 — Migrate `components/services/*` to the primitives
**Files:** `ClientSegments`, `DeliverablesGrid`, `DisciplineBreakdown`, `MetricsResults`,
`PartnerNetwork` (2 cards), `PlatformCoverage`, `PortfolioShowcase`, `PricingTiers`,
`ProcessTimeline`, `RelatedServices`, `ServiceFAQ`, `ServiceOverview`, `TechStack`,
`TransformationShowcase` (2 cards)

- Skin swap only: replace bespoke card markup with the Task 2 primitives.
- Fix the named outliers in these files. Preserve `TransformationShowcase` semantics via `tone`.
- Do not change section order, data shapes, or copy.

**Done when:** all 16 cards in this directory use the primitives; typecheck + build pass.

### Task 4 — Migrate the remaining shared cards
**Files:** `components/Navigation/ServiceCard.tsx`, `components/FAQ.tsx`, `components/Contact.tsx`

- Same skin swap. **Fix the off-brand `blue-500→cyan-400` gradient** in `ServiceCard.tsx`.
- `Contact.tsx:288` keeps its per-item accent through `tone`/`className`, not bespoke markup.

**Done when:** these 4 cards use the primitives; typecheck + build pass.

### Task 5 — Homepage intro band
**Files:** new `components/Intro.tsx`, `app/page.tsx`

- Per R2: a new section between `<Hero />` and `<Services />`.
- 1–2 introductory paragraphs from the elevator pitch (§13) and positioning statement (§3).
- `py-section`; eyebrow aligned to its headline (Constraint 5); lazy-loaded via `next/dynamic`
  like the other below-fold sections.

**Done when:** renders on `/`; typecheck + build pass.

### Task 6 — Homepage services grouped into the four functional groups
**Files:** `components/Services.tsx`

- Render `getServicesByGroup()`: a labelled group block per returned group (heading + tagline),
  then its service cards (Task 2 primitives).
- Per R1: **render by mapping over whatever `getServicesByGroup()` returns.** Groups with no
  visible services never reach the component, so nothing renders empty. No hardcoded group
  headings, no `if (group.id === 'sales')` branches — publishing a service later must change
  the page with no edit here.
- Grid density steps at `xl` (Constraint 4). Keep the "Ready to make waves?" CTA block.
- Drop the local `iconMap` in favour of `lib/icon-map.ts`; extend that map if needed rather
  than keeping a second one.

**Done when:** all four groups render with correct membership; typecheck + build pass.

### Task 7 — `/about` page
**Files:** new `app/about/page.tsx`, new `components/about/*`, `app/sitemap.ts`

- Full About page (D3): hero (`pt-hero`), company narrative, values, **role/capability team
  cards (D4 — no named people)**, stats, CTA. All cards use the Task 2 primitives.
- Role cards cover the four groups plus delivery functions, described from §6 and §8.
- `generateMetadata` with title/description/canonical `/about`/OpenGraph, matching the service
  pages' metadata shape.
- Add `/about` to `app/sitemap.ts`.
- Composes `Navigation` + `Contact` like `app/services/[slug]/page.tsx` does.

**Done when:** `/about` builds as a static route and appears in the sitemap; typecheck + build pass.

### Task 8 — Home About teaser + navigation targets
**Files:** `components/About.tsx`, `components/Navigation/DesktopNav.tsx`,
`components/Navigation/MobileNav.tsx`, `lib/constants.ts`

- Reduce `About.tsx` to a teaser (D3): eyebrow + headline + the two existing paragraphs +
  stats + "Learn more about us" → `/about`. Remove the dead `showValues` grid and the
  image-showcase block (both move to `/about` in Task 7).
- Keep `id="about"` so `/#about` still resolves.
- Point the nav "About" entries at `/about` (desktop + mobile) and update `NAVIGATION.main`
  in `lib/constants.ts`.
- Delete `components/Navigation.backup.tsx` (dead, superseded by `components/Navigation/`).

**Done when:** home shows the teaser, nav goes to `/about`; typecheck + build pass.

### Task 9 — Paid Ads page overhaul
**Files:** `lib/service-pages/types.ts`, `lib/service-pages/ppc.ts`,
new `components/services/ContentBlock.tsx`, `components/services/SectionRenderer.tsx`

- Add a `content-block` section type `{ id?, headline, paragraphs: string[] }` rendered as a
  prose band; register it in the `ServiceSection` union and in `SectionRenderer`.
- In `ppc.ts`: page `title` → `Paid Ads`; hero `tagline` → `Paid Ads`; `metadata.title` /
  `description` lead with "Paid Ads" while **retaining the existing PPC keywords** (D1 keeps
  the URL, so the keyword set must not be dropped).
- Directly under the hero, a `content-block` with **two paragraphs explaining what paid
  advertising is** for businesses — AEO-shaped: the first sentence is a direct,
  quotable definition (per the SEO/GEO/AEO doc).
- Further `content-block` sections for **Google Ads campaign services** and **Bing Ads
  campaign services** as separate, clearly-headed blocks.
- Give the detailed PPC management content the anchor `id="ppc-management"`.

**Done when:** `/services/ppc` renders the new blocks in order; typecheck + build pass.

### Task 10 — Paid Ads sub-navigation
**Files:** new `components/services/ServiceSubNav.tsx`,
`components/Navigation/ServicesMegaMenu.tsx`, `components/Navigation/MobileNav.tsx`,
`lib/service-pages/ppc.ts`

- Per R3: an in-page sub-nav on the Paid Ads page linking to its `content-block` anchors,
  including **PPC Management** (`#ppc-management`).
- A mega-menu child link under Paid Ads → `/services/ppc#ppc-management`, plus the same entry
  in the mobile services accordion.
- Sub-nav must clear the fixed nav (`--spacing-nav`) and be keyboard accessible.

**Done when:** the link works from desktop mega menu, mobile menu, and in-page;
typecheck + build pass.

---

## Pre-flight conflict scan

| Pair / Task | Shared surface | Produces → consumes | Finding |
|---|---|---|---|
| T1 → T6 | `lib/services.ts`, `lib/service-groups.ts` | T1 adds `group` + `getServicesByGroup` → T6 renders them | Clean. T6 hard-depends on T1. |
| T1 → T9 | PPC `title` | T1 renames `services.ts` title to "Paid Ads" → T9 renames `ppc.ts` page title | **Two files hold a PPC title.** `services.ts.title` drives nav/cards; `ppc.ts.title` drives the page + `ServiceStructuredData`. Both must change or the nav and page disagree. Assigned: T1 does `services.ts`, T9 does `ppc.ts`. T9's brief must state this. |
| T2 → T3, T4, T6, T7 | `components/shared/*` | T2 defines primitives → all consume | Clean. All hard-depend on T2. |
| T3 ∩ T4 | disjoint file sets | — | Clean, no overlap. |
| T4 ∩ T8 | `Navigation/MobileNav.tsx`? | T4 touches `ServiceCard.tsx`; T8 touches `MobileNav.tsx` | Clean — different files. |
| T8 ∩ T10 | `Navigation/MobileNav.tsx` | T8 changes the About link; T10 adds a services child link | **Same file, different regions.** T8 runs first; T10's brief carries T8's shape. |
| T7 ∩ T8 | `About.tsx` content | T7 needs the values + image blocks that T8 deletes | **Ordering hazard.** T7 must run **before** T8 so the content is copied before removal. Order is correct as written. |
| T7 ∩ T1 | `app/sitemap.ts` | T7 adds `/about` | Clean — sitemap derives service URLs from `getAllServicePageSlugs()`, which T1 does not change (slug stays `ppc`). |
| T9 ∩ T3 | `SectionRenderer.tsx` | T3 migrates card skins; T9 registers a new section type | **Same file.** T3 runs first; T9 adds one case. Low risk. |
| T6 self | `Services.tsx` | its own `iconMap` vs `lib/icon-map.ts` | T6 must confirm `lib/icon-map.ts` covers all 10 service icons before deleting the local map. |
| T9 self | AEO first-sentence rule vs. two-paragraph brief | — | Consistent: paragraph 1 opens with the definition. |

**Global-constraint conflicts:** none found. No task mandates something the review rubric
treats as a defect.

**Spec gap noted:** the plan has no reachable automated test suite — the repo has none, and D6
sets typecheck + build as the gate. Rulings about runtime behaviour are therefore unverified by
tests and rest on the build plus code review.

---

## Review

**Status: complete, verified, uncommitted** (user commits).
Final gate: `npx tsc --noEmit` exit 0; `NEXT_DIST_DIR=.next-build npx next build` compiles,
**14/14 static pages** (was 13 — `/about` is new). 40 files changed, 7 added, 1 deleted.

### Delivered
| Ask | Where |
|---|---|
| Four functional groups | `lib/service-groups.ts`, rendered by `Services.tsx` |
| About moved to its own page | `app/about/page.tsx` + `components/about/*`; `About.tsx` teaser 319→157 lines |
| Homepage intro paragraphs | `components/Intro.tsx` |
| PPC → Paid Ads | `lib/services.ts`, `lib/service-pages/ppc.ts` (URL unchanged) |
| Paragraphs under the Paid Ads hero + Google/Bing blocks | 4 `content-block` sections in `ppc.ts` |
| Sub-nav to PPC management | `components/services/ServiceSubNav.tsx` + mega-menu/mobile child links |
| Standardized cards | `components/shared/*`; **all 20 card instances migrated** |

### Execution note
Ran as 5 parallel agents (wave 1) + 2 (wave 2) on disjoint file sets, not the sequential
per-task SDD loop — see R9. Verification was centralized to one build per wave.

### Defects caught by review that would otherwise have shipped
1. **NAP contradiction (critical).** `Contact.tsx` said "New Orleans, Louisiana" on every page
   while `About.tsx`, `/about`, `constants.ts` and the emitted LocalBusiness schema said
   Philadelphia. Both strings now derive from `SITE_CONFIG.company.address`.
2. **Padding-notch class of bug** in the `Card` API — caught before 20 call sites inherited it.
3. Duplicate company boilerplate rendering twice back-to-back on the homepage.
4. Double section gap (`pb-section` + `pt-section`) at the Intro→Services join.
5. Mega-menu Paid Ads cell overflowing into the footer.

### Open — needs the user's decision
- **"12+ Years" and "100% Retention" are not supported by the domain-knowledge docs.**
  Pre-existing homepage copy, now also on `/about` under "Built on results, not promises".
  Left unchanged deliberately; substantiate or remove.
- `constants.ts` phone `+1 (215) 555-0199` is in the reserved 555-01xx fictional range and
  is emitted into structured data.

### Accepted minors (deferred)
`About.tsx:88` vestigial `grid lg:grid-cols-2` with one child; `image-map.ts`
`about.cockpit-technology` now unreferenced; `service-groups.ts` `order` field never sorts;
`IconBox` exposes `iconClassName` but no gradient prop; `StatCard` has no label slot
(PartnerNetwork labels bolded); FAQ accordions gained a hover lift; ~7 service cards' hover
strengthened to the standard `/50` + `y:-4`; `ServicesMegaMenu`/`MobileNav` hardcode
`slug === 'ppc'` for the one child link.
