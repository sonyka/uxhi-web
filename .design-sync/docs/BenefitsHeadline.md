---
category: Components
---

BenefitsHeadline from web. Use via `window.UXHICon2026.BenefitsHeadline` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### OnTheBeigeGround

```jsx
() => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: 32,
      borderRadius: 16,
      width: 840,
    }}
  >
    <BenefitsHeadline />
  </div>
);

/**
 * Where the page puts it: the lead-in between the co-chairs and the venue,
 * capped at 75% of the column so the last line lands short of the section
 * title that follows.
 */
```

### AsSectionLeadIn

```jsx
() => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: 32,
      borderRadius: 16,
      width: 840,
      display: "flex",
      flexDirection: "column",
      gap: 24,
    }}
  >
    <BenefitsHeadline />
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p
        style={{
          margin: 0,
          color: "var(--color-teal-90)",
          font: "700 13px/1 var(--font-bricolage), sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Saturday, October 17, 2026
      </p>
      <p style={{ margin: 0, font: "600 26px/1.3 var(--font-bricolage), sans-serif", color: "var(--color-gray-120)" }}>
        The Venue: Entrepreneurs Sandbox
      </p>
    </div>
  </div>
)
```
