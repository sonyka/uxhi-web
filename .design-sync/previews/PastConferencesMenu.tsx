import { useEffect, useRef, type ReactNode } from "react";
import { PastConferencesMenu } from "web";

/**
 * The menu is a native <details>; it carries no `open` prop, so the open state
 * is set the way a visitor sets it — on the element itself, after mount. No
 * markup of ours is involved.
 */
function Opened({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector("details")?.setAttribute("open", "");
  }, []);
  return <div ref={ref}>{children}</div>;
}

/** At rest in the footer bar: shaka, label, caret, on the cream ground. */
export const Resting = () => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: "20px 24px",
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
    }}
  >
    <PastConferencesMenu />
  </div>
);

/**
 * Open. The panel pops upward — it hangs off a footer at the bottom of the
 * window — so the cell leaves room above the trigger rather than below it.
 */
export const OpenUpward = () => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: "180px 24px 20px",
      borderRadius: 12,
      display: "flex",
      alignItems: "flex-end",
    }}
  >
    <Opened>
      <PastConferencesMenu />
    </Opened>
  </div>
);

/**
 * Where it actually sits: first in the footer's link row, beside the two plain
 * links, all three at the same `ui` size and grey.
 */
export const InTheFooterRow = () => (
  <div
    style={{
      background: "var(--color-beige-30)",
      padding: "180px 24px 20px",
      borderRadius: 12,
    }}
  >
    <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <Opened>
        <PastConferencesMenu />
      </Opened>
      <a
        href="https://uxhi.community"
        style={{
          color: "var(--color-gray-110)",
          font: "500 16px/1 var(--font-bricolage), sans-serif",
          textDecoration: "none",
        }}
      >
        UXHI
      </a>
      <a
        href="mailto:uxhiconference@gmail.com"
        style={{
          color: "var(--color-gray-110)",
          font: "500 16px/1 var(--font-bricolage), sans-serif",
          textDecoration: "none",
        }}
      >
        Email us
      </a>
    </nav>
  </div>
);
