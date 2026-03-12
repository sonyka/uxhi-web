# UXHI Website Handoff Guide

A guide for team members taking over content updates for the UXHI website. This site is built with Next.js + Sanity CMS and deployed on Vercel. All tools used are free tier.

**Your role**: Update site content — both CMS-managed content (via Sanity Studio in the browser) and static copy (via code). Design changes (colors, layout, components, spacing, typography) are handled by the project designer and should be routed back to them.

---

## Accounts & Access (All Free Tier)

You'll need access to three services:

### GitHub (code repository)
- The project owner will add you as a **collaborator** on the `uxhi-web` repo
- Accept the invite, then clone the repo (setup instructions below)
- Free plan — no limits for this project

### Sanity (content management system)
- The project owner will invite you to the Sanity project
- You'll get an **Editor** role — full access to create, edit, and publish content
- Free plan (500K API requests/month, 10GB bandwidth)
- Access the CMS at `uxhi.hisony.com/studio` or `localhost:3000/studio` when running locally

### Vercel (hosting & deployment)
- Deployment is automatic — every push to `main` on GitHub triggers a deploy
- The project owner manages the Vercel account
- You don't need a Vercel account unless you want to monitor builds

### Claude Code (AI assistant)
- Get your own account at [claude.ai/claude-code](https://claude.com/product/claude-code)
- Claude understands this entire project via the `CLAUDE.md` file in the repo
- Use it for making copy changes, creating Sanity content, and troubleshooting

---

## Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)
- A code editor ([VS Code](https://code.visualstudio.com/) recommended, or use Claude Code directly)

### First-Time Setup

```bash
# 1. Clone the repo
git clone git@github.com:sonyka/uxhi-web.git
cd uxhi-web/web

# 2. Install dependencies
npm install

# 3. Set up environment variables
# The project owner will share a .env.local file with you securely.
# Place it at: uxhi-web/web/.env.local

# 4. Start the dev server
npm run dev
```

### Key URLs (when running locally)
- **http://localhost:3000** — the website
- **http://localhost:3000/studio** — Sanity Studio (content editor)
- **http://localhost:3000/design-system** — design system reference (see below)

### Design System
The site has a living design system page at `/design-system` that documents every reusable component, color, typography style, and UI pattern used across the site. Think of it as the project's visual dictionary — it shows exactly how buttons, cards, forms, navigation, and other elements look and behave.

**This page is maintained by the project designer.** You don't need to edit it, but it's a useful reference if you want to understand what components exist or how the site's visual language works. If you're ever unsure what a section or element is called, check here first.

---

## Environment Variables

The project owner will share a `.env.local` file containing:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | Which dataset to use (`production`) |
| `SANITY_API_READ_TOKEN` | Enables draft preview in Studio |
| `SANITY_API_WRITE_TOKEN` | Allows form submissions to save to Sanity |
| `SLACK_WEBHOOK_URL` | Sends form submission notifications to Slack |
| `INSTAGRAM_ACCESS_TOKEN` | Pulls Instagram feed on homepage (optional) |

**Do not commit `.env.local` to Git or share these values publicly.**

---

## Content You Edit in Sanity Studio (No Code Needed)

This is the primary way you'll update content. Go to `/studio` and you'll see these sections:

| Studio Section | What It Controls | Site Page |
|---|---|---|
| **Team** | Team member cards (name, photo, bio, role, category, social links) | `/about#team` |
| **Values** | Mission values with icons | `/about` |
| **About FAQs** | FAQ accordion items | `/about#faqs` |
| **Events** | Upcoming events list | `/events` |
| **Products** | Merch catalog (name, price, images, purchase URL) | `/merch` |
| **Partners** | Partner logos & links | `/get-involved` |
| **Sponsors** | Sponsor logos & links | `/get-involved` |
| **Committees** | Committee names & descriptions | `/get-involved` |
| **Resources** | Resource categories + individual items | `/resources` |
| **State of UX Reports** | Annual report cards | `/resources` |
| **Tech Organizations** | Local tech org directory | `/resources` |
| **Member Directory** | UX professional profiles | `/find-ux-pro` |
| **Join FAQs** | Membership FAQ accordion items | `/join` |
| **Instagram Posts** | Homepage feed photos | `/` |
| **Community Photos** | Homepage community photo grid | `/` |
| **Submissions** | Contact form entries (view only) | — |
| **Membership Applications** | Membership form entries (view only) | — |

### Sanity Workflow
1. Open Studio (`/studio`)
2. Find the content type in the left sidebar
3. Edit fields
4. Click **Publish**
5. The live site updates within seconds (Vercel) or refresh locally

### Adding New Content
- Click the **+** button or "Create new" in any content section
- Fill in required fields (marked with a red asterisk)
- Publish when ready — or leave as draft to come back later

### Spot Illustration Icons (Design-Managed)
- The **Icon** field on **Values** and **Committees** is managed by the project designer
- **Do not update or replace icons** without consulting the designer first
- If uploading a new icon: minimum **192×192px**, **PNG only** (SVG is not supported by Sanity's image pipeline)

### Team Members (Special Notes)
- The **Category** dropdown controls which group a member appears under on `/about#team`
- Options: Founder, Community & Events, Annual Conference, Professional Development, Communication & Outreach, Standards & Credentialing, Research & Industry Partnerships
- Members without a category appear in a generic "Team" group
- The **Order** field (lower = first) controls sort order within each group
- Members with no photo will show their initials as a fallback

---

## Content You Edit in Code (Static Copy)

Some text lives directly in page files rather than in Sanity. To change this copy, you'll edit the source code.

### Where Static Copy Lives

All pages are in `web/src/app/(site)/`:

| File | What Copy You Can Change |
|---|---|
| `page.tsx` | Homepage hero headline, description, section headings |
| `about/page.tsx` | "About Us" hero headline & description, section intro text |
| `join/page.tsx` | Membership page headline, benefits list, pricing copy |
| `events/page.tsx` | Events page headline & description |
| `find-ux-pro/page.tsx` | Directory page headline & description |
| `get-involved/page.tsx` | Get Involved page headline, partner/sponsor section intros |
| `resources/page.tsx` | Resources page headline & description |
| `merch/page.tsx` | Shop page headline |
| `volunteer/page.tsx` | Volunteer page copy, embedded Google Form URL |

### Navigation & Footer Copy
- **Nav menu items & links**: `web/src/components/layout/Navbar.tsx`
- **Footer links & columns**: `web/src/components/layout/Footer.tsx`

### How to Make a Copy Change

```bash
# 1. Open the file and find the text to change
# 2. Edit the text (just the words inside quotes — don't change HTML tags, classNames, or component structure)
# 3. Verify locally
npm run dev    # check it looks right at localhost:3000

# 4. Build check
npm run build  # make sure nothing broke

# 5. Commit and push
git add <file>
git commit -m "Update about page hero description"
git push

# Vercel auto-deploys from the main branch
```

### What NOT to Change
These are design decisions managed by the project designer. If something in this list needs updating, route it back to them:

- **CSS classes** — anything with `className=`
- **Component files** in `web/src/components/ui/` or `web/src/components/sections/`
- **Design tokens** in `web/src/app/globals.css` (colors, fonts, spacing)
- **Design system page** at `web/src/app/(site)/design-system/page.tsx`
- **Layout structure** — adding/removing/reordering sections, changing grid columns, modifying spacing
- **Animations** in `web/src/lib/animations.ts`
- **Form field structure** or validation rules (adding/removing fields, changing validation)

**Rule of thumb**: If you're only changing the words between quotes, you're good. If you're changing anything else (tags, classes, structure, imports), check with the designer first.

---

## Using Claude Code

Claude Code is an AI assistant that understands this entire project. It's the fastest way to make changes.

### Setup
```bash
# Install Claude Code (one time)
npm install -g @anthropic-ai/claude-code

# Start Claude from the project root
cd uxhi-web
claude
```

Claude reads the `CLAUDE.md` file automatically and knows the project structure, conventions, and all available tools.

### Example Tasks You Can Ask Claude

**Updating static copy:**
```
> "Change the About page hero description to 'Hawaii's premier UX community since 2023'"
> "Update the footer copyright year to 2026"
> "Change the Events page headline to 'What's Coming Up'"
```

**Managing Sanity content:**
```
> "Add a new FAQ to the about page: question is 'How do I join?' and answer is 'Visit our join page'"
> "Create a new event called 'UX Meetup' on April 15, 2026 at WeWork Honolulu"
> "Update the TBD board members in the Annual Conference committee with real names"
> "Add a new partner called 'Design Co' with website https://design.co"
```

**Finding content to edit:**
```
> "Where is the homepage hero headline defined?"
> "Show me all the static text on the join page"
> "What Sanity schema fields does the events type have?"
```

**Checking things:**
```
> "Run a build to make sure everything compiles"
> "What pages will be affected if I change the nav links?"
```

### Tips for Working with Claude
- Be specific about what text you want changed and what to change it to
- Claude will run `npm run build` to verify changes compile cleanly
- Claude can commit and push for you: `> "commit and push this change"`
- If Claude suggests design-related changes (styling, layout, components), tell it to only change the copy

---

## Day-to-Day Workflow

### Making Content Updates (Most Common)

**For CMS content (team bios, events, FAQs, etc.):**
1. Go to `yoursite.com/studio` (or `localhost:3000/studio`)
2. Edit content
3. Click Publish
4. Done — site updates automatically

**For static copy (headlines, descriptions, nav items):**
1. Open Claude Code: `cd uxhi-web && claude`
2. Tell Claude what to change: `"Update the events page headline to 'Upcoming Events'"`
3. Claude makes the change, runs a build check, commits, and pushes
4. Vercel auto-deploys

### Useful Commands Reference

```bash
npm run dev       # Start local dev server
npm run build     # Check for build errors before pushing
git push          # Deploy to production (auto via Vercel)
```

---

## Sanity Schema Changes

If you need to add a new field to an existing content type (e.g., add a "subtitle" field to events), this involves code changes to the schema. Use Claude for this:

```
> "Add a subtitle text field to the events schema"
```

Claude will:
1. Update the schema file in `web/src/sanity/schemaTypes/documents/`
2. Update the GROQ query in `web/src/sanity/lib/queries.ts`
3. Deploy the schema: `npx sanity@latest schema deploy`
4. Run `npm run build` to verify

**Note:** Adding a field to the schema doesn't automatically display it on the site. If you need the new field to appear somewhere on a page, that's a design/layout change — coordinate with the project designer.

---

## Form Submissions

Three forms exist on the site. They work automatically — no maintenance needed:

| Form | Page | Where Submissions Go |
|---|---|---|
| Contact Inquiry | `/about#contact` | Sanity "Submissions" + Slack notification |
| Membership Application | `/join` | Sanity "Membership Applications" + Slack notification |
| Directory Submission | `/find-ux-pro` | Sanity "Member Directory" (as draft) + Slack notification |

- View submissions in Sanity Studio
- Directory submissions are created as **drafts** — review and publish them to make profiles appear in the directory
- If Slack notifications stop working, the forms still save to Sanity

---

## Free Tier Limits

| Service | Limit | How to Check |
|---|---|---|
| **Sanity** | 500K API requests/mo, 10GB bandwidth | [sanity.io/manage](https://sanity.io/manage) > Usage |
| **Vercel** | 100GB bandwidth, 1000 build mins/mo | Vercel dashboard > Usage |
| **GitHub** | Unlimited for this use case | No concerns |

These limits are generous for a site of this size. You're unlikely to hit them unless there's a traffic spike.

---

## Instagram Feed

The homepage pulls from Instagram. The access token expires every **60 days**.

**If the feed goes blank:**
1. The token likely expired
2. Contact the project owner to refresh it in the Meta Developer Console
3. The updated token goes in `.env.local` and Vercel environment variables

This is not critical — the homepage works fine without it (feed section just won't show).

---

## Troubleshooting

### "npm run build" fails
- Read the error message — it usually points to the exact file and line
- Ask Claude: `"The build is failing with this error: [paste error]"`
- Most common cause: a typo in JSX (missing closing tag, unclosed quote)

### Changes not showing on the live site
- Verify you pushed to `main`: `git log --oneline -1` should show your commit
- Check Vercel dashboard for deployment status
- For Sanity content: make sure you clicked **Publish** (not just saved as draft)

### Sanity Studio won't load locally
- Make sure `.env.local` exists with valid tokens
- Run `npm run dev` from the `web/` directory (not the repo root)

### "Permission denied" on git push
- Make sure you've been added as a collaborator on the GitHub repo
- Verify your SSH key is set up: `ssh -T git@github.com`

---

## Questions or Design Requests?

- **Copy changes**: Go ahead and make them (Sanity Studio or via Claude)
- **Design changes** (colors, layout, components, spacing, new sections): Route to the project designer
- **New features or pages**: Discuss with the project designer first
- **Something broke**: Ask Claude to diagnose, or reach out to the project designer
