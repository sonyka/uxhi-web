import type React from "react";

// Photo ticker — uses real conference photos from /conferences/2026/assets/images/.
// Vertical item dimensions per breakpoint (Figma-matched):
//   MD  (768-1023)  → 120×154px, 10px gap  → 9×164 = 1476px/set
//   LG  (1024-1279) → 160×205px, 13px gap  → 9×218 = 1962px/set
//   XL  (1280+)     → 200×256px, 16px gap  → 9×272 = 2448px/set
// Horizontal (SM): 100×128px, 8px gap → 9×108 = 972px/set
//
// Edge fade: white→transparent gradient overlay divs positioned OUTSIDE the
// overflow:hidden container. This is the same technique Framer uses on their
// own ticker components — reliable across all browsers, no backdrop-filter.

const PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function TickerPhotoV({ n }: { n: number }) {
  return (
    <div className="flex-shrink-0 rounded-2xl overflow-hidden md:w-[120px] md:h-[154px] lg:w-[160px] lg:h-[205px] xl:w-[200px] xl:h-[256px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/conferences/2026/assets/images/image-ticker-${n}.png`} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

function TickerPhotoH({ n }: { n: number }) {
  return (
    <div className="flex-shrink-0 w-[100px] h-[128px] rounded-xl overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/conferences/2026/assets/images/image-ticker-${n}.png`} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

// Shared overlay style — white gradient that fades photos into the background
const fade = (dir: "top" | "bottom" | "left" | "right"): React.CSSProperties => ({
  position: "absolute",
  zIndex: 20,
  pointerEvents: "none",
  background: {
    top:    "linear-gradient(to bottom, white 0%, transparent 100%)",
    bottom: "linear-gradient(to top,   white 0%, transparent 100%)",
    left:   "linear-gradient(to right, white 0%, transparent 100%)",
    right:  "linear-gradient(to left,  white 0%, transparent 100%)",
  }[dir],
  ...(dir === "top"    ? { top: 0,    left: 0, right: 0,  height: "96px" } : {}),
  ...(dir === "bottom" ? { bottom: 0, left: 0, right: 0,  height: "96px" } : {}),
  ...(dir === "left"   ? { left: 0,   top: 0,  bottom: 0, width:  "80px" } : {}),
  ...(dir === "right"  ? { right: 0,  top: 0,  bottom: 0, width:  "80px" } : {}),
});

export function PhotoTickerV() {
  return (
    // Outer: no overflow:hidden — gradient overlays live here so they render on top
    <div className="absolute right-6 top-0 bottom-0 hidden md:block md:w-[120px] lg:w-[160px] xl:w-[200px]">
      {/* Inner: overflow:hidden clips the scrolling track only */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="conf-ticker-v flex flex-col md:gap-[10px] lg:gap-[13px] xl:gap-[16px]">
          {[...PHOTOS, ...PHOTOS].map((n, i) => <TickerPhotoV key={i} n={n} />)}
        </div>
      </div>
      {/* Gradient overlays outside overflow:hidden */}
      <div style={fade("top")} />
      <div style={fade("bottom")} />
    </div>
  );
}

export function PhotoTickerH() {
  return (
    // Outer: no overflow:hidden
    <div className="relative h-[128px]">
      {/* Inner: overflow:hidden clips horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex gap-[8px]" style={{ animation: "conf-scroll-left 21s linear infinite" }}>
          {[...PHOTOS, ...PHOTOS].map((n, i) => <TickerPhotoH key={i} n={n} />)}
        </div>
      </div>
      {/* Gradient overlays outside overflow:hidden */}
      <div style={fade("left")} />
      <div style={fade("right")} />
    </div>
  );
}
