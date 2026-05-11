// Photo ticker — uses real conference photos from /conferences/2026/assets/images/.
// Vertical: XL → 200×256px / 16px gap. MD/LG → 120×154px / 10px gap.
// Horizontal (SM): 120×154px / 10px gap.

const PHOTOS = [1, 2, 3, 4, 5] as const;

function TickerPhotoV({ n }: { n: number }) {
  return (
    <div className="flex-shrink-0 rounded-2xl overflow-hidden md:w-[120px] md:h-[154px] xl:w-[200px] xl:h-[256px]">
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
    <div className="flex-shrink-0 w-[120px] h-[154px] rounded-xl overflow-hidden">
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
    <div className="absolute right-0 top-0 bottom-0 hidden md:block md:w-[120px] xl:w-[200px] overflow-hidden">
      <div className="conf-ticker-v flex flex-col md:gap-[10px] xl:gap-[16px]">
        {[...PHOTOS, ...PHOTOS].map((n, i) => (
          <TickerPhotoV key={i} n={n} />
        ))}
      </div>
    </div>
  );
}

export function PhotoTickerH() {
  return (
    <div className="overflow-hidden h-[154px]">
      <div
        className="flex gap-[10px]"
        style={{ animation: "conf-scroll-left 14s linear infinite" }}
      >
        {[...PHOTOS, ...PHOTOS].map((n, i) => (
          <TickerPhotoH key={i} n={n} />
        ))}
      </div>
    </div>
  );
}
