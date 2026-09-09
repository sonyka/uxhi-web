import { AgendaSection } from "web";

// Slots lifted verbatim from conference/2026/agenda.ts — the real run of show
// for Saturday, October 17, 2026.
//
// The section paints beige-30 cards, so every cell sits on the white rounded
// card the conference page puts it in, not on the page's beige ground.

const DOORS = {
  time: "8:00 am",
  sessions: [{ title: "Doors Open", detail: "Coffee and light breakfast" }],
};

const OPENING = {
  time: "9:00 am",
  sessions: [
    {
      title: "Opening Remarks",
      speakers: [
        { name: "Kat Duran-Higa", slug: "kat-duran-higa" },
        { name: "Jennifer Kumura", slug: "jennifer-kumura" },
      ],
    },
  ],
};

const KEYNOTE = {
  time: "10:00 am",
  sessions: [{ title: "Keynote", badge: "To be announced" }],
};

const ELEVEN = {
  time: "11:00 am",
  sessions: [
    {
      room: "Main Room",
      title: "Case Study Showcase",
      description:
        "Join us for a showcase of case studies from a diverse group of Hawaiʻi-based practitioners working across design, technology, culture, and community. Each speaker will share a project or experience that offers a glimpse into their process, the challenges they encountered, and what they learned along the way.",
      speakers: [
        { name: "Kim Cinco", slug: "kim-cinco" },
        { name: "Gage Minamoto", slug: "gage-minamoto" },
        { name: "Dr. Kari Noe", slug: "dr-kari-noe" },
      ],
    },
    {
      room: "Purple Box",
      title:
        "The Professional Listener: Deep Listening, Strategic Filtering, and Getting to Action",
      description:
        "My training is in applied sociocultural anthropology, and the most useful description of my job I’ve heard is “professional listener.” But listening only counts if something happens after.",
      speakers: [{ name: "Sean Tangco", slug: "sean-tangco" }],
    },
  ],
};

const LUNCH = { time: "12:00 pm", sessions: [{ title: "Lunch" }] };

const ONE = {
  time: "1:00 pm",
  sessions: [
    {
      room: "Main Room",
      title:
        "The Stories We Inherit: Stewarding the Narratives That Shape Our Organizations",
      description:
        "This year’s theme, moʻolelo, challenged me to think differently about storytelling.",
      speakers: [{ name: "Fai Visuthicho", slug: "fai-visuthicho" }],
    },
    {
      room: "Purple Box",
      title: "If Mom Says No, Ask Dad",
      speakers: [{ name: "Steph Lum", slug: "steph-lum" }],
    },
  ],
};

// The 2:00 pm slot after withSpeakerRecords() has layered Sanity over it: a
// speaker with a bio or a profile link becomes a purple, dotted-underlined
// button; one still waiting on its record stays plain grey text. Photos come
// from the Sanity CDN, so these records carry the fields that resolve offline.
const TWO_ENRICHED = {
  time: "2:00 pm",
  sessions: [
    {
      room: "Main Room",
      title: "Designers Are Translators",
      description:
        "Great products begin with great conversations. Designers sit at the intersection of end users, business, engineering, research, and AI.",
      speakers: [
        {
          name: "Nate Lynch",
          slug: "nate-lynch",
          title: "Design Leader",
          bio: "Nate works at the seam between research and delivery, translating what teams hear into something they can build.",
          linkedin: "https://www.linkedin.com/in/natelynch/",
        },
      ],
    },
    {
      room: "Purple Box",
      title: "Narrative Arc: A Workshop",
      description:
        "Led by April Rutherford (EVP/Executive Creative Director, Anthology FINN Partners), this interactive storytelling workshop will equip attendees with a practical framework for creating a narrative architecture.",
      speakers: [
        {
          name: "Anthology Finn Partners",
          slug: "anthology",
          kind: "organization",
          website: "https://anthologygroup.com",
        },
      ],
    },
  ],
};

/** The white card the section sits on, at the width the page gives it. */
function OnCard({ width, children }: { width?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: 24,
        width: width ?? "100%",
        maxWidth: "100%",
      }}
    >
      {children}
    </div>
  );
}

/**
 * The shared start of the day. One session per slot, so auto-fit collapses the
 * empty track and each card takes the row on its own — Doors Open carries a
 * detail line instead of speakers, and the Keynote a yellow status pill.
 * Neither has a description, so neither shows a chevron.
 */
export const SingleTrackMorning = () => (
  <OnCard>
    <AgendaSection slots={[DOORS, OPENING, KEYNOTE]} />
  </OnCard>
);

/**
 * The afternoon split. Two rooms in one slot, named on the card in their own
 * hue — purple for the Purple Box, orange for the Main Room — and both cards
 * carry a description, so both take the chevron that promises a drawer.
 */
export const ParallelTracks = () => (
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
export const SpeakerRecordsResolved = () => (
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
export const InTheScrollRail = () => (
  <OnCard width={376}>
    <AgendaSection slots={[ELEVEN]} />
  </OnCard>
);
