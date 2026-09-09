import { AgendaDrawer, AgendaSection, Paragraphs, SocialLink } from "web";

// The drawer is a full-viewport overlay: a black/40 scrim with a panel that is
// a bottom sheet under md and a side panel from md up. It is controlled — on
// the page, `open` is the agenda's session/speaker state — so a preview holds
// it open and hands `onClose` a no-op.
//
// Each cell gives it a STAGE of a fixed height. The preview harness renders a
// story inside a transformed wrapper, which becomes the containing block for
// `position: fixed`; with nothing in flow that wrapper is zero-height, and the
// panel collapses to a strip. A stage is the page the drawer covers, so the
// scrim and the panel take its bounds and read as they do in the browser.
//
// Copy is the real thing: session descriptions from conference/2026/agenda.ts,
// speaker fields as the Sanity merge hands them over. Portraits and wordmarks
// are Sanity CDN assets and are left out rather than faked. The LinkedIn mark
// under the bio is a real SocialLink, whose two SVGs the host app serves from
// /conferences/2026/assets/logos — outside Next that path cannot resolve, so
// that one glyph renders as a broken image.

const noop = () => {};

/** The page the drawer covers: white card, fixed height, in flow. */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        height: 620,
        background: "#fff",
        borderRadius: 24,
        padding: 24,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

const ELEVEN = {
  time: "11:00 am",
  sessions: [
    {
      room: "Main Room",
      title: "Case Study Showcase",
      description:
        "Join us for a showcase of case studies from a diverse group of Hawaiʻi-based practitioners.",
      speakers: [
        { name: "Kim Cinco", slug: "kim-cinco" },
        { name: "Gage Minamoto", slug: "gage-minamoto" },
        { name: "Dr. Kari Noe", slug: "dr-kari-noe" },
      ],
    },
    {
      room: "Purple Box",
      title: "The Professional Listener",
      description: "Deep listening, strategic filtering, and getting to action.",
      speakers: [{ name: "Sean Tangco", slug: "sean-tangco" }],
    },
  ],
};

/**
 * A session drawer over the schedule it was opened from: the room as eyebrow,
 * the session title, the full description. The scrim dims the day without
 * taking it away, which is the point of a drawer rather than a page.
 */
export const SessionDetail = () => (
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
export const LongSessionDescription = () => (
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
export const SpeakerBio = () => (
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
);
