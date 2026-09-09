---
category: Components
---

AgendaSection from web. Use via `window.UXHICon2026.AgendaSection` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### SingleTrackMorning

```jsx
() => (
  <OnCard>
    <AgendaSection slots={[DOORS, OPENING, KEYNOTE]} />
  </OnCard>
);

/**
 * The afternoon split. Two rooms in one slot, named on the card in their own
 * hue — purple for the Purple Box, orange for the Main Room — and both cards
 * carry a description, so both take the chevron that promises a drawer.
 */
```

### ParallelTracks

```jsx
() => (
  <OnCard>
    <AgendaSection slots={[ELEVEN, LUNCH]} />
  </OnCard>
);

/**
 * After the Sanity merge. Nate Lynch and Anthology have records, so their names
 * are links into a bio drawer; Steph Lum and Fai Visuthicho do not, and stay
 * plain rather than spending a tap to say "not yet". Anthology's avatar is a
 * rounded square because it is an organization, not a person.
 */
```

### SpeakerRecordsResolved

```jsx
() => (
  <OnCard>
    <AgendaSection slots={[ONE, TWO_ENRICHED]} />
  </OnCard>
);

/**
 * The same slot in the conference's scroll rail at a 900px viewport — 328px
 * of content once the card's gutters are off it. The split is content-driven
 * rather than breakpoint-driven, so the two rooms stack here even though the
 * viewport is well past md and the time is still in its left gutter.
 */
```

### InTheScrollRail

```jsx
() => (
  <OnCard width={376}>
    <AgendaSection slots={[ELEVEN]} />
  </OnCard>
)
```
