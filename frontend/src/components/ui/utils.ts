import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scale. Any unknown `text-*` is
 * assumed to be a colour, so without this `cn('text-sm', 'text-body text-white')`
 * dropped `text-body` (as a colour clashing with `text-white`) and kept the
 * stock `text-sm`. Keep these lists in sync with the `--text-*` and
 * `--color-*` tokens in `styles/globals.css`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "h4", "lead", "body", "meta", "eyebrow", "stat", "wordmark"],
      color: ["ink", "ink-body", "ink-muted", "ink-accent", "on-dark", "on-dark-muted"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
