/**
 * TopScrim - Softens content passing beneath the fixed header
 *
 * The header floats: the nav sits on a white pill, but the logo is a bare mark
 * on the page ground. So anything scrolling up behind it collides with it
 * directly, and a page title crossing the logo reads as two headlines printed
 * on top of each other.
 *
 * A blur rather than a colour wash, because the site has no single top colour
 * to fade to — a page can pass beige-30, white and purple-140 under the header
 * in one scroll, and a beige gradient laid over the purple section would read
 * as haze. Blurring whatever happens to be underneath makes no assumption about
 * it. The mask ramps the effect out downward so there is no visible edge where
 * the scrim ends.
 *
 * Sits at z-40: above page content, below the header's z-50.
 */
export function TopScrim() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-20 md:h-28 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)]"
    />
  );
}
