import { useEffect, useRef, type ReactNode } from "react";
import { MobileNavMenu } from "web";

/**
 * The component is `sm:hidden` — mobile-only chrome — so this card captures at
 * 390x700 via `cfg.overrides.MobileNavMenu`, where the breakpoint lets it
 * render on its own terms. The frame below is only a phone-width ground.
 *
 * The menu is a native <details> with no `open` prop, so `open` is set on the
 * element after mount — the same state a tap produces.
 */
function PhoneFrame({ open = false, children }: { open?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) ref.current?.querySelector("details")?.setAttribute("open", "");
  }, [open]);
  return (
    <div
      ref={ref}
      className="ds-phone-frame"
      style={{
        width: 390,
        background: "var(--color-beige-30)",
        borderRadius: 20,
        padding: open ? "260px 20px 20px" : "20px",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {children}
    </div>
  );
}

/** At rest: the white pill in the mobile footer — cursor mark and caret only. */
export const RestingPill = () => (
  <PhoneFrame>
    <MobileNavMenu />
  </PhoneFrame>
);

/**
 * Tapped. One flat tier: both past years, UXHI, and the mailto — the mobile
 * footer's whole nav in one card, popping upward off the bar.
 */
export const OpenMenu = () => (
  <PhoneFrame open>
    <MobileNavMenu />
  </PhoneFrame>
);
