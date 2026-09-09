---
category: Components
---

CochairsSection from web. Use via `window.UXHICon2026.CochairsSection` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Organizers

```jsx
() => (
  <CochairsSection cochairs={[AERYN, PUA, RICHIE]} />
);

/**
 * A co-chair announced before their portrait is uploaded. The tile falls back
 * to initials on beige-40 and keeps the 4:5 aspect, so a half-filled roster
 * still reads as a grid rather than a gap.
 */
```

### AwaitingPortrait

```jsx
() => (
  <CochairsSection
    cochairs={[
      PUA,
      {
        _id: "programming",
        name: "Kealoha Nakamura",
        title: "Co-chair, Programming",
        bio: "Bio coming soon.",
      },
      {
        _id: "logistics",
        name: "Marisa Ching",
        title: "Co-chair, Logistics",
      },
    ]}
  />
);

/**
 * Two organisers named so far. The grid steps down with its container rather
 * than the viewport, which is what the conference rail needs — the section
 * sits in a column, not the page width.
 */
```

### EarlyRoster

```jsx
() => (
  <CochairsSection cochairs={[AERYN, RICHIE]} />
)
```
