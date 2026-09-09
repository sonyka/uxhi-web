import { BenefitsHeadline } from "web";

/**
 * The largest type on the site, on the ground it runs on. The component sets
 * its own copy and its own teal; the card only supplies the beige and a wide
 * enough column for the ramp to show its line breaks.
 */
export const OnTheBeigeGround = () => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: 32,
      borderRadius: 16,
      width: 840,
    }}
  >
    <BenefitsHeadline />
  </div>
);

/**
 * Where the page puts it: the lead-in between the co-chairs and the venue,
 * capped at 75% of the column so the last line lands short of the section
 * title that follows.
 */
export const AsSectionLeadIn = () => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: 32,
      borderRadius: 16,
      width: 840,
      display: "flex",
      flexDirection: "column",
      gap: 24,
    }}
  >
    <BenefitsHeadline />
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p
        style={{
          margin: 0,
          color: "var(--color-teal-90)",
          font: "700 13px/1 var(--font-bricolage), sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Saturday, October 17, 2026
      </p>
      <p style={{ margin: 0, font: "600 26px/1.3 var(--font-bricolage), sans-serif", color: "var(--color-gray-120)" }}>
        The Venue: Entrepreneurs Sandbox
      </p>
    </div>
  </div>
);
