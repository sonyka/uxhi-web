import { TEAL_90, TYPE } from "../theme";

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
      className={`max-w-full md:max-w-[75%] font-normal leading-[1.1] tracking-[-0.02em] ${TYPE.display}`}
      style={{ color: TEAL_90 }}
    >
      {HEADLINES.join(" ")}
    </p>
  );
}
