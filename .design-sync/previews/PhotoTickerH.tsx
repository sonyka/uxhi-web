import { PhotoTickerH } from "web";

/**
 * ⚠ The nine ticker photos live at /conferences/2026/assets/images/ and are
 * served by the host app, so they cannot resolve in a standalone bundle. The
 * tiles keep their real box (125×160, 10px gap, rounded-xl) either way, so the
 * cadence, the doubled track and the white edge fades are all real — only the
 * photographs are absent. The wrapper below tints the empty tiles so that
 * geometry is visible; nothing here stands in for a photo.
 */
const tint = `.ds-ticker-h img { background: var(--color-beige-50); }`;

/**
 * The mobile strip. It sits directly under the logo/date row on narrow
 * screens, where the vertical rail is hidden, and scrolls left forever.
 */
export const MobileStrip = () => (
  <div className="ds-ticker-h" style={{ background: "var(--color-beige-30)", padding: 16, borderRadius: 12 }}>
    <style>{tint}</style>
    <PhotoTickerH />
  </div>
);

/**
 * On white, which is the ground the component is actually built for — its
 * edge fades are white→transparent, so they only disappear correctly here.
 * On the beige card above you can see the fade as a pale wash at each end.
 */
export const OnWhite = () => (
  <div className="ds-ticker-h" style={{ background: "#fff", padding: 16 }}>
    <style>{tint}</style>
    <PhotoTickerH />
  </div>
);
