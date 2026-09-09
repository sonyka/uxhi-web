---
category: Components
---

PhotoTickerH from web. Use via `window.UXHICon2026.PhotoTickerH` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### MobileStrip

```jsx
() => (
  <div className="ds-ticker-h" style={{ background: "var(--color-beige-30)", padding: 16, borderRadius: 12 }}>
    <style>{tint}</style>
    <PhotoTickerH />
  </div>
);

/**
 * On white, which is the ground the component is actually built for — its
 * edge fades are white→transparent, so they only disappear correctly here.
 * On the beige card above you can see the fade as a pale wash at each end.
 */
```

### OnWhite

```jsx
() => (
  <div className="ds-ticker-h" style={{ background: "#fff", padding: 16 }}>
    <style>{tint}</style>
    <PhotoTickerH />
  </div>
)
```
