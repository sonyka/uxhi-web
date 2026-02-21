# Stripe Payment Options for /shop

## Option 1: Stripe Payment Links (no-code)

### How it works
Create products and prices in the Stripe Dashboard, then generate a shareable URL for each. The "Buy" button is just an `<a>` tag pointing to that URL. Could store the link in Sanity as a field on each merch item.

### Setup
1. Create products in Stripe Dashboard (name, image, price)
2. Generate a Payment Link for each product
3. Replace "Coming soon" buttons with links

### Pros
- Zero backend code, no API routes
- Stripe handles checkout UI, receipts, tax calculation
- Supports Apple Pay, Google Pay, buy-now-pay-later out of the box
- Can enable shipping address collection, quantity adjustments, and promo codes in the Dashboard
- Good enough for a small catalog (5-15 items)

### Cons
- Product catalog lives in Stripe, not Sanity — two places to manage
- No cart experience — each link is a single product purchase (users can adjust quantity, but can't combine different products in one checkout)
- Limited customization of the checkout page (logo, colors, that's about it)
- Adding/removing products means updating both Stripe Dashboard and Sanity

### Best for
Launching quickly with minimal dev effort. Handful of products, no cart needed.

---

## Option 2: Stripe Checkout (redirect)

### How it works
User clicks "Buy" → Next.js API route creates a Checkout Session with line items → user is redirected to Stripe's hosted checkout → after payment, returns to a success page on the site.

### Setup
1. Install `stripe` npm package
2. Create an API route (`/api/checkout`) that builds a session from product data
3. Store product info in Sanity (name, price, image, Stripe Price ID or build dynamically)
4. Add success/cancel pages

### Product data approaches

| | Pre-created in Stripe | Dynamic line items |
|---|---|---|
| **How** | Create products in Stripe Dashboard, store Price ID in Sanity | Pass name, price, image directly to `line_items` in the session |
| **Pros** | Cleaner Stripe reporting, supports recurring if needed | Single source of truth in Sanity, no Stripe Dashboard management |
| **Cons** | Two places to manage pricing | Products show as "one-time" in Stripe, less structured reporting |

### Cart support
Yes — API route accepts an array of items with quantities and passes them all as `line_items` to a single Checkout Session. Users buy multiple products in one transaction.

### Example API route shape
```
POST /api/checkout
Body: { items: [{ priceId: "price_xxx", quantity: 2 }, ...] }
→ Creates Stripe Checkout Session
→ Returns session URL
→ Frontend redirects user
```

### Pros
- Cart with multiple products in one checkout
- Products managed in Sanity (single source of truth)
- Still no custom payment UI — Stripe handles the checkout page
- Supports shipping, tax, promo codes, Apple/Google Pay
- Webhook support for order fulfillment (Slack notification, email, etc.)

### Cons
- Requires one API route and the `stripe` package
- User leaves site briefly for checkout (branded Stripe page)
- Need to handle success/cancel return pages
- Slightly more setup than Payment Links

### Best for
A proper shop experience with a cart. Scales well if more products are added later.

---

## Comparison

| | Payment Links | Checkout redirect |
|---|---|---|
| Dev effort | ~1 hour | ~half a day |
| Cart | No (one product per checkout) | Yes |
| Product management | Stripe Dashboard + Sanity | Sanity only (or Sanity + Stripe) |
| Customization | Minimal | Moderate |
| Webhooks/fulfillment | Possible but manual | Built-in |
