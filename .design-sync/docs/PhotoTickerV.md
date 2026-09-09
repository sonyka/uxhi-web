---
category: Components
---

PhotoTickerV from web. Use via `window.UXHICon2026.PhotoTickerV` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### SidebarRail

```jsx
() => (
  <div
    className="ds-ticker-v"
    style={{ position: "relative", height: 460, width: 180, background: "#fff" }}
  >
    <style>{tint}</style>
    <PhotoTickerV />
  </div>
);

/**
 * In the full-width rail it really occupies, with the co-chair-side content
 * beside it. The ticker holds its own column and the copy never reflows around
 * it, which is the whole reason it is absolutely positioned.
 */
```

### InSidebar

```jsx
() => (
  <div
    className="ds-ticker-v"
    style={{
      position: "relative",
      height: 460,
      width: 420,
      background: "#fff",
      borderRadius: 16,
      overflow: "hidden",
    }}
  >
    <style>{tint}</style>
    <PhotoTickerV />
    <div
      style={{
        position: "absolute",
        left: 24,
        bottom: 24,
        width: 196,
        color: "var(--color-gray-110)",
        fontSize: 15,
        lineHeight: 1.5,
      }}
    >
      October 17, 2026 · Entrepreneurs Sandbox, Honolulu
    </div>
  </div>
)
```
