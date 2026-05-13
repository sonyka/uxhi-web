import type React from "react";

// Photo ticker — uses real conference photos from /conferences/2026/assets/images/.
// Vertical item dimensions per breakpoint (Figma-matched):
//   MD  (768-1023)  → 120×154px, 10px gap  → 9×164 = 1476px/set
//   LG  (1024-1279) → 160×205px, 13px gap  → 9×218 = 1962px/set
//   XL  (1280+)     → 200×256px, 16px gap  → 9×272 = 2448px/set
// Horizontal (SM): 100×128px, 8px gap → 9×108 = 972px/set
//
// Edge blur: backdrop-filter:blur() overlay divs that physically blur the
// pixel content beneath them — different from mask-image which just fades
// photos to transparent.

const PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const EDGE_BLUR = "blur(8px)";
const EDGE_SIZE = "72px"; // how tall/wide the blur overlay extends inward

function TickerPhotoV({ n }: { n: number }) {
  return (
    <div className="flex-shrink-0 rounded-2xl overflow-hidden md:w-[120px] md:h-[154px] lg:w-[160px] lg:h-[205px] xl:w-[200px] xl:h-[256px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/conferences/2026/assets/images/image-ticker-${n}.png`}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function TickerPhotoH({ n }: { n: number }) {
  return (
    <div className="flex-shrink-0 w-[100px] h-[128px] rounded-xl overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/conferences/2026/assets/images/image-ticker-${n}.png`}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// Blur overlay shared style builder
const blurOverlay = (dir: "top" | "bottom" | "left" | "right"): React.CSSProperties => {
  const gradient: Record<typeof dir, string> = {
    top:    "to bottom",
    bottom: "to top",
    left:   "to right",
    right:  "to left",
  };
  return {
    position: "absolute",
    zIndex: 10,
    pointerEvents: "none",
    backdropFilter: EDGE_BLUR,
    WebkitBackdropFilter: EDGE_BLUR,
    background: `linear-gradient(${gradient[dir]}, white 0%, transparent 100%)`,
    ...(dir === "top"    ? { top: 0, left: 0, right: 0, height: EDGE_SIZE } : {}),
    ...(dir === "bottom" ? { bottom: 0, left: 0, right: 0, height: EDGE_SIZE } : {}),
    ...(dir === "left"   ? { left: 0, top: 0, bottom: 0, width: EDGE_SIZE } : {}),
    ...(dir === "right"  ? { right: 0, top: 0, bottom: 0, width: EDGE_SIZE } : {}),
  };
};

export function PhotoTickerV() {
  return (
    <div className="absolute right-6 top-0 bottom-0 hidden md:block md:w-[120px] lg:w-[160px] xl:w-[200px] overflow-hidden" style={{ position: "absolute" }}>
      {/* Top + bottom blur edges */}
      <div style={blurOverlay("top")} />
      <div style={blurOverlay("bottom")} />
      <div className="conf-ticker-v flex flex-col md:gap-[10px] lg:gap-[13px] xl:gap-[16px]">
        {[...PHOTOS, ...PHOTOS].map((n, i) => (
          <TickerPhotoV key={i} n={n} />
        ))}
      </div>
    </div>
  );
}

export function PhotoTickerH() {
  return (
    <div className="relative overflow-hidden h-[128px]">
      {/* Left + right blur edges */}
      <div style={blurOverlay("left")} />
      <div style={blurOverlay("right")} />
      <div
        className="flex gap-[8px]"
        style={{ animation: "conf-scroll-left 21s linear infinite" }}
      >
        {[...PHOTOS, ...PHOTOS].map((n, i) => (
          <TickerPhotoH key={i} n={n} />
        ))}
      </div>
    </div>
  );
}
