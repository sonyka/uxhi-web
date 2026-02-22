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

## Scripts

### capture.sh - Page Screenshot Utility

Captures viewport-sized screenshots of a page, splitting a full-page capture into multiple viewport-height images. Useful for documentation, refactoring, visual regression testing, or sharing page designs.

**Requirements:** Node.js (npx), ImageMagick

```bash
# From repo root
./capture.sh [options] [url]

# Options:
#   -p, --prefix PREFIX    Output filename prefix (default: page)
#   -o, --output DIR       Output directory (default: current directory)
#   -w, --width WIDTH      Viewport width (default: 1492)
#   -h, --height HEIGHT    Viewport height (default: 824)

# Examples:
./capture.sh                                    # Captures localhost:3000 → page-00.png, page-01.png, etc.
./capture.sh /conferences/2024                  # Captures specific path
./capture.sh -p before /about                   # Creates before-00.png, before-01.png, etc.
./capture.sh -p after -o ./screenshots /page    # Output to specific directory
```

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

**CRITICAL: Design System Sync Rule**
Whenever a UI component's styling, props, or behavior is changed, the design system page (`src/app/(site)/design-system/page.tsx`) **MUST be updated in the same changeset** to reflect those changes. The design system is the single source of truth — it must never go stale. This includes: color changes, new variants, removed variants, renamed props, and any visual modifications to existing components.

Quick reference (see design system for full details):
- Primary: teal (`--color-teal-90: #09C0D7`)
- Secondary: purple (`--color-purple-140: #231769`)
- Background: cream (`--color-cream: #f4f1ea`)
- Fonts: Dela Gothic One (display), Nunito (body)

**Available Components:**

| Component | Path | Use Case |
|-----------|------|----------|
| `Navbar` | `components/layout/Navbar.tsx` | Desktop navigation with dropdowns (used in Header) |
| `MobileNavbar` | `components/layout/Navbar.tsx` | Collapsible mobile nav with accordion dropdowns |
| `HamburgerButton` | `components/layout/Navbar.tsx` | Animated hamburger menu toggle button |
| `Footer` | `components/layout/Footer.tsx` | Site footer with headline, logo, 4-column nav grid |
| `Container` | `components/ui/Container.tsx` | Responsive max-width wrapper (default/narrow/wide) |
| `SanityImage` | `components/ui/SanityImage.tsx` | Next.js Image wrapper for Sanity CMS assets with LQIP |
| `QuickLinkPill` | `components/ui/QuickLinkPill.tsx` | Pill with icon, label, subtitle for hero sections |
| `LinkCard` | `components/ui/LinkCard.tsx` | Cream card with title, teal description, external link icon |
| `InfoBox` | `components/ui/InfoBox.tsx` | Teal-50 callout box for notes and CTAs |
| `PressMention` | `components/ui/PressMention.tsx` | Press/media callout with source eyebrow, title, and CTA |
| `ArrowLinkButton` | `components/ui/ArrowLinkButton.tsx` | Text link with arrow for dark backgrounds |
| `BulletPoint` | `components/ui/BulletPoint.tsx` | Styled bullet dot (teal on light, yellow on dark bg) |
| `MobileTooltip` | `components/ui/MobileTooltip.tsx` | Tap-to-reveal tooltip (mobile), hover (desktop) |
| `SpotIllustrationCard` | `components/ui/cards/SpotIllustrationCard.tsx` | Large icon card (dark/cream/white variants) |
| `FormLabel` | `components/ui/form-elements/FormLabel.tsx` | Shared form label; supports `as="legend"` for fieldsets |
| `FormInput` | `components/ui/form-elements/FormInput.tsx` | Glassmorphic text input for purple form backgrounds |
| `FormTextarea` | `components/ui/form-elements/FormTextarea.tsx` | Glassmorphic textarea with vertical resize |
| `FormRadio` | `components/ui/form-elements/FormRadio.tsx` | Custom radio with teal fill + white inner dot |
| `FormCheckbox` | `components/ui/form-elements/FormCheckbox.tsx` | Custom checkbox with teal fill + SVG checkmark |
| `FormSelect` | `components/ui/form-elements/FormSelect.tsx` | Custom dropdown with purple panel + hidden input |
| `FormFileUpload` | `components/ui/form-elements/FormFileUpload.tsx` | Styled file upload with optional circular preview |
| `FormSubmitButton` | `components/ui/form-elements/FormSubmitButton.tsx` | Pill button with icon circle (send or arrow variant) |
| `InquiryForm` | `components/forms/InquiryForm.tsx` | Contact form for /about#contact (purple bg, saves to Sanity + Slack) |
| `MembershipForm` | `components/forms/MembershipForm.tsx` | Membership application for /join (purple bg, Google Sheet + Slack) |
| `DirectorySubmitForm` | `components/forms/DirectorySubmitForm.tsx` | Directory submission for /find-ux-pro (purple bg, Sanity draft + Slack) |
| `FormAlert` | `components/ui/FormFeedback.tsx` | Error/info banner for forms (error or info variant) |
| `FieldError` | `components/ui/FormFeedback.tsx` | Field-level validation message (yellow text below inputs) |
| `FormSuccess` | `components/ui/FormFeedback.tsx` | Post-submission success card (icon, title, message) |
| `TextSlideUp` | `components/ui/TextSlideUp.tsx` | Text slide-up hover animation (used in Navbar, PrimaryCTA) |

### Data Fetching
Uses `next-sanity` with:
- `sanityFetch` from `src/sanity/lib/live.ts` for server components
- GROQ queries defined in `src/sanity/lib/queries.ts`
- `defineLive` imported from `next-sanity/live` (not main export)

## Deployment

Vercel deployment requires `vercel.json` with `"framework": "nextjs"` for proper detection. Environment variables have hardcoded fallbacks in `src/sanity/env.ts` so builds work without env vars set.
