# Site-wide typography tokens

## Problem
No typography token of any kind existed. `@theme inline` in `globals.css` had spacing, color
and radius tokens but nothing for type, and there is no `tailwind.config.*`, so every font size
was a Tailwind literal inside a component: 26 distinct responsive heading combinations, 24
distinct arbitrary values (`text-[9px]` … `text-[2.75rem]`), section headings ranging 24→60px
at mobile and 36→96px at desktop for the same role, and heading weight split between an
inherited 400 and an explicit `font-bold`.

## Approach
Same pattern as `--spacing-*`: define the scale once in `@theme inline` so Tailwind v4 emits
real utilities (`text-h2`, `text-lead`, …). `clamp()` makes each fluid, which removes the
`sm:`/`md:`/`lg:` ladder — and with it the "lg: is a tablet" defect. v4's paired
`--text-<name>--line-height` / `--letter-spacing` / `--font-weight` modifiers let each token
carry its own leading, tracking and weight, so the scattered `leading-*` / `tracking-[…]` /
`font-bold` literals go away too.

Role names only — never redefine `--text-sm`/`--text-base`/`--text-xl`, which would silently
retune all of `ui/`.

## Tasks
- [x] Add the 10 tokens to `@theme inline` in `globals.css`
- [x] Verify each token emits a utility in the built CSS
- [x] Shared primitives first: `shared/Card.tsx`, `shared/StatCard.tsx`, `ui/button.tsx`
- [x] Repair the malformed `:where(:not(:has(...)))` base selector
- [x] Convert `components/services/*` (20 files)
- [x] Convert home sections (Hero, Services, Portfolio, About, Contact, Experience, FAQ)
- [x] Convert `about/*`, `Navigation/*`, `Footer`, `legal/MarkdownPage`, `industry-concepts/*`
- [x] Verify: build passes, no literals left outside `ui/` and the SERP facsimile
- [x] Verify: 390 / 768 / 1024 / 1440, no overflow, headings match across page types

## Review

### What shipped
Eleven fluid tokens in `globals.css` `@theme inline`, all verified present in the built CSS
(`.text-h2{font-size:clamp(2rem,2.2vw + 1.15rem,3.25rem);line-height:var(--tw-leading,1.1);…}`).
Usage: `text-meta` 71, `text-body` 44, `text-lead` 32, `text-h2` 31, `text-eyebrow` 29,
`text-h3` 17, `text-h4` 7, `text-display` 4, `text-stat` 3, `text-wordmark` 3, `text-h1` 1.

The malformed `:where(:not(:has(...)))` base block was replaced with plain element rules that
also carry weight (`h1`/`h2` bold, `h3`-`h6` semibold), so a heading needs no weight class.

Three primitives absorbed most of the call sites: `Card.tsx` (font-size unwelded from the
padding variant, duplicate `CARD_BODY_TEXT_SIZE` lookup deleted), `StatCard.tsx`, and
`button.tsx` (font-size moved out of the CVA base into the size variants).

### Measured (Chrome via puppeteer-core, 5 pages x 5 widths)

The bug in one line — section heading size, home page vs a service page:

| width | before (home / service) | after (both) |
|---|---|---|
| 320 | 60px / 36px | 32px |
| 768 | 72px / 48px | 35.3px |
| 1024 | 96px / 60px | 40.9px |
| 1440 | 96px / 60px | 50.1px |

- `document.scrollWidth === clientWidth` on `/`, `/services/seo`, `/about`, `/contact-us`,
  `/legal/privacy-policy` at 320/390/768/1024/1440 — **no horizontal overflow anywhere**.
- Smallest rendered font size on every page is now **14px** (was 11.2px: the `Contact.tsx`
  form labels at `lg:text-[0.7rem]`). Body copy is >= 16px at every width.
- `h1`/`h2` render at weight **700** everywhere; the 18 service/about section headings
  previously inherited 400 because they carried no weight class at all.
- `Experience.tsx`'s `whitespace-nowrap` heading was flagged as an overflow risk going
  24px -> 32px at 320px. Measured: no overflow. The flanking hairline rules (`w-8`, empty, so
  min-content 0) absorb the extra width by shrinking.
- `ServiceSubNav` link went `text-sm` (lh 20px) -> `text-meta` (lh 21px), so the sticky bar is
  1px taller and `--spacing-anchor` (152px) now *undershoots* the chrome by 1px. That is the
  safe direction per the anchor-offset lesson — landing a hair behind the bar is invisible.

### Deliberately left alone
- `ui/` primitives other than `button.tsx`.
- The Google SERP facsimile (`SerpAnswer.tsx`, `ConceptSerpSimulator.tsx`,
  `app/concepts/industries/page.tsx`) keeps its 9-13px type; imitating Google's real sizes is
  the point of that demo.
- `ConceptIndexWall.tsx:54` keeps an inline `clamp()`: its 16.8px floor is what keeps a long
  industry name inside a single truncating row on a phone, and no token reproduces both ends.

### Known, pre-existing, not fixed
`/legal/*` renders two `<h1>`s saying "Privacy Policy" — the page title plus a `# Heading` that
repeats it in the markdown body. The gap between them was 36/30px before and is 56/50px now, so
the relationship is unchanged, but it is both a duplicate-title and a heading-hierarchy problem
that belongs to the content, not the type scale.

## Finding: Tailwind 4.1.18 does not emit `--text-*--font-weight`

The plan assumed weight could ride along with a font-size token the way leading and tracking
do. It cannot. With all three companions declared, the built CSS for `h1` came out as:

```css
h1{font-size:clamp(2.25rem,2.6vw + 1.25rem,3.5rem);line-height:var(--tw-leading,1.08);letter-spacing:var(--tw-tracking,-.025em)}
```

`line-height` and `letter-spacing` are there; `font-weight` is not. Ten `--text-*--font-weight`
declarations were therefore dead on arrival — the same class of trap as the `--spacing-subnav`
token that never reached the built CSS. They were removed, and weight now comes from the
`@layer base` element rules (`h1`/`h2` bold, `h3`-`h6` semibold) instead. A heading element
needs no weight class; a `div`/`span`/`motion.*` carrying a heading token still does.
