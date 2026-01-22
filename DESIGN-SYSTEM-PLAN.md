# Design System Centralization Plan

## Goal
Centralize all design system elements into reusable components so that style changes propagate site-wide from a single source. Add component paths to the design system page for easy reference.

---

## New Components to Create

### Icons (`components/ui/icons/`)
| Component | File Path | Current Inline Locations |
|-----------|-----------|--------------------------|
| ArrowIcon | `components/ui/icons/ArrowIcon.tsx` | 9+ files |
| ExternalLinkIcon | `components/ui/icons/ExternalLinkIcon.tsx` | 5+ files |
| PlusIcon | `components/ui/icons/PlusIcon.tsx` | FAQSection |
| MinusIcon | `components/ui/icons/MinusIcon.tsx` | FAQSection |
| ChevronDownIcon | `components/ui/icons/ChevronDownIcon.tsx` | Header, dropdowns |

### UI Components (`components/ui/`)
| Component | File Path | Purpose |
|-----------|-----------|---------|
| InfoBox | `components/ui/InfoBox.tsx` | Teal note/callout boxes (bg-teal-50) |
| LinkCard | `components/ui/LinkCard.tsx` | Cream cards with title + description + external link |
| ArrowLinkButton | `components/ui/ArrowLinkButton.tsx` | Text link with arrow on dark backgrounds |
| QuickLinkPill | `components/ui/QuickLinkPill.tsx` | Pill with icon + label + subtitle |

### Card Components (`components/ui/cards/`)
| Component | File Path | Purpose |
|-----------|-----------|---------|
| FeatureCard | `components/ui/cards/FeatureCard.tsx` | Icon + title + description (cream/white/teal/purple variants) |
| SpotIllustrationCard | `components/ui/cards/SpotIllustrationCard.tsx` | Large 96px illustrated icon cards |
| SpeechBubbleCard | `components/ui/cards/SpeechBubbleCard.tsx` | Testimonial card with notch and avatar |

---

## Implementation Stages

### Stage 1: Icons ✅
- [x] Create `components/ui/icons/` directory
- [x] Create ArrowIcon.tsx
- [x] Create ExternalLinkIcon.tsx
- [x] Create PlusIcon.tsx
- [x] Create MinusIcon.tsx
- [x] Create ChevronDownIcon.tsx
- [x] Create index.ts (barrel export)

### Stage 2: Update Existing Components to Use Centralized Icons ✅
- [x] Update `PrimaryCTA.tsx` - import icons from `./icons/`
- [x] Update `FAQSection.tsx` - import PlusIcon/MinusIcon from `@/components/ui/icons/`

### Stage 3: Create New UI Components ✅
- [x] Create InfoBox.tsx
- [x] Create LinkCard.tsx
- [x] Create ArrowLinkButton.tsx
- [x] Create QuickLinkPill.tsx

### Stage 4: Create Card Components ✅
- [x] Create FeatureCard.tsx
- [x] Create SpotIllustrationCard.tsx
- [x] Create SpeechBubbleCard.tsx
- [x] Create index.ts (barrel export)

### Stage 5: Update Design System Page ✅
- [x] Add component file paths to each section
- [x] Import and use actual components where applicable
- [x] Replace inline examples with component usage

### Stage 6: Refactor Pages ✅

All pages refactored to use centralized icon components from `@/components/ui/icons/`.

- [x] `app/(site)/page.tsx` - ArrowIcon import added
- [x] `app/(site)/about/page.tsx` - ArrowIcon, ExternalLinkIcon imports added
- [x] `app/(site)/events/page.tsx` - ArrowIcon, ExternalLinkIcon imports added
- [x] `app/(site)/get-involved/page.tsx` - ArrowIcon, ExternalLinkIcon imports added, inline definitions removed
- [x] `app/(site)/resources/page.tsx` - ArrowIcon, ExternalLinkIcon imports added, inline definitions removed
- [x] `app/(site)/find-ux-pro/page.tsx` - ExternalLinkIcon import added, ArrowUpRightIcon replaced
- [x] `app/(site)/join/page.tsx` - ArrowIcon import added
- [x] `app/(site)/merch/page.tsx` - ArrowIcon import added, inline definition removed
- [x] `app/(site)/volunteer/page.tsx` - ArrowIcon import added, inline definition removed
- [x] `components/layout/Header.tsx` - ArrowIcon, ExternalLinkIcon, ChevronDownIcon imports added, inline SVGs replaced
- [x] `components/layout/Footer.tsx` - ArrowIcon, ExternalLinkIcon imports added, inline definitions removed

---

## Pages and What to Replace

| Page | Inline Patterns to Replace |
|------|---------------------------|
| `page.tsx` (home) | ArrowIcon, inline CTAs |
| `about/page.tsx` | ArrowIcon, ExternalLinkIcon, inline CTAs, InfoBox pattern |
| `events/page.tsx` | ArrowIcon, ExternalLinkIcon |
| `get-involved/page.tsx` | ArrowIcon, ExternalLinkIcon, QuickLinkPills, inline CTAs |
| `resources/page.tsx` | ArrowIcon, ExternalLinkIcon, LinkCards, InfoBox, QuickLinkPills |
| `find-ux-pro/page.tsx` | ExternalLinkIcon, inline CTAs |
| `join/page.tsx` | ArrowIcon, inline CTAs |
| `merch/page.tsx` | ArrowIcon |
| `volunteer/page.tsx` | ArrowIcon |
| `Header.tsx` | Inline arrow/chevron icons |
| `Footer.tsx` | ArrowIcon, ExternalLinkIcon |

---

## Component Specifications

### Icon Pattern
```tsx
// All icons follow this pattern
interface IconProps {
  className?: string;
}

export function ArrowIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
```

### SVG Paths Reference
| Icon | Path(s) |
|------|---------|
| Arrow (right) | `M5 12h14M12 5l7 7-7 7` |
| External (up-right) | `M7 7h10v10` + `M7 17L17 7` |
| Plus | `M12 6v12M6 12h12` |
| Minus | `M20 12H4` |
| Chevron Down | `M19 9l-7 7-7-7` |

---

## Design System Page Component Labels

Add under each section header:
```tsx
<p className="text-xs text-gray-400 font-mono mb-4">
  Component: components/ui/icons/ArrowIcon.tsx
</p>
```

---

## Verification After Each Stage

1. `npm run build` - must succeed
2. `npm run lint` - must pass
3. Visual verification in browser

### Final Verification
```bash
# Should only return centralized component files
grep -r "function ArrowIcon" web/src/
grep -r "function ExternalLinkIcon" web/src/
```

---

## Final File Structure

```
web/src/components/ui/
├── icons/
│   ├── index.ts
│   ├── ArrowIcon.tsx
│   ├── ExternalLinkIcon.tsx
│   ├── PlusIcon.tsx
│   ├── MinusIcon.tsx
│   └── ChevronDownIcon.tsx
├── cards/
│   ├── FeatureCard.tsx
│   ├── SpotIllustrationCard.tsx
│   └── SpeechBubbleCard.tsx
├── Button.tsx (existing)
├── Container.tsx (existing)
├── PrimaryCTA.tsx (updated)
├── AnimatedSection.tsx (existing)
├── SanityImage.tsx (existing)
├── InfoBox.tsx (new)
├── LinkCard.tsx (new)
├── ArrowLinkButton.tsx (new)
└── QuickLinkPill.tsx (new)
```
