import { SocialLink } from "web";

/**
 * NOTE ON THE MARKS: the glyph files live at /conferences/2026/assets/logos/,
 * served by the host app and unreachable from a standalone bundle, so a
 * broken-image box stands where each mark belongs. Everything around it is
 * real.
 */

/**
 * The footer bar: the nav links at one end, UXHI’s two profiles at the other,
 * marks only — no labels, because the aria-labels carry the meaning.
 */
export const InTheFooterBar = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
      background: "var(--color-beige-30)",
      padding: "20px 24px",
      borderRadius: 12,
      width: 640,
      font: "500 16px/1 var(--font-bricolage), sans-serif",
      color: "var(--color-gray-110)",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <span>Past conferences</span>
      <span>UXHI</span>
      <span>Email us</span>
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <SocialLink
        network="instagram"
        href="https://www.instagram.com/uxhicommunity/"
        name="UXHI"
        size={24}
      />
      <SocialLink
        network="linkedin"
        href="https://www.linkedin.com/company/uxhi/"
        name="UXHI"
        size={24}
      />
    </span>
  </div>
);

/**
 * In a bio drawer, at 22px under the person's name — where `name` earns its
 * keep: the label reads "Yuka Ogawa on LinkedIn", not just "LinkedIn".
 */
export const OnABioDrawer = () => (
  <div style={{ background: "var(--color-beige-30)", padding: 24, borderRadius: 20, width: "fit-content" }}>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 10,
      background: "#fff",
      padding: 24,
      borderRadius: 16,
      width: 380,
    }}
  >
    <p
      style={{
        margin: 0,
        color: "var(--color-teal-90)",
        font: "700 13px/1 var(--font-bricolage), sans-serif",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      Conference co-chair
    </p>
    <p style={{ margin: 0, font: "600 20px/1.25 var(--font-bricolage), sans-serif", color: "var(--color-gray-140, #16191B)" }}>
      Yuka Ogawa
    </p>
    <p style={{ margin: 0, font: "400 15px/1.5 var(--font-bricolage), sans-serif", color: "var(--color-gray-110)" }}>
      Product designer in Honolulu, and one of the two people who put UXHICon on
      the calendar every year.
    </p>
    <SocialLink
      network="linkedin"
      href="https://www.linkedin.com/company/uxhi/"
      name="Yuka Ogawa"
      size={22}
    />
  </div>
  </div>
);

/**
 * Two marks in one row on a speaker card — the case the size argument was
 * settled for: a solid tile and a stroked camera at the same size must read as
 * a set, not as one heavy shape beside one light one.
 */
export const SpeakerRow = () => (
  <div style={{ background: "var(--color-beige-30)", padding: 24, borderRadius: 20, width: "fit-content" }}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      background: "#fff",
      padding: "16px 20px",
      borderRadius: 16,
      width: 420,
    }}
  >
    <span style={{ font: "600 17px/1.35 var(--font-bricolage), sans-serif", color: "var(--color-gray-120)" }}>
      Sean Tangco
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <SocialLink
        network="linkedin"
        href="https://www.linkedin.com/company/uxhi/"
        name="Sean Tangco"
        size={22}
      />
      <SocialLink
        network="instagram"
        href="https://www.instagram.com/uxhicommunity/"
        name="Sean Tangco"
        size={22}
      />
    </span>
  </div>
  </div>
);
