# Member Directory Migration Plan

## Overview

Migrate the UXHI Member Directory from Notion to a native implementation on `/find-ux-pro`, powered by Sanity CMS.

**Current state:** Notion database + Aidaform embed
**Target state:** Native directory with filters, Sanity-powered, self-service submissions

---

## Sanity Free Plan Verdict: ✅ Yes, This Works

With ~100 members, you're well within the **10,000 document limit** on the free plan.

| Resource | Usage | Limit |
|----------|-------|-------|
| Member documents | ~100-150 | 10,000 |
| Specialty documents | ~10 | — |
| YOE range documents | ~5 | — |
| **Total** | **<200** | **10,000** |

You'd need to upgrade to Growth ($99/mo) only if you exceed 10k documents or need multiple datasets.

---

## Phase 1: Schema & Data Migration (v1)

### 1.1 Create Sanity Schema

**New document type: `member`**

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Required |
| `slug` | slug | Auto-generated from name |
| `headshot` | image | Optional, with hotspot |
| `email` | string | Hidden from public, for admin use |
| `linkedIn` | url | Optional |
| `portfolio` | url | Optional |
| `specialty` | array of references | → `specialty` document |
| `yearsOfExperience` | reference | → `yoeRange` document |
| `island` | string | O'ahu, Maui, Big Island, Kaua'i, Remote, etc. |
| `bio` | text | Short description |
| `openToWork` | boolean | Show "Open to Work" badge |
| `isPublished` | boolean | Admin toggle to show on site |
| `submittedAt` | datetime | Auto-set on form submission |
| `approvedAt` | datetime | Set when admin publishes |

**Supporting document: `specialty`**

| Field | Type |
|-------|------|
| `title` | string |
| `slug` | slug |

Example values:
- UX Research
- UI Design
- Product Design
- UX Writing
- Interaction Design
- Service Design
- UX Strategy

**Supporting document: `yoeRange`**

| Field | Type |
|-------|------|
| `label` | string |
| `sortOrder` | number |

Example values:
- 0-2 years (Student/Entry)
- 3-5 years (Mid-level)
- 6-10 years (Senior)
- 10+ years (Lead/Principal)

### 1.2 Data Migration

1. Export Notion database to CSV
2. Clean/normalize data (specialty names, YOE ranges)
3. Write migration script using Sanity CLI or API
4. Bulk import members with `isPublished: true`
5. Manual review pass for headshots and data quality

### 1.3 Build Directory UI

**Components needed:**

| Component | Purpose |
|-----------|---------|
| `MemberCard` | Display headshot, name, specialty badges, YOE, open-to-work badge |
| `MemberFilters` | Client-side filter controls |
| `MemberGrid` | Responsive grid layout |
| `OpenToWorkBadge` | Visual indicator for job seekers |

**Filter options:**

- **Specialty** — Multi-select checkboxes or pills
- **Years of Experience** — Single-select dropdown or pills
- **Open to Work** — Toggle switch
- **Search** — Text input to filter by name (optional)

**UI Reference:** [CreativeMornings Directory](https://creativemornings.com/individuals)

---

## Phase 2: Submission Flow (v1)

### 2.1 Replace Aidaform with Native Form

Build a form component on `/find-ux-pro` that:

1. Collects member information (name, email, LinkedIn, portfolio, specialty, YOE, island, bio, open to work)
2. Validates required fields
3. Submits to Sanity as **draft** document (`isPublished: false`)
4. Shows success message with "pending review" notice
5. (Optional) Sends email notification to admin via webhook

**Spam protection options:**
- Honeypot field
- reCAPTCHA v3
- Rate limiting

### 2.2 Admin Workflow in Sanity Studio

1. Create custom desk structure: "Pending Members" view
2. Filter shows documents where `isPublished === false`
3. Admin reviews submission, uploads/crops headshot
4. Toggle `isPublished: true` to make visible on site
5. `approvedAt` timestamp auto-sets on publish

---

## Phase 3: Self-Service Edits (v2)

### 3.1 Edit Request Flow

1. Member visits `/find-ux-pro/edit` (or modal on main page)
2. Enters email address associated with their profile
3. System sends magic link or verification code
4. Member clicks link → lands on pre-filled edit form
5. Submits changes → goes back to `isPublished: false` for review
6. Admin reviews and re-publishes

### 3.2 Removal Request Flow

1. Member submits removal request form (email + reason)
2. Admin receives notification
3. Admin unpublishes/deletes the profile

---

## Estimated Effort

| Phase | Task | Effort |
|-------|------|--------|
| **1.1** | Create Sanity schemas | 2-3 hrs |
| **1.2** | Data migration (export, clean, import) | 3-4 hrs |
| **1.3** | Directory UI (cards, grid, filters) | 6-8 hrs |
| **2.1** | Native submission form | 3-4 hrs |
| **2.2** | Admin workflow in Studio | 2-3 hrs |
| **3.1** | Self-service edit flow | 3-4 hrs |
| **3.2** | Removal request flow | 1-2 hrs |

| Milestone | Total |
|-----------|-------|
| **v1 Complete** | 16-22 hrs |
| **v2 Complete** | 24-30 hrs |

---

## Technical Considerations

### Performance
- With ~100 members, fetch all published members at build/request time
- Client-side filtering (no server round-trips needed)
- Consider ISR (Incremental Static Regeneration) for fast loads

### Images
- Use Sanity's image CDN with `@sanity/image-url`
- Responsive srcset for headshots
- Lazy loading for below-fold cards

### SEO
- Add JSON-LD structured data (Person schema)
- Meta tags for directory page
- Consider individual member pages in future (v3?)

### Accessibility
- Keyboard-navigable filters
- Screen reader announcements for filter changes
- Alt text for headshots

---

## Questions Before Starting

1. **Data fields** — Can you share the exact Notion columns/fields?
2. **Search** — Do you want members searchable by name?
3. **Open to Work** — Badge style preference? (green dot, pill, banner?)
4. **Card layout** — Grid with photos? List view option?
5. **Islands** — Full list of island/location options?
6. **Headshots** — Are existing headshots stored in Notion or elsewhere?

---

## References

- [Sanity Pricing](https://www.sanity.io/pricing)
- [Sanity Plans & Payments Docs](https://www.sanity.io/docs/platform-management/plans-and-payments)
- [Sanity Technical Limits](https://www.sanity.io/docs/content-lake/technical-limits)
- [CreativeMornings Directory](https://creativemornings.com/individuals) (UI reference)
