# Move Contact section to a dedicated /contact-us page

## Context
`components/Contact.tsx` currently renders TWO things in one `<section id="contact">`:
1. The contact section (heading, form, contact methods, "Book a Call" CTA)
2. The **site-wide footer** (4-column links, copyright)

It is rendered on `/`, `/about`, and `/services/[slug]`. Removing it wholesale would
delete the footer from every page — so the footer must be extracted first.

## Plan
- [x] 1. Extract the footer out of `Contact.tsx` into `components/Footer.tsx`
      (own `<footer>` element + own max-width container, server component if possible).
- [x] 2. Trim `Contact.tsx` to the contact section only (form + info + BookingModal).
- [x] 3. Create `app/contact-us/page.tsx` — Navigation + Contact + Footer, with
      `generateMetadata` (title/description/canonical/OG) matching the About page pattern.
- [x] 4. `app/page.tsx` — drop `<Contact />`, render `<Footer />`.
- [x] 5. `app/about/page.tsx` + `app/services/[slug]/page.tsx` — swap `<Contact />` for `<Footer />`.
- [x] 6. Repoint every contact link to `/contact-us`:
      - `lib/constants.ts` NAVIGATION.main
      - `Navigation/Navigation.tsx` ("Start a Project"), `DesktopNav.tsx`, `MobileNav.tsx`
      - `Hero.tsx`, `Services.tsx` (x2), `Portfolio.tsx` (x2)
      - `about/AboutHero.tsx`, `about/AboutCTA.tsx`
      - `lib/service-pages/*.ts` `ctaHref: '#contact'` (6 files, 2 each)
- [x] 7. Add `/contact-us` to `app/sitemap.ts`.
- [x] 8. Verify: `npm run build` clean, no remaining `#contact` refs.

## Review

All 8 steps done. `npx tsc --noEmit` clean; `npm run build` compiled and prerendered
16 routes including `/contact-us` (4.45 kB, static).

### Files changed
- **new** `components/Footer.tsx` — site footer, lifted verbatim out of `Contact.tsx`
  into its own `<footer>` + container (was nested inside `<section id="contact">`).
- **new** `app/contact-us/page.tsx` — Navigation + Contact + Footer, with metadata.
- `components/Contact.tsx` — footer block and its now-unused imports (`Link`,
  `NAVIGATION`, `BrandWordmark`) removed. `id="contact"`/`scroll-mt` kept so
  `/contact-us#contact` still lands below the fixed nav.
- `app/page.tsx` — `<Contact />` (and its `dynamic()` wrapper) gone, `<Footer />` added.
- `app/about/page.tsx`, `app/services/[slug]/page.tsx` — `<Contact />` → `<Footer />`.
- `components/Navigation/Navigation.tsx` — new optional `solid` prop.
- 16 files repointed from `#contact` / `/#contact` to `/contact-us`.
- `app/sitemap.ts` — `/contact-us` entry added.

### Correction after user feedback
The first pass removed the contact section from `/about` and `/services/[slug]`
too. Corrected: **only the home page** drops it. Those two pages render
`<Contact />` above `<Footer />` again, and their in-page CTAs (`AboutHero`,
`AboutCTA`, `PricingTiers`, all six `lib/service-pages/*.ts` `ctaHref`s) went
back to the same-page `#contact` anchor. Home-page components (`Hero`,
`Services`, `Portfolio`) and the header/footer nav keep `/contact-us`, since
the home page no longer has a `#contact` target to anchor to.

### Decisions worth flagging
1. **Footer extraction was required, not optional.** `Contact.tsx` rendered the
   contact section *and* the site footer in one `<section>`, and was composed on
   `/`, `/about`, and every service page. Deleting it outright would have removed
   the footer sitewide.
2. **`Navigation solid` prop.** The nav is `position: fixed` and transparent with
   white text until `scrollY > 50`. Every existing page that mounts it opens on a
   dark hero; `/contact-us` opens on white, so without forcing the opaque state the
   wordmark and links rendered white-on-white. `solid` makes `isScrolled` start
   true; scroll behaviour is unchanged for every other caller.
3. **Verified counts** (production build, `next start`): `/` serves 0 occurrences
   of `contact-heading` and 1 footer; `/about`, `/services/seo` and `/contact-us`
   each serve the contact heading + form + 1 footer.
4. **Footer extraction is still load-bearing** even though the section came back
   to those pages: `/contact-us` composes `Contact` + `Footer` as siblings, and
   the home page needs the footer without the section.

### Not done / follow-ups
- The contact form still only `console.log`s on submit (pre-existing `TODO` in
  `Contact.tsx`) — now more visible as a standalone page, worth wiring to a real
  endpoint.
- `/contact-us` has no `ContactPage`/`BreadcrumbList` schema. The home page's
  `StructuredData` and the service pages' `ServiceStructuredData` are separate
  components; adding one for this route was outside the ask.
- No browser screenshot: the Playwright profile was locked by another session.
  Verification was HTTP + markup assertions instead.
- `.next` is shared between `next dev` and `next build`; running a build while a
  dev server is up leaves both broken (500s on every route). `pkill` does not
  exist in this shell — use `netstat -ano | grep :3000` + `taskkill //F //PID`.
  The dev server that was running on :3000 at the start of the session is stopped;
  restart it with `npm run dev` when needed.
