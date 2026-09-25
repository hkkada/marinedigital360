# Theme & A11y Fixes — batch 1

From the theme/UX audit. Three highest-payoff items.

## 1. CTA contrast (critical)
White text on the cyan CTA gradient (`#00CEFA`→`#00A1FD`) measures 1.87:1 at the
light end — below even the 3:1 large-text floor. `--brand-navy-900` measures
6.35:1 worst-case across the same gradient.

- [x] `components/Hero.tsx`
- [x] `components/about/AboutHero.tsx`
- [x] `components/about/AboutCTA.tsx`
- [x] `components/services/ServiceHero.tsx`
- [x] `components/services/ServiceCTA.tsx`
- [x] `components/services/ProcessTimeline.tsx`
- [x] `components/services/DisciplineBreakdown.tsx`

## 2. Anchor scroll offset
5 of 6 home-page anchor targets have no `scroll-mt`, so nav clicks park the
heading behind the 96px fixed nav. `#contact` has 80px on mobile — still short.
Service pages already solve this with `scroll-mt-anchor` (152px = nav + sub-nav);
the home page has no sub-nav, so it needs nav-only clearance: `scroll-mt-nav`.

- [x] `Services.tsx` #services
- [x] `Portfolio.tsx` #work
- [x] `About.tsx` #about
- [x] `FAQ.tsx` #faq
- [x] `Industries.tsx` #industries
- [x] `Contact.tsx` #contact (replace `scroll-mt-20 lg:scroll-mt-24`)

## 3. Reduced motion + timing
33 production components animate with no `prefers-reduced-motion` guard.

- [x] Add `<MotionConfig reducedMotion="user">` provider at the root layout
- [x] Drop the 51 `duration: 0.8` scroll reveals to `0.45`

## Verification
- [x] `npm run build` passes
- [x] Re-run contrast maths on the shipped classes
- [x] Confirm generated CSS contains `scroll-mt-nav`
- [x] Confirm no `text-white` remains on a cyan-gradient button

## Review

All three shipped. `npm run build` passes (16/16 static pages).

### 1. CTA contrast
`text-white` → `text-brand-navy-deep` on the 7 cyan-gradient CTAs. Measured across
the whole gradient (light end / midpoint / dark end):

| | `#00CEFA` | `#00B8FC` | `#00A1FD` | worst |
|---|---|---|---|---|
| white (was) | 1.87 | 2.27 | 2.79 | **1.87 — fails even 3:1** |
| navy-900 (now) | 9.47 | 7.82 | 6.35 | **6.35 — AA** |

Child `<ArrowRight/>` icons carry no colour of their own, so they inherit.

### 2. Anchor offset
Added `scroll-mt-nav` (96px, from the existing `--spacing-nav`) to all six
anchor targets. Measured in a real browser against the rendered nav:

| anchor | before | after |
|---|---|---|
| `#services` | **-93px** (behind nav) | +3px ✅ |
| `#industries` | **-93px** | +3px ✅ |
| `#about` | **-93px** | +3px ✅ |

Nav is `fixed` and measures 92px, so 96px lands the heading 3-4px clear — the
safe direction per the `--spacing-anchor` reasoning in globals.css.

Contact deliberately uses `scroll-mt-nav` (96) and not `scroll-mt-anchor` (152),
even though it also renders on `/services/[slug]`: `ServiceSubNav` is `sticky`
*inside* `<main>` and Contact renders after `</main>`, so that bar has already
scrolled away. Only the fixed nav is left to clear on all three pages. Comment
added at the call site recording this.

### 3. Reduced motion
`MotionProvider` (`<MotionConfig reducedMotion="user">`) added at the root layout
— covers all ~33 components at once. Verified in-browser on `/about`:

| | transforms during reveal |
|---|---|
| motion enabled | **23 elements** animate |
| `prefers-reduced-motion: reduce` | **0 elements** |

No content ends up stuck invisible — the single low-opacity node found is a
decorative `opacity-5` texture overlay with no text. Opacity fades still run, so
reveals read as a fade rather than disappearing.

All 51 `duration: 0.8` scroll reveals → `0.45`.

## Found while verifying — NOT fixed (out of scope, needs a decision)

1. **Footer links 404.** `Footer.tsx:54` builds `href={`/services/${service.slug}`}`
   from the raw slug instead of the `href` field. `services.ts` gives
   `ppc-management` an explicit `href: '/services/ppc#ppc-management'` because it
   is a *section* of the PPC page, not a page. The footer ignores that and emits
   `/services/ppc-management`, which returns **404** on every page of the site.
   `RelatedServices.tsx` already uses a `getServiceHref()` helper — the footer
   just isn't using it.

2. **Correction to the audit:** `/#work` is *not* a live dead link — the nav entry
   is commented out in `MobileNav.tsx:72`. `Portfolio` and `FAQ` are likewise
   commented out of `app/page.tsx`, so `#work` / `#faq` render nowhere today.
   They still got `scroll-mt-nav` so they are correct if re-enabled.
