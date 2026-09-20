"use client";

// One person, at the two sizes this page shows them: the portrait tile in a
// grid, and the avatar in the header of the drawer that tile opens.
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

/**
 * The same person at the top of their drawer.
 *
 * Every entrance to a bio on this page is unified on this one mark — a speaker
 * tapped from Meet the Speakers, a speaker tapped from a name in the agenda,
 * an organizer tapped from Meet the Organizers. It exists because two of those
 * three arrive from a large photograph that is still on screen behind the
 * scrim, so a portrait in the panel repeated the face rather than identifying
 * it; and the third arrives from a 28px avatar in a list, where dropping the
 * face entirely would leave the panel anonymous. An avatar answers both: it
 * confirms who opened without spending the top of the panel on a photograph
 * the reader has already seen.
 *
 * Round, not the tile's 4/5 crop — the difference in shape is what stops it
 * reading as a shrunken second copy of the tile.
 */
export function PersonAvatar({
  name,
  photo,
}: {
  name: string;
  photo?: string | null;
}) {
  if (!photo) {
    return (
      <div
        aria-hidden="true"
        className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center bg-beige-40 font-display text-lg"
        style={{ color: GRAY }}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // 2x, because a 64px avatar off a full-size Sanity asset is a portrait
      // download for a thumbnail.
      src={sized(photo, 128, 128)}
      alt=""
      className="w-16 h-16 shrink-0 rounded-full object-cover"
    />
  );
}
