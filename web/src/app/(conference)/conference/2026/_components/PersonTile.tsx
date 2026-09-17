"use client";

// A portrait tile for one person: photo, name, role, opens a drawer.
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
  title,
  photo,
  photoAlt,
  onOpen,
}: {
  name: string;
  title?: string | null;
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

      {/* Scrim behind the name, so it stays readable over any photo.
          Deep top padding rather than a stronger black: the gradient needs
          runway above the text to fade out in. With a one-line organizer title
          the old p-3 was enough; a two-line speaker title pushed the first line
          clear of the dark zone and onto the photo — Sean Tangco's name landed
          on a pale shirt and Kim Cinco's on a lit cave wall. */}
      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-12 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
        <div className="font-semibold text-[15px] leading-[1.25] text-white">
          {name}
        </div>
        {/* Two lines, then ellipsis. Organizer titles are short — "Co-chair,
            Programming" — but a speaker's is a real job title, and "SVP,
            Executive Creative Director at Anthology FINN Partners" ran off the
            bottom of the tile and was clipped mid-word. The full text is the
            drawer's byline, one tap away. */}
        {title && (
          <div className={`${TYPE.caption} text-white/85 line-clamp-2`}>{title}</div>
        )}
      </div>
    </button>
  );
}
