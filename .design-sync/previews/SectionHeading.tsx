import { SectionHeading } from "web";

/** The four section titles the 2026 page actually sets. */
export const SectionTitles = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <SectionHeading>Mo&#699;olelo</SectionHeading>
    <SectionHeading>The Venue</SectionHeading>
    <SectionHeading>Meet the Organizers</SectionHeading>
    <SectionHeading>Frequently asked questions</SectionHeading>
  </div>
);

/** The ramp dips at md on purpose — the column narrows there. */
export const InContext = () => (
  <div style={{ maxWidth: 620, display: "flex", flexDirection: "column", gap: 12 }}>
    <p
      style={{
        color: "var(--color-teal-90)",
        font: "700 13px/1 var(--font-bricolage), sans-serif",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      Saturday, October 17, 2026
    </p>
    <SectionHeading>The Lineup</SectionHeading>
    <p style={{ color: "var(--color-gray-120)", fontSize: 17, lineHeight: 1.4, margin: 0 }}>
      A day of case studies, workshops and talks from Hawai&#699;i-based practitioners working
      across design, technology, culture and community.
    </p>
  </div>
);
