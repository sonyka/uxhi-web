import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { PauHanaCard } from "./PauHanaCard";
import { PURPLE, GRAY_110 as GRAY, LINK, TYPE } from "../theme";
import { VENUE_NAME, VENUE_ADDRESS } from "../constants";

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

      <PauHanaCard />

      {/* Nothing follows the pau hana stub. Two things have stood here and
          both were removed for the same reason — the page says it better
          elsewhere. First an avatar stack teasing an unannounced lineup, which
          the agenda below now names outright. Then a Get tickets / Follow pair,
          which repeated the header's standing ticket button and the footer's
          follow links a few hundred pixels from both. */}
    </div>
  );
}
