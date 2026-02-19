# Luma Events Integration Options (Without Luma Plus)

The UXHI site needs to display Luma events on the `/events` page. The official Luma API and Zapier integration both require a **Luma Plus subscription (~$30/mo)**. Below are the available options that do not require Luma Plus.

---

## Option 1: Manual Entry in Sanity CMS

Enter event data directly in Sanity Studio. The `event` schema already exists with fields for title, date, time, location, description, and URL.

- **Automation:** None — events must be entered manually when created on Luma
- **Custom UI:** Full control, matches UXHI design system
- **Cost:** Free
- **Maintenance:** Ongoing manual data entry
- **Risk:** Low

---

## Option 2: Luma Checkout Widget + Sanity

Manage event data in Sanity, but embed Luma's free checkout/register button on each event card. Adds a `lumaEventId` field to the Sanity event schema so visitors can register via Luma without leaving the site.

```html
<script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />

<button
  data-luma-action="checkout"
  data-luma-event-id="evt-YOUR-EVENT-ID"
>
  Register
</button>
```

- **Automation:** None for event data — registration is handled by Luma widget
- **Custom UI:** Full control over event cards; registration modal is Luma-styled
- **Cost:** Free
- **Maintenance:** Manual event entry in Sanity + copying Luma event IDs
- **Risk:** Low

---

## Option 3: Luma iframe Embed

Embed Luma's public calendar widget via iframe. This is what the site currently uses (but the embed URL is broken).

```html
<iframe
  src="https://lu.ma/embed/calendar/CALENDAR_ID/events?lt=light"
  width="100%"
  height="700"
/>
```

- **Automation:** Full — Luma handles all event data
- **Custom UI:** None — stuck with Luma's styling inside the iframe
- **Cost:** Free
- **Maintenance:** Low, but calendar ID may change
- **Risk:** Medium — no design control, responsive behavior is unpredictable, currently broken (calendar ID `cal-gT2HhpGHlTpnIvZ` needs to be verified in Luma dashboard)

---

## Option 4: Scrape Public Luma Page

Use a third-party scraper (e.g., Apify's Luma scraper) or build a custom scraper against `lu.ma/user/uxhi` to pull public event data on a cron schedule.

- **Automation:** Full
- **Custom UI:** Full control
- **Cost:** Free (self-hosted) or Apify usage fees
- **Maintenance:** High — scraper can break when Luma changes their markup
- **Risk:** High — fragile, may violate Luma ToS

---

## Option 5: Switch Event Platform

Move off Luma to a platform with a free public API or feed. Alternatives include:

- **Eventbrite** — free API for public events
- **Meetup** — GraphQL API available
- **Google Calendar** — free public iCal/.ics feed, easy to parse server-side

- **Automation:** Full
- **Custom UI:** Full control
- **Cost:** Free (depending on platform)
- **Maintenance:** Low once built
- **Risk:** Requires migrating away from Luma

---

## Recommendation

If staying on Luma and avoiding manual work are both priorities, **Luma Plus (~$30/mo)** is the most reliable path. It unlocks the REST API for fully automated, custom-UI integration built once with no ongoing maintenance.

Without Luma Plus, every option involves a trade-off between manual effort, design control, and reliability.

| Option | Automated? | Custom UI? | Free? | Reliable? |
|--------|-----------|------------|-------|-----------|
| Sanity manual entry | No | Yes | Yes | Yes |
| Checkout widget + Sanity | No | Mostly | Yes | Yes |
| iframe embed | Yes | No | Yes | Medium |
| Scraping | Yes | Yes | Yes | No |
| Switch platform | Yes | Yes | Yes | Yes |
| **Luma Plus API** | **Yes** | **Yes** | **No (~$30/mo)** | **Yes** |
