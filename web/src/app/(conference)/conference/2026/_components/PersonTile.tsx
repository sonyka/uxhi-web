"use client";

// A portrait tile for one person: photo, name, opens a drawer.
//
// Lifted out of CochairsSection when the speaker lineup wanted the same tile.
// Two grids of faces on one page that differ by a few pixels of scrim or a
// different name size read as an accident rather than a system, and this is the
// year's one "here is a person" object — so it is a component, not a pattern
// copied twice.
//
// Deliberately not told which section it is in. A speaker and an organizer are
// the same kind of thing to look at; what differs is the grid around them and
// the heading above it.
//
// The role used to sit under the name. It came off because a real job title is
// long — "SVP, Executive Creative Director at Anthology FINN Partners" — and at
// tile size it had to be clamped, so it half-said something while taking the
// bottom third of the photograph to do it. The drawer's byline says it in full
// on the first tap. What is left is a face and a name, which is what a grid of
// people is for, and the name takes `itemTitle` now that it is not sharing.

import { GRAY_110 as GRAY, TYPE } from "../theme";

function initials(name: string) {
  return name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function sized(url: string, w: number, h: number) {
  return `${url}?w=${w}&h=${h}&fit=crop&auto=format`;
}

export function PersonTile({
  name,
  photo,
  photoAlt,
  onOpen,
}: {
  name: string;
  photo?: string | null;
  photoAlt?: string | null;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read about ${name}`}
      className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden text-left cursor-pointer"
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sized(photo, 600, 750)}
          alt={photoAlt || name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-beige-40 font-display text-2xl"
          style={{ color: GRAY }}
        >
          {initials(name)}
        </div>
      )}

      {/* Scrim behind the name, so it stays readable over any photo. The
          gradient needs runway above the text to fade out in, and enough of it
          for a long name to take two lines in the narrowest column. */}
      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
        <div className={`${TYPE.itemTitle} text-white`}>{name}</div>
      </div>
    </button>
  );
}
