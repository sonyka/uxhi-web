// Photo ticker — uses real conference photos from /conferences/2026/assets/images/.
// Vertical item dimensions per breakpoint (Figma-matched):
//   MD  (768-1023)  → 120×154px, 10px gap  → 9×164 = 1476px/set
//   LG  (1024-1279) → 160×205px, 13px gap  → 9×218 = 1962px/set
//   XL  (1280+)     → 200×256px, 16px gap  → 9×272 = 2448px/set
// Horizontal (SM): 120×154px, 10px gap → 9×130 = 1170px/set

const PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

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

export function PhotoTickerV() {
  return (
    <div className="absolute right-6 top-0 bottom-0 hidden md:block md:w-[120px] lg:w-[160px] xl:w-[200px] overflow-hidden">
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
    <div className="overflow-hidden h-[128px]">
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
