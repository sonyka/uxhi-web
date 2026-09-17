"use client";

// Meet the Organizers.
//
// The bio opens in a drawer, not in the card. The card used to flip to reveal
// it, which could not work at any column count: a 364-character bio needs about
// 528px of height, and a portrait tile 196px wide gives it 81px — fifteen per
// cent of the bio, the rest scrolled away inside a photo. The drawer is the one
// the agenda's speakers use, so tapping a person behaves the same wherever you
// meet them on this page.
//
// That also retired two separate bio presentations: a desktop flip and a mobile
// bottom sheet, each with its own layout to keep in step.
//
// Columns cap at four via container queries rather than auto-fit. Auto-fit
// cannot hold a number — it keeps adding columns as the container grows, so a
// wide window found one more. `@container` also measures this section rather
// than the viewport, which is what the conference rail needs.
//
// Four, not the three it used to be. Organizers and speakers were drawn at the
// same 265px, which said they carried the same weight; the people presenting
// should read louder than the people running the day. Dropping to four takes an
// organizer to 195px against a speaker's 265 — a bit over half the area — and
// lands the eight of them in two clean rows.

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { GRAY_110 as GRAY, TYPE } from "../theme";
import { AgendaDrawer, Paragraphs } from "./AgendaDrawer";
import { PersonTile } from "./PersonTile";
import { SocialLink } from "./SocialLink";

// Data comes from Sanity (conferenceTeam, year-scoped) — see queries.ts.
export type Cochair = {
  _id: string;
  name: string;
  title?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  photo?: string | null; // Sanity asset URL
  photoAlt?: string | null;
};

export function CochairsSection({ cochairs }: { cochairs: Cochair[] }) {
  const [open, setOpen] = useState<Cochair | null>(null);

  if (!cochairs || cochairs.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>Meet the Organizers</SectionHeading>
      <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
        The co-chairs and volunteers bringing UXHICon 2026 to life. Tap a card to
        learn more.
      </p>

      <div className="@container mt-1">
        {/* Four across, and it stays four. The card holding this section caps
            at 1440px (CAP in page.tsx), so this container stops growing at
            828px — it is 828px at 1600 and still 828px at 2560. A fifth column
            past that point would only make the cards smaller as the page got
            wider, which is backwards.

            Each step sits one breakpoint below the speakers' matching step —
            @md where they go to two, @xl where they go to three — so an
            organizer grid is always exactly one column denser than a speaker
            grid, and the size difference holds at every width above phone.

            Both earlier attempts looked right on the 1512px laptop they were
            checked on and collapsed elsewhere, because the rail is much
            narrower than the window: 620px at a 1280px viewport, 484px at
            1024px. @2xl for four left 1280 drawing two identical 196px grids;
            @lg for three did the same to 1024 at 234px. Measure the rail, not
            the viewport.

            Below @md both fall to two across — phones, and iPad portrait,
            whose rail is only 390px. @sm was tried so the hierarchy would hold
            there too and was worse than the tie: it puts a tile at 119px, where
            every second name wraps to two lines and the scrim covers most of
            the face under it. (Worth re-measuring now that the tile carries a
            name and no role; it was rejected when it carried both.) */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4">
          {cochairs.map((c) => (
            <PersonTile
              key={c._id}
              name={c.name}
              photo={c.photo}
              photoAlt={c.photoAlt}
              onOpen={() => setOpen(c)}
            />
          ))}
        </div>
      </div>

      <AgendaDrawer
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        byline={open?.title ?? undefined}
        title={open?.name ?? ""}
      >
        {open?.bio ? (
          <Paragraphs text={open.bio} />
        ) : (
          <p style={{ color: GRAY }}>A bio for {open?.name} is on the way.</p>
        )}
        {open?.linkedin && (
          <SocialLink network="linkedin" href={open.linkedin} name={open.name} size={22} />
        )}
      </AgendaDrawer>
    </div>
  );
}
