---
category: Components
---

PastConferencesMenu from web. Use via `window.UXHICon2026.PastConferencesMenu` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Resting

```jsx
() => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: "20px 24px",
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
    }}
  >
    <PastConferencesMenu />
  </div>
);

/**
 * Open. The panel pops upward — it hangs off a footer at the bottom of the
 * window — so the cell leaves room above the trigger rather than below it.
 */
```

### OpenUpward

```jsx
() => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: "180px 24px 20px",
      borderRadius: 12,
      display: "flex",
      alignItems: "flex-end",
    }}
  >
    <Opened>
      <PastConferencesMenu />
    </Opened>
  </div>
);

/**
 * Where it actually sits: first in the footer's link row, beside the two plain
 * links, all three at the same `ui` size and grey.
 */
```

### InTheFooterRow

```jsx
() => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: "180px 24px 20px",
      borderRadius: 12,
    }}
  >
    <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <Opened>
        <PastConferencesMenu />
      </Opened>
      <a
        href="https://uxhi.community"
        style={{
          color: "var(--color-gray-110)",
          font: "500 16px/1 var(--font-bricolage), sans-serif",
          textDecoration: "none",
        }}
      >
        UXHI
      </a>
      <a
        href="mailto:uxhiconference@gmail.com"
        style={{
          color: "var(--color-gray-110)",
          font: "500 16px/1 var(--font-bricolage), sans-serif",
          textDecoration: "none",
        }}
      >
        Email us
      </a>
    </nav>
  </div>
)
```
