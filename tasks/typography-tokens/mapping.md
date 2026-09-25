# Typography token mapping (authoritative)

The scale is defined in `frontend/src/styles/globals.css` `@theme inline`. These are real
Tailwind utilities. Use them; do not invent new ones.

| Utility | Renders | Use for |
|---|---|---|
| `text-display` | 40 → 72px, lh 1.02 | marketing hero `h1` (home, service, about heroes) |
| `text-h1` | 36 → 56px, lh 1.08 | interior page title (legal, concepts index) |
| `text-h2` | 32 → 52px, lh 1.1 | section heading — the big `h2` at the top of a section |
| `text-h3` | 20 → 26px, lh 1.25 | card title, sub-heading |
| `text-h4` | 17 → 20px, lh 1.35 | small heading, footer column heading, stat label |
| `text-lead` | 18 → 22px, lh 1.55 | the intro paragraph under a section heading |
| `text-body` | 16 → 18px, lh 1.65 | ordinary body copy, list items, form inputs |
| `text-meta` | 14px, lh 1.5 | captions, helper text, footer links, timestamps, form labels |
| `text-eyebrow` | 14px, lh 1.4, tracking 0.3em | the uppercase kicker above a section heading |
| `text-stat` | 36 → 56px, lh 1 | big stat numbers, prices |

## Rules

1. **One size class per element.** Delete every `sm:` / `md:` / `lg:` / `xl:` / `2xl:` font-size
   step. The tokens are `clamp()`-based and scale continuously — a responsive step on top of a
   token re-introduces exactly the breakpoint jumps this work removes.
2. **Delete the `leading-*` and heading `tracking-*` literals** that the token now supplies
   (`leading-[0.95]`, `leading-[0.9]`, `leading-[1.05]`, `leading-tight`, `tracking-tight`,
   `tracking-[-0.02em]`, `tracking-[0.3em]`, `tracking-[0.2em]` on eyebrows). Keep a
   `leading-*` only where it is a deliberate one-off you can justify in a comment.
3. **Weight**: `globals.css` `@layer base` already gives `h1`/`h2` `font-bold` and
   `h3`/`h4`/`h5`/`h6` `font-semibold`. So on a real heading element, **drop** `font-bold` /
   `font-semibold` — it is redundant. On a `div`/`span`/`p`/`motion.div` carrying a heading
   token, **keep or add** the explicit weight class, because no base rule applies there.
   Tailwind does not support a `--font-weight` companion on a font-size token (verified), so
   weight is never automatic outside those base element rules.
4. **`text-eyebrow` already includes `tracking-[0.3em]`.** Keep `uppercase` (that is not
   typography scale, it is casing). Remove the now-duplicate tracking class.
5. Do not touch `text-*` classes that set **color** (`text-white`, `text-gray-600`,
   `text-[#1877F2]`) — only size classes.
6. Never use `text-xs`/`text-sm`/`text-base`/`text-lg`/`text-xl`/`text-Nxl` or an arbitrary
   `text-[13px]` / `text-[0.7rem]` / inline `clamp()` any more, in the files you own.
7. **Do not run `npm run build`, `next build`, `tsc` or `next lint`.** Verification is central,
   once, after all waves land. Concurrent builds fight over `.next` and rewrite `tsconfig.json`.
8. Edit only the files you are told you own. Do not touch `globals.css`, `shared/Card.tsx`,
   `shared/StatCard.tsx` or `ui/button.tsx` — those are already done.

## Judgement calls

- A heading's *role* decides the token, not its current size. The 18 sections that all use
  `text-4xl md:text-5xl lg:text-6xl` and the home sections that use
  `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` are the **same role** — both become `text-h2`.
  That convergence is the point of the task.
- Cards rendered through `shared/Card.tsx` (`CardTitle` / `CardBody`) already get their type
  from the primitive. Remove a size class a caller was passing in `className` to override it,
  unless the override is genuinely intentional.
- If an element's size class is doing layout work you cannot map cleanly, leave it and note the
  file and line in your final report rather than guessing.
