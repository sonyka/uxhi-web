import { SocialGlyph } from "web";

/**
 * NOTE ON THE MARKS: both glyph files live at /conferences/2026/assets/logos/
 * and are served by the host app, which a standalone bundle has no way to
 * reach — so every cell below shows a broken-image box where the mark belongs.
 * The compositions are otherwise real; nothing here substitutes for the art.
 */

/**
 * The two marks side by side, which is the comparison the component exists to
 * settle: one 48-unit box, one stroke weight, so a solid brand tile and a
 * stroked camera stop reading as two different weights at the same size.
 */
export const ThePair = () => (
  <div
    style={{
      display: "flex",
      gap: 40,
      background: "var(--color-beige-30)",
      padding: "24px 32px",
      borderRadius: 12,
      width: "fit-content",
      font: "500 14px/1 var(--font-bricolage), sans-serif",
      color: "var(--color-gray-110)",
    }}
  >
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <SocialGlyph network="instagram" size={24} />
      Instagram
    </span>
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <SocialGlyph network="linkedin" size={24} />
      LinkedIn
    </span>
  </div>
);

/**
 * The three sizes in use: 22 in a bio drawer beside a name, 24 in the footer,
 * 28 where the mark carries a row on its own. One box, one weight, at each.
 */
export const Sizes = () => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      gap: 28,
      background: "var(--color-beige-30)",
      padding: "20px 24px",
      borderRadius: 12,
      width: "fit-content",
      font: "500 13px/1 var(--font-bricolage), sans-serif",
      color: "var(--color-gray-100)",
    }}
  >
    {[22, 24, 28].map((size) => (
      <span key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <SocialGlyph network="instagram" size={size} />
        {size}px
      </span>
    ))}
  </div>
);

/**
 * The reveal belongs to whatever ancestor carries `group`, which is what lets
 * one glyph serve a link, a drawer and a pill CTA without restating the
 * behaviour. Here the pill is the group, so the mark colours with the rest of
 * it on hover.
 */
export const InsideAGroup = () => (
  <span
    className="group"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: "var(--color-teal-90)",
      color: "var(--color-purple-140)",
      padding: "12px 20px",
      borderRadius: 999,
      font: "600 16px/1 var(--font-bricolage), sans-serif",
    }}
  >
    <SocialGlyph network="instagram" size={24} />
    Follow @uxhicommunity
  </span>
);
