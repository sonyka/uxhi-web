---
category: Components
---

AgendaDrawer from web. Use via `window.UXHICon2026.AgendaDrawer` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### SessionDetail

```jsx
() => (
  <Stage>
    <AgendaSection slots={[ELEVEN]} />
    <AgendaDrawer open onClose={noop} eyebrow="Main Room" title="Case Study Showcase">
      <Paragraphs
        text={
          "Join us for a showcase of case studies from a diverse group of Hawaiʻi-based practitioners working across design, technology, culture, and community. Each speaker will share a project or experience that offers a glimpse into their process, the challenges they encountered, and what they learned along the way.\n\nFeaturing perspectives from people working with indigenous knowledge, place-based technology, and creative practice, this session is an opportunity to hear a variety of individual moʻolelo through the work they share."
        }
      />
    </AgendaDrawer>
  </Stage>
);

/**
 * A long abstract, which is why the panel scrolls rather than sizing to its
 * content, and why the title is allowed to run to three lines above it.
 * Paragraphs splits the CMS's blank-line-separated prose back into paragraphs
 * so a talk description does not arrive as one block.
 */
```

### LongSessionDescription

```jsx
() => (
  <Stage>
    <AgendaDrawer
      open
      onClose={noop}
      eyebrow="Main Room"
      title="The Stories We Inherit: Stewarding the Narratives That Shape Our Organizations"
    >
      <Paragraphs
        text={
          "This year’s theme, moʻolelo, challenged me to think differently about storytelling. I realized that the stories shaping our organizations are not just the ones we intentionally tell, they are also the ones we inherit: the explanations, assumptions, and narratives that quietly become “the way things work.”\n\nWe often celebrate storytelling as one of UX’s greatest strengths. Stories help us understand users, align teams, and create clarity. But stories have another quality we talk about far less: they endure.\n\nEvery organization inherits stories about its customers, products, processes, and even itself. They become onboarding materials, product vocabulary, roadmaps, personas, conventions, and shared assumptions.\n\nYet the longer a story is carried forward, the easier it becomes to mistake continuity for truth."
        }
      />
    </AgendaDrawer>
  </Stage>
);

/**
 * The same drawer carrying a speaker instead of a session: their title becomes
 * the eyebrow, their name the heading, and the profile links sit under the bio
 * as marks alone — the aria-label carries the meaning.
 */
```

### SpeakerBio

```jsx
() => (
  <Stage>
    <AgendaDrawer open onClose={noop} eyebrow="Professional Listener" title="Sean Tangco">
      <Paragraphs
        text={
          "Sean’s training is in applied sociocultural anthropology, and the most useful description of his job he has heard is “professional listener.”\n\nHe presents The Professional Listener at 11:00 in the Purple Box, and hosts the conference-wide icebreaker that opens the day."
        }
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SocialLink
          network="linkedin"
          href="https://www.linkedin.com/in/seantangco/"
          name="Sean Tangco"
          size={22}
        />
      </div>
    </AgendaDrawer>
  </Stage>
)
```
