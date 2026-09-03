// Agenda — single day, two rooms.
//
// Structure adapted from techconf.webflow.io/schedule: a time gutter down the
// left, each session a raised card to its right. That reference is
// single-track, so the two-room split is the part that had to be designed
// rather than adapted.
//
// How a slot decides its own layout:
//   • one session  → the card spans the full width (doors, keynote, lunch).
//     These are the moments the whole conference shares, and a full-width card
//     says so without needing a label.
//   • two sessions → a two-column split from md up, each card naming its room.
//     Below md the columns stack, and the room label is the only thing keeping
//     the two readable as a choice rather than a sequence — which is why every
//     card in a split slot carries one, even though the order never changes.
//
// This lives in the year folder, not components/ui/. Per CLAUDE.md the
// cross-year level holds only design-free things; an agenda is a design, and
// 2027 should be free to lay its own out differently.

import { SectionHeading } from "./SectionHeading";
import { GRAY_80, GRAY_100, GRAY_110, PURPLE, TEAL_90, TYPE } from "../theme";

export interface AgendaSession {
  /** Room name. Omit for a slot the whole conference shares. */
  room?: string;
  title: string;
  /** "Talk", "Workshop", "Lightning Talks" — omitted for doors, lunch, breaks. */
  format?: string;
  /** Presenter names, already formatted for display. */
  speakers?: string;
}

export interface AgendaSlot {
  /** Start time as it should read: "9:00 am". */
  time: string;
  /** "15 min", "1 hr" — shown under the time. */
  duration?: string;
  sessions: AgendaSession[];
}

export function AgendaSection({
  slots,
  rooms,
}: {
  slots: AgendaSlot[];
  /** Room names, in column order, for the legend. */
  rooms?: string[];
}) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>Agenda</SectionHeading>
      <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY_110 }}>
        One day, two rooms. Sessions run in parallel through the afternoon, so
        the schedule is yours to build.
      </p>

      {rooms && rooms.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1">
          {rooms.map((room) => (
            <li key={room} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: TEAL_90 }}
              />
              <span className={TYPE.fine} style={{ color: GRAY_100 }}>
                {room}
              </span>
            </li>
          ))}
        </ul>
      )}

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

            <div
              className={`flex-1 grid gap-3 md:gap-4 ${
                slot.sessions.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
              }`}
            >
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

function SessionCard({ session }: { session: AgendaSession }) {
  const { room, title, format, speakers } = session;
  // Doors, lunch and clean-up carry neither a format nor a presenter. Without
  // the divider they would end on a rule with nothing under it.
  const hasMeta = Boolean(format || speakers);

  return (
    <div className="bg-beige-30 rounded-2xl px-5 py-[18px] h-full">
      {room && (
        <div className={`${TYPE.eyebrow} mb-1.5`} style={{ color: TEAL_90 }}>
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
          <p className={TYPE.fine} style={{ color: GRAY_100 }}>
            {format}
            {format && speakers ? " · " : ""}
            {speakers && <span className="italic">{speakers}</span>}
          </p>
        </>
      )}
    </div>
  );
}
