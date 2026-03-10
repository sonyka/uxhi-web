# Spot Illustration Icon Audit

Last updated: 2026-03-09

## SpotIllustrationCard Icons (80px mobile / 96px desktop)

| Icon | Title | Variant | Page / Section | Source |
|------|-------|---------|----------------|--------|
| `icon-membership.svg` | Free Membership | dark | Homepage — "Get Involved" cards | hardcoded |
| `icon-events.svg` | Events | dark | Homepage — "Get Involved" cards | hardcoded |
| `icon-resources.svg` | Resources | dark | Homepage — "Get Involved" cards | hardcoded |
| `icon-education-findings.svg` | Education Findings | translucent | Resources — State of UX Report | hardcoded |
| `icon-career-findings.svg` | Career Findings | translucent | Resources — State of UX Report | hardcoded |
| `icon-challenges.svg` | Top Challenges | translucent | Resources — State of UX Report | hardcoded |
| `icon-educational-outreach.svg` | Educational Outreach | beige | Get Involved — Committees | Sanity (fallback: hardcoded) |
| `icon-workforce-outreach.svg` | Workforce Outreach | beige | Get Involved — Committees | Sanity (fallback: hardcoded) |
| `icon-community-engagement.svg` | Community Engagement | beige | Get Involved — Committees | Sanity (fallback: hardcoded) |
| `icon-professional-development.svg` | Professional Development | beige | Get Involved — Committees | Sanity (fallback: hardcoded) |
| `icon-communications.svg` | Communications | beige | Get Involved — Committees | Sanity (fallback: hardcoded) |
| `icon-conference.svg` | Conference | beige | Get Involved — Committees | Sanity (fallback: hardcoded) |
| `icon-service.svg` | Service | white | About — Our Values (MissionSection) | Sanity (fallback: hardcoded) |
| `icon-community.svg` | Community | white | About — Our Values (MissionSection) | Sanity (fallback: hardcoded) |
| `icon-empowerment.svg` | Empowerment | white | About — Our Values (MissionSection) | Sanity (fallback: hardcoded) |
| `icon-inspire.svg` | Inspire | white | About — Our Values (MissionSection) | Sanity (fallback: hardcoded) |

## Standalone Icons (128px, no responsive breakpoint)

| Icon | Title | Page / Section | Source |
|------|-------|----------------|--------|
| `icon-upcoming-events.svg` | Upcoming Events | Events — section header | hardcoded |
| `icon-uxhicon.svg` | Conference | Events — Conference section | hardcoded |
| `icon-shopping.svg` | Shopping | Merch — "Coming soon" section | hardcoded |
| `icon-collaborate.svg` | Collaborate | Get Involved — "Ready to collaborate?" | hardcoded |
| `icon-donate.svg` | Donate | Get Involved — Donations section | hardcoded |
| `icon-directory.svg` | Directory | Find a UX Pro — "Join our directory" | hardcoded |
| `icon-contact.svg` | Contact | About — "Get in touch" / Contact | hardcoded |

## Other Icons

| Icon | Title | Display Size | Page / Section | Source |
|------|-------|-------------|----------------|--------|
| `icon-empty.svg` | Empty state | 96px | Find a UX Pro — no results | hardcoded |

## Sanity-Managed Icons

These icons are uploaded through Sanity Studio and are not hardcoded in source. Format depends on what the editor uploads.

| Content Type | Studio Section | Page | Field |
|---|---|---|---|
| Values | Values | `/about` (mission section) | `icon` |
| Committees | Committees | `/get-involved` (committee cards) | `icon` |

## Notes

- All icons live in `/web/public/images/icons/`
- All hardcoded icons are now SVG — no PNGs remain in source references
- SpotIllustrationCard renders Sanity images at 192x192px (2x for retina)
- Sanity-sourced icons (committees, values) all have matching hardcoded SVG fallbacks
- Sanity's image pipeline does not process SVGs — see SVG support notes below

## SVG Support Status

- **Hardcoded (`imageSrc`)**: SVG works — Next.js `<Image>` handles SVGs natively
- **Sanity (`image` field)**: SVG does NOT work — Sanity's image CDN doesn't process SVGs, so `@sanity/image-url` transformations fail
