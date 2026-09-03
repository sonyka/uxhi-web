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

import { BEIGE_40, GRAY_80, GRAY_100, GRAY_110, ORANGE_130, PURPLE, TYPE } from "../theme";
import { SectionHeading } from "./SectionHeading";

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

export interface AgendaSpeaker {
  name: string;
  /** Join key to the Sanity conferenceSpeaker record. */
  slug?: string;
  /** Headshot. Falls back to initials where there is no record or no photo. */
  photo?: string;
  title?: string;
  bio?: string;
  linkedin?: string;
}

/** What the CMS knows about a speaker, keyed by the agenda's slug. */
export type SpeakerRecord = Omit<AgendaSpeaker, "name"> & { name?: string | null };

/**
 * Layer Sanity over the static agenda.
 *
 * The name in agenda.ts is the fallback, not a placeholder — the schedule
 * renders in full with no CMS records at all, and a record only adds a photo,
 * a bio and a title. That way an unpublished or mistyped speaker record
 * degrades to a plain name rather than a hole in the day.
 */
export function withSpeakerRecords(
  slots: AgendaSlot[],
  records: SpeakerRecord[],
): AgendaSlot[] {
  const bySlug = new Map(records.filter((r) => r.slug).map((r) => [r.slug, r]));
  return slots.map((slot) => ({
    ...slot,
    sessions: slot.sessions.map((session) => ({
      ...session,
      speakers: session.speakers?.map((speaker) => {
        const record = speaker.slug ? bySlug.get(speaker.slug) : undefined;
        if (!record) return speaker;
        return {
          ...speaker,
          name: record.name || speaker.name,
          photo: record.photo ?? speaker.photo,
          title: record.title,
          bio: record.bio,
          linkedin: record.linkedin,
        };
      }),
    })),
  }));
}

export interface AgendaSession {
  /** Room name. Omit for a slot the whole conference shares. */
  room?: string;
  title: string;
  /** "Talk", "Workshop", "Lightning Talks" — omitted for doors, lunch, breaks. */
  format?: string;
  /** Presenters. Each will open a bio drawer; not yet interactive. */
  speakers?: AgendaSpeaker[];
  /**
   * Supporting text that is not a person: "Coffee and light breakfast",
   * "To be announced". Kept apart from `speakers` so it is neither underlined
   * nor given a face.
   */
  detail?: string;
}

export interface AgendaSlot {
  /** Start time as it should read: "9:00 am". */
  time: string;
  /** "15 min", "40 min" — shown under the time. Omit where the length is unremarkable. */
  duration?: string;
  sessions: AgendaSession[];
}

export function AgendaSection({ slots }: { slots: AgendaSlot[] }) {
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
              {slot.duration && (
                <div className={TYPE.fine} style={{ color: GRAY_80 }}>
                  {slot.duration}
                </div>
              )}
            </div>

            <div className="flex-1 grid gap-3 md:gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {slot.sessions.map((session) => (
                <SessionCard
                  key={`${session.room ?? "all"}-${session.title}`}
                  session={session}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>
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

function SpeakerRow({ speaker }: { speaker: AgendaSpeaker }) {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold overflow-hidden"
        style={{ backgroundColor: BEIGE_40, color: PURPLE }}
      >
        {speaker.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={speaker.photo}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          initials(speaker.name)
        )}
      </span>
      <span className="font-semibold text-[15px] leading-[1.3] text-gray-140 underline underline-offset-2">
        {speaker.name}
      </span>
    </li>
  );
}

function SessionCard({ session }: { session: AgendaSession }) {
  const { room, title, format, speakers, detail } = session;
  // Lunch carries no meta at all. Without this the card would end on a divider
  // with nothing under it.
  const hasMeta = Boolean(format || speakers?.length || detail);

  return (
    <div className="bg-beige-30 rounded-2xl px-5 py-[18px] h-full">
      {room && (
        <div
          className={`${TYPE.eyebrow} mb-1.5`}
          style={{ color: ROOM_COLORS[room] ?? GRAY_100 }}
        >
          {room}
        </div>
      )}
      <h3
        className="font-semibold text-[16px] md:text-[17px] leading-[1.35] tracking-[-0.01em] text-gray-140"
        style={{ textWrap: "balance" }}
      >
        {title}
      </h3>
      {hasMeta && (
        <>
          <div
            aria-hidden="true"
            className="border-t border-dotted my-3"
            style={{ borderColor: GRAY_80 }}
          />
          {format && (
            <p className={TYPE.fine} style={{ color: GRAY_100 }}>
              {format}
            </p>
          )}
          {speakers && speakers.length > 0 && (
            <ul className={`flex flex-col gap-2 ${format ? "mt-2" : ""}`}>
              {speakers.map((s) => (
                <SpeakerRow key={s.name} speaker={s} />
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
