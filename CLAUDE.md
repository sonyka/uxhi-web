# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UXHI (UX Hawaii) website built with Next.js 16, Sanity.io CMS, and Tailwind CSS v4. The Next.js application lives in the `/web` subfolder.

## Commands

All commands run from the `/web` directory:

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

Sanity Studio is embedded at `/studio` route (no separate Sanity CLI needed for content editing).

## Architecture

### Tech Stack
- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS v4** using CSS-based `@theme` configuration (not tailwind.config.ts)
- **Sanity.io** as headless CMS with embedded studio
- **Framer Motion** for animations
- **Deployed on Vercel**

### Sanity Configuration
- Project ID: `evh83z0t`
- Dataset: `production`
- Config files: `sanity.config.ts`, `sanity.cli.ts`
- Environment: `src/sanity/env.ts` (has hardcoded fallbacks for build time)

### Key Directories

```
web/
├── src/
│   ├── app/
│   │   ├── (site)/          # Main site pages with shared layout
│   │   ├── studio/          # Embedded Sanity Studio
│   │   └── api/             # API routes (draft mode)
│   ├── components/
│   │   ├── blocks/          # PageBuilder component
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Hero, Stats, Features, Testimonials, etc.
│   │   └── ui/              # Button, Container, SanityImage
│   ├── sanity/
│   │   ├── schemaTypes/     # Sanity schemas (documents, objects, blocks)
│   │   ├── lib/             # Client, queries, image helpers
│   │   └── structure.ts     # Studio structure
│   └── lib/                 # Utilities (cn, animations)
```

### Page Builder Pattern
Pages use a block-based content model. The `PageBuilder` component (`src/components/blocks/PageBuilder.tsx`) maps Sanity block types to React section components. Block types: `heroBlock`, `statsBlock`, `featuresBlock`, `testimonialsBlock`, `teamBlock`, `ctaBlock`, `richTextBlock`.

### Styling & Design System

**Design System Reference:** http://localhost:3000/design-system

The design system page is the **single source of truth** for all styling decisions. It documents:
- **Color palette** - brand colors, semantic colors, and usage guidelines
- **Typography** - font families, sizes, weights, and text styles
- **Reusable components** - pre-built UI patterns to use instead of inline code

**Always consult the design system page first** when building UI to ensure consistency. Use existing components rather than writing inline patterns.

Quick reference (see design system for full details):
- Primary: teal (`--color-teal-500: #09c0d7`)
- Secondary: purple (`--color-purple-700: #231769`)
- Background: cream (`--color-cream: #f4f1ea`)
- Fonts: Dela Gothic One (display), Nunito (body)

**Available Components:**

| Component | Path | Use Case |
|-----------|------|----------|
| `QuickLinkPill` | `components/ui/QuickLinkPill.tsx` | Pill with icon, label, subtitle for hero sections |
| `LinkCard` | `components/ui/LinkCard.tsx` | Cream card with title, teal description, external link icon |
| `InfoBox` | `components/ui/InfoBox.tsx` | Teal-50 callout box for notes and CTAs |
| `ArrowLinkButton` | `components/ui/ArrowLinkButton.tsx` | Text link with arrow for dark backgrounds |
| `FeatureCard` | `components/ui/cards/FeatureCard.tsx` | Card with icon, title, description (cream/white/teal/purple) |
| `SpotIllustrationCard` | `components/ui/cards/SpotIllustrationCard.tsx` | Large icon card (dark/cream/white variants) |
| `SpeechBubbleCard` | `components/ui/cards/SpeechBubbleCard.tsx` | Quote card (speech-bubble or testimonial variant) |

### Data Fetching
Uses `next-sanity` with:
- `sanityFetch` from `src/sanity/lib/live.ts` for server components
- GROQ queries defined in `src/sanity/lib/queries.ts`
- `defineLive` imported from `next-sanity/live` (not main export)

## Deployment

Vercel deployment requires `vercel.json` with `"framework": "nextjs"` for proper detection. Environment variables have hardcoded fallbacks in `src/sanity/env.ts` so builds work without env vars set.
