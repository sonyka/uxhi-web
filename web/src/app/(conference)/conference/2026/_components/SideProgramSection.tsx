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
// No times. They were here at first, carried over from the 2025 activity
// agenda, and came out on purpose: neither is a thing you show up for at an
// hour, and a start time invites people to plan around one.
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
      "Most of us are long overdue for a new headshot, and it is never the thing you get around to on your own. We’ll have a photographer on site, so come as you are, sit for a few minutes between sessions, and leave with a photo you are happy to put your name on.",
  },
];

export function SideProgramSection() {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-1.5">
        <p className={TYPE.eyebrow} style={{ color: PURPLE }}>
          Back by popular demand
        </p>
        <SectionHeading>More Than Talks</SectionHeading>
      </div>
      <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
        Plenty going on beyond the sessions. Both of these ran at past UXHICons,
        you asked for them back, and they return this year. Step out of a talk
        and take your turn.
      </p>

      {/* Same content-driven split as the agenda: two columns only where two
          actually fit, since this sits in the same variable-width rail. */}
      <ul className="grid gap-3 md:gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] mt-1">
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
