---
category: Icons
---

ArrowRightIcon from web. Use via `window.UXHICon2026.ArrowRightIcon` (bundle loaded from the root `_ds_bundle.js`).

Trailing arrow on "go here" links

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <ArrowRightIcon />
    <ArrowRightIcon size={24} />
    <ArrowRightIcon size={32} />
    <ArrowRightIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: a trailing arrow on a “go here” link.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <ArrowRightIcon size={24} /> See the agenda
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <ArrowRightIcon size={24} /> See the agenda
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
      <ArrowRightIcon size={24} /> See the agenda
    </span>
  </div>
)
```
