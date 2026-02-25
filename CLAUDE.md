# MarineForge

Single-page marketing website for a marine digital agency. Built with Next.js 14 (App Router), React 18, Tailwind CSS v4, and Framer Motion.

## Domain Knowledge

**IMPORTANT:** Before working on content, copy, SEO, AEO, GEO, schema markup, or marketing strategy, agents and skills MUST review the domain knowledge documents:

- **[domain-knowledge/MarineForge_Domain_Knowledge.md](../domain-knowledge/MarineForge_Domain_Knowledge.md)** — Complete business context including:
  - Company identity, mission, vision, and values
  - Brand positioning and key differentiators
  - Target markets and client segments (boat manufacturers, marine tech, dealers, charters, e-commerce)
  - All 9 service offerings with deliverables and outcomes
  - AI technology stack and implementation methodology
  - Pricing structure and service tiers
  - Messaging frameworks, value propositions, and objection handling
  - Competitive landscape

- **[domain-knowledge/MarineForge_SEO_GEO_AEO_Knowledge.md](../domain-knowledge/MarineForge_SEO_GEO_AEO_Knowledge.md)** — Technical SEO and optimization strategy:
  - SEO (Search Engine Optimization) — traditional search rankings
  - AEO (Answer Engine Optimization) — featured snippets, voice search, People Also Ask
  - GEO (Generative Engine Optimization) — AI citations in ChatGPT, Perplexity, Google AI Overviews
  - Marine industry-specific keyword strategy
  - Schema markup requirements (FAQPage, HowTo, Organization, LocalBusiness, Service)
  - Content structure for AI citation and featured snippets
  - E-E-A-T signals and entity building
  - Measurement KPIs for all three disciplines

These documents are the source of truth for all content creation, copywriting, service descriptions, SEO implementation, and marketing strategy decisions.

## Project Layout

```
frontend/                    # Next.js application root
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (Server Component) — HTML shell, CSS import, metadata
│   │   └── page.tsx         # Home page (Server Component) — composes all sections
│   ├── components/
│   │   ├── Navigation.tsx   # Sticky navbar, scroll-aware transparency, anchor links
│   │   ├── Hero.tsx         # Full-screen hero with parallax scroll effects
│   │   ├── Services.tsx     # 4-card service grid with scroll animations
│   │   ├── Portfolio.tsx    # 3 featured project case studies
│   │   ├── About.tsx        # Company stats, values, image showcase
│   │   ├── Contact.tsx      # Contact form, contact methods, footer
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx  # <img> wrapper with error fallback
│   │   └── ui/              # 46 shadcn/ui components (button, card, dialog, form, etc.)
│   │       └── utils.ts     # cn() helper — clsx + tailwind-merge
│   └── styles/
│       └── globals.css      # Tailwind v4 source: @import, @theme inline, CSS variables, base styles
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Architecture

- **Single page, no routing.** All content lives on `/`. Navigation uses anchor links (#services, #work, #about, #contact).
- **All 6 page-section components are client components** (`'use client'`) because they use Framer Motion hooks (useScroll, useTransform, useInView) and React hooks (useState, useEffect).
- `app/page.tsx` is a Server Component that composes the client section components.
- No API routes, no data fetching, no server actions.

## Styling

- **Tailwind CSS v4** with PostCSS (`@tailwindcss/postcss` plugin).
- Theme defined via `@theme inline` block in `src/styles/globals.css` — maps CSS custom properties to Tailwind tokens.
- Light/dark mode CSS variables in `:root` / `.dark` selectors. Dark mode not currently activated in UI.
- Color space: OKLCh for theme colors.
- `cn()` utility at `src/components/ui/utils.ts` for merging Tailwind classes.

## Key Libraries

| Library | Import | Usage |
|---------|--------|-------|
| Framer Motion | `motion/react` | All animations — parallax, scroll, hover, staggered reveals |
| Lucide | `lucide-react` | Icons throughout all sections |
| Radix UI | `@radix-ui/react-*` | Primitives for shadcn/ui components |
| shadcn/ui | `@/components/ui/*` | Pre-built accessible components (46 total) |
| CVA | `class-variance-authority` | Component variant definitions in ui/ |
| next/image | `next/image` | Optimized images in Hero, Services, Portfolio, About |
| next/font | `next/font/google` | Inter font — self-hosted, preloaded in layout.tsx |

## Commands

```sh
cd frontend
npm run dev          # Start dev server on port 3000
npm run build        # Production build
npm run start        # Serve production build locally
```

## Conventions

- **Path alias:** `@/` resolves to `./src/` (tsconfig paths).
- **Component exports:** Page sections use named exports (`export function Hero`). shadcn/ui components use named exports.
- **Images:** All external from `images.unsplash.com` via `next/image` with `fill` + responsive `sizes`. Hero image uses `priority` (LCP).
- **No environment variables** are used in application code. Only `VERCEL_OIDC_TOKEN` exists for deployment.

## Deployment

- **Platform:** Vercel (auto-detects Next.js, SSR mode).
- No `vercel.json` needed — framework detection handles build/output configuration.
