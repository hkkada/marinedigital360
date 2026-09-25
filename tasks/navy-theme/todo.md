# Navy theme roll-out

Anchor colour: `#012441` (sampled from the supplied swatch).
Decisions confirmed with the user: **navy bands alternating with white sections**,
**hero cyan `#0FF1FD` as the accent**.

## Palette

| Token | Value | Role |
|---|---|---|
| `--brand-navy-900` | `#001836` | deepest — hero base, footer floor |
| `--brand-navy-800` | `#012441` | primary dark surface (the supplied colour) |
| `--brand-navy-700` | `#063356` | raised cards / hover states on navy |
| `--brand-navy-600` | `#0A4470` | hairline borders on navy |
| `--brand-cyan` | `#0FF1FD` | accent **on dark only** (fails contrast on white) |
| `--brand-azure` | `#1877F2` | accent on light — the existing brand blue, kept |
| `--brand-azure-deep` | `#0D5DBF` | gradient partner on light |
| `--brand-cta-from` → `--brand-cta-to` | `#00CEFA` → `#00A1FD` | CTA gradient, both surfaces |

Three-tone system: navy surface, cyan on dark, azure on light. The existing
`#1877F2` is *kept* rather than replaced — it is already in the same hue family
and is the only one of the three that is legible on white, so 245 usages across
44 files stay untouched and the diff stays reviewable.

## Tasks

- [ ] 1. Token layer in `globals.css` — `:root` vars + `@theme inline` so
      `bg-brand-navy`, `text-brand-cyan`, `border-brand-navy-line` exist
- [ ] 2. Mechanical surface swap: every `bg-black` / `bg-gray-900` / `bg-gray-800`
      / `#131C28` / `#0F1620` / `#18222E` / `#1E2936` → the navy scale (24 files)
- [ ] 3. Footer light → navy (the one genuine redesign: it is `bg-white` today)
- [ ] 4. Accent pass — on every surface that is now navy, `#1877F2` accents move
      to cyan. Needs per-element context, so it is done by reading each file
- [ ] 5. Responsive audit across breakpoints
- [ ] 6. `tsc --noEmit` + `npm run build` green

## Band rhythm (homepage)

Hero (navy) → Services (white) → Experience (white) → Industries (white) →
About (navy) → Footer (navy-deep)

## Review

_(filled in on completion)_
