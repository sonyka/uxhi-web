---
category: Icons
---

CameraIcon from web. Use via `window.UXHICon2026.CameraIcon` (bundle loaded from the root `_ds_bundle.js`).

Camera — professional headshots.

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--color-gray-110)" }}>
    <CameraIcon />
    <CameraIcon size={24} />
    <CameraIcon size={32} />
    <CameraIcon size={48} />
  </div>
);

/**
 * Paints with currentColor, so it takes the colour of whatever it sits beside.
 * In use: professional headshots in the side programme.
 */
```

### InheritsColour

```jsx
() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, font: "600 15px/1 var(--font-bricolage), sans-serif" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-purple-140)" }}>
      <CameraIcon size={24} /> Headshots
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-gray-100)" }}>
      <CameraIcon size={24} /> Headshots
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
      <CameraIcon size={24} /> Headshots
    </span>
  </div>
)
```
