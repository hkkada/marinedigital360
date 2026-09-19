# Standard section-spacing tokens (site-wide)

## Problem
Service pages use `py-24 md:py-32` (96px / 128px) on every section — huge dead bands
between sections, and not responsive at the small end (96px on a 390px phone).
Home page sections were tuned by hand in discrete Tailwind steps, so there was no
single place to change the site's vertical rhythm.

## Approach
Define fluid spacing tokens once in `src/styles/globals.css` `@theme inline`, so
Tailwind v4 generates real utilities (`py-section`, `mb-block`, …) from them.
`clamp()` makes them responsive across every screen with no breakpoint jumps.

| Token                  | Value                          | Range      | Use |
|------------------------|--------------------------------|------------|-----|
| `--spacing-section`    | `clamp(2.75rem, 2.25vw + 1.25rem, 4rem)`   | 44 → 64px **per side** | section padding-block |
| `--spacing-section-sm` | `clamp(1.5rem, 1.5vw + 0.75rem, 2.5rem)`   | 24 → 40px | join between same-background sections |
| `--spacing-block`      | `clamp(2rem, 2vw + 1rem, 3rem)`          | 32 → 48px | header → content inside a section |

`--spacing-section` is deliberately *per-side*: two stacked sections each apply it,
so the band a visitor sees is double the token (48 → 80px). The first pass set it to
the full band value and measurement showed 146-198px joins, which is why it was halved.

## Tasks
- [x] Add the three tokens to `@theme inline` in `globals.css`
- [x] Replace `py-24 md:py-32` with `py-section` in all 17 `components/services/*` sections
- [x] Replace section-header `mb-16` / `mb-20` with `mb-block` in service sections
- [x] Trim `ServiceHero` inner `py-32`
- [x] Re-express home page sections (Experience, Services, About, Contact) in the same tokens
- [x] Update Portfolio / FAQ (currently commented out of the home page) for consistency
- [x] Verify: measured gaps + no horizontal overflow at 390 / 768 / 1440 on a service page and home
- [x] Verify: `npm run build` passes

## Review

### What shipped
- Three fluid tokens in `globals.css` `@theme inline`; Tailwind v4 turns them into real
  utilities (`.py-section{padding-block:clamp(1.5rem,1.5vw + .75rem,2.5rem)}` etc.),
  verified in the built CSS.
- All 17 `components/services/*` sections: `py-24 md:py-32` → `py-section`,
  header blocks `mb-16`/`mb-20` → `mb-block`, `space-y-12` → `space-y-block`.
  `MetricsResults` keeps its asymmetric join as `pt-section-sm pb-section`.
- Home page sections re-expressed in the same tokens (Experience, Services, About,
  Contact) plus `FAQ`/`Portfolio`, which are currently commented out of the home page.
- Repo-wide grep confirms no section-level `py-16..40` literals remain outside `ui/`.

### Measured (Chrome, content-to-content gaps)
Baseline reproduced by temporarily setting the tokens back to the old literals
(`--spacing-section: 8rem`, `--spacing-block: 4rem`).

| /services/seo | before | after |
|---|---|---|
| page height @1440 | 9461px | 7671px |
| page height @768  | 11147px | 9107px |
| page height @390  | 15272px | 13024px |
| largest gap @1440 | 353px | 146px |
| largest gap @768  | 345px | 128px |
| largest gap @390  | 341px | 103px |

All six service pages measure within 103-114px (390) / 128-129px (768) / ~146px (1440)
of largest gap, and the remaining large values are joins where the section above ends
with a padded card — the visible band there is ~75px. No horizontal overflow at
390 / 768 / 1440 on any page. `npm run build` passes; all 13 routes generate.

### Follow-up fix: fixed-nav overlap
Swapping `ServiceHero`'s `py-32` for `py-section` removed the clearance that kept the
breadcrumb below the fixed nav — it overlapped the logo/hamburger on mobile and also at
1024x768 and 1440x900. Fixed with two more tokens (`--spacing-nav: 6rem`,
`--spacing-hero: clamp(7.5rem, 4vw + 6rem, 9rem)`), applied as `pt-hero pb-section`,
plus `items-center-safe` so content taller than 85vh can never overflow above the top
edge. Verified: 6 service pages x 7 viewports (320x568 through 1920x1080, including
844x390 landscape) — clearance 24-142px, zero overlap.

### Follow-up: rhythm opened back up
Requested a little more air between sections. Because the rhythm is a token, this was a
two-line edit in `globals.css` with no component changes: `--spacing-section`
24→40px became 32→48px per side (visible band 48→80px becomes 64→96px), and
`--spacing-section-sm` 16→24px became 20→32px so the same-background joins stayed
proportional. Home 5103→5160px @1440; /services/seo 7671→7805px @1440. Hero clearance
re-verified unchanged (no nav overlap at 7 viewports).

### Tuning history
The rhythm was dialled in over three passes, each a token edit with no component changes:

| Pass | `--spacing-section` (per side) | visible band | home @1440 | /services/seo @1440 |
|---|---|---|---|---|
| original literals | 96 / 128px | 192 → 256px | — | 9461px |
| first cut | 24 → 40px | 48 → 80px | 5103px | 7671px |
| "a little more" | 32 → 48px | 64 → 96px | 5160px | 7805px |
| "increase gaps" | 44 → 64px | 88 → 128px | 5238px | 7990px |

`--spacing-block` (header → content within a section) stayed at 32 → 48px throughout —
keeping it below the between-section band is what makes each section read as one group.

### Note
Running `npm run build` while `next dev` is live overwrites the dev server's `.next`
and breaks it (CSS 404s, route 500s). The dev server was restarted afterwards. Use a
separate `--distDir` when building alongside a running dev server.
