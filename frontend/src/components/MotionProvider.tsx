'use client';

import { MotionConfig } from 'motion/react';

/**
 * Site-wide motion policy.
 *
 * `reducedMotion="user"` makes every Framer Motion component in the tree honour
 * the OS-level `prefers-reduced-motion` setting without each one having to call
 * `useReducedMotion` itself. Framer drops transform and layout animations
 * (translate, scale, rotate) and keeps opacity, so a reveal still reads as a
 * fade instead of vanishing entirely — content never ends up stuck at its
 * `initial` state.
 *
 * This is deliberately a root-level provider rather than a per-component guard:
 * the section components animate on scroll in ~33 places, and a policy that has
 * to be re-applied by hand in each one is a policy that drifts. Components that
 * need finer control (the hero, the /concepts visuals) still call
 * `useReducedMotion` directly, which composes with this.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
