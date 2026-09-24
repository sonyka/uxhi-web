"use client";

// The keynote announcement strip, across the top of the view.
//
// Sits above the header rather than inside the hero, so it is the first thing
// on the page at every scroll position and does not push "Hana Hou!" down the
// column. That is what an announcement bar is: page chrome that outranks the
// layout for as long as the news is news, and then leaves.
//
// It leaves on its own. The strip is derived from the schedule — it renders
// only while some session is badged "Keynote", and takes that session's title
// from the agenda rather than repeating it here. Drop the badge and the strip
// goes with it.
//
// The byline is written out rather than read from the speaker record, and the
// two deliberately differ: Sanity carries Reuben's full title ("Senior Vice
// President, Principal, and Lead Designer at WCIT"), which is right in a bio
// drawer and too long for a line someone reads on the way past.

import { GRAY_110, PURPLE, TEAL_20, TYPE } from "../theme";
import { ConferenceButton } from "./ConferenceButton";
import { ArrowRightIcon } from "./icons";
import { keynoteSession, type AgendaSlot } from "./agendaTypes";

/**
 * Asks the agenda to open the keynote drawer.
 *
 * A window event rather than lifted state: page.tsx is a server component, and
 * the drawers are deliberately owned by the sections that show them (see
 * useAgendaDrawers) — a context spanning the page to carry one click would be
 * more machinery than the feature. AgendaSection is the only listener, so the
 * drawer cannot open twice.
 *
 * The CTA is still a real anchor to #agenda underneath, so the scroll happens
 * with or without this: without JS you land on the lineup, with it the keynote
 * is already open when you get there.
 */
export const OPEN_KEYNOTE_EVENT = "uxhicon26:open-keynote";

/** Speaker as the banner says it. See the note above on why this is not the CMS value. */
const SPEAKER = "Reuben J.D.Y. Chock, VP & Principal at WCIT Architecture";

export function KeynoteBanner({ slots }: { slots: AgendaSlot[] }) {
  const keynote = keynoteSession(slots);
  if (!keynote) return null;

  return (
    <div className="shrink-0 w-full" style={{ background: TEAL_20 }}>
      {/* Capped and guttered like the header and the card, so the copy inside
          the strip lines up with the page even though its ground runs edge to
          edge. */}
      <div className="xl:max-w-[1440px] xl:mx-auto xl:w-full px-6 py-2.5">
        {/* Wraps rather than truncates. This is one long sentence, and on a
            phone it is three lines with the pill under them — a strip that
            elides its own announcement is not worth the row. */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          <p className={TYPE.caption} style={{ color: GRAY_110 }}>
            <span aria-hidden="true">🌟</span>{" "}
            <span style={{ color: PURPLE }}>The keynote is here:</span>{" "}
            <span className="font-bold" style={{ color: PURPLE }}>
              {keynote.session.title}
            </span>{" "}
            by {SPEAKER}.
          </p>

          <ConferenceButton
            href="#agenda"
            variant="outline"
            size="sm"
            icon={ArrowRightIcon}
            iconPosition="trailing"
            className="shrink-0"
            onClick={() => window.dispatchEvent(new Event(OPEN_KEYNOTE_EVENT))}
          >
            See the session
          </ConferenceButton>
        </div>
      </div>
    </div>
  );
}
