import { PURPLE, GRAY_100 as GRAY } from "../theme";

// Last year, in three numbers. A sibling of QuoteCard: same centered, unboxed
// interlude, same vertical rhythm, no section heading — a breath between two
// sections rather than a section of its own.
//
// These used to sit in the sidebar under "2025 UXHICon by the numbers", where
// they were a small permanent table of last year's figures competing with this
// year's event. As an interlude they do the job they are actually good at:
// evidence, placed where someone has just finished reading who is running the
// day and is deciding whether to come.
//
// The eyebrow says 2025 out loud. Stated without a year these read as promises
// about 2026, which they are not — the lineup is still filling.
const STATS = [
  { value: "37", label: "Speakers" },
  { value: "12", label: "Sessions" },
  { value: "127", label: "Attendees" },
];

export function NumbersCard() {
  return (
    <div className="flex flex-col items-center gap-5 md:gap-6 py-8 md:py-12 text-center">
      <p
        className="font-bold uppercase tracking-[0.14em] text-[12px] md:text-[13px]"
        style={{ color: GRAY }}
      >
        2025 UXHICon by the numbers
      </p>
      {/* Wraps rather than squeezing: at the narrowest the three sit two-up and
          one, which still reads as a set. A row of three at 320px would put
          "Attendees" on two lines under a number half its width. */}
      <ul className="flex flex-wrap items-start justify-center gap-x-10 gap-y-5 md:gap-x-16 lg:gap-x-20">
        {STATS.map((s) => (
          <li key={s.label} className="flex flex-col items-center gap-1">
            <span
              className="font-semibold leading-[1.1] tracking-[-0.02em] text-[30px] sm:text-[34px] md:text-[38px] lg:text-[44px] xl:text-[52px]"
              style={{ color: PURPLE }}
            >
              {s.value}
            </span>
            <span
              className="font-bold uppercase tracking-[0.14em] text-[12px] md:text-[13px]"
              style={{ color: GRAY }}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
