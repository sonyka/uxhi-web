"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { TeamMember } from "./index";
import { LinkedInLink } from "@/components/ui/LinkedInLink";

interface TeamCardProps {
  member: TeamMember;
  isExpanded: boolean;
  onToggle: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * TeamCard - a portrait that turns over to its bio.
 *
 * It used to grow: the expanded card took col-span-2 and every card after it
 * in the grid shuffled to make room, so opening a bio moved the thing you were
 * about to read next. A flip keeps the footprint exactly as it was — the card
 * holds its cell open or closed, and nothing else on the page moves.
 *
 * The back carries the name and role above the bio, as Lattice does, minus the
 * thumbnail — the photo is what you just turned over, and at a quarter of a
 * 1200px row there is no height to spend printing it twice. The heading is the
 * real one rather than a visually hidden stand-in, so what a screen reader
 * announces and what a reader sees are the same thing.
 *
 * Both faces are always in the DOM, which is what makes the flip possible and
 * is also the trap: backface-visibility hides the far side visually but leaves
 * its links in the tab order. Whichever face is turned away therefore takes
 * aria-hidden, pointer-events-none and tabIndex -1 on everything focusable.
 */
export function TeamCard({ member, isExpanded, onToggle }: TeamCardProps) {
  const hasPhoto = !!member.photo?.asset;

  // A flip is a large rotation through depth — the motion this setting exists
  // to ask for less of. Reduced motion gets the same two faces, cross-faded.
  const reduceMotion = useReducedMotion();
  const flips = !reduceMotion;

  const rootRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const [moreBelow, setMoreBelow] = useState(false);

  // Click away to turn the card back. pointerdown rather than click, and that
  // is the whole trick: the click that opened this card is still travelling up
  // to document when this effect attaches its listener, so a click listener
  // would catch that very click and shut the card again the instant it opened.
  // pointerdown has already been and gone by then.
  //
  // Landing on another card's face closes this one and opens that one, in that
  // order, which is what it looks like it should do.
  useEffect(() => {
    if (!isExpanded) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onToggle();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isExpanded, onToggle]);

  // The scrollbar says the bio scrolls; this says which way there is more.
  // A fade at the bottom edge marks the cut and clears at the end, so it never
  // implies content that isn't there.
  const measure = useCallback(() => {
    const el = bioRef.current;
    if (!el) return;
    setMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [isExpanded, measure, member.bio]);

  const facePosition = "absolute inset-0 rounded-xl overflow-hidden";

  return (
    <div ref={rootRef} className="relative aspect-[4/5] [perspective:1200px]">
      <motion.div
        className={cn("relative w-full h-full", flips && "[transform-style:preserve-3d]")}
        animate={flips ? { rotateY: isExpanded ? 180 : 0 } : undefined}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ---- front: the portrait ---- */}
        <button
          type="button"
          onClick={onToggle}
          aria-hidden={isExpanded}
          tabIndex={isExpanded ? -1 : 0}
          aria-label={`Read ${member.name}'s bio`}
          className={cn(
            facePosition,
            "w-full text-left group cursor-pointer",
            flips ? "[backface-visibility:hidden]" : "transition-opacity duration-200",
            !flips && isExpanded && "opacity-0",
            isExpanded && "pointer-events-none"
          )}
        >
          {hasPhoto ? (
            <Image
              src={urlFor(member.photo!)
                .width(400)
                .height(500)
                .fit("crop")
                .auto("format")
                .url()}
              alt={member.photo!.alt || member.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder={member.photo!.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={member.photo!.asset?.metadata?.lqip || undefined}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-purple-30 text-purple-60 font-display text-3xl">
              {getInitials(member.name)}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-display text-base text-white leading-tight">
              {member.name}
            </h3>
            {member.role && (
              <p className="text-white/80 text-sm mt-0.5 line-clamp-1">
                {member.role}
              </p>
            )}
          </div>

          <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-teal-90/30 transition-all duration-300" />
        </button>

        {/* ---- back: the bio ---- */}
        <div
          aria-hidden={!isExpanded}
          aria-label={`${member.name}, bio`}
          className={cn(
            facePosition,
            "bg-white shadow-lg flex flex-col",
            flips
              ? "[backface-visibility:hidden] [transform:rotateY(180deg)]"
              : "transition-opacity duration-200",
            !flips && !isExpanded && "opacity-0",
            !isExpanded && "pointer-events-none"
          )}
        >
          <button
            type="button"
            onClick={onToggle}
            tabIndex={isExpanded ? 0 : -1}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-20 hover:bg-gray-30 transition-colors"
            aria-label={`Close ${member.name}'s bio`}
          >
            <svg
              className="w-4 h-4 text-gray-110"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* pr-10 on the header keeps the name clear of the close button
              floating over it. */}
          <div className="px-4 pt-4 pr-10 pb-3">
            <h3 className="font-display text-base text-purple-140 leading-tight">
              {member.name}
            </h3>
            {member.role && (
              <p className="text-gray-110 text-sm mt-0.5 leading-snug">{member.role}</p>
            )}
          </div>

          {/* pr-3 keeps the text off the scrollbar. */}
          <div className="relative flex-1 min-h-0">
            <div
              ref={bioRef}
              onScroll={measure}
              tabIndex={isExpanded ? 0 : -1}
              className="scrollbar-visible h-full overflow-y-auto pl-4 pr-3 pb-4"
            >
              {member.bio ? (
                <p className="text-gray-120 text-base leading-relaxed">{member.bio}</p>
              ) : (
                <p className="text-gray-100 text-base leading-relaxed">
                  {member.role}
                  {member.role && member.company ? " · " : ""}
                  {member.company}
                </p>
              )}
            </div>

            {/* The cut, marked. Stops short of the right edge so it fades the
                text and not the scrollbar beside it. */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 right-2 h-10",
                "bg-gradient-to-t from-white to-transparent",
                "transition-opacity duration-200",
                moreBelow ? "opacity-100" : "opacity-0"
              )}
            />
          </div>

          {(member.socialLinks?.linkedin || member.socialLinks?.website) && (
            <div className="mt-auto flex items-center gap-3 border-t border-gray-20 px-4 pb-4 pt-3">
              {member.socialLinks?.linkedin && (
                <LinkedInLink
                  href={member.socialLinks.linkedin}
                  name={member.name}
                  size={24}
                />
              )}
              {member.socialLinks?.website && (
                <a
                  href={member.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isExpanded ? 0 : -1}
                  className="text-gray-80 hover:text-teal-90 transition-colors"
                  aria-label={`${member.name}'s website`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
