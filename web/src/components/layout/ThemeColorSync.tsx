"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * ThemeColorSync - Keeps the iOS status bar the colour of the page beneath it
 *
 * iOS paints the strip behind the dynamic island, and the bar behind Safari's
 * bottom toolbar, from theme-color. A single static value cannot stay right:
 * the top of the viewport is the page ground at rest, the header's glass once
 * scrolled, and a different beige again on a page whose first section sets its
 * own background. Any fixed choice is wrong in two of those three states.
 *
 * So read it rather than declare it. Sample the stack of elements at the very
 * top of the viewport, skip the header itself, and take the first one that
 * actually paints something; then composite the header's own background over
 * that result at its real alpha. That last step is what makes the scrolled
 * state seamless — bg-white/90 over beige-30 is a specific colour, and this
 * computes it instead of guessing at it. Reading the header's alpha rather
 * than testing a breakpoint also means the desktop capsule needs no special
 * case: it never reaches the top of the viewport, so the header measures
 * transparent there and the page colour carries through unchanged.
 *
 * The blur is ignored. It redistributes colour between neighbouring pixels
 * without changing the average, which is all a single status-bar fill needs.
 */
type Rgba = [number, number, number, number];

/**
 * Parse any computed colour by painting one pixel and reading it back.
 *
 * Not a regex: Tailwind v4 compiles an opacity modifier to color-mix, so
 * `bg-white/90` computes as `oklab(0.999 … / 0.9)`, and anything matching
 * `rgba(...)` silently misses it — which is exactly the scrolled state this
 * component exists to handle. Canvas normalises every colour syntax the
 * browser can compute, including the ones that do not exist yet.
 */
function makeParser(): (value: string) => Rgba | null {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  return (value) => {
    if (!ctx || !value) return null;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b, a / 255];
  };
}

export function ThemeColorSync() {
  const pathname = usePathname();

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) return;

    const fallback = meta.content;
    const parseColor = makeParser();
    let frame = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;

    const compute = () => {
      frame = 0;
      const header = document.querySelector("header");
      const x = Math.max(1, Math.floor(window.innerWidth / 2));

      let base: Rgba | null = null;
      for (const el of document.elementsFromPoint(x, 1)) {
        if (header?.contains(el)) continue;
        const c = parseColor(getComputedStyle(el).backgroundColor);
        if (c && c[3] > 0) {
          base = c;
          break;
        }
      }
      base ??= parseColor(getComputedStyle(document.body).backgroundColor);
      if (!base || base[3] === 0) {
        meta.content = fallback;
        return;
      }

      let [r, g, b] = base;
      const over = header ? parseColor(getComputedStyle(header).backgroundColor) : null;
      if (over && over[3] > 0) {
        const a = over[3];
        r = over[0] * a + r * (1 - a);
        g = over[1] * a + g * (1 - a);
        b = over[2] * a + b * (1 - a);
      }
      meta.content = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };

    // rAF keeps it in step during the scroll; the trailing pass catches the
    // header's own 300ms colour transition, which finishes after scrolling has
    // already stopped.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
      clearTimeout(settle);
      settle = setTimeout(compute, 340);
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [pathname]);

  return null;
}
