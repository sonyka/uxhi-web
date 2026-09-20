"use client";

// The speaker drawer: avatar beside the name, then bio, sessions, links.
//
// Reached from two places now — a name under a session in the agenda, and a
// tile in Meet the Speakers — and it has to be the same panel from both, since
// it is the same person either way. Written out twice it would not stay that
// way for long.
//
// The bio is followed by the speaker's sessions, the mirror of the speaker list
// in a session drawer: from either side you can step across to the other. They
// come before the social links — where to catch someone at the conference is
// the thing this page is for, and a LinkedIn is for afterwards.

import { AgendaDrawer, Paragraphs } from "./AgendaDrawer";
import { PersonAvatar } from "./PersonTile";
import { SocialLink } from "./SocialLink";
import { GlobeIcon } from "./icons";
import { GRAY_100, GRAY_120, LINK, PURPLE, TYPE } from "../theme";
import type { AgendaSpeaker, ScheduledSession } from "./agendaTypes";

export function SpeakerDrawer({
  speaker,
  sessions,
  onClose,
  onOpenSession,
}: {
  speaker: AgendaSpeaker | null;
  /** Where to catch them, in schedule order. */
  sessions: ScheduledSession[];
  onClose: () => void;
  onOpenSession: (session: ScheduledSession) => void;
}) {
  return (
    <AgendaDrawer
      open={Boolean(speaker)}
      onClose={onClose}
      byline={speaker?.title}
      title={speaker?.name ?? ""}
      media={
        speaker && speaker.kind !== "organization" ? (
          <PersonAvatar name={speaker.name} photo={speaker.photo} />
        ) : undefined
      }
    >
      {/* An organization keeps its wordmark in the body: "Anthology FINN
          Partners" cropped into a 64px circle beside the title is unreadable,
          and a wordmark is not a face — there is nothing to identify. The
          heading already carries the name. */}
      {speaker?.kind === "organization" && speaker.logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={speaker.logo}
          alt={`${speaker.name} logo`}
          className="w-full max-w-[280px] h-auto max-h-[120px] object-contain object-left"
        />
      )}
      {speaker?.bio ? (
        <Paragraphs text={speaker.bio} />
      ) : (
        <p style={{ color: GRAY_100 }}>A bio for {speaker?.name} is on the way.</p>
      )}
      {sessions.length > 0 && (
        <div className="flex flex-col gap-3 pt-1">
          <div className={TYPE.eyebrow} style={{ color: GRAY_100 }}>
            {sessions.length > 1 ? "Sessions" : "Session"}
          </div>
          <ul className="flex flex-col gap-3">
            {sessions.map((s) => (
              <SessionRow key={`${s.time}-${s.session.title}`} scheduled={s} onOpen={() => onOpenSession(s)} />
            ))}
          </ul>
        </div>
      )}
      {/* Every link the speaker has, rather than one per kind. It used to be
          LinkedIn for a person and a website for an organization, which meant
          a speaker with both showed only the LinkedIn — Sean Tangco has a site
          as well, and there was nowhere for it to go.

          Marks alone, no labels: two shapes doing the same job in the same
          row should look like it, and the aria-labels carry the meaning. */}
      {(speaker?.linkedin || speaker?.website) && (
        <div className="flex items-center gap-3">
          {speaker.linkedin && (
            <SocialLink
              network="linkedin"
              href={speaker.linkedin}
              name={speaker.name}
              size={22}
            />
          )}
          {speaker.website && (
            <a
              href={speaker.website}
              target="_blank"
              rel="noopener"
              aria-label={`${speaker.name} website`}
              // Gray-110 at rest, which is the grey the LinkedIn mark is
              // drawn in — the two sit side by side and were reading as
              // different kinds of thing purely because one was already
              // purple. Purple is the hover, so both marks now do the same
              // thing: quiet until you reach for them.
              className="inline-flex items-center w-fit text-gray-110 hover:text-purple-140 transition-colors"
            >
              <GlobeIcon size={22} />
            </a>
          )}
        </div>
      )}
    </AgendaDrawer>
  );
}

/**
 * A session on a speaker's list: the title, and when and where under it. Same
 * rule as the agenda cards — only a session with a description opens, so the
 * opening remarks read as plain text rather than a link to an empty drawer.
 */
function SessionRow({
  scheduled,
  onOpen,
}: {
  scheduled: ScheduledSession;
  onOpen: () => void;
}) {
  const { session, time } = scheduled;
  const when = [time, session.room].filter(Boolean).join(" • ");
  const whenLine = (
    <span className={`${TYPE.caption} block mt-0.5`} style={{ color: GRAY_100 }}>
      {when}
    </span>
  );

  if (!session.description) {
    return (
      <li>
        <span className="block font-semibold text-[15px] leading-[1.3]" style={{ color: GRAY_120 }}>
          {session.title}
        </span>
        {whenLine}
      </li>
    );
  }

  return (
    <li>
      <button type="button" onClick={onOpen} className="block text-left cursor-pointer">
        <span className={`${LINK} font-semibold text-[15px] leading-[1.3]`} style={{ color: PURPLE }}>
          {session.title}
        </span>
        {whenLine}
      </button>
    </li>
  );
}
