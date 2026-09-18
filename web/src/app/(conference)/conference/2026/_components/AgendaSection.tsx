"use client";

// Agenda — single day, two rooms.
//
// Structure adapted from techconf.webflow.io/schedule: a time gutter down the
// left, each session a raised card to its right. That reference is
// single-track, so the two-room split is the part that had to be designed
// rather than adapted.
//
// The split is content-driven, not breakpoint-driven: auto-fit with a 240px
// minimum, so a slot shows two columns only where two columns actually fit and
// otherwise stacks. Viewport breakpoints were wrong here — this sits in the
// conference's scroll rail, which is 569px wide at a 1440px viewport but only
// 328px at 900px, so `md:grid-cols-2` was splitting a 328px rail into two
// 156px columns and setting every title one word per line.
//
// A single-session slot needs no special case: auto-fit collapses the empty
// track, so the card fills the row on its own.

import { GRAY_80, GRAY_100, GRAY_110, ORANGE_130, PURPLE, TYPE, YELLOW_80 } from "../theme";
import { SectionHeading } from "./SectionHeading";
import { useAgendaDrawers } from "./SessionDrawer";
import { SpeakerRow } from "./SpeakerRow";
import type { AgendaSession, AgendaSlot, AgendaSpeaker } from "./agendaTypes";

export type { AgendaSession, AgendaSlot, AgendaSpeaker } from "./agendaTypes";

// Room labels carry the colour, since the rooms are named on every card and a
// legend would only repeat them. Two hues rather than two tints of one: at
// 13px uppercase the eye reads hue long before it reads a shade.
//
// Both are measured against the beige-30 card, not the page: purple-140 at
// ~13.3:1, orange-130 at ~6.2:1. The teal these started as sat at 2.3:1 and
// was the reason for the change.
const ROOM_COLORS: Record<string, string> = {
  "Purple Box": PURPLE,
  "Main Room": ORANGE_130,
};

export function AgendaSection({ slots }: { slots: AgendaSlot[] }) {
  const { openSession, openSpeaker, drawers } = useAgendaDrawers(slots);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Tighter than the section's own gap: the eyebrow belongs to the
          heading, not beside it. Separator matches the hero's date line. */}
      <div className="flex flex-col gap-1.5">
        <div className={TYPE.eyebrow} style={{ color: PURPLE }}>
          Saturday, October 17, 2026 &bull; Entrepreneurs Sandbox
        </div>
        <SectionHeading>The Lineup</SectionHeading>
      </div>
      {/* The caveat sits under the lead rather than inside it: it is a
          different register — housekeeping, not welcome — and at body size in
          the same paragraph it competes with the invitation above it. */}
      <div className="flex flex-col gap-2 max-w-[62ch]">
        <p className={TYPE.body} style={{ color: GRAY_110 }}>
          One day, two rooms. Sessions run in parallel through the afternoon, so
          the schedule is yours to build. Open a session for the full
          description and speaker bios.
        </p>
        <p className={TYPE.fine} style={{ color: GRAY_100 }}>
          Agenda subject to change.
        </p>
      </div>

      <ol className="flex flex-col gap-3 md:gap-4 mt-2">
        {slots.map((slot) => (
          <li
            key={slot.time}
            className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6"
          >
            {/* Time gutter. Fixed width so every card starts on the same line. */}
            <div className="md:w-[104px] lg:w-[124px] shrink-0 md:pt-5">
              <div
                className="font-semibold text-[15px] lg:text-[16px] leading-[1.3]"
                style={{ color: PURPLE }}
              >
                {slot.time}
              </div>
            </div>

            <div className="flex-1 grid gap-3 md:gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {slot.sessions.map((s) => (
                <SessionCard
                  key={`${s.room ?? "all"}-${s.title}`}
                  session={s}
                  onOpenSession={() => openSession({ session: s, time: slot.time })}
                  onOpenSpeaker={openSpeaker}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>

      {drawers}
    </div>
  );
}

function SessionCard({
  session,
  onOpenSession,
  onOpenSpeaker,
}: {
  session: AgendaSession;
  onOpenSession: () => void;
  onOpenSpeaker: (speaker: AgendaSpeaker) => void;
}) {
  const { room, title, badge, description, speakers, detail } = session;
  // Lunch carries no meta at all. Without this the card would end on a divider
  // with nothing under it.
  const hasMeta = Boolean(speakers?.length || detail);
  // Only a card with something to show is tappable. Doors and lunch have no
  // description, and a chevron on them would promise a drawer that never opens.
  const expandable = Boolean(description);

  return (
    <div
      className={`bg-beige-30 rounded-2xl px-5 py-[18px] h-full ${
        expandable ? "cursor-pointer transition-colors hover:bg-beige-40" : ""
      }`}
      onClick={expandable ? onOpenSession : undefined}
      role={expandable ? "button" : undefined}
      tabIndex={expandable ? 0 : undefined}
      onKeyDown={
        expandable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenSession();
              }
            }
          : undefined
      }
    >
      {room && (
        <div
          className={`${TYPE.eyebrow} mb-1.5`}
          style={{ color: ROOM_COLORS[room] ?? GRAY_100 }}
        >
          {room}
        </div>
      )}

      <div className="flex items-start gap-3">
        <h3 className={`${TYPE.itemTitle} flex-1 text-gray-140`}>
          {title}
        </h3>
        {expandable && (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-4 h-4 shrink-0 mt-[3px]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: GRAY_80 }}
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </div>

      {badge && (
        <span
          className="inline-flex items-center rounded-full px-3 py-1 mt-2 font-bold uppercase tracking-[0.06em] text-[12px]"
          style={{ background: YELLOW_80, color: PURPLE }}
        >
          {badge}
        </span>
      )}

      {hasMeta && (
        <>
          <div
            aria-hidden="true"
            className="border-t border-dotted my-3"
            style={{ borderColor: GRAY_80 }}
          />
          {speakers && speakers.length > 0 && (
            <ul className="flex flex-col gap-2">
              {speakers.map((s) => (
                <SpeakerRow key={s.name} speaker={s} onOpen={() => onOpenSpeaker(s)} />
              ))}
            </ul>
          )}
          {detail && (
            // A step lighter than the card's body but no longer gray-100, which
            // was 4.64:1 on beige — supporting copy, not disappearing copy.
            <p className={TYPE.fine} style={{ color: GRAY_110 }}>
              {detail}
            </p>
          )}
        </>
      )}
    </div>
  );
}
