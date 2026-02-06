# UXHI Content Audit — Sanity vs. Hardcoded

## What's Already in Sanity

| Content | Used On |
|---------|---------|
| FAQs | About, Join |
| Team/Founders | About |
| Testimonials | Join |
| Values (mission) | About |
| Resource items + categories | Resources |
| Tech organizations | Resources |
| State of UX reports | Resources |
| Directory members | Find UX Pro |
| Instagram posts | Home |
| Community photos | Home |
| Products (merch) | Shop |

---

## Hardcoded Content — Recommended to Stay in Code

Changes rarely, tightly coupled to layout/design. Updating requires a design change anyway.

| Content | Page | Rationale |
|---------|------|-----------|
| Hero headlines & descriptions | All pages | 1-2 sentences tied to specific layouts. Changing them means redesigning the section. |
| Mission statement | Home, About | Core brand copy — changes maybe once in the org's lifetime. |
| Navigation links | Navbar, Footer | Structural — adding a nav item usually means adding a new page, which requires a code deploy anyway. |
| Bento grid images | All pages | Each image is positioned in a specific responsive layout. Swapping one means adjusting the design. |
| Contact email (`aloha@uxhi.community`) | About, Get Involved | One email address used everywhere. A find-and-replace in code takes 10 seconds. |
| Social links | Footer | LinkedIn/Instagram URLs — change once a decade. |
| Form embed URLs | Join, Volunteer | Google Form / Aidaform URLs — change only if the form is recreated. |
| "Who we are" / Founders section heading | About | Brand copy, not dynamic content. |
| Company logos on Join page | Join | 5 logos with specific layout — design-coupled. |

---

## Recommended to Move to Sanity

Changes more often. Non-technical people need to update without a deploy.

| Content | Page | Rationale |
|---------|------|-----------|
| **Upcoming events list** | Events | Currently hardcoded with specific dates (Feb-Apr). Goes stale fast. Team needs to update without a deploy. |
| **Past partners logos** (12) | Get Involved | Partner list grows/changes yearly. Images + names = good CMS fit. |
| **Past sponsors logos** (14) | Get Involved | Same — yearly conference cycle means new sponsors. |
| **Committees list** (6) | Get Involved | Could change as org structure evolves. Simple structured data. |
| **Featured press mention** | About | If more press coverage happens, team may want to add/swap these. |
| **Conference archive links** | Events | New conference each year — 2023, 2024, 2025... needs to grow. |

---

## Sanity Free Plan Limits (Current)

| Resource | Limit | UXHI Usage |
|----------|-------|------------|
| Documents | 10,000 | Likely under 200 |
| CDN requests | 1M/month | Well under |
| Users | 20 (Admin or Viewer only) | Plenty |
| Datasets | 2 (public only) | Using 1 |
| Asset storage | 100 GB | Minimal |

Constraints: No custom roles (Admin or Viewer only), no private datasets (no staging).

---

## Alternative Content Management Options

### Keystatic (free, Git-based)
- Content as JSON/Markdown files in the repo
- Browser-based editing UI for non-technical users
- Changes create Git commits, triggering Vercel deploy
- Free for up to 3 users (Keystatic Cloud)
- Good for rarely-changing page copy alongside Sanity for structured collections

### Vercel Visual Editing
- Click-to-edit overlay linking live page to Sanity Studio
- Available on preview deployments (free Hobby plan)
- Convenience layer on top of Sanity, not a replacement

### For Rarely-Changing Copy
A shared doc of "text change requests" processed in a batch by a developer is simpler than adding another tool for content that changes once a year.
