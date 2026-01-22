# Component Refactor Plan

## Goal
Replace inline UI patterns across all pages with the centralized components created during the design system work. This will ensure consistent styling and make future updates easier to propagate site-wide.

---

## Available Components

| Component | File Path | Description |
|-----------|-----------|-------------|
| `QuickLinkPill` | `components/ui/QuickLinkPill.tsx` | Pill with icon, label, and subtitle - used in hero sections |
| `LinkCard` | `components/ui/LinkCard.tsx` | Cream card with title, teal description, and external link icon |
| `InfoBox` | `components/ui/InfoBox.tsx` | Teal-50 background callout box for notes and CTAs |
| `ArrowLinkButton` | `components/ui/ArrowLinkButton.tsx` | Text link with arrow - for dark backgrounds |
| `FeatureCard` | `components/ui/cards/FeatureCard.tsx` | Card with icon, title, description (cream/white/teal/purple variants) |
| `SpotIllustrationCard` | `components/ui/cards/SpotIllustrationCard.tsx` | Large 96px icon card (dark/cream/white variants) |
| `SpeechBubbleCard` | `components/ui/cards/SpeechBubbleCard.tsx` | Testimonial card with notch, quote, and author info |

## Verification Checklist

For *every* page refactored:

1. [ ] Take screenshot *before* changes with chrome
2. [ ] Replace inline patterns with components
3. [ ] Run `npm run build` - must succeed
4. [ ] Take screenshot after changes with chrome
5. [ ] Compare screenshots - no visual changes expected
6. [ ] If changes detected, document and get approval

---

---

## Implementation Stages

### Stage 1: QuickLinkPill Refactor ✅
**Impact:** 11 inline patterns → 11 component uses
**Pages:** resources, get-involved, about

- [x] `resources/page.tsx` - 3 pills
- [x] `get-involved/page.tsx` - 5 pills
- [x] `about/page.tsx` - 3 pills

### Stage 2: LinkCard Refactor
**Impact:** ~20+ inline link cards → component uses
**Pages:** resources

- [ ] `resources/page.tsx` - Online Resources section
- [ ] `resources/page.tsx` - Local Programs section
- [ ] `resources/page.tsx` - Online Programs section
- [ ] `resources/page.tsx` - Communities section
- [ ] `resources/page.tsx` - Tech Organizations section

### Stage 3: InfoBox Refactor
**Impact:** 3 inline callouts → component uses
**Pages:** resources, about

- [ ] `resources/page.tsx` - Note box
- [ ] `resources/page.tsx` - Suggestion CTA box
- [ ] `about/page.tsx` - Press callout

### Stage 4: SpeechBubbleCard Refactor
**Impact:** Testimonial cards → component uses
**Pages:** join

- [ ] `join/page.tsx` - Testimonial cards (verify component API)

### Stage 5: ArrowLinkButton Refactor
**Impact:** Dark-bg text links → component uses
**Pages:** about

- [ ] `about/page.tsx` - Contact section links

### Stage 6: Committee/Feature Cards (Optional)
**Impact:** Committee cards → component uses
**Pages:** get-involved

- [ ] `get-involved/page.tsx` - Committee cards
- [ ] Verify `SpotIllustrationCard` or `FeatureCard` matches layout

---

## Component Enhancement Needs

During refactor, these component improvements may be needed:

1. **LinkCard** - May need to handle cases where description is optional
2. **SpotIllustrationCard** - May need to support bullet list children for report cards
3. **SpeechBubbleCard** - Verify API matches testimonial data structure from Sanity
