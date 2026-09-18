---
category: Components
---

SponsorsGrid from web. Use via `window.UXHICon2026.SponsorsGrid` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Tiers

```jsx
() => (
  <SponsorsGrid
    sponsors={[
      { ...HTDC, description: "A state agency accelerating Hawaiʻi's tech industry." },
      { ...SANDBOX, description: "Hawaiʻi's front door to creativity and technology." },
      {
        ...ANTHOLOGY,
        description:
          "A Honolulu-based integrated marketing firm offering advertising, public relations, and digital marketing.",
      },
      {
        ...CHRIS_OTA,
        description:
          "A Hawaiʻi-raised designer in San Francisco and a champion of the islands' design and tech ʻohana.",
      },
    ]}
  />
);

/**
 * Why the card normalises logos rather than trusting the asset. These four sit
 * in one row on the live site: a 10:1 wordmark, a 2.3:1 stacked lockup that
 * earns the taller 48px box, a logo Sanity scales up by 1.38, and an untouched
 * 3.3:1. Every one lands inside the same 140×48 envelope. (Near-square
 * badges under 1.6:1 get a 64px box instead, so they don't read as specks.)
 */
```

### LogoNormalisation

```jsx
() => (
  <SponsorsGrid
    sponsors={[
      { ...CHRIS_OTA, tier: "silver" },
      { ...ANTHOLOGY, tier: "silver" },
      PURPLE_MAIA,
      ZIPPYS,
    ]}
  />
);

/**
 * A sponsor confirmed before their logo arrives. The card drops the logo box
 * and sets the name as the mark, so the tier row keeps its rhythm instead of
 * showing a hole.
 */
```

### LogoPending

```jsx
() => (
  <SponsorsGrid
    sponsors={[
      HTDC,
      {
        _id: "pending",
        name: "Hidden Gears",
        tier: "platinum",
        url: "https://www.hiddengears.com/",
        description:
          "A Honolulu-based Shopify agency helping brands grow through ecommerce strategy, design, development, and AI.",
      },
    ]}
  />
)
```
