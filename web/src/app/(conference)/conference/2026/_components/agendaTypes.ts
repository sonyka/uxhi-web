// Agenda types and the Sanity merge.
//
// Separate from AgendaSection because that component is now a client component
// (the drawers hold state) while page.tsx merges on the server. Keeping the
// merge here means the server does not have to import from a client module to
// reach it.

export interface AgendaSpeaker {
  name: string;
  /** Join key to the Sanity conferenceSpeaker record. */
  slug?: string;
  /**
   * "organization" for a speaker that is a company rather than a person —
   * Piʻikū and Anthology. Changes the thumbnail from a circle to a square, the
   * drawer's portrait to a wordmark, and LinkedIn to a website link.
   */
  kind?: "person" | "organization";
  /** Headshot, or a square mark for an organization. Falls back to initials. */
  photo?: string;
  /** Full wordmark, shown in the drawer in place of a portrait. */
  logo?: string;
  title?: string;
  bio?: string;
  linkedin?: string;
  website?: string;
}

export interface AgendaSession {
  /** Room name. Omit for a slot the whole conference shares. */
  room?: string;
  title: string;
  /**
   * Pill after the title, in the same yellow the Pau Hana stub uses for "New
   * this year". For a status ("To be announced") or a callout that sets the
   * session apart from the rest of the day ("Keynote").
   */
  badge?: string;
  /** Long description, shown in the drawer. A card without one is not tappable. */
  description?: string;
  /** Presenters. Each opens a bio drawer. */
  speakers?: AgendaSpeaker[];
  /**
   * Set false for a slot whose speakers host rather than present — the opening
   * and closing remarks. Those are the co-chairs, already shown at full size
   * under Meet the Organizers, and without this they appear twice on one page.
   * Defaults to true: a session is part of the lineup unless it says otherwise.
   */
  inLineup?: boolean;
  /**
   * Supporting text that is not a person: "Coffee and light breakfast". Kept
   * apart from `speakers` so it is neither linked nor given a face.
   */
  detail?: string;
}

export interface AgendaSlot {
  /** Start time as it should read: "9:00 am". */
  time: string;
  sessions: AgendaSession[];
}

/**
 * The speaker lineup, derived from the agenda rather than queried separately.
 *
 * The agenda is what actually knows who is speaking, so reading the lineup out
 * of it means the two cannot disagree — a speaker dropped from the schedule
 * leaves the grid at the same moment, and a Sanity record for someone not on
 * the programme (Piʻikū still has one) never appears.
 *
 * One entry per person, however many sessions they run: the grid answers "who
 * will I hear from", and the same face three times is a worse answer.
 *
 * Only people with both a photo and a bio. A portrait grid makes an empty
 * record conspicuous in a way a 28px thumbnail in the agenda never did, and
 * three speakers are still waiting on theirs — they are in the schedule, just
 * not in the lineup yet.
 */
export function speakerLineup(slots: AgendaSlot[]): AgendaSpeaker[] {
  const seen = new Set<string>();
  const lineup: AgendaSpeaker[] = [];

  for (const slot of slots) {
    for (const session of slot.sessions) {
      if (session.inLineup === false) continue;
      for (const speaker of session.speakers ?? []) {
        const key = speaker.slug ?? speaker.name;
        if (seen.has(key)) continue;
        seen.add(key);
        if (speaker.photo && speaker.bio) lineup.push(speaker);
      }
    }
  }

  return lineup;
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
          kind: record.kind ?? speaker.kind,
          photo: record.photo ?? speaker.photo,
          logo: record.logo,
          title: record.title,
          bio: record.bio,
          linkedin: record.linkedin,
          website: record.website,
        };
      }),
    })),
  }));
}

/**
 * A session with the time it runs. Time lives on the slot rather than the
 * session, so a session lifted out of the schedule — into a drawer, or onto a
 * speaker's list — has to carry it along or it cannot say when it is.
 */
export interface ScheduledSession {
  session: AgendaSession;
  time: string;
}

/**
 * The keynote, if the day has one.
 *
 * Found by the badge rather than by time or title: "Keynote" is already how the
 * schedule marks it, so reading that back means a banner elsewhere on the page
 * cannot announce a different session than the agenda lists. Remove the badge
 * and everything downstream stops rendering rather than going stale.
 *
 * First match wins. A day with two keynotes is a different design problem.
 */
export function keynoteSession(slots: AgendaSlot[]): ScheduledSession | undefined {
  for (const slot of slots) {
    const session = slot.sessions.find((s) => s.badge?.toLowerCase() === "keynote");
    if (session) return { session, time: slot.time };
  }
  return undefined;
}

/**
 * Every session a speaker appears on, in schedule order. Matched on slug, then
 * name, the same key the lineup dedupes on.
 *
 * Hosted slots count too. `inLineup: false` keeps the co-chairs out of the
 * speaker grid, but the opening remarks are still theirs to point at.
 */
export function sessionsFor(slots: AgendaSlot[], speaker: AgendaSpeaker): ScheduledSession[] {
  const key = speaker.slug ?? speaker.name;
  return slots.flatMap((slot) =>
    slot.sessions
      .filter((session) => session.speakers?.some((s) => (s.slug ?? s.name) === key))
      .map((session) => ({ session, time: slot.time })),
  );
}
