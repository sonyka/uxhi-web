---
category: Components
---

ConferenceButton from web. Use via `window.UXHICon2026.ConferenceButton` (bundle loaded from the root `_ds_bundle.js`).

ConferenceButton — pill CTA for the conference site.

Every current use is an external link, so target/rel are baked in. Add an
`external` prop if an in-site destination ever needs one.

## Examples

### Variants

```jsx
() => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <ConferenceButton href="https://uxhiconference.com">Get tickets</ConferenceButton>
    <ConferenceButton href="https://uxhiconference.com" variant="secondary">
      Become a sponsor
    </ConferenceButton>
    <ConferenceButton href="https://uxhiconference.com" variant="outline">
      View on map
    </ConferenceButton>
  </div>
);

/** Leading reads as "do this"; trailing as "go here". */
```

### WithIcons

```jsx
() => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <ConferenceButton href="https://uxhiconference.com" icon={ShakaIcon}>
      Get tickets
    </ConferenceButton>
    <ConferenceButton
      href="https://uxhiconference.com"
      variant="secondary"
      icon={ArrowRightIcon}
      iconPosition="trailing"
    >
      See the agenda
    </ConferenceButton>
    <ConferenceButton
      href="https://uxhiconference.com"
      variant="outline"
      icon={GlobeIcon}
      iconPosition="trailing"
    >
      Entrepreneurs Sandbox
    </ConferenceButton>
  </div>
);

/**
 * On the purple band. Only the teal fill survives here — primary is purple on
 * purple, which reads as a bare link, and outline draws a purple hairline that
 * disappears into the ground.
 */
```

### OnDarkGround

```jsx
() => (
  <div
    style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      alignItems: "center",
      background: "var(--color-purple-140)",
      padding: 24,
      borderRadius: 12,
    }}
  >
    <ConferenceButton href="https://uxhiconference.com" variant="secondary">
      Get tickets
    </ConferenceButton>
    <ConferenceButton
      href="https://uxhiconference.com"
      variant="secondary"
      icon={ArrowRightIcon}
      iconPosition="trailing"
    >
      Read the mo&#699;olelo
    </ConferenceButton>
  </div>
)
```
