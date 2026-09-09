---
category: Icons
---

CursorClickIcon from web. Use via `window.UXHICon2026.CursorClickIcon` (bundle loaded from the root `_ds_bundle.js`).

Mobile menu trigger

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <CursorClickIcon />
    <CursorClickIcon size={24} />
    <CursorClickIcon size={32} />
    <CursorClickIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: the mobile menu trigger.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <CursorClickIcon size={24} /> Menu
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <CursorClickIcon size={24} /> Menu
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
      <CursorClickIcon size={24} /> Menu
    </span>
  </div>
)
```
