# UXHICon 2026 — how to build with this system

This is **one conference year**, not a company design system. UXHI redesigns the
conference completely every year: 2024, 2025 and 2026 share no layout, type or mood.
What they share is the parent UXHI palette. So treat everything here as 2026's, and
never generalise a decision from it to "UXHI".

## Wrapping and setup

No provider. Components render standalone — import and use them.

Two things the host page must supply, because Next supplied them on the real site:

1. **The typeface.** Every component expects Bricolage Grotesque as
   `var(--font-bricolage)`. `styles.css` loads it from Google Fonts and applies it at
   the root, so a design that imports `styles.css` gets it. Without that stylesheet the
   whole system falls back to a system sans and looks wrong immediately.
2. **Image assets, but only one kind.** Imagery passed in as a prop works: the sponsor,
   co-chair and Instagram components take URLs and render real photography from the CMS
   without any setup. What does not work is the handful of components that *hardcode*
   paths the site serves from its own public folder — `/conferences/2026/assets/logos/…`
   (QuoteCard's shaka mark, SocialGlyph's Instagram and LinkedIn marks, LogoBadge) and
   `/conferences/2026/assets/photos/…` (PhotoTickerH, PhotoTickerV). Nothing here serves
   those paths, so those marks are missing in this bundle and in any design built with
   them. SocialGlyph's gap travels: anything mounting it — the footer row, a speaker's
   bio drawer, the Instagram follow pills — inherits it.

## The styling idiom

Tailwind utility classes, plus CSS custom properties for colour. There is no
props-based style API — components take content and behaviour props, not colour or
spacing props.

**Colour is always a token, never a hex literal.** Use these `var(--color-*)` names:

| Role | Token |
|---|---|
| Brand purple — headings, primary fill | `--color-purple-140` |
| Bright purple — accents | `--color-purple-100` |
| Teal — primary CTA fill, eyebrows | `--color-teal-90`, `--color-teal-60`, `--color-teal-40` |
| Body copy on beige / on white / secondary | `--color-gray-120`, `--color-gray-110`, `--color-gray-100` |
| Muted icons and labels | `--color-gray-80` |
| Shaka gold — badges, "new this year" | `--color-yellow-80` |
| Page ground / raised surface / pattern | `--color-beige-30`, `--color-beige-40`, `--color-beige-50` |
| Agenda room label | `--color-orange-130` |

The page ground is `--color-beige-30`. White is for cards sitting on it, not for the
page itself.

**Type is a role, not a size.** The year defines thirteen named roles — `display`,
`hero`, `sectionTitle`, `panelTitle`, `itemTitle`, `lead`, `body`, `bodyCompact`,
`caption`, `fine`, `eyebrow`, `nav`, `ui` — and each owns a full responsive ramp rather
than one size. The roles are baked into the components and are not exported, so you get
them by using the components. When you set your own type beside them, match the ramp
rather than picking a size: body runs 16 → 17 at `lg` → 18 at `xl`; sectionTitle runs
24 → 20 at `md` → 26 at `lg` → 32 at `xl`. That dip at `md` is deliberate, in both
`hero` and `sectionTitle` — the column narrows there — so do not "fix" it by flattening.

Inline links take a dotted rule in a lighter grey rather than a solid underline:
`underline decoration-dotted decoration-gray-80 underline-offset-2`, paired with
`color: var(--color-purple-140)`.

## Where the truth lives

- `styles.css` and its imports — the compiled utility classes, every colour token, and
  the font. Read it before inventing a class name.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component API and usage.
- `components/<group>/<Name>/<Name>.d.ts` — the props contract.

## One idiomatic composition

```jsx
<section style={{ background: "var(--color-beige-30)", padding: 48 }}>
  <p style={{
    color: "var(--color-teal-90)",
    font: "700 13px/1 var(--font-bricolage), sans-serif",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  }}>
    Saturday, October 17, 2026
  </p>
  <SectionHeading>Mo‘olelo</SectionHeading>
  <p style={{ color: "var(--color-gray-120)", fontSize: 17, lineHeight: 1.4, maxWidth: 620 }}>
    A day of case studies from Hawai‘i-based practitioners working across design,
    technology, culture and community.
  </p>
  <ConferenceButton href="https://uxhiconference.com" icon={ShakaIcon}>
    Get tickets
  </ConferenceButton>
</section>
```

Icons paint with `currentColor`, so they take the colour of the text beside them —
set the colour on the parent, never on the icon.
