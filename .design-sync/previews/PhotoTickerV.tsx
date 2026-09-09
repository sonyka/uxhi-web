import { PhotoTickerV } from "web";

/**
 * ⚠ The nine ticker photos live at /conferences/2026/assets/images/ and are
 * served by the host app, so they cannot resolve in a standalone bundle. The
 * tiles keep their real box for the breakpoint (120×154 at md, 160×205 at lg,
 * 200×256 at xl) either way, so the column width, the 10px cadence and the
 * top/bottom white fades are all real — only the photographs are absent. The
 * wrapper tints the empty tiles so that geometry is visible; nothing here
 * stands in for a photo.
 *
 * The component positions itself absolutely against the conference sidebar, so
 * a preview has to supply the same thing the sidebar does: a relatively
 * positioned, full-height rail.
 */
const tint = `.ds-ticker-v img { background: var(--color-beige-50); }`;

/** The rail as the sidebar mounts it: pinned right, bleeding off both ends. */
export const SidebarRail = () => (
  <div
    className="ds-ticker-v"
    style={{ position: "relative", height: 460, width: 180, background: "#fff" }}
  >
    <style>{tint}</style>
    <PhotoTickerV />
  </div>
);

/**
 * In the full-width rail it really occupies, with the co-chair-side content
 * beside it. The ticker holds its own column and the copy never reflows around
 * it, which is the whole reason it is absolutely positioned.
 */
export const InSidebar = () => (
  <div
    className="ds-ticker-v"
    style={{
      position: "relative",
      height: 460,
      width: 420,
      background: "#fff",
      borderRadius: 16,
      overflow: "hidden",
    }}
  >
    <style>{tint}</style>
    <PhotoTickerV />
    <div
      style={{
        position: "absolute",
        left: 24,
        bottom: 24,
        width: 196,
        color: "var(--color-gray-110)",
        fontSize: 15,
        lineHeight: 1.5,
      }}
    >
      October 17, 2026 · Entrepreneurs Sandbox, Honolulu
    </div>
  </div>
);
