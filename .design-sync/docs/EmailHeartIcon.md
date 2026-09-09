---
category: Icons
---

EmailHeartIcon from web. Use via `window.UXHICon2026.EmailHeartIcon` (bundle loaded from the root `_ds_bundle.js`).

Email us link

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <EmailHeartIcon />
    <EmailHeartIcon size={24} />
    <EmailHeartIcon size={32} />
    <EmailHeartIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: the email us link.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <EmailHeartIcon size={24} /> Email us
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <EmailHeartIcon size={24} /> Email us
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
      <EmailHeartIcon size={24} /> Email us
    </span>
  </div>
)
```
