import { CochairsSection } from "web";
import type { ComponentProps } from "react";

type Cochair = ComponentProps<typeof CochairsSection>["cochairs"][number];

/**
 * Real organiser rows from Sanity (conferenceTeam), portraits included — those
 * are live Sanity CDN assets, so they resolve here as they do on the site.
 * The bio only appears once a card is tapped, in the shared AgendaDrawer; a
 * still capture shows the closed state, which is the state the page ships in.
 */
const AERYN: Cochair = {
  _id: "aeryn",
  name: "Aeryn Yamazaki",
  title: "Brand Designer",
  bio: "Aeryn Yamazaki is a Hawaiʻi-based graphic designer and recent graduate of University of Hawaiʻi – West Oʻahu, holding a BA in Creative Media. After working with Make-A-Wish Hawaii as a Communications Art intern, she wants to keep using design in ways that help the community.",
  photo:
    "https://cdn.sanity.io/images/evh83z0t/production/bd4c15eeaefb494a2abf89bc172ef4782a4186be-1979x2351.jpg",
  photoAlt: "Aeryn Yamazaki",
};

const PUA: Cochair = {
  _id: "pua",
  name: "Pua Pakele",
  title: "Founder, RBL Media",
  bio: "Pua is a Native Hawaiian brand strategist and web designer who helps coaches, consultants, and service entrepreneurs close the gap between who they are and how they show up digitally. Since founding RBL Media in 2020 she has led 50+ brand and web projects.",
  linkedin: "https://www.linkedin.com/in/pualena/",
  photo:
    "https://cdn.sanity.io/images/evh83z0t/production/a57bc92df81dd7d4b7c16ad8f5d94f5996f1d93e-1200x1200.png",
  photoAlt: "Pua Pakele",
};

const RICHIE: Cochair = {
  _id: "richie",
  name: "Richie Galacgac",
  title: "Content & Social Marketer",
  bio: "Richie Galacgac is a Judicial Clerk at the Honolulu District Court by day and a web and graphic designer by night, specialising in UX/UI, branding, and responsive web design, based in Waipahu.",
  linkedin: "https://www.linkedin.com/in/richiegalacgac/",
  photo:
    "https://cdn.sanity.io/images/evh83z0t/production/e23f9dfa430048868786a0cfa0275004fcd7004a-1200x1200.png",
  photoAlt: "Richie Galacgac",
};

/**
 * Meet the Organizers as the page mounts it. Columns are capped at three by
 * container query, so this is the widest the grid ever gets.
 */
export const Organizers = () => (
  <CochairsSection cochairs={[AERYN, PUA, RICHIE]} />
);

/**
 * A co-chair announced before their portrait is uploaded. The tile falls back
 * to initials on beige-40 and keeps the 4:5 aspect, so a half-filled roster
 * still reads as a grid rather than a gap.
 */
export const AwaitingPortrait = () => (
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
export const EarlyRoster = () => (
  <CochairsSection cochairs={[AERYN, RICHIE]} />
);
