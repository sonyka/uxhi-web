# Behold.so Instagram Feed Setup

Replace the manually-curated Sanity Instagram feed with an auto-updating feed via Behold.so (free tier).

## Why Behold

- Free tier: no view cap, unlimited posts, auto-refresh every few hours
- Native React component (`@behold/react`) — ~20KB, no iframe/script injection
- Works with personal Instagram accounts (no Business account or Facebook Page required)
- Handles Instagram token refresh automatically (tokens expire every 60 days)
- Small "Powered by Behold" text link (acceptable branding)

## Step 1: Create Behold Account + Feed (Manual)

1. Go to [behold.so](https://behold.so) and sign up (free)
2. Connect the **@uxhicommunity** Instagram account
3. Create a new feed — configure layout, columns, hover effects in their dashboard
4. Copy the **Feed ID** (you'll need this for the code)

## Step 2: Install Package

```bash
cd web
npm install @behold/react
```

## Step 3: Replace InstagramFeed Component

Replace `src/components/sections/InstagramFeed.tsx` with:

```tsx
import { BeholdWidget } from '@behold/react';

export function InstagramFeed() {
  return <BeholdWidget feedId="YOUR_FEED_ID_HERE" />;
}
```

Note: The component no longer needs the `posts` prop since Behold fetches its own data.

## Step 4: Update Homepage

In `src/app/(site)/page.tsx`, the Instagram feed section (~line 362-374) currently passes Sanity posts:

```tsx
<InstagramFeed posts={instagramPosts || []} />
```

Change to:

```tsx
<InstagramFeed />
```

Also remove the `instagramPosts` fetch from the page's data loading (the `INSTAGRAM_POSTS_QUERY` call).

## Step 5: Clean Up (Optional)

These files are no longer needed and can be removed:

- `src/sanity/schemaTypes/documents/instagramPost.ts` — Sanity schema for manual posts
- `src/app/api/instagram/route.ts` — Unused Instagram Graph API route
- `src/sanity/lib/queries.ts` — Remove `INSTAGRAM_POSTS_QUERY`
- `src/sanity/structure.ts` — Remove Instagram Feed from Studio sidebar (~line 31)
- `/public/images/instagram/` — Fallback placeholder images

Also remove `instagramPost` from the Sanity schema type array (likely in `src/sanity/schemaTypes/index.ts`).

## Step 6: Verify

```bash
cd web
npm run build
```

Build should pass. Check `localhost:3000` to confirm the feed renders.

## Notes

- Behold free tier refreshes every few hours (not instant)
- Layout/styling is configured in the Behold dashboard, not in code
- If you ever need faster refresh or multiple feeds, Behold Starter is $6/month (one-time branding removal)
- Alternative fallback: LightWidget (iframe-based, one-time $10 for Pro)
