"use client";

// The Pre-UXHICon Pau Hana — a ticket stub: detail on the left, a tear-off
// panel on the right, split by a perforation.
//
// The card says what the evening is and when; the drawer says everything else.
// It briefly carried the full write-up inline — four paragraphs and a run of
// show — and at that length it stopped reading as a stub and started reading
// as a second page wedged between the programme and the agenda. So it follows
// the rule the agenda already follows: a short card, tappable, and the long
// version in a drawer.
//
// Same drawer the sessions use, deliberately. Someone who has opened a session
// from the schedule has already learned this interaction, and the pau hana is
// the same kind of object: a thing on the programme with more to say than fits.
//
// A client component so it can hold the drawer's open state, which is also why
// it is not inline in ProgramSection — that section is otherwise static and
// has no reason to ship to the browser.

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { AgendaDrawer, Paragraphs } from "./AgendaDrawer";
import { ConferenceButton } from "./ConferenceButton";
import { ArrowRightIcon, ShakaIcon } from "./icons";
import { TICKETS_URL } from "../constants";
import {
  PURPLE,
  TEAL_40,
  YELLOW_80,
  GRAY_110 as GRAY,
  GRAY_100,
  GRAY_80,
  LINK,
  TYPE,
} from "../theme";

const VENUE = "OurSpace";
const VENUE_URL = "https://ourspacehawaii.org";
const ADDRESS = "1052 Waimanu St, Honolulu, HI 96814";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=1052+Waimanu+St%2C+Honolulu%2C+HI+96814";

// The drawer's copy, as one string for Paragraphs — blank lines separate
// paragraphs and a leading "- " makes a bullet, the same plain-text shape the
// session descriptions in agenda.ts are written in.
//
// Lowercase "pm" and middots rather than dashes, as the rest of the site sets
// a time.
const DETAIL = `Every place has a story. And every story has a place.

As we lead into UXHICon 2026, we’re kicking things off with an evening of stories that connect us to place: the neighborhoods that raised us, the places where we found belonging, the homes that shaped us, and the places that live on in memory.

Think Moth StorySLAM meets local poetry slam: real stories, original poems, and creative perspectives. Come gather, mingle, have a drink, and hear the places that shaped us.

Run of show:
- 5:30 pm · Doors open & check-in
- 6:00 pm · Program begins
- 8:30 pm · Pau

Tickets include the storytelling event and drinks. Food from local vendors will be available for purchase. Open to everyone. No UXHICon ticket needed.`;

export function PauHanaCard() {
  const [open, setOpen] = useState(false);

  return (
    // The badge straddles the card's top edge, so it is a sibling of the card
    // rather than a child — the card keeps `overflow-hidden` to clip the
    // tear-off panel to the rounded corners, which would also clip a badge
    // placed inside it.
    <div className="relative">
      {/* The source mock had this pill in coral. Gold was confirmed as the
          final choice (2026-08-29): coral appears nowhere in the 2026 palette,
          and YELLOW_80 ties the badge to the shaka mark. Not an open question —
          don't "restore" the coral.

          Opaque fill, so the card's stroke passes behind it cleanly. */}
      <span
        className="absolute -top-3 left-6 lg:left-8 z-10 inline-flex items-center rounded-full px-3 py-1 font-bold uppercase tracking-[0.06em] text-[12px]"
        style={{ background: YELLOW_80, color: PURPLE }}
      >
        New this year
      </span>

      <div
        className="flex flex-col lg:flex-row rounded-[20px] overflow-hidden border"
        style={{ borderColor: GRAY_80 }}
      >
        {/* Stub body. A div with role=button rather than a <button>, matching
            the agenda's session cards — the tear-off beside it holds links,
            and a button cannot contain them. */}
        <div
          className="flex-1 bg-white p-6 lg:p-8 flex flex-col gap-2 cursor-pointer transition-colors hover:bg-beige-30"
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        >
          <p className={TYPE.eyebrow} style={{ color: PURPLE }}>
            Pre UXHICon Pau Hana
          </p>

          <SectionHeading>Our Place, Our Stories</SectionHeading>

          <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
            An evening of place-based stories and poetry to kick off UXHICon 2026.
            Drinks included, open to all.
          </p>

          {/* The practical caveat, in the smaller grey the stub gave "This
              event is 21+. Your ticket includes one drink." before the evening
              was renamed. Same role, same rank: the thing you need to know
              before you decide, under the thing that makes you want to. */}
          <p className={`${TYPE.caption} max-w-[62ch]`} style={{ color: GRAY_100 }}>
            Open to everyone. No UXHICon ticket needed.
          </p>

          {/* The affordance the chevron used to be, in words. A span rather
              than its own button or link: the whole card is already the
              control — focusable, Enter and Space — and a second control
              inside it would be a tab stop that does the same thing.

              So this is a label, and the card around it is what opens. It
              still moves on hover, because the thing under the cursor has to
              look like it does something. */}
          <span
            className={cn(TYPE.caption, "mt-1 inline-flex w-fit items-center gap-1 font-bold", LINK)}
            style={{ color: PURPLE }}
          >
            See description
            <ArrowRightIcon size={16} />
          </span>
        </div>

        {/* Perforation — horizontal when the stub stacks, vertical when it splits */}
        <div
          className="border-t lg:border-t-0 lg:border-l border-dashed"
          style={{ borderColor: GRAY_80 }}
        />

        {/* Tear-off: when, where, and the CTA.
            Mock set this block in a monospace face; the conference has only
            Dela Gothic One and Nunito, so it uses the existing `ui` role. */}
        <div
          className="lg:w-[216px] shrink-0 p-5 lg:p-6 flex flex-col justify-center gap-4"
          style={{ background: TEAL_40 }}
        >
          <div className="flex flex-col gap-1.5">
            {/* A line each, no separator to read past — the same shape the
                conference's own when-and-where above the stub takes.

                Sentence case rather than the eyebrow role: uppercase turns a
                proper noun into OURSPACE. Bold carries the rank instead.

                Two links, two jobs: the venue's own site for what the place is,
                the map below for how to get there. */}
            <p className={cn(TYPE.caption, "font-bold leading-tight")} style={{ color: PURPLE }}>
              <span className="block">Thursday, October 15</span>
              <a
                href={VENUE_URL}
                target="_blank"
                rel="noopener"
                className={cn(LINK, "block w-fit")}
                style={{ color: PURPLE }}
              >
                {VENUE}
              </a>
            </p>
            <p className={TYPE.caption} style={{ color: PURPLE }}>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener"
                className={cn(LINK, "block w-fit")}
                style={{ color: PURPLE }}
              >
                {ADDRESS}
              </a>
            </p>
          </div>

          <ConferenceButton href={TICKETS_URL} icon={ShakaIcon} className="w-fit">
            Get tickets
          </ConferenceButton>
        </div>
      </div>

      <AgendaDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Our Place, Our Stories"
        byline={`Thursday, October 15, 2026 • ${VENUE}`}
      >
        <Paragraphs text={DETAIL} />
      </AgendaDrawer>
    </div>
  );
}
