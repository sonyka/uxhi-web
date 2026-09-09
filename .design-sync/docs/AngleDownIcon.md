---
category: Icons
---

AngleDownIcon from web. Use via `window.UXHICon2026.AngleDownIcon` (bundle loaded from the root `_ds_bundle.js`).

Dropdown chevron

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <AngleDownIcon />
    <AngleDownIcon size={24} />
    <AngleDownIcon size={32} />
    <AngleDownIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: a dropdown chevron.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <AngleDownIcon size={24} /> Past conferences
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <AngleDownIcon size={24} /> Past conferences
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
      <AngleDownIcon size={24} /> Past conferences
    </span>
  </div>
)
```
