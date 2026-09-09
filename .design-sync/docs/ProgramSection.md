---
category: Components
---

ProgramSection from web. Use via `window.UXHICon2026.ProgramSection` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Overview

```jsx
() => (
  <OnCard>
    <ProgramSection />
  </OnCard>
);

/**
 * The same section in a narrower column, which is where the stub earns its
 * stacked form: the tear-off keeps a full row under the body, the date and
 * address run on as sentences rather than fixed lines, and the lead reflows
 * without the title or the CTA changing size.
 */
```

### NarrowColumn

```jsx
() => (
  <OnCard width={700}>
    <ProgramSection />
  </OnCard>
)
```
