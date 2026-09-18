"use client";

// A speaker under a session — on the agenda card, and in the session drawer.
// One component for both, so a name is tappable in exactly the same cases
// wherever it appears.

import { BEIGE_40, GRAY_120, LINK, PURPLE } from "../theme";
import type { AgendaSpeaker } from "./agendaTypes";

/** First letters of the first two words: "Kim Cinco" → KC, "Anthology" → A. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * A speaker only becomes a link once there is a drawer worth opening — a bio,
 * a portrait or wordmark, or a profile to link out to. Until the CMS record
 * fills in, the name is plain text: no underline, no hover, nothing to tap.
 *
 * The alternative — linking every name and apologising inside the drawer —
 * spends a tap to deliver "not yet", which is worse than saying nothing. Same
 * rule the session cards already follow, where no description means no chevron.
 */
export function hasProfile(speaker: AgendaSpeaker) {
  return Boolean(
    speaker.bio || speaker.photo || speaker.logo || speaker.linkedin || speaker.website,
  );
}

export function SpeakerRow({
  speaker,
  onOpen,
}: {
  speaker: AgendaSpeaker;
  onOpen: () => void;
}) {
  const linked = hasProfile(speaker);

  const avatar = (
    <span
      aria-hidden="true"
      // Square for an organization, round for a person: a logo cropped into
      // a circle loses its corners, and the shape difference reads before
      // the name does.
      className={`w-7 h-7 shrink-0 flex items-center justify-center text-[11px] font-bold overflow-hidden ${
        speaker.kind === "organization" ? "rounded-md" : "rounded-full"
      }`}
      style={{ backgroundColor: BEIGE_40, color: PURPLE }}
    >
      {speaker.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={speaker.photo} alt="" className="w-full h-full object-cover" />
      ) : (
        initials(speaker.name)
      )}
    </span>
  );

  // Not a link, so not purple either: purple is the colour every other tappable
  // thing on this card takes, and keeping it here would leave the affordance
  // half-on. Gray-110 is the same weight the body text carries.
  if (!linked) {
    return (
      <li className="flex items-center gap-2">
        {avatar}
        <span className="font-semibold text-[15px] leading-[1.3]" style={{ color: GRAY_120 }}>
          {speaker.name}
        </span>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        // The card behind is itself clickable; without this, opening a bio
        // would also open the session drawer underneath it.
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="flex items-center gap-2 text-left cursor-pointer"
      >
        {avatar}
        <span
          className={`${LINK} font-semibold text-[15px] leading-[1.3]`}
          style={{ color: PURPLE }}
        >
          {speaker.name}
        </span>
      </button>
    </li>
  );
}
