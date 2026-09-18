"use client";

// The session drawer, and the pairing that links it to the speaker drawer.
//
// The two point at each other — a session lists its speakers, a speaker lists
// their sessions — so whichever section opens one has to be able to open the
// other. The pair lives in one hook, and Meet the Speakers and the agenda each
// hold a copy, rather than lifting the state to the page: page.tsx is a server
// component, and a context spanning half the page to share two drawers would be
// more machinery than the feature.

import { useState } from "react";
import { GRAY_100, TYPE } from "../theme";
import { AgendaDrawer, Paragraphs } from "./AgendaDrawer";
import { SpeakerDrawer } from "./SpeakerDrawer";
import { SpeakerRow } from "./SpeakerRow";
import { sessionsFor, type AgendaSlot, type AgendaSpeaker, type ScheduledSession } from "./agendaTypes";

export function SessionDrawer({
  scheduled,
  onClose,
  onOpenSpeaker,
}: {
  scheduled: ScheduledSession | null;
  onClose: () => void;
  onOpenSpeaker: (speaker: AgendaSpeaker) => void;
}) {
  const session = scheduled?.session;

  return (
    <AgendaDrawer
      open={Boolean(scheduled)}
      onClose={onClose}
      // Time first, then room — the order the schedule itself is read in.
      // A slot the whole conference shares has no room, so the separator
      // cannot be hardcoded between them.
      byline={scheduled ? [scheduled.time, session?.room].filter(Boolean).join(" • ") : undefined}
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
              <SpeakerRow key={sp.name} speaker={sp} onOpen={() => onOpenSpeaker(sp)} />
            ))}
          </ul>
        </div>
      )}
    </AgendaDrawer>
  );
}

/**
 * Both drawers, wired to each other. Swaps rather than stacks: two panels deep
 * is a place you cannot back out of on a phone.
 */
export function useAgendaDrawers(slots: AgendaSlot[]) {
  const [session, setSession] = useState<ScheduledSession | null>(null);
  const [speaker, setSpeaker] = useState<AgendaSpeaker | null>(null);

  const drawers = (
    <>
      <SessionDrawer
        scheduled={session}
        onClose={() => setSession(null)}
        onOpenSpeaker={(sp) => {
          setSession(null);
          setSpeaker(sp);
        }}
      />
      <SpeakerDrawer
        speaker={speaker}
        sessions={speaker ? sessionsFor(slots, speaker) : []}
        onClose={() => setSpeaker(null)}
        onOpenSession={(s) => {
          setSpeaker(null);
          setSession(s);
        }}
      />
    </>
  );

  return { openSession: setSession, openSpeaker: setSpeaker, drawers };
}
