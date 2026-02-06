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
| `SpeechBubbleCard` | `components/ui/cards/SpeechBubbleCard.tsx` | Quote card with author info (speech-bubble or testimonial variant) |

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

### Stage 2: LinkCard Refactor ✅
**Impact:** ~20+ inline link cards → component uses
**Pages:** resources

- [x] `resources/page.tsx` - Online Resources section
- [x] `resources/page.tsx` - Local Programs section
- [x] `resources/page.tsx` - Online Programs section
- [x] `resources/page.tsx` - Communities section
- [ ] `resources/page.tsx` - Tech Organizations section (needs LinkCard logo support - see Component Enhancement Needs)

### Stage 3: InfoBox Refactor ✅
**Impact:** 4 inline callouts → component uses
**Pages:** resources, about

- [x] `resources/page.tsx` - Note box
- [x] `resources/page.tsx` - Suggestion CTA box
- [x] `resources/page.tsx` - Something Missing CTA box
- [x] `about/page.tsx` - Press callout

### Stage 4: SpeechBubbleCard Refactor ✅
**Impact:** Testimonial cards → component uses
**Pages:** join

- [x] `join/page.tsx` - Testimonial cards (component enhanced with `testimonial` variant)

### Stage 5: ArrowLinkButton Refactor ✅
**Impact:** 6 inline patterns → 6 component uses
**Pages:** home (page.tsx)

- [x] `page.tsx` - Purple bento "Join us" link (desktop)
- [x] `page.tsx` - Purple bento "Join us" link (tablet)
- [x] `page.tsx` - Purple bento "Join us" link (mobile)
- [x] `page.tsx` - "Join free" link in Free Membership card
- [x] `page.tsx` - "View events" link in Events card
- [x] `page.tsx` - "Browse resources" link in Resources card

**Note on about/page.tsx:** The Contact section buttons are **styled pill buttons** with circular icon containers - a different pattern from ArrowLinkButton. These could be addressed with a new `PillButton` component in a future stage.

**Note on events/page.tsx:** Has 2 similar patterns but uses `ExternalLinkIcon` instead of `ArrowIcon` - left as-is since icon differs.

### Stage 6: Committee/Feature Cards ✅
**Impact:** 6 inline committee cards → 6 component uses
**Pages:** get-involved

- [x] `get-involved/page.tsx` - Committee cards (using `SpotIllustrationCard` with `variant="cream"`)

**Note:** Minor visual change on md+ breakpoints - `SpotIllustrationCard` uses responsive sizing (larger icons 96px vs 80px, more padding 32px vs 24px) which improves card readability on desktop.

---

## Component Enhancement Needs

During refactor, these component improvements may be needed:

1. **LinkCard** - May need to handle cases where description is optional
2. **SpotIllustrationCard** - May need to support bullet list children for report cards
3. ~~**SpeechBubbleCard** - Verify API matches testimonial data structure from Sanity~~ ✅ Enhanced with `variant` prop (`speech-bubble` | `testimonial`), `authorRole`, `authorCompany`, and `authorImageNode` for Sanity images
