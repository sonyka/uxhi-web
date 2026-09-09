---
category: Icons
---

BrowserIcon from web. Use via `window.UXHICon2026.BrowserIcon` (bundle loaded from the root `_ds_bundle.js`).

Browser window — portfolio reviews.

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <BrowserIcon />
    <BrowserIcon size={24} />
    <BrowserIcon size={32} />
    <BrowserIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: portfolio reviews in the side programme.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <BrowserIcon size={24} /> Portfolio reviews
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <BrowserIcon size={24} /> Portfolio reviews
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
      <BrowserIcon size={24} /> Portfolio reviews
    </span>
  </div>
)
```
