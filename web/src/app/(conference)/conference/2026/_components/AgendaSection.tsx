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

import { useState } from "react";
import { BEIGE_40, GRAY_80, GRAY_100, GRAY_110, LINK, ORANGE_130, PURPLE, TYPE, YELLOW_80 } from "../theme";
import { SectionHeading } from "./SectionHeading";
import { AgendaDrawer, Paragraphs } from "./AgendaDrawer";
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
  const [session, setSession] = useState<AgendaSession | null>(null);
  const [speaker, setSpeaker] = useState<AgendaSpeaker | null>(null);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>Agenda</SectionHeading>
      <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY_110 }}>
        One day, two rooms. Sessions run in parallel through the afternoon, so
        the schedule is yours to build.
      </p>

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
                  onOpenSession={() => setSession(s)}
                  onOpenSpeaker={setSpeaker}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>

      <AgendaDrawer
        open={Boolean(session)}
        onClose={() => setSession(null)}
        eyebrow={session?.room}
        title={session?.title ?? ""}
      >
        {session?.description && <Paragraphs text={session.description} />}
        {session?.speakers && session.speakers.length > 0 && (
          <div className="flex flex-col gap-3 pt-1">
            <div className={TYPE.eyebrow} style={{ color: GRAY_100 }}>
              {session.speakers.length > 1 ? "Speakers" : "Speaker"}
            </div>
            <ul className="flex flex-col gap-2">
              {session.speakers.map((sp) => (
                <SpeakerRow
                  key={sp.name}
                  speaker={sp}
                  // Swap drawers rather than stacking them: two panels deep is
                  // a place you cannot back out of on a phone.
                  onOpen={() => {
                    setSession(null);
                    setSpeaker(sp);
                  }}
                />
              ))}
            </ul>
          </div>
        )}
      </AgendaDrawer>

      <AgendaDrawer
        open={Boolean(speaker)}
        onClose={() => setSpeaker(null)}
        eyebrow={speaker?.title}
        title={speaker?.name ?? ""}
      >
        {speaker?.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={speaker.photo}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        {speaker?.bio ? (
          <Paragraphs text={speaker.bio} />
        ) : (
          <p style={{ color: GRAY_100 }}>A bio for {speaker?.name} is on the way.</p>
        )}
        {speaker?.linkedin && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener"
            className={LINK}
            style={{ color: PURPLE }}
          >
            LinkedIn
          </a>
        )}
      </AgendaDrawer>
    </div>
  );
}

/** First letters of the first two words: "Kim Cinco" → KC, "Anthology" → A. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function SpeakerRow({
  speaker,
  onOpen,
}: {
  speaker: AgendaSpeaker;
  onOpen: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        // The card behind is itself clickable; without this, opening a bio
        // would also open the session drawer underneath it.
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="flex items-center gap-2 text-left cursor-pointer"
      >
        <span
          aria-hidden="true"
          className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold overflow-hidden"
          style={{ backgroundColor: BEIGE_40, color: PURPLE }}
        >
          {speaker.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={speaker.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            initials(speaker.name)
          )}
        </span>
        <span
          className={`${LINK} font-semibold text-[15px] leading-[1.3]`}
          style={{ color: PURPLE }}
        >
          {speaker.name}
        </span>
      </button>
    </li>
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
        <h3
          className="flex-1 font-semibold text-[16px] md:text-[17px] leading-[1.35] tracking-[-0.01em] text-gray-140"
          style={{ textWrap: "balance" }}
        >
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
            <p className={TYPE.fine} style={{ color: GRAY_100 }}>
              {detail}
            </p>
          )}
        </>
      )}
    </div>
  );
}
