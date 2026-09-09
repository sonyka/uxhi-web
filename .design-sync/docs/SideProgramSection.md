---
category: Components
---

SideProgramSection from web. Use via `window.UXHICon2026.SideProgramSection` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### BeyondTheSessions

```jsx
() => (
  <OnCard>
    <SideProgramSection />
  </OnCard>
);

/**
 * A narrower column. The returning pair stacks here rather than splitting into
 * two half-width cards: the grid's minimum is tuned so this section breaks at
 * the same width the agenda above it does, and the two never disagree about how
 * wide is wide enough.
 */
```

### NarrowColumn

```jsx
() => (
  <OnCard width={617}>
    <SideProgramSection />
  </OnCard>
)
```
