import { SectionHeading } from "./SectionHeading";
import { BEIGE_50, GRAY_120, PURPLE, TYPE, YELLOW_80 } from "../theme";
import { BrowserIcon, CameraIcon, ScrollIcon } from "./icons";
import type { ComponentType } from "react";

// Side programming — the things that run *alongside* the talks rather than in a
// room on the schedule.
//
// Split into two groups rather than one list, because the two halves are not
// the same claim. Printing is new; portfolio reviews (2024, 2025) and headshots
// (2025) come back by request, and that is worth saying — it just cannot be
// said over the whole section any more. So the returning pair keeps the
// "Back by popular demand" eyebrow it earned, one level down, and the new
// activity leads on its own row above it with the badge.
//
// Sits under the agenda, not inside it: the agenda is a sequence of time slots,
// and an item that runs most of the day in no room would either break the time
// gutter or misrepresent itself as a session you attend instead of a talk.
// Reading it after the schedule is also the right order — you learn what the
// day holds, then what you can step out of it to do.
//
// No time line on the cards. Times were here at first, carried over from the
// 2025 activity agenda, and came out on purpose: none is a thing you show up
// for at an hour, and a start time invites people to plan around one. Where a
// window genuinely helps it goes in the copy as a window ("anytime during the
// afternoon"), which is the part that is true.
//
// Structure in code for the same reason the schedule is: this is the shape of
// the day, edited by someone already in the codebase. Bios and photos are
// content and live in Sanity; this does not.

interface SideProgramItem {
  title: string;
  body: string;
  /** Yellow pill beside the title, for a status rather than a label. */
  badge?: string;
  /** ʻOhe kāpala band down the right edge of the card. */
  pattern?: boolean;
  /** Small mark leading the title, naming the activity at a glance. */
  icon?: ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const NEW_THIS_YEAR: SideProgramItem[] = [
  {
    title: "Print Your Story",
    // The pill carries this rather than the prose opening with "New this year!"
    // — it is a status, and saying it in both places says it twice.
    badge: "New this year",
    pattern: true,
    icon: ScrollIcon,
    body:
      "A hands-on introduction to traditional Hawaiian printmaking, one of the oldest forms of visual storytelling. Bring a piece of fabric, paper, a tote, or a shirt you’d like to print, and we’ll have the tools on hand to help you tell your moʻolelo.",
  },
];

const RETURNING: SideProgramItem[] = [
  {
    title: "Portfolio Reviews",
    icon: BrowserIcon,
    body:
      "We’re excited to offer portfolio reviews at this year’s conference yet again! As a community of designers, we know how valuable feedback is, and we want to help you get some fresh eyes on some work you’ve been wanting a new perspective on.",
  },
  {
    title: "Professional Headshots",
    icon: CameraIcon,
    body:
      "Get a fresh headshot for your LinkedIn profile! We’ll have a photographer on site, so come as you are. Drop in anytime during the afternoon, and the final photos come to you after the conference.",
  },
];

/*
  Stacks in lockstep with the agenda above it. Same auto-fit idea, but the
  minimum is not the same number, because the two grids are not the same width:
  an agenda slot spends its first 128px (md) or 148px (lg) on the time gutter
  plus the flex gap, and only the remainder is grid. This list has no gutter, so
  at an identical rail width it is that much wider and would hold two columns
  for a whole band after the schedule had already stacked.

  Both grids break when their own width drops under 2 × min + 16px gap, so
  matching the break means adding half the missing gutter to the min:
  240 + 128/2 = 304 at md, 240 + 148/2 = 314 at lg. Below md the agenda puts its
  time above the card rather than beside it, the two grids are the same width
  again, and 240 is correct as-is.

  ⚠️ These track AgendaSection's gutter (`md:w-[104px] lg:w-[124px]`) and its
  `md:gap-6`. Change either there and re-derive here, or the two sections start
  breaking at different widths again.
*/
const GRID =
  "grid gap-3 md:gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(304px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(314px,1fr))]";

function SideProgramCard({ item }: { item: SideProgramItem }) {
  return (
    <li className="relative overflow-hidden bg-beige-30 rounded-2xl px-5 py-[18px] h-full flex flex-col gap-1.5">
      {item.pattern ? (
        // ʻOhe kāpala — the bamboo stamp the activity is about, as a band down
        // the right edge rather than a picture in the copy.
        //
        // A mask, not an image: the artwork is black on white, and masking a
        // beige-50 fill with its alpha means the colour comes from the palette
        // and follows it, instead of a recoloured PNG going stale the next time
        // the beiges move. Two steps up from the card's own beige-30 — enough
        // to read as printed on it, not enough to compete with the copy.
        //
        // Hidden below sm. The card is full width on its own row at desktop,
        // but on a phone it is the whole rail, and a band down the side there
        // costs the copy about a fifth of its measure.
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-y-0 right-0 w-[92px] md:w-[116px] lg:w-[132px] pointer-events-none"
          style={{
            backgroundColor: BEIGE_50,
            WebkitMaskImage: "url(/conferences/2026/assets/images/ohe-kapala.png)",
            maskImage: "url(/conferences/2026/assets/images/ohe-kapala.png)",
            WebkitMaskSize: "cover",
            maskSize: "cover",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      ) : null}
      {/* Badge beside the title, not under it. Wrapping rather than nowrap:
          this rail is 569px at a 1440px viewport and 328px at 900px, so on a
          narrow card the pill drops to its own line instead of squeezing the
          title into one word per line. */}
      <div className={`relative flex flex-wrap items-center gap-x-2 gap-y-1.5 ${item.pattern ? "sm:pr-[104px] md:pr-[128px] lg:pr-[144px]" : ""}`}>
        {/* Leads the title at the body's weight rather than the title's, so it
            marks the card without reading as part of the heading. Sized to the
            LinkedIn glyph in the bio drawers, which is the other small mark on
            this page. */}
        {item.icon ? <item.icon size={20} style={{ color: GRAY_120 }} /> : null}
        {/* Matches the agenda's session-title ramp exactly: these cards sit
            directly under those and read as the same kind of thing. */}
        <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] tracking-[-0.01em] text-gray-140">
          {item.title}
        </h4>
        {item.badge ? (
          <span
            className="inline-flex items-center shrink-0 rounded-full px-3 py-1 font-bold uppercase tracking-[0.06em] text-[12px]"
            style={{ background: YELLOW_80, color: PURPLE }}
          >
            {item.badge}
          </span>
        ) : null}
      </div>
      {/* `body`, not `fine`. This is the card's own copy, not a caveat under
          something else, and `fine` starts at 13px — under the 16px floor body
          text should hold on a phone, which is exactly where these cards are
          widest and most read. `body` starts at 16 and ramps to 18.

          gray-120, not the gray-110 body copy takes on white. Beige-30 is a
          warm ground, and gray-110 lands on it at 6.68:1 — still AA, but under
          AAA and visibly washed out beside a gray-140 title. gray-120 is
          9.73:1. */}
      <p
        // Narrower than the card when the band is there, so the copy stops
        // short of it rather than running under it.
        className={`relative ${TYPE.body} ${item.pattern ? "sm:pr-[104px] md:pr-[128px] lg:pr-[144px] max-w-[68ch]" : ""}`}
        style={{ color: GRAY_120 }}
      >
        {item.body}
      </p>
    </li>
  );
}

export function SideProgramSection() {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>Beyond the sessions</SectionHeading>

      <ul className={`${GRID} mt-1`}>
        {NEW_THIS_YEAR.map((item) => (
          <SideProgramCard key={item.title} item={item} />
        ))}
      </ul>

      {/* Its own eyebrow, one level down from the section's. These two ran
          before and come back by request; that was the section label until a
          new activity joined them and made it false for a third of the list. */}
      <p className={`${TYPE.eyebrow} mt-2`} style={{ color: PURPLE }}>
        Back by popular demand
      </p>
      <ul className={GRID}>
        {RETURNING.map((item) => (
          <SideProgramCard key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
}
