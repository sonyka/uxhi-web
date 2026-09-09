# design-sync notes — UXHICon 2026

Repo-specific gotchas for syncing this design system to claude.ai/design. Read this
before a re-sync; it is what keeps the next run from rediscovering a day of debugging.

Project: **UXHICon 2026** — `992872a3-3c1d-44f6-b568-55f70e214eec`
First sync: 8 Sep 2026.

## What this repo is, and what the sync had to invent

This is a **Next.js app, not a component library**. There is no `dist/`, no
`package.json` exports, no Storybook, and the "design system" is one year of the
conference: `web/src/app/(conference)/conference/2026/`. Three things had to be built
for the sync, all gitignored and regenerated rather than committed:

- **`web/.ds-entry.tsx`** — a barrel re-exporting exactly the 2026 surface. Passed as
  `--entry`, which is also what makes the converter resolve `PKG_DIR` to `web/`. Without
  it there is no entry at all and the run dies at `[NO_DIST]`.
- **`web/.ds-styles.css`** — Tailwind v4 compiles at build time on the real site, so the
  bundle needs a pre-compiled stylesheet. Built from `.design-sync/styles-entry.css`
  (committed) with `npx @tailwindcss/cli@4`. That entry also loads Bricolage Grotesque
  from Google Fonts and applies it at the root, because `next/font` cannot follow the
  components out of Next.
- **`web/.ds-tsconfig.json` + `web/.ds-shims/next-image.tsx`** — see the next section.

Rebuild all three before a re-sync; the commands are at the bottom.

## Traps, in the order they will bite

**1. `next/image` takes the entire bundle down.** One component (`SocialLink`) imports
it, which pulls Next's image runtime — deployment ids, picomatch, edge-runtime checks —
into an IIFE that runs in a bare browser. The first `process.env` reference throws
before any card renders, and the symptom is all 27 cards failing with
`ReferenceError: process is not defined`, which reads like a bundler problem rather than
a single import. Fixed by aliasing `next/image` to a plain `<img>` shim through a
sync-only tsconfig (`cfg.tsconfig: ".ds-tsconfig.json"`). Any new component importing a
Next primitive will need the same treatment.

**2. Route-group parentheses are glob syntax.** `@source "…/app/(conference)/…"` in the
Tailwind entry silently matches nothing, and every arbitrary-value class in `theme.ts`
goes missing from the compiled CSS with no error. The entry scans `../web/src` wholesale
for exactly this reason. If the type ramps ever look flat in a preview, check this first.

**3. Host-served assets: Sanity resolves, the site's public folder never does.**

- `https://cdn.sanity.io/images/evh83z0t/…` loads fine during capture, so components
  taking image URLs as props (`SponsorsGrid`, `CochairsSection`, `InstagramGrid`) render
  real published photography. Fetch real rows with
  `curl -s 'https://evh83z0t.apicdn.sanity.io/v2024-01-01/data/query/production?query=…'`
  — public, no token. The URLs are already inlined in those three preview files.
- Anything under `/conferences/2026/assets/…` is served by the Next host and 404s in a
  standalone bundle.

**Resolved 9 Sep 2026 by fixing the components, not the pipeline.** The brand marks were
`<img>`/`next/image` references to files in `public/`, which meant a component was whole
on this site and a broken-image box anywhere else. They are inline SVG now, in
`_components/marks.tsx`, generated from the same SVG sources (which stay in `public/` for
OG images and non-React use). That fixed `QuoteCard`, `SocialGlyph`, `SocialLink`,
`LogoBadge`, and everything that mounts a glyph — and it removed the last `next/image`
import from the year, so trap 1 no longer has a live trigger.

Still outstanding: `PhotoTickerH` / `PhotoTickerV` hardcode nine photographs at
`/conferences/2026/assets/images/image-ticker-N.png`, 76–120KB each. Too large to inline;
the honest fix is an optional `photos` prop defaulting to the current paths, so a preview
or a design can pass its own. Not done — it changes a component's API rather than its
internals, which is a decision rather than a repair.

**4. Vertical clipping is silent.** Grading captures each story alone at 900×700 and
simply clips anything taller, with no warning in the log. Two cards lost content this
way before anyone noticed. Budget for a full-width section: a heading plus intro plus
CTA runs about 255px, leaving roughly 430px of content — two rows of cards, or two tiers
of one row each. Trim the fixture, never the component.

**5. Mobile-only components render nothing.** `MobileNavMenu` is `sm:hidden`, so at the
900px capture viewport it does not exist. Fixed with
`cfg.overrides.MobileNavMenu: {"cardMode": "single", "viewport": "390x700"}`. The
responsive ramp keys off the capture viewport rather than the wrapper width, so any cell
meant to show the low end of a ramp needs the same treatment.

## Techniques worth reusing

- **Opening a native `<details>` without faking markup.** Both menus hold state in a
  `<details>` with no `open` prop. A non-exported wrapper in the preview file sets the
  attribute on the component's own element after mount — the same state a tap produces.
  `useEffect`/`useRef` work in preview files. Both panels are `absolute bottom-full`, so
  an open cell must reserve space *above* the trigger.
- **Typing fixtures without deep imports:** `ComponentProps<typeof X>["prop"][number]`.
  The row types are not exported from the package root but the props are.
- **`PhotoTicker` needs no animation override.** Capture sets a fixed clock and lands
  mid-track, which is a representative frame. Do not add one.
- Missing photos do not collapse the tickers — the tiles carry explicit box sizes, so
  the cadence, doubled track and edge fades all survive. The previews tint the empty
  tiles `beige-50`, a flat token deliberately unlike a photograph.
- White surfaces are invisible in single-story capture (the ground is white). Any white
  card needs a `beige-30` wrapper to read.

## Known render warns — expected, not new

- `SponsorsGrid` defaults a missing `tier` to `platinum`, so a fixture that omits it
  silently joins the top tier. Always set it.
- Real `conferenceTeam` rows include drafts with `name: null`; do not paste those into a
  fixture or the initials fallback renders empty.

## Re-sync risks — what can go stale

- **Sanity URLs inlined in three preview files.** If an asset is replaced in the CMS, the
  old URL 404s and those cards degrade silently. Re-query and re-paste when a sponsor or
  co-chair changes.
- **The three generated build inputs are gitignored.** A fresh clone has none of them; a
  re-sync must regenerate all three before the converter runs, or it fails at `[NO_DIST]`.
- **`conventions.md` names real tokens and ramps.** If the parent palette or the type
  roles change, re-validate every name in it against the fresh build — a header that
  names something which no longer exists is worse than no header, because the design
  agent trusts it.
- **The font is a remote Google Fonts import.** It loads at runtime; nothing in the
  bundle ships the woff2. If Google Fonts is ever unavailable, every design falls back to
  a system sans.
- The 2027 conference will be a **new design system**, not an update to this one. Do not
  re-point this project at it.

## Re-sync in one command

```sh
# regenerate the three build inputs first (see the top of this file), then:
node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules web/node_modules --entry web/.ds-entry.tsx \
  --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```

## Capture artifacts that are NOT product defects

Two things look like faults in the graded sheets and are not:

- **framer-motion opacity animations never complete under capture.** `package-capture.mjs`
  installs `page.clock.setFixedTime`, and framer hands plain opacity animations to WAAPI,
  whose timeline that clock freezes — so the element keeps its `initial` value.
  Percentage transforms stay on framer's own JS loop and do finish. Reproduced
  deterministically: a single `goto(?story=…)` gives the scrim `opacity: 1`; the
  harness's `goto(grid) → goto(?story=…)` sequence gives `opacity: 0`. The visible
  result is `AgendaDrawer`'s `bg-black/40` scrim being invisible in every sheet while
  the panel itself animates in correctly. **The product renders cards live with no
  frozen clock, so the scrim is fine there** — the sheets understate it. If a future run
  wants truthful sheets, `page.emulateMedia({reducedMotion: 'reduce'})` is the cheaper
  fix than dropping the fixed clock; changing it invalidates every carried grade, so do
  it at the start of a run, never mid-way.
- **Tailwind breakpoints read the capture viewport, not the wrapper width.** A wide
  layout is simply unreachable below its breakpoint. `ProgramSection`'s side-by-side Pau
  Hana stub needs 1200px and `FaqSection`'s nine questions need 1000px of height; both
  now carry a `cfg.overrides` viewport for exactly this reason.

## Skipped states — interactive, cannot render statically

FaqSection's open answer, AgendaSection's card and speaker hover (the drawer's own cells
cover those states instead), SocialLink's hover cross-fade, and the ConferenceButton
hover opacity shift.

## Card grouping, and the doc files behind it

The Design System pane groups cards by each component's `<group>`, which comes from the
`category` frontmatter of its per-component doc. To get an **Icons** section beside
**Components**, `cfg.docsDir` points at `.design-sync/docs/` — one `<Name>.md` per
component, each carrying `category: Icons` or `category: Components`.

**These files were seeded from the converter's own synthesized `.prompt.md` output**, so
grouping cost no documentation. The trade is that they no longer regenerate: a doc file
now wins over synthesis, so a component whose props change will keep the old prop list in
its doc until someone updates the file. **Re-sync risk:** when a component's API changes,
re-seed its doc from the freshly built `.prompt.md` and re-add the frontmatter, or edit it
by hand. Twelve are Icons (the eleven from icons.tsx plus SocialGlyph); the rest are
Components.
