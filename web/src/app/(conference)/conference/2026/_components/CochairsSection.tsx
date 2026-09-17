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
// Columns cap at three via container queries rather than auto-fit. Auto-fit
// cannot hold "three" — it keeps adding columns as the container grows, so a
// wide window found a fourth. `@container` also measures this section rather
// than the viewport, which is what the conference rail needs.

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
        {/* Three across, and it stays three. The card holding this section
            caps at 1440px (CAP in page.tsx), so the column stops growing at
            760px — it is 760px at 1600 and still 760px at 2560. A fourth column
            past that point would only make the cards smaller as the page got
            wider, which is backwards. The steps below three stay
            container-based, because down there the column really does change
            width. */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 @xs:grid-cols-2 @xl:grid-cols-3">
          {cochairs.map((c) => (
            <PersonTile
              key={c._id}
              name={c.name}
              title={c.title}
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
