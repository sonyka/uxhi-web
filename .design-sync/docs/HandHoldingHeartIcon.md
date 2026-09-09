---
category: Icons
---

HandHoldingHeartIcon from web. Use via `window.UXHICon2026.HandHoldingHeartIcon` (bundle loaded from the root `_ds_bundle.js`).

Sponsorship CTA

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <HandHoldingHeartIcon />
    <HandHoldingHeartIcon size={24} />
    <HandHoldingHeartIcon size={32} />
    <HandHoldingHeartIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: the sponsorship call to action.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <HandHoldingHeartIcon size={24} /> Become a sponsor
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <HandHoldingHeartIcon size={24} /> Become a sponsor
    </span>
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "var(--color-teal-60)",
        background: "var(--color-purple-140)",
        padding: "10px 14px",
        borderRadius: 999,
        alignSelf: "flex-start",
      }}
    >
      <HandHoldingHeartIcon size={24} /> Become a sponsor
    </span>
  </div>
)
```
