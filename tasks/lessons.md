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

## An in-page anchor offset should undershoot the chrome, never overshoot
`--spacing-anchor` was first set to nav + sub-nav + 16px of breathing room. That 16px does not
become breathing room — it parks the *tail of the previous section* in the gap under the sticky
bars, which on `/services/ppc` rendered an 11px black sliver of `platform-coverage` above
`#ppc-management` on every anchor landing.

**Why:** the target's own `py-section` already supplies the space under the bar. Anything added
on top of the bar height scrolls the target *down* past flush, exposing whatever sits above it.

**How to apply:** set an anchor offset to the bars' combined height and no more, and take the
*smallest* combined height across breakpoints (the mobile bar is taller than the desktop one).
Landing a few px behind the bar is invisible; landing short of it is not. Verify by measuring
`section.getBoundingClientRect().top - chromeBottom` at each anchor — it must be `<= 0`.

## Tailwind v4 `@theme` silently drops a token no utility consumes
`--spacing-subnav` was added alongside `--spacing-anchor` to document the sub-nav's measured
height. It never reached the built CSS: `@theme inline` only emits vars that a generated utility
actually references, so a token kept purely for documentation is dead on arrival.

**How to apply:** a value that exists only to explain another value belongs in a comment, not in
`@theme`. If a token is load-bearing, grep the built CSS for the utility it should generate
(`grep -oh "scroll-mt-anchor{[^}]*}" .next-build/static/css/*.css`) rather than assuming.

## IntersectionObserver is the wrong primitive for a geometry-based scroll-spy
Two IO formulations were built and measured before switching to a rAF-coalesced `scroll`
listener. Deciding by "topmost intersecting entry" makes a section clipping the observation band
by 15px outrank the section filling it — `#bing-ads` highlighted "Google Ads". Deciding by live
geometry *inside* an IO callback is correct when it runs, but IO only fires when an intersection
changes: a thin band misses an instant jump between two positions both outside it, and a wide
band misses the boundary crossings themselves. There is no band width that fires in both cases.

**How to apply:** use IO for "is this element on screen" (lazy-load, reveal-on-enter). For "which
section am I in", read geometry on scroll inside `requestAnimationFrame` — four
`getBoundingClientRect()` reads per frame with no writes is not a perf problem, and it has no
dead zones. Test the spy at: each anchor landing, mid-section, the non-target sections between
targets, above the first target, past the last, and instant jumps in both directions.

## Section-level concerns belong on the section, not inside one section type's data
`ServiceSubNav` was built to read anchor ids out of `ContentBlockData`. That silently capped the
sub-nav at whatever `content-block` sections a page happened to have, so `/services/ppc` shipped a
bar covering four of its twelve sections and claiming to be "Section navigation".

**Why:** an id and a nav label describe *a section's place in the page*, which every section type
has. Putting them in one variant's data made the capability accidental rather than designed.

**How to apply:** when a concern applies to every member of a discriminated union, intersect it
into the union (`type ServiceSection = ServiceSectionVariant & SectionAnchor`) rather than adding
a field to one variant. Render it once in the dispatcher — `SectionRenderer` wraps any section
carrying an `id`, so no section component knows about ids or scroll offsets, and a new section
type gets the behaviour for free.

## `offsetLeft` is relative to `offsetParent`, which is rarely the scroll container
The sub-nav's follow-the-active-link scroll compared `link.offsetLeft` against
`list.scrollLeft`. Those are different coordinate spaces: the sticky `<nav>` is positioned, so it
— not the scrolling `<ul>` — is the `offsetParent`, and `offsetLeft` carried the container's
gutter (32px at 390w, 64px at 1440w).

**How to apply:** to place an element within a scroll container, derive it from rects —
`el.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft`
— and clamp the result to `[0, scrollWidth - clientWidth]`. Verify by comparing on-screen rects,
not the same `offsetLeft` the code used, or the check inherits the bug it is meant to catch.

## Tailwind v4 font-size tokens carry leading and tracking, but not weight
`@theme` accepts `--text-h2--line-height`, `--text-h2--letter-spacing` *and*
`--text-h2--font-weight`, so the type scale was written assuming all three ride along with the
size. Only the first two are emitted. At 4.1.18 the built rule is:

```css
h1{font-size:clamp(2.25rem,2.6vw + 1.25rem,3.5rem);line-height:var(--tw-leading,1.08);letter-spacing:var(--tw-tracking,-.025em)}
```

No `font-weight`. Ten `--text-*--font-weight` declarations were dead on arrival — the same
class of silent no-op as `--spacing-subnav`, and invisible unless you read the built CSS.

**How to apply:** weight lives in the `@layer base` element rules (`h1`/`h2` bold, `h3`-`h6`
semibold), so a real heading element needs no weight class but a `div`/`span`/`motion.*`
carrying a heading token still does. More generally: after adding any `@theme` token, grep the
built CSS for the property you expect, not just the utility name — a utility can emit while
silently dropping one of its declarations.

## A type scale is one token set, the same as the spacing rhythm
Font sizes were 26 distinct responsive heading combinations plus 24 arbitrary bracket values,
because `@theme inline` had spacing/color/radius tokens but nothing for type. Home-page section
headings ran to 96px while the same role on a service page capped at 60px, and the 18 service
headings carried no weight class at all, so they rendered 400 next to a bold duplicate.

**How to apply:** `text-display`/`h1`/`h2`/`h3`/`h4`/`lead`/`body`/`meta`/`eyebrow`/`stat`/
`wordmark` are defined once in `globals.css`. Use one, with no `sm:`/`md:`/`lg:` step — they are
`clamp()`-based and scale continuously, which is also what stopped `lg:text-6xl` from shipping a
60px headline to a 1024px iPad. Retuning the whole site is a one-line edit there.
See [tasks/typography-tokens/todo.md](typography-tokens/todo.md).

## Chrome's `--screenshot` renders the page in whatever window height you pass
Capturing a full page by passing `--window-size=320,5200` does not work on this site: the hero
is viewport-height, so it expands to 5200px and pushes every other section off the shot. Two
crops were spent looking at hero photo before this was obvious.

**How to apply:** `--screenshot` captures the viewport, and the viewport *is* the window size,
so a tall window distorts any `vh`/`min-h-screen` layout. For real measurement install
`puppeteer-core` into the scratchpad (not the project) and point `executablePath` at the
installed Chrome — that gives `fullPage` screenshots, per-element screenshots, and
`page.evaluate` for geometry. Note Framer Motion's scroll-reveal leaves content at `opacity: 0`
in a headless shot; inject `*{opacity:1!important;transform:none!important}` or the screenshot
is of an empty section.


## Re-check for a running dev server before *every* build, not once per session

A dev server can be started between two builds in the same session. On 2026-09-24 I checked
port 3000 before the first `npm run build`, found it free, and then ran a second build later without
checking again. By then the user had started `next dev --port 3000`, and the build overwrote its `.next`,
so every page returned 500. Port 3100 also had a stale `next start` from earlier in the day serving
old chunk hashes, so a page that seemed to load there was not coming from the new build.

**How to apply:** immediately before each build, run `netstat -ano | grep LISTENING` for 3000/3100
and look up the owner's command line. If a `next dev` is running, don't build. Verify against it,
or ask. Serve your own build on an unused port such as 4317, and never on a port an old server might hold.
