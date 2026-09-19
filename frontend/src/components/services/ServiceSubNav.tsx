'use client';

import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { cn } from '@/components/ui/utils';
import type { ServiceSection } from '@/lib/service-pages/types';

interface ServiceSubNavProps {
  sections: ServiceSection[];
}

/**
 * In-page sub-navigation for a service page. Self-wiring: it derives its links
 * from every section — of any type — that carries both an `id` and a `navLabel`
 * in the page data. Name those two fields on a section and it appears here
 * automatically, in page order, with no changes to this component.
 *
 * Renders nothing when fewer than two such sections exist, since a single
 * link isn't a navigation.
 */
export function ServiceSubNav({ sections }: ServiceSubNavProps) {
  // Any section type can appear here — it opts in by carrying both `id` and
  // `navLabel` in the page data (see `SectionAnchor`). Requiring both is what
  // keeps the bar deliberate: a section stays out of it by simply not naming a
  // label, even if it is deep-linkable.
  const links = useMemo(
    () =>
      sections
        .filter((section) => Boolean(section.id) && Boolean(section.navLabel))
        .map((section) => ({ id: section.id as string, label: section.navLabel as string })),
    [sections],
  );

  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll-spy: a nav with no active state gives no sense of place on a page
  // this long. The active section is whichever one's top has passed the line
  // the reader's eye sits on, recomputed from live geometry on scroll and
  // coalesced into one rAF callback — four `getBoundingClientRect()` reads per
  // frame at most, and no layout writes.
  //
  // An IntersectionObserver was tried first and does not fit: deciding by
  // "topmost intersecting entry" makes a section clipping the band by 15px
  // outrank the one filling it, and deciding by geometry inside an IO callback
  // leaves dead zones wherever no intersection changes — a thin band misses an
  // instant jump between two positions outside it, and a wide one misses the
  // boundary crossings themselves. Neither fires where this needs to.
  const ids = links.map((link) => link.id).join(',');
  useEffect(() => {
    if (!ids) return;

    const targets = ids
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    // The line is exactly where an anchor jump lands a section — taken from the
    // target's own `scroll-margin-top` (`--spacing-anchor`) rather than
    // re-measuring the two bars, so one number drives both the scroll landing
    // and the active state and a section navigated to always reads as active.
    const line = parseFloat(getComputedStyle(targets[0]).scrollMarginTop) || 0;

    let frame = 0;
    const resolveActive = () => {
      frame = 0;
      let current: string | null = null;
      for (const target of targets) {
        if (target.getBoundingClientRect().top - line <= 1) {
          current = target.id;
        }
      }
      // null above the first block, where nothing should be highlighted; past
      // the last block it resolves to that block, whose top is still above the
      // line. Both are the intended states, so this assigns unconditionally.
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(resolveActive);
    };

    resolveActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  // With enough sections the bar scrolls horizontally (10 links is ~780px of
  // content in a 311px bar at 390w), so the active link is regularly off-screen
  // and the highlight communicates nothing. Nudge it back into view — adjusting
  // the list's own `scrollLeft` rather than calling `scrollIntoView`, which
  // could scroll the page itself.
  useEffect(() => {
    const list = listRef.current;
    if (!activeId || !list) return;
    if (list.scrollWidth <= list.clientWidth) return;

    const link = list.querySelector<HTMLElement>(`a[href="#${CSS.escape(activeId)}"]`);
    if (!link) return;

    // Positions are derived from bounding rects, not `offsetLeft`: the links'
    // `offsetParent` is the sticky <nav>, not this scroll container, so
    // `offsetLeft` carries the container's gutter (32px at 390w, 64px at 1440w)
    // and does not line up with `scrollLeft` at all.
    const gutter = 16;
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const left = linkRect.left - listRect.left + list.scrollLeft;
    const right = left + linkRect.width;
    const viewLeft = list.scrollLeft;
    const viewRight = viewLeft + list.clientWidth;
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';

    // Clamp both ends: the last link's gutter would otherwise ask for a
    // scrollLeft past the maximum and get silently clipped.
    const maxLeft = list.scrollWidth - list.clientWidth;
    if (left < viewLeft) {
      list.scrollTo({ left: Math.max(0, left - gutter), behavior });
    } else if (right > viewRight) {
      list.scrollTo({ left: Math.min(maxLeft, right - list.clientWidth + gutter), behavior });
    }
  }, [activeId]);

  if (links.length < 2) {
    return null;
  }

  // The anchor offset itself lives in CSS, as `scroll-mt-anchor` on the target
  // section (see `--spacing-anchor` in globals.css) — `scrollIntoView` honours
  // `scroll-margin-top`, so one token covers both this click path and a cold
  // load of `/services/ppc#google-ads`, where no handler ever runs.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    setActiveId(id);
    history.pushState(null, '', `#${id}`);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Section navigation"
      className="sticky top-nav z-40 bg-white/95 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* The bar's vertical padding lives on the links, not here, so each
            link's hit area fills the bar's full height (~56px) instead of
            being a 17px-tall text box — the bar's own height is unchanged. */}
        <ul ref={listRef} className="flex items-center gap-x-6 overflow-x-auto">
          {links.map((link) => {
            const isActive = link.id === activeId;
            return (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  onClick={(event) => handleClick(event, link.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'block py-5 text-sm font-medium transition-colors whitespace-nowrap rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--nav-link-blue)] focus-visible:outline-offset-2',
                    // Colour *and* underline, so the active section is not
                    // signalled by hue alone. `underline-offset` keeps the
                    // indicator out of the layout, so the bar's height — which
                    // `--spacing-anchor` depends on — does not shift.
                    isActive
                      ? 'text-[var(--nav-link-blue)] underline decoration-2 underline-offset-8'
                      : 'text-gray-600 hover:text-[var(--nav-link-blue)]',
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
