---
category: Icons
---

SocialGlyph from web. Use via `window.UXHICon2026.SocialGlyph` (bundle loaded from the root `_ds_bundle.js`).

The mark on its own.

Colour is revealed by `group-hover`, so the hover target is whatever ancestor
carries `group` — the link around it, or the button it sits inside. That is
what lets one glyph serve the footer, the bio drawers and the pill CTAs
without each one restating the behaviour.

## Examples

### ThePair

```jsx
() => (
  <div
    style={{
      display: "flex",
      gap: 40,
      background: "var(--color-beige-30)",
      padding: "24px 32px",
      borderRadius: 12,
      width: "fit-content",
      font: "500 14px/1 var(--font-bricolage), sans-serif",
      color: "var(--color-gray-110)",
    }}
  >
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <SocialGlyph network="instagram" size={24} />
      Instagram
    </span>
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <SocialGlyph network="linkedin" size={24} />
      LinkedIn
    </span>
  </div>
);

/**
 * The three sizes in use: 22 in a bio drawer beside a name, 24 in the footer,
 * 28 where the mark carries a row on its own. One box, one weight, at each.
 */
```

### Sizes

```jsx
() => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      gap: 28,
      background: "var(--color-beige-30)",
      padding: "20px 24px",
      borderRadius: 12,
      width: "fit-content",
      font: "500 13px/1 var(--font-bricolage), sans-serif",
      color: "var(--color-gray-100)",
    }}
  >
    {[22, 24, 28].map((size) => (
      <span key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <SocialGlyph network="instagram" size={size} />
        {size}px
      </span>
    ))}
  </div>
);

/**
 * The reveal belongs to whatever ancestor carries `group`, which is what lets
 * one glyph serve a link, a drawer and a pill CTA without restating the
 * behaviour. Here the pill is the group, so the mark colours with the rest of
 * it on hover.
 */
```

### InsideAGroup

```jsx
() => (
  <span
    className="group"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: "var(--color-teal-90)",
      color: "var(--color-purple-140)",
      padding: "12px 20px",
      borderRadius: 999,
      font: "600 16px/1 var(--font-bricolage), sans-serif",
    }}
  >
    <SocialGlyph network="instagram" size={24} />
    Follow @uxhicommunity
  </span>
)
```
