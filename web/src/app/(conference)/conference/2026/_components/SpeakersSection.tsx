"use client";

// Meet the Speakers.
//
// The lineup used to exist only inside the agenda, as 28px circles under a
// session title — an organizer's portrait had 112 times the area of a speaker's
// face, which put the people you buy a ticket for among the smallest things on
// the page. This section gives them the tile and leaves the agenda to answer
// "when", which is the one question it was ever good at.
//
// A grid rather than a carousel, deliberately. The job here is scanning — do I
// know anyone, is this worth my Saturday — and a carousel answers that three
// faces at a time. Fourteen people fit a grid; a carousel starts being the
// better instrument somewhere north of forty.
//
// Three across, the same as the organizers — for now. Four fitted more faces
// in but drew each one smaller, which works against the point of the section:
// presence comes from the size of the face, not the count per row. Once the
// organizers drop to a compact row, these become the largest faces on the page
// without having to grow.

import { SectionHeading } from "./SectionHeading";
import { GRAY_110 as GRAY, TYPE } from "../theme";
import { PersonTile } from "./PersonTile";
import { useAgendaDrawers } from "./SessionDrawer";
import { speakerLineup, type AgendaSlot } from "./agendaTypes";

// Takes the whole agenda rather than the lineup alone: a bio lists that
// speaker's sessions, and those open from here without scrolling to the
// schedule.
export function SpeakersSection({ slots }: { slots: AgendaSlot[] }) {
  const speakers = speakerLineup(slots);
  const { openSpeaker, drawers } = useAgendaDrawers(slots);

  if (speakers.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>Meet the Speakers</SectionHeading>
      <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
        UXHICon brings together voices from Hawaiʻi and beyond who are shaping
        the future of human-centered design. Our speakers share their moʻolelo:
        real stories, lessons learned and fresh perspectives to inspire the
        next wave of designers.
      </p>

      <div className="@container mt-1">
        {/* Container queries, not viewport: this sits in the conference's
            scroll rail, which is far narrower than the window it lives in.
            Caps at three like the organizers, and for the same reason — the
            rail stops growing at 1440px, so a fourth column past that would
            only shrink the faces as the page got wider.

            Two from the bottom rather than the organizers' one, though: nine
            full-width tiles is about 3,500px of phone scrolling to get past a
            section whose whole job is to be scannable. At 150px a face is still
            a face. */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 @xl:grid-cols-3">
          {speakers.map((s) => (
            <PersonTile
              key={s.slug ?? s.name}
              name={s.name}
              photo={s.photo}
              photoAlt={s.name}
              onOpen={() => openSpeaker(s)}
            />
          ))}
        </div>
      </div>

      {drawers}
    </div>
  );
}
