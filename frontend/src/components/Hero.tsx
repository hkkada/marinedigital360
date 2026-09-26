'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Cloud, Play, Settings, Users } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const HERO_IMAGE = '/images/hero/new-orleans-skyline.jpg';

// Accent used by the eyebrow rule, the second headline line and the icon
// strokes. Kept as one constant so the three never drift apart.
const ACCENT = 'var(--brand-cyan)';

// Credibility strip between the paragraph and the CTAs — always a single row.
// Two-line labels, so the break point is explicit rather than left to the
// container width (the label is `nowrap`, so the <br /> is the only break —
// otherwise a narrow phone split "AI-Powered" at its hyphen). A blank `line2` still renders its <br />, which keeps every
// label the same two-line height — that is what holds the icons on a common
// line across the row.
const CREDENTIALS = [
  { Icon: Settings, line1: 'AI-Powered', line2: '' },
  { Icon: Users, line1: 'Expert Marketers', line2: '& Engineers' },
  { Icon: Cloud, line1: 'Azure & AWS', line2: 'Certified' },
] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Same treatment the service sub-nav gives its anchors: keep the real href so
  // the link works without JS and can be opened in a new tab, but take over the
  // jump to scroll smoothly (and instantly under reduced motion).
  const onAnchorClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    // One screen, always: a column exactly the viewport tall. `pt-nav` clears
    // the fixed bar; below `lg` the photo band is the flexible part (`flex-1`)
    // and takes whatever height the copy leaves, so a short phone gets a
    // shorter photo rather than a hero that scrolls. The copy itself tightens
    // on short screens via the `short` variant (max-height 800px).
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-brand-navy-deep pt-nav">
      {/* Navy field. A single flat colour reads as a printing error at this
          size, so two very low-contrast radial washes give the left column some
          depth without ever competing with the copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(110% 85% at 6% 0%, rgba(15,241,253,0.09) 0%, transparent 55%), radial-gradient(95% 85% at 10% 100%, rgba(0,110,220,0.14) 0%, transparent 62%)',
        }}
      />

      {/* Faint ring bleeding off the top-left corner — the one piece of
          geometry in an otherwise photographic composition. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-56 h-[28rem] w-[28rem] rounded-full border border-white/10 lg:h-[36rem] lg:w-[36rem]"
      />

      {/* Photograph. A band across the top of the hero below `lg`; full-bleed
          behind the whole hero from `lg` up, where the mask alone is what makes
          it read as a right-hand column. That distinction is the trick — laying
          it out as a real 64%-wide panel made it taller than it is wide relative
          to this source, so object-cover threw away 42% of the image width and
          the fade then had to dissolve lit buildings and water reflections
          straight into flat navy, which greys out into a visible band.
          Full-bleed crops only ~10%, so the fade falls on the photo's own dark
          left edge and the two sides meet on colours that already match. */}
      {/* It starts under the fixed nav (`top-nav`), not at the top of the hero:
          the bar is solid navy, so anything behind it is simply lost — which
          is how the "New Orleans" script, 17–27% down the frame, got cut off. */}
      <div className="relative min-h-[20svh] tiny:min-h-[8svh] landscape:tiny:min-h-0 flex-1 hero-photo lg:absolute lg:inset-x-0 lg:top-nav lg:bottom-0 lg:min-h-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          sizes="100vw"
          priority
          aria-hidden="true"
          // Right-of-centre so the steamboat and the "New Orleans" script stay
          // inside the frame when a tall viewport crops the width; 30% down
          // rather than centred because a wide viewport crops the height, and
          // the script sits in the top quarter of the photo while the bottom
          // is just water.
          className="object-cover object-[62%_30%]"
          style={{ filter: 'contrast(1.06) saturate(1.08)' }}
        />
      </div>

      {/* Content. The h1 sits outside any motion wrapper so it paints
          immediately for LCP. The hero's `pt-nav` already clears the fixed
          bar; from `lg` this box fills the rest of the screen and centres the
          copy in it, with at least `py-12` (`py-8` on short screens) of air.
          Type comes from the shared scale (`text-display`/`text-lead`), which
          is clamp()-based and scales continuously with the viewport. */}
      <div className="relative flex items-center pt-4 pb-8 sm:pt-6 sm:pb-12 lg:flex-1 lg:py-12 short:pb-5 tiny:pt-2 tiny:pb-2 lg:short:py-8">
        <div className="max-w-[1600px] mx-auto px-8 w-full lg:max-w-none lg:px-[7.9%]">
          <div className="max-w-2xl lg:max-w-[43.5%]">
            {/* Eyebrow — a short accent rule, then the label */}
            <div className="mb-3 flex items-center gap-3 sm:mb-6 sm:gap-4 lg:mb-5 lg:gap-5 short:mb-3 tiny:mb-2 hero-animate hero-animate-delay-1">
              <span aria-hidden="true" className="h-px w-6 shrink-0 sm:w-10 lg:w-11" style={{ backgroundColor: ACCENT }} />
              <span className="text-white text-eyebrow uppercase font-medium max-sm:text-[0.75rem] max-sm:tracking-[0.2em]">
                Digital marketing for modern businesses
              </span>
            </div>

            {/* Headline — no animation classes or motion wrapper to ensure LCP
                detection. From `lg` the size is capped at 5vw: the copy column is
                43.5% of the screen, and at 1024px "Where visibility" at the full
                display size is wider than it, which broke the two lines into four. */}
            <h1 className="text-display text-white mb-4 sm:mb-6 lg:mb-4 short:mb-3 tiny:mb-2 max-lg:short:text-[2.125rem] max-lg:tiny:text-[1.875rem] lg:text-[length:min(var(--text-display),5vw)] lg:short:text-[length:min(3.5rem,5vw)]">
              Where visibility
              <br />
              <span style={{ color: ACCENT }}>meets growth.</span>
            </h1>

            <p className="text-lead text-white mb-5 sm:mb-8 lg:mb-6 short:mb-4 tiny:mb-3 max-lg:short:text-[0.9375rem] max-lg:short:leading-normal max-lg:tiny:text-[0.875rem] lg:short:text-[1.125rem] max-w-xl lg:max-w-[max(32vw,23rem)] font-light hero-animate hero-animate-delay-3">
              {BRAND.name} is a New Orleans based digital marketing agency helping startups to
              enterprises with a focus on Sun Belt cities turn their capabilities into
              measurable, revenue-driving products.
            </p>

            {/* Credential strip — one row at every width, never wrapping, split
                by hairline rules. Where the copy column is narrow (phones, and
                `lg`–`2xl`, where it is 43.5% of a small desktop) each item stacks
                its icon over a centred label; where there is room (`sm`–`lg`,
                `2xl`+) the icon sits beside the label. On phones the columns
                size to their labels (`flex-auto`) rather than taking equal
                thirds, so the long middle label isn't squeezed onto three lines. Rules
                rather than cards: these are supporting proof, and boxing them
                would give them more weight than the CTAs below. */}
            <ul className="mb-6 flex flex-nowrap divide-x divide-white/15 sm:mb-9 lg:mb-6 short:mb-4 tiny:mb-3">
              {CREDENTIALS.map(({ Icon, line1, line2 }, i) => (
                <motion.li
                  key={line1}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-w-0 flex-auto flex-col items-center gap-2 px-1.5 text-center sm:flex-none sm:flex-row sm:gap-3 sm:px-6 sm:text-left sm:first:pl-0 lg:flex-1 lg:flex-col lg:gap-2 lg:px-3 lg:text-center lg:first:pl-3 2xl:flex-none 2xl:flex-row 2xl:gap-3 2xl:px-6 2xl:text-left 2xl:first:pl-0"
                >
                  <Icon
                    className="w-6 h-6 shrink-0 sm:w-7 sm:h-7 2xl:w-9 2xl:h-9"
                    style={{ color: ACCENT }}
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap text-on-dark text-[0.8125rem] leading-snug tracking-wide max-[359px]:text-[0.75rem] max-[359px]:tracking-normal sm:text-meta">
                    {line1}
                    <br />
                    {line2}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTAs. Full-width stacked buttons on the narrow layout, an inline
                pair from `sm` up. */}
            <div className="flex flex-col gap-3 hero-animate hero-animate-delay-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <motion.a
                href="/contact-us"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-cta-from to-brand-cta-to px-9 py-3.5 text-brand-navy-deep text-body font-medium tracking-wide shadow-lg shadow-brand-cta-to/30 transition-shadow hover:shadow-xl hover:shadow-brand-cta-to/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep sm:w-auto sm:py-4 lg:px-11 lg:py-[1.125rem] tiny:py-3"
              >
                Start Your Project
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </motion.a>

              {/* Below `sm` this is an outlined pill matching the primary CTA's
                  footprint; from `sm` up the border drops away and it reverts to
                  a bare link, which is how the wide layout frames it. */}
              {/* <a
                href="#services"
                onClick={onAnchorClick('services')}
                className="group inline-flex w-full items-center justify-center gap-3 lg:gap-4 rounded-full border border-[#0A66B0] py-3 text-white text-body font-medium tracking-wide transition-colors hover:border-brand-cta-to focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep sm:w-auto sm:border-0 sm:py-0 sm:ring-offset-4"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white transition-colors group-hover:bg-white/15 sm:h-9 sm:w-9 sm:border-[color:var(--hero-accent)] lg:h-10 lg:w-10 lg:border-2"
                  style={{ '--hero-accent': ACCENT } as React.CSSProperties}
                >
                  <Play size={10} className="ml-px fill-white text-white sm:hidden" aria-hidden="true" />
                  <Play size={13} className="ml-0.5 hidden fill-white text-white sm:block" aria-hidden="true" />
                </span>
                Watch Our Process
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
