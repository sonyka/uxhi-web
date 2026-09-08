/**
 * The first thing in the tab order, and invisible until it is focused.
 *
 * Someone navigating by keyboard or screen reader currently walks the whole
 * header — logo, seven nav items, four dropdowns, the CTA — before reaching
 * the content, on every page, every time. This offers them the content in one
 * keypress.
 *
 * sr-only until :focus, which is the convention for a reason: it is for people
 * who tab, and showing it to everyone else would put a control on the page
 * that most visitors never need.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-base focus:font-medium focus:text-purple-140 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-90"
    >
      Skip to content
    </a>
  );
}
