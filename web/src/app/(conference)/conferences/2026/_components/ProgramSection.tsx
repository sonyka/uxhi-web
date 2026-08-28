import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import {
  PURPLE,
  PURPLE_100,
  TEAL_60,
  TEAL_40,
  YELLOW_80,
  BEIGE_40,
  GRAY_110 as GRAY,
  GRAY_100,
  GRAY_80,
  LINK,
  TYPE,
} from "../theme";
import { ConferenceButton } from "./ConferenceButton";
import { TICKETS_URL } from "../constants";
import { ShakaIcon, LinkedInIcon } from "./icons";

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
        <SectionHeading>UXHICon &bull; Saturday, October 17, 2026</SectionHeading>
        <p className={`${TYPE.lead} max-w-[62ch]`} style={{ color: GRAY }}>
          UXHICon is where Hawai&#699;i&rsquo;s design community gathers to exchange the knowledge, craft, and
          mo&#699;olelo we each carry.
        </p>
        <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
          Spend the day in culturally grounded keynotes, panels, and hands-on workshops &mdash; led by industry
          experts and local voices &mdash; and leave with new pilina.
        </p>
      </div>

      {/*
        The Pre-Conference Pau Hana — a ticket stub: detail on the left, a
        tear-off panel on the right, split by a perforation.

        Everything here resolves to an existing parent token or an existing
        2026 type role. The stub shape (border, radius, dashed split) is
        layout, not new palette. Three things in the source mock were
        deliberately NOT carried over because they would have introduced new
        design values — see the note above each.
      */}
      {/* The badge straddles the card's top edge, so it is a sibling of the
          card rather than a child — the card keeps `overflow-hidden` to clip
          the tear-off panel to the rounded corners, which would also clip a
          badge placed inside it. */}
      <div className="relative">
        {/* Mock used a coral pill; kept YELLOW_80 so the 2026 palette gains
            no new colour. Opaque fill, so the card's stroke passes behind it
            cleanly. */}
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
          <SectionHeading>Pre UXHICon Pau Hana</SectionHeading>

          <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
            For the first time, kick off UXHICon with an evening of stories, drinks, and connection at{" "}
            <a
              href="https://ourspacehawaii.org"
              target="_blank"
              rel="noopener"
              className={LINK}
              style={{ color: PURPLE }}
            >
              OurSpace
            </a>. Come gather, mingle, and get inspired by the stories that connect us.
          </p>

          <p className={`${TYPE.fine} max-w-[62ch]`} style={{ color: GRAY_100 }}>
            This event is 21+. Your ticket includes one drink, and a cash bar is available.
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
          style={{ background: TEAL_60 }}
        >
          {/* Each line is its own span rather than a hard <br>: inline while the
              card is stacked, so the text wraps to the available width, and
              block from lg where the 216px tear-off wants fixed lines. The
              punctuation that only makes sense running-on is lg:hidden. */}
          <div className="flex flex-col gap-3">
            <p className={`${TYPE.eyebrow} leading-tight`} style={{ color: PURPLE }}>
              <span className="lg:block">
                Thursday<span className="lg:hidden">,</span>
              </span>{" "}
              <span className="lg:block">October 15, 2026</span>
            </p>
            <p className={`${TYPE.fine} leading-snug`} style={{ color: PURPLE }}>
              <span className="lg:block">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1052+Waimanu+St%2C+Honolulu%2C+HI+96814"
                  target="_blank"
                  rel="noopener"
                  className={cn(LINK, "font-bold")}
                  style={{ color: PURPLE }}
                >
                  OurSpace
                </a>
                <span className="lg:hidden"> &middot;</span>
              </span>{" "}
              <span className="lg:block">
                1052 Waimanu St<span className="lg:hidden">,</span>
              </span>{" "}
              <span className="lg:block">Honolulu, HI 96814</span>
            </p>
          </div>

          <ConferenceButton href={TICKETS_URL} icon={ShakaIcon} className="w-fit">
            Get tickets
          </ConferenceButton>
        </div>
        </div>
      </div>

      {/* Lineup teaser. The avatar stack stands in for speakers not yet
          announced — three brand circles and an unknown, so the row reads as
          "more to come" rather than as real people. Decorative, hence
          aria-hidden. */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <div className="flex items-center shrink-0" aria-hidden="true">
            {[YELLOW_80, TEAL_40, PURPLE_100].map((fill) => (
              <span
                key={fill}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full -mr-3 lg:-mr-4"
                style={{ background: fill }}
              />
            ))}
            <span
              className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center ${TYPE.fine} font-bold`}
              style={{ background: BEIGE_40, color: GRAY_100 }}
            >
              +?
            </span>
          </div>

          {/* `body` rather than `lead`: lead tops out at 28px, which wrapped
              this to three lines in the ~360px the avatars leave it. */}
          <p className={cn(TYPE.body, "flex-1 font-bold")} style={{ color: PURPLE }}>
            The speaker lineup and full agenda will be announced soon.
          </p>
        </div>

        {/* Sits below rather than beside. The conference content column is only
            ~620px; putting the CTA in a third column alongside the avatars left
            the headline 85px wide across seven lines. */}
        <ConferenceButton
          href="https://www.linkedin.com/company/uxhi/"
          variant="outline"
          icon={LinkedInIcon}
          className="w-fit"
        >
          Follow @uxhi
        </ConferenceButton>
      </div>
    </div>
  );
}
