---
category: Icons
---

GlobeIcon from web. Use via `window.UXHICon2026.GlobeIcon` (bundle loaded from the root `_ds_bundle.js`).

Website links, for speakers that are organizations rather than people

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <GlobeIcon />
    <GlobeIcon size={24} />
    <GlobeIcon size={32} />
    <GlobeIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: a website link, for a speaker that is an organisation rather than a person.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <GlobeIcon size={24} /> Piʻikū Co.
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <GlobeIcon size={24} /> Piʻikū Co.
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
      <GlobeIcon size={24} /> Piʻikū Co.
    </span>
  </div>
)
```
