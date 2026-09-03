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
// Columns are set by container queries rather than auto-fit: two, then three at
// 576px, then four at 672px. Auto-fit could not express a chosen count — it
// keeps adding columns as the container grows, so the count drifted with the
// window. `@container` also measures this section rather than the viewport,
// which is what the conference rail needs; the section is 620px wide at a 1280
// window and 760px at 1800, so the 672px break falls cleanly between them.

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { GRAY_110 as GRAY, TYPE } from "../theme";
import { AgendaDrawer, Paragraphs } from "./AgendaDrawer";
import { LinkedInLink } from "./LinkedInLink";

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
        <div className="grid gap-3 md:gap-4 grid-cols-1 @xs:grid-cols-2 @xl:grid-cols-3 @2xl:grid-cols-4">
          {cochairs.map((c) => (
            <button
              key={c._id}
              type="button"
              onClick={() => setOpen(c)}
              aria-label={`Read about ${c.name}`}
              className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden text-left cursor-pointer"
            >
              {c.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sized(c.photo, 600, 750)}
                  alt={c.photoAlt || c.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-beige-40 font-display text-2xl"
                  style={{ color: GRAY }}
                >
                  {initials(c.name)}
                </div>
              )}

              {/* Scrim behind the name, so it stays readable over any photo. */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="font-semibold text-[15px] leading-[1.25] text-white">
                  {c.name}
                </div>
                {c.title && (
                  <div className="text-[13px] leading-[1.3] text-white/85">
                    {c.title}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <AgendaDrawer
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        eyebrow={open?.title ?? undefined}
        title={open?.name ?? ""}
      >
        {open?.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sized(open.photo, 240, 240)}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        {open?.bio ? (
          <Paragraphs text={open.bio} />
        ) : (
          <p style={{ color: GRAY }}>A bio for {open?.name} is on the way.</p>
        )}
        {open?.linkedin && (
          <LinkedInLink href={open.linkedin} name={open.name} size={22} />
        )}
      </AgendaDrawer>
    </div>
  );
}
