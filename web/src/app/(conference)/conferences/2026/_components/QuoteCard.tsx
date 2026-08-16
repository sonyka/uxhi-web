import { PURPLE, GRAY_100 as GRAY } from "../theme";

// UXHI's shaka brand logo, sits atop the refrain card in place of a quotation
// mark. Two-color brand artwork (purple + yellow), so rendered as-is, untinted.
function ShakaMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/conferences/2026/assets/logos/uxhi-shaka.svg"
      alt=""
      width={66}
      height={46}
      style={{ width: 66, height: "auto" }}
    />
  );
}

// The conference refrain, framed like a testimonial card (rounded container,
// centered content, brand glyph on top). No section title/copy — just the card.
export function QuoteCard() {
  return (
    <div className="flex flex-col items-center gap-5 md:gap-6 py-8 md:py-12 text-center">
      <ShakaMark />
      <p
        className="font-semibold leading-[1.15] tracking-[-0.02em] text-[17px] sm:text-[20px] md:text-[22px] lg:text-[30px] xl:text-[36px]"
        style={{ color: PURPLE }}
      >
        E ola nā mo&#699;olelo
      </p>
      <p
        className="font-bold uppercase tracking-[0.14em] text-[12px] md:text-[13px]"
        style={{ color: GRAY }}
      >
        The stories live on
      </p>
    </div>
  );
}
