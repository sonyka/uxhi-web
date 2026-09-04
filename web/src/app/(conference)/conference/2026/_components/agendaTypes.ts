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
   * Pill above the title, in the same yellow the Pau Hana stub uses for "New
   * this year". For a status the session does not have yet, not a label.
   */
  badge?: string;
  /** Long description, shown in the drawer. A card without one is not tappable. */
  description?: string;
  /** Presenters. Each opens a bio drawer. */
  speakers?: AgendaSpeaker[];
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
