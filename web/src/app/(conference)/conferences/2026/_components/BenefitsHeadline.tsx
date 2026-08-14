const TEAL_90 = "#09C0D7"; // primary teal (on light surfaces)

// Oversized flowing headline of conference benefits (conf-hero style), closing
// on the event name. Wraps within ~75% of the column.
const HEADLINES = [
  "Stay ahead.",
  "Build connections.",
  "Refine your craft.",
  "Advance your career.",
  "UXHICon 2026.",
];

export function BenefitsHeadline() {
  return (
    <p
      className="max-w-full md:max-w-[75%] font-normal leading-[1.1] tracking-[-0.02em] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px]"
      style={{ color: TEAL_90 }}
    >
      {HEADLINES.join(" ")}
    </p>
  );
}
