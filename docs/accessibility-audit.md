# Accessibility Audit — Lighthouse

**Date:** 2026-02-15
**Tool:** Lighthouse (accessibility category only)
**Target:** localhost:3000 (all pages)

## Scores

| Page | Score |
|------|-------|
| /get-involved | 100 |
| /join | 98 |
| /events | 96 |
| /merch | 96 |
| /volunteer | 96 |
| / (home) | 94 |
| /about | 94 |
| /resources | 94 |
| /find-ux-pro | 90 |

---

## Issues by Component

### Design System Components

#### LinkCard (`components/ui/LinkCard.tsx`)

| Issue | Detail | Pages |
|-------|--------|-------|
| Color contrast | `text-teal-600` description on cream bg | /resources |

#### InfoBox (`components/ui/InfoBox.tsx`)

| Issue | Detail | Pages |
|-------|--------|-------|
| Color contrast | `text-teal-500` eyebrow on teal-50 bg | /resources |

#### FormFileUpload (`components/ui/form-elements/FormFileUpload.tsx`)

| Issue | Detail | Pages |
|-------|--------|-------|
| Missing label | `<input type="file" class="sr-only">` has no associated label | /find-ux-pro |

---

### Not on Design System

#### FoundersSection (`components/sections/FoundersSection.tsx`)

Founder cards on the about page.

| Issue | Detail | Pages |
|-------|--------|-------|
| Color contrast | `text-teal-500` on founder name headings | /about |
| Color contrast | `text-gray-500` on role description | /about |

#### FAQSection (`components/sections/FAQSection.tsx`)

Accordion Q&A component.

| Issue | Detail | Pages |
|-------|--------|-------|
| Heading order | `<h4>` for questions, skips h3 | /about, /join, /resources, / |

#### MemberFilters (`components/directory/MemberFilters.tsx`)

Sort/filter bar on the directory page.

| Issue | Detail | Pages |
|-------|--------|-------|
| Color contrast | `text-gray-500` on inactive sort buttons | /find-ux-pro |

#### MemberCard (`components/directory/MemberCard.tsx`)

Directory profile cards.

| Issue | Detail | Pages |
|-------|--------|-------|
| Color contrast | `bg-teal-500` "Open to Work" badge (white text on teal) | /find-ux-pro |

#### Features (`components/sections/Features.tsx`)

"What we do" section component.

| Issue | Detail | Pages |
|-------|--------|-------|
| Color contrast | `text-teal-500` eyebrow text on white bg | / |

---

### Inline Page Styles (not componentized)

#### Home page (`app/(site)/page.tsx`)

| Issue | Detail | Section |
|-------|--------|---------|
| Color contrast | `text-teal-500` on h2 "Connect, learn, grow together" | what-we-do section |
| Color contrast | `text-teal-500` on h2 "IRL > Instagram" | community section |
| Color contrast | `text-teal-500` eyebrow "What we do" | what-we-do section |

#### Events page (`app/(site)/events/page.tsx`)

| Issue | Detail | Section |
|-------|--------|---------|
| Color contrast | `text-teal-500` on h2 "Upcoming Events" | upcoming events |
| Color contrast | `text-teal-500` on event date labels (x11) | event list items |
| Color contrast | `text-gray-500` on event time/location | event list items |

#### Volunteer page (`app/(site)/volunteer/page.tsx`)

| Issue | Detail | Section |
|-------|--------|---------|
| Color contrast | `text-teal-500` on h2 heading | main section |

#### Merch page (`app/(site)/merch/page.tsx`)

| Issue | Detail | Section |
|-------|--------|---------|
| Color contrast | `text-gray-400` on price labels | product cards |

---

## Summary

The #1 repeat offender is **`text-teal-500` on white/cream backgrounds** — it appears in both components and inline styles across 7 pages. Secondary issues are `text-gray-500`/`text-gray-400` contrast and heading hierarchy skips in FAQSection.
