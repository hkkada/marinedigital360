# Font color standardization

Plan: `~/.claude/plans/can-you-please-review-wiggly-meerkat.md`

- [x] Add semantic text tokens (`ink`, `ink-body`, `ink-muted`, `ink-accent`, `on-dark`, `on-dark-muted`) to `globals.css`; point shadcn foreground vars + `--nav-link-blue` at them
- [x] Home sections + nav + footer + modal + shared/ components
- [x] About page + legal
- [x] Service pages (`components/services/*`)
- [x] Industry concepts (`components/industry-concepts/*`, `app/concepts/industries/page.tsx`) — SERP files untouched
- [x] Grep gate: no stray gray/white-opacity/hex text colors
- [x] Visual + contrast check in browser (desktop 1440, mobile 390)
- [x] Type check + production build

## Review

- Tokens emitted in the production CSS; `tsc` clean; `next build` passes.
- Grep gate: 0 legacy text colors outside `ui/` and the SERP mock. One intentional `text-gray-200` remains on a decorative, aria-hidden arrow in ConceptIndexWall (it's meant to be near-invisible until hover).
- Contrast scan (home, /about, /services/seo, /concepts/industries): no real failures. The flags were a nav over the hero with no ancestor background, and a scanner bug that read oklch values as RGB.
- Mapping was by role, not by old shade: lead/body copy on navy → `on-dark`, card descriptions/meta → `*-muted`.
- Text on the azure gradient cards stays `text-white` (`on-dark` is only 2.8:1 on #1877F2).
- Unrelated issue found: the nav prefetches `/services/ppc-management`, which returns 404.
