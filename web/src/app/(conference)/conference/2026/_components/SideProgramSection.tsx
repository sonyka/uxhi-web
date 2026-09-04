import { SectionHeading } from "./SectionHeading";
import { GRAY_120, PURPLE, TYPE, YELLOW_80 } from "../theme";

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
}

const NEW_THIS_YEAR: SideProgramItem[] = [
  {
    title: "Print Your Story",
    // The pill carries this rather than the prose opening with "New this year!"
    // — it is a status, and saying it in both places says it twice.
    badge: "New this year",
    body:
      "A cultural activity based on ancient hula practices, led by a member of our own UXHI team. Bring a piece of fabric, paper, a tote, or a shirt you’d like to print, and we’ll have traditional tools on hand to help you leave your mark on this year’s moʻolelo.",
  },
];

const RETURNING: SideProgramItem[] = [
  {
    title: "Portfolio Reviews",
    body:
      "We’re excited to offer portfolio reviews at this year’s conference yet again! As a community of designers, we know how valuable feedback is, and we want to help you get some fresh eyes on some work you’ve been wanting a new perspective on.",
  },
  {
    title: "Professional Headshots",
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
    <li className="bg-beige-30 rounded-2xl px-5 py-[18px] h-full flex flex-col gap-1.5">
      {/* Badge beside the title, not under it. Wrapping rather than nowrap:
          this rail is 569px at a 1440px viewport and 328px at 900px, so on a
          narrow card the pill drops to its own line instead of squeezing the
          title into one word per line. */}
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
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
      {/* gray-120, not the gray-110 body copy takes on white. Beige-30 is a warm
          ground, and gray-110 lands on it at 6.68:1 — still AA, but under AAA
          and visibly washed out beside a gray-140 title. gray-120 is 9.73:1. */}
      <p className={TYPE.fine} style={{ color: GRAY_120 }}>
        {item.body}
      </p>
    </li>
  );
}

export function SideProgramSection() {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-1.5">
        <p className={TYPE.eyebrow} style={{ color: PURPLE }}>
          Alongside the talks
        </p>
        <SectionHeading>Beyond the sessions</SectionHeading>
      </div>

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
