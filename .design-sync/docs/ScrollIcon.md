---
category: Icons
---

ScrollIcon from web. Use via `window.UXHICon2026.ScrollIcon` (bundle loaded from the root `_ds_bundle.js`).

Rolled scroll — the printing activity.

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <ScrollIcon />
    <ScrollIcon size={24} />
    <ScrollIcon size={32} />
    <ScrollIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: the printing activity in the side programme.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <ScrollIcon size={24} /> Riso printing
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <ScrollIcon size={24} /> Riso printing
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
      <ScrollIcon size={24} /> Riso printing
    </span>
  </div>
)
```
