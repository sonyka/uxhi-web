import { SectionHeading } from "./SectionHeading";
import { GRAY_110 as GRAY, PURPLE, TYPE } from "../theme";

// Side programming — the two things that run *alongside* the talks rather than
// in a room on the schedule. Both ran in previous years (portfolio reviews in
// 2024 and 2025, headshots in 2025) and come back by request, which is why the
// eyebrow leads with that rather than with the activity names.
//
// Sits under the agenda, not inside it: the agenda is a sequence of time slots,
// and an item that runs most of the day in no room would either break the time
// gutter or misrepresent itself as a session you attend instead of a talk.
// Reading it after the schedule is also the right order — you learn what the
// day holds, then what you can step out of it to do.
//
// No time line on the cards. Times were here at first, carried over from the
// 2025 activity agenda, and came out on purpose: neither is a thing you show up
// for at an hour, and a start time invites people to plan around one. Where a
// window genuinely helps it goes in the copy as a window ("anytime during the
// afternoon"), which is the part that is true.
//
// Structure in code for the same reason the schedule is: this is the shape of
// the day, edited by someone already in the codebase. Bios and photos are
// content and live in Sanity; this does not.
const SIDE_PROGRAMMING = [
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

export function SideProgramSection() {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-1.5">
        <p className={TYPE.eyebrow} style={{ color: PURPLE }}>
          Back by popular demand
        </p>
        <SectionHeading>Beyond the sessions</SectionHeading>
      </div>
      {/*
        Stacks in lockstep with the agenda above it. Same auto-fit idea, but
        the minimum is not the same number, because the two grids are not the
        same width: an agenda slot spends its first 128px (md) or 148px (lg) on
        the time gutter plus the flex gap, and only the remainder is grid. This
        list has no gutter, so at an identical rail width it is that much wider
        and would hold two columns for a whole band after the schedule had
        already stacked.

        Both grids break when their own width drops under 2 × min + 16px gap,
        so matching the break means adding half the missing gutter to the min:
        240 + 128/2 = 304 at md, 240 + 148/2 = 314 at lg. Below md the agenda
        puts its time above the card rather than beside it, the two grids are
        the same width again, and 240 is correct as-is.

        ⚠️ These track AgendaSection's gutter (`md:w-[104px] lg:w-[124px]`) and
        its `md:gap-6`. Change either there and re-derive here, or the two
        sections start breaking at different widths again.
      */}
      <ul className="grid gap-3 md:gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(304px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(314px,1fr))] mt-1">
        {SIDE_PROGRAMMING.map((item) => (
          <li
            key={item.title}
            className="bg-beige-30 rounded-2xl px-5 py-[18px] h-full flex flex-col gap-1.5"
          >
            {/* Matches the agenda's session-title ramp exactly: these cards sit
                directly under those and read as the same kind of thing. */}
            <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] tracking-[-0.01em] text-gray-140">
              {item.title}
            </h4>
            <p className={TYPE.fine} style={{ color: GRAY }}>
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
