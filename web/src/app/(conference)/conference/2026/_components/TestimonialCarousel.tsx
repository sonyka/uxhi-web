"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GRAY_120, PURPLE, TEAL_90, TYPE } from "../theme";
import { ArrowRightIcon } from "./icons";

// Attendee testimonials, one card at a time.
//
// Unboxed, like QuoteCard and NumbersCard: a quote on the white column with a
// teal opening mark, not a filled card. A beige panel made it read as one more
// content block in a page already full of them; bare, it reads as a voice.
// The quote itself is set a step under `lead`: large enough to read as a voice,
// not so large that thirty words run to eight lines in a half-width rail.
//
// No visible heading or eyebrow either — the quote mark says what this is.
// `label` still names the carousel for assistive tech.
//
// A native scroll-snap track, not a transform slider. Swipe on a phone and
// trackpad scroll on a laptop come for free and behave the way the platform
// does; the arrows and dots only drive the same scroll position.
//
// No autoplay. A quote you are halfway through should not leave on a timer,
// and a moving region is one more thing a screen-reader or vestibular user has
// to find the pause button for.

export interface Testimonial {
  quote: string;
  /** Who said it. Optional — these were collected anonymously. */
  attribution?: string;
}

export function TestimonialCarousel({
  testimonials,
  label = "What attendees said",
}: {
  testimonials: Testimonial[];
  /** Accessible name for the carousel. Not shown on screen. */
  label?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = testimonials.length;

  // The slide whose left edge sits closest to the scroll position is the
  // current one. Measured from each slide rather than index × width, so the
  // gap between slides can change without this going wrong.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    let nearest = 0;
    slides.forEach((slide, i) => {
      if (
        Math.abs(slide.offsetLeft - track.scrollLeft) <
        Math.abs(slides[nearest].offsetLeft - track.scrollLeft)
      ) {
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="flex flex-col gap-3 md:gap-4"
    >
      {/* `relative` makes the track each slide's offsetParent, so offsetLeft
          is measured from the track and lines up with scrollLeft. Scrollbar
          hidden: the dots are the position indicator here. */}
      <ul
        ref={trackRef}
        className="relative flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <li
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="snap-start shrink-0 w-full"
          >
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>

      {count > 1 ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                // The hit area is 24px; the visible dot inside it is not.
                className="group flex items-center justify-center h-6 min-w-6 cursor-pointer"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6" : "w-2 bg-gray-40 group-hover:bg-gray-60"
                  }`}
                  style={i === active ? { background: PURPLE } : undefined}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ArrowButton
              direction="prev"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            />
            <ArrowButton
              direction="next"
              disabled={active === count - 1}
              onClick={() => goTo(active + 1)}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="h-full flex flex-col gap-3 md:gap-4">
      {/* An opening quote in the primary teal. Decorative: the blockquote
          already says it is a quotation.

          Set in the system serif, not Bricolage. The character is a proper
          curly “ either way, but Bricolage draws it as two square slabs that
          read as straight quotes at this size. Georgia (Times, then any
          serif, where it is missing) has the teardrop form — and every device
          already has one, so a single glyph costs no webfont download. */}
      <span
        aria-hidden="true"
        className="block leading-[0.8] text-[72px] md:text-[88px] h-[0.4em]"
        style={{ color: TEAL_90, fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        &ldquo;
      </span>
      {/* 46ch, not the page's 62ch: `ch` scales with the type, and at 24px
          62ch is wider than the column. 46ch here lands on about the same
          physical measure as body copy at 62ch. */}
      <blockquote>
        <p
          className="font-medium leading-[1.4] tracking-[-0.01em] text-[18px] md:text-[19px] lg:text-[21px] xl:text-[24px] text-pretty text-gray-140 max-w-[46ch]"
        >
          {testimonial.quote}
        </p>
      </blockquote>
      {testimonial.attribution ? (
        <figcaption className={`${TYPE.caption} mt-auto`} style={{ color: GRAY_120 }}>
          {testimonial.attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      // The outline ConferenceButton's treatment, as a circle: purple hairline
      // and glyph, no fill, so it sits under the quote without out-shouting it.
      className="flex items-center justify-center size-11 rounded-full border transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-default cursor-pointer"
      style={{ borderColor: PURPLE, color: PURPLE }}
    >
      <ArrowRightIcon size={20} className={direction === "prev" ? "rotate-180" : undefined} />
    </button>
  );
}
