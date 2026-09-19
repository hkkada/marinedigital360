# Lessons

## Never run `npm run build` while `next dev` is running
Both write to `frontend/.next`. The production build overwrites the dev server's
manifests, and the still-running dev server then serves 404s for
`/_next/static/css/app/layout.css` and 500s for dynamic routes — which silently
invalidates any browser measurement or screenshot taken afterwards (an unstyled
page measures completely different gaps).

**How to apply:** before building, either stop the dev server, or build to a
separate output dir (`npx next build --distDir .next-build`). If a build already
ran against a live dev server, restart the dev server and re-verify — do not
trust measurements taken in between.

## Spacing between sections is one token, not per-component classes
`frontend/src/styles/globals.css` defines `--spacing-section`, `--spacing-section-sm`
and `--spacing-block` in `@theme inline`. Tailwind v4 turns them into `py-section`,
`pt-section-sm`, `mb-block`, `space-y-block`, etc.

**Why:** every section previously carried its own `py-24 md:py-32`-style literals, so
retuning the site's vertical rhythm meant editing ~20 files and the values drifted
apart between the home page and the service pages.

**How to apply:** new sections use `py-section` (plus `mb-block` for header → content).
Do not add per-breakpoint `py-*` literals to a section wrapper. `--spacing-section` is
*per side* — two stacked sections each apply it, so the band the visitor sees is double
the token value. See [tasks/section-spacing-tokens/todo.md](section-spacing-tokens/todo.md).

## Measure spacing, don't eyeball it
For "there are gaps between the sections" style reports, collect every element that
renders actual content (text node, img/svg/video/form control), merge their
y-intervals, and report the runs where nothing is painted. That distinguishes real
dead bands from space that belongs to a visible card's own padding, and gives a
number to compare before and after at 390 / 768 / 1440.

## A hero's top padding is nav clearance, not section rhythm
Converting `components/services/ServiceHero.tsx` from `py-32` to the shared
`py-section` token broke every service page: that 128px of top padding had been
the only thing holding the breadcrumb clear of the 96px `position: fixed` nav, so
the breadcrumb rendered on top of the logo and hamburger (worst on mobile, but it
also overlapped at 1024x768 and 1440x900).

**Why:** the old value conflated two unrelated concerns — the gap between sections,
and clearance for a fixed overlay — so replacing one silently removed the other.

**How to apply:** a section that starts a page uses `pt-hero` (`--spacing-hero`,
120 → 144px = nav height + breathing room), never `pt-section`. Keep `--spacing-nav`
in sync with the nav's real rendered height. When swapping a layout value for a
shared token, first ask what else that value was holding up.

## Tailwind 4.1 safe-alignment classes put the modifier last
`items-safe-center` silently generates nothing — the real class is
`items-center-safe` (`align-items: safe center`). A Tailwind class that does not
exist fails silently, so grep the built CSS (`.next/static/css/*.css`) for the rule
whenever a new or unfamiliar utility is load-bearing.

## `lg:` is a tablet, not a desktop
`lg` is 1024px — exactly iPad Pro portrait. Layouts written as "desktop starts at lg"
(`lg:grid-cols-4`, a two-column header split at `lg` with a 4px gutter) render their
densest desktop arrangement on a tablet: 200px columns, copy wrapping to 8-9 lines,
and headline/body columns butted together.

**How to apply:** put the densest step at `xl` (1280) and let 1024-1279 keep the
roomier tablet arrangement. Check any new multi-column layout at 1024x1366 and
768x1024, not just phone and desktop widths.

## Keep an eyebrow's alignment tied to its headline
`justify-center lg:justify-start` on the "WHAT WE DO" eyebrow while the `<h2>` beside
it was always left-aligned meant every width below 1024 showed a centred kicker over a
left-aligned headline. If a label belongs to a headline, it takes the headline's
alignment at every breakpoint — not its own responsive rule.

## Parallelize by file ownership before reaching for a per-task review loop
A 10-task plan was dispatched as sequential implement → review → fix → re-review rounds, each
agent running its own `next build` (~90s). Two tasks in, the user stopped it as too slow.

**Why:** the dependency graph was mostly flat — only the data layer and the card primitives
actually blocked anything. The remaining eight tasks touched disjoint files and could have run
concurrently from the start. The per-agent build was pure duplicated cost, and concurrent
builds also fight over `.next` and rewrite `tsconfig.json`.

**How to apply:** before dispatching, write the file-ownership table and look for overlaps.
Tasks with no shared files run in one parallel wave. Tell agents **not** to build or typecheck;
verify centrally once per wave. Reserve the per-task review loop for the few tasks everything
else depends on — here, the shared card API, where one review round caught a `tailwind-merge`
padding bug that would otherwise have propagated to 20 call sites.

## A fact fix is a grep, not a one-file edit
`About.tsx` was told to change "New Orleans, Louisiana" → Philadelphia. It did. But the same
claim also lived in `Contact.tsx` (twice), which renders on every page, so the site shipped a
visible contradiction against its own LocalBusiness schema until the final review caught it.

**How to apply:** when correcting a factual claim, grep the whole tree for it first and fix
every occurrence in one pass. Better, derive it from the single source of truth — the fix here
was to read city/state from `SITE_CONFIG.company.address` so the two copies cannot drift again.

## Next 14 has no `--distDir` CLI flag
A plan-level verification command was written as `npx next build --distDir .next-build` to avoid
clobbering a running dev server. That flag does not exist; the first agent had to hand-edit
`next.config.mjs` and revert it.

**How to apply:** `next.config.mjs` now carries `distDir: process.env.NEXT_DIST_DIR || '.next'`.
Build to a scratch dir with `NEXT_DIST_DIR=.next-build npx next build`. Unset, it is identical
to before, so Vercel is unaffected. Note `next build` still rewrites `tsconfig.json` (appends
the distDir types glob) and `tsconfig.tsbuildinfo` is tracked in this repo — both need
restoring afterwards.
