---
category: Components
---

FaqSection from web. Use via `window.UXHICon2026.FaqSection` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Accordion

```jsx
() => (
  <OnCard>
    <FaqSection />
  </OnCard>
);

/**
 * In the conference's scroll rail. The rows keep their shape as the column
 * narrows: the question wraps against the toggle rather than shrinking, and the
 * toggle stays a fixed 20px on the right edge.
 */
```

### InTheScrollRail

```jsx
() => (
  <OnCard width={424}>
    <FaqSection />
  </OnCard>
)
```
