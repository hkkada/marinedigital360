'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, type RefObject } from 'react';

export interface SpotlightDotsProps {
  /**
   * Element whose pointer events drive the spotlight — normally the card the
   * dots sit inside. Listeners go here rather than on the dot layer itself:
   * the layer sits *behind* the card content, so a pointer crossing the
   * headline or the CTA would never reach it and the glow would stall.
   */
  containerRef: RefObject<HTMLElement | null>;
  /** Radius of the lit area, in px. */
  radius?: number;
  /** Dot alpha away from the pointer. Default matches the old `opacity-20` layer. */
  baseOpacity?: number;
  /** Dot alpha at the centre of the spotlight. */
  peakOpacity?: number;
  /** Spacing of the dot grid, in px. */
  spacing?: number;
  className?: string;
}

/**
 * Drifting cyan dot field that brightens around the pointer.
 *
 * Deliberately *one* painted layer, not two. The obvious build — a dim base
 * grid plus a bright grid masked to the cursor — needs both grids to run the
 * same 20s `backgroundPosition` drift in perfect lockstep or the highlighted
 * dots visibly separate from the dots underneath them. Instead a single
 * full-brightness grid is masked with an alpha gradient that falls to
 * `baseOpacity` rather than to zero, so the "unlit" area *is* the old static
 * look and sync is structurally impossible to lose.
 *
 * Nothing here re-renders React: pointer position and glow live in motion
 * values piped straight into the mask string, so a pointermove costs one
 * style write.
 */
export function SpotlightDots({
  containerRef,
  radius = 190,
  baseOpacity = 0.2,
  peakOpacity = 0.85,
  spacing = 50,
  className = '',
}: SpotlightDotsProps) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // 0 = idle, 1 = fully lit.
  const glow = useMotionValue(0);

  // A short trail on the position reads as light being dragged; the slower
  // spring on `glow` keeps the edges of the interaction from snapping.
  const x = useSpring(pointerX, { stiffness: 400, damping: 40, mass: 0.5 });
  const y = useSpring(pointerY, { stiffness: 400, damping: 40, mass: 0.5 });
  const lit = useSpring(glow, { stiffness: 140, damping: 26 });

  const centerAlpha = useTransform(
    lit,
    (v) => baseOpacity + (peakOpacity - baseOpacity) * v
  );
  const midAlpha = useTransform(
    lit,
    (v) => baseOpacity + (peakOpacity - baseOpacity) * v * 0.3
  );

  const mask = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(0,0,0,${centerAlpha}) 0%, rgba(0,0,0,${midAlpha}) 45%, rgba(0,0,0,${baseOpacity}) 100%)`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduceMotion) return;

    const track = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointerX.set(e.clientX - rect.left);
      pointerY.set(e.clientY - rect.top);
    };

    const enter = (e: PointerEvent) => {
      // Land the springs on the entry point instead of letting them travel
      // from wherever the pointer last left, which sweeps light across the
      // whole card on every re-entry.
      const rect = el.getBoundingClientRect();
      x.jump(e.clientX - rect.left);
      y.jump(e.clientY - rect.top);
      track(e);
      glow.set(1);
    };

    const move = (e: PointerEvent) => {
      track(e);
      glow.set(1);
    };

    const leave = () => glow.set(0);

    const release = (e: PointerEvent) => {
      // Touch and pen have no hover state, so the lift of the finger is the
      // only "leave" event those pointers will ever send. A mouse keeps its
      // glow after a click.
      if (e.pointerType !== 'mouse') glow.set(0);
    };

    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerdown', enter);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('pointercancel', leave);
    el.addEventListener('pointerup', release);

    return () => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerdown', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('pointercancel', leave);
      el.removeEventListener('pointerup', release);
    };
  }, [containerRef, reduceMotion, pointerX, pointerY, glow, x, y]);

  // Reduced motion is deliberately handled in the effect above and nowhere
  // else. Branching the *markup* on it is tempting and wrong: the hook reports
  // `false` on the server and `true` on the client, so the hydration render
  // disagrees with the server HTML — and React 18 warns about a style
  // mismatch without repairing it, which strands the layer in whatever the
  // server happened to emit. One branch means that can't happen. With the
  // listeners off, the mask sits flat at `baseOpacity` forever, which is
  // pixel-for-pixel the static grid this replaced.
  return (
    <motion.div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      style={{
        backgroundImage: 'radial-gradient(circle, #0FF1FD 1px, transparent 1px)',
        backgroundSize: `${spacing}px ${spacing}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
