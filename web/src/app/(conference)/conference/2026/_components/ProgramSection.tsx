import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
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
import { ConferenceButton } from "./ConferenceButton";
import { TICKETS_URL, VENUE_NAME, VENUE_ADDRESS } from "../constants";
import { ShakaIcon } from "./icons";

// The pau hana run of show, for the tear-off panel. Three rows at 216px, so
// the time and what happens sit on separate lines rather than in two columns.
//
// Lowercase "pm" throughout, which is how the conference writes a time
// everywhere else (the agenda's "9:00 am", the intro's "8:00 am–4:30 pm").
const PAU_HANA_RUN = [
  ["5:30 pm", "Doors open & check-in"],
  ["6:00 pm", "Program begins"],
  ["8:30 pm", "Pau"],
] as const;

// "Share, Learn, & Connect" — the program overview: intro, an oversized headline
// of benefits, a Get Tickets CTA, and the new Pre-Conference Mixer. Styled with
// the conference brand palette (purple / teal / yellow).

export function ProgramSection() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Intro */}
      <div className="flex flex-col gap-3 md:gap-4">
        <p className={TYPE.eyebrow} style={{ color: PURPLE }}>
          Share, Learn, &amp; Connect
        </p>
        <SectionHeading>UXHI Conference 2026</SectionHeading>
        {/* One paragraph, `body` rather than `lead`. These were two blocks at
            two sizes, which read as a pull quote followed by its explanation;
            they are two sentences of the same thought and now sit as one. */}
        <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
          Hawai&#699;i&rsquo;s design community gathers here to exchange the knowledge, craft, and
          mo&#699;olelo we each carry. Spend the day in culturally grounded keynotes, panels, and
          hands-on workshops led by industry experts and local voices, and leave with new pilina.
        </p>

        {/* When and where, set the way the pau hana tear-off sets them: the
            one fact a line — day, hours, venue, street — and no separators
            to read past. Date and hours take the eyebrow role, the venue a
            step quieter.

            Sits after the copy rather than under the heading. Directly beneath
            a title it reads as a subtitle and the eye runs straight past it
            into the prose; at the end of the block it is the last thing read
            and the thing acted on, which is also where the stub puts it. */}
        <div className="flex flex-col gap-1.5">
          <p className={`${TYPE.eyebrow} leading-tight`} style={{ color: PURPLE }}>
            <span className="block">Saturday, October 17, 2026</span>
            <span className="block">8:00 am&ndash;4:30 pm</span>
          </p>
          {/* The venue name jumps to #venue rather than out to a map: the
              section it lands on has the photo, the map, the accessibility
              note and the parking, so the in-page answer is the fuller one.
              The map link still sits inside that section. */}
          <p className={TYPE.caption} style={{ color: PURPLE }}>
            <a href="#venue" className={cn(LINK, "block w-fit font-bold")} style={{ color: PURPLE }}>
              {VENUE_NAME}
            </a>
            <span className="block">{VENUE_ADDRESS}</span>
          </p>
        </div>
      </div>

      {/*
        The Pre-Conference Pau Hana — a ticket stub: detail on the left, a
        tear-off panel on the right, split by a perforation.

        Everything here resolves to an existing parent token or an existing
        2026 type role. The stub shape (border, radius, dashed split) is
        layout, not new palette. Two things in the source mock were not
        carried over because they would have introduced new design values —
        see the note above each. Both are settled, not pending.
      */}
      {/* The badge straddles the card's top edge, so it is a sibling of the
          card rather than a child — the card keeps `overflow-hidden` to clip
          the tear-off panel to the rounded corners, which would also clip a
          badge placed inside it. */}
      <div className="relative">
        {/* The source mock had this pill in coral. Gold was confirmed as the
            final choice (2026-08-29): coral appears nowhere in the 2026
            palette, and YELLOW_80 ties the badge to the shaka mark. Not an
            open question — don't "restore" the coral.

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
        {/* Stub body */}
        <div className="flex-1 bg-white p-6 lg:p-8 flex flex-col gap-3 lg:gap-4">
          <div className="flex flex-col gap-1.5">
            <SectionHeading>Our Place, Our Stories</SectionHeading>
            {/* Deck under the headline: the title names the evening, this says
                what the evening is. Purple and semibold rather than a size of
                its own — it has to read as part of the heading block, and a
                third type size inside one card is a size too many. */}
            <p className={`${TYPE.body} font-semibold max-w-[62ch]`} style={{ color: PURPLE }}>
              An evening of place-based stories &amp; poetry
            </p>
          </div>

          <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
            Every place has a story. And every story has a place.
          </p>

          <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
            We&rsquo;re kicking things off with an evening of stories that connect us to place:
            the neighborhoods that raised us, the places where we found belonging, the homes
            that shaped us, and the places that live on in memory.
          </p>

          <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
            Think Moth StorySLAM meets local poetry slam: real stories, original poems, and
            creative perspectives. Come gather, mingle, have a drink, and hear the places that
            shaped us.
          </p>

          <p className={`${TYPE.caption} max-w-[62ch]`} style={{ color: GRAY_100 }}>
            Tickets include the storytelling event and drinks. Food from local vendors will be
            available for purchase. Open to everyone. No UXHICon ticket needed.
          </p>
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
          {/* When, where, then what happens. The hours used to sit with the
              date as a single range; the run of show below says it better and
              says it three times over, so the date line no longer carries one. */}
          <div className="flex flex-col gap-3">
            <p className={`${TYPE.eyebrow} leading-tight`} style={{ color: PURPLE }}>
              <span aria-hidden="true">&#128198;</span> Thursday, October 15, 2026
            </p>

            {/* Two links, two jobs: the venue's own site for what the place is,
                the map for how to get there. They were one link before, because
                the address was the only thing named. */}
            <p className={TYPE.caption} style={{ color: PURPLE }}>
              <span aria-hidden="true">&#128205;</span>{" "}
              <a
                href="https://ourspacehawaii.org"
                target="_blank"
                rel="noopener"
                className={cn(LINK, "font-bold")}
                style={{ color: PURPLE }}
              >
                OurSpace
              </a>
              <span className="block">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1052+Waimanu+St%2C+Honolulu%2C+HI+96814"
                  target="_blank"
                  rel="noopener"
                  className={LINK}
                  style={{ color: PURPLE }}
                >
                  1052 Waimanu St, Honolulu, HI 96814
                </a>
              </span>
            </p>

            {/* A stub with a run of show on it. Time bold over its own line
                rather than a two-column table: at 216px a label column leaves
                "Doors open & check-in" about two words wide. */}
            <ul className="flex flex-col gap-1.5 pt-1">
              {PAU_HANA_RUN.map(([time, what]) => (
                <li key={time} className={TYPE.caption} style={{ color: PURPLE }}>
                  <span className="font-bold">{time}</span>
                  <span className="block">{what}</span>
                </li>
              ))}
            </ul>
          </div>

          <ConferenceButton href={TICKETS_URL} icon={ShakaIcon} className="w-fit">
            Get tickets
          </ConferenceButton>
        </div>
        </div>
      </div>

      {/* Nothing follows the pau hana stub. Two things have stood here and
          both were removed for the same reason — the page says it better
          elsewhere. First an avatar stack teasing an unannounced lineup, which
          the agenda below now names outright. Then a Get tickets / Follow pair,
          which repeated the header's standing ticket button and the footer's
          follow links a few hundred pixels from both. */}
    </div>
  );
}
