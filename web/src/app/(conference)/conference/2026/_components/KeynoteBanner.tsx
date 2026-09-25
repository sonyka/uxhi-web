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
// ⚠️ Desktop only, from md. On a phone the sentence wrapped to three lines and
//    the bar took a sixth of the viewport — permanently, since it is fixed
//    above the scroll panel, so it came out of the height of every screen of
//    content behind it. Sony's call (2026-09-24): the trade is not worth it at
//    that width. This is a decision, not an unfinished responsive pass — the
//    phone copy and the inline link that used to serve it were removed with it.

import { PURPLE, TEAL_40, TYPE } from "../theme";
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

// Speaker as the banner says it. Shorter than the CMS on purpose: Sanity
// carries "Senior Vice President, Principal, and Lead Designer at WCIT", which
// is right in a bio drawer and too long for a line read on the way past.
const SPEAKER = "Reuben Chock";
const AFFILIATION = "VP & Principal at WCIT Architecture";

export function KeynoteBanner({ slots }: { slots: AgendaSlot[] }) {
  const keynote = keynoteSession(slots);
  if (!keynote) return null;

  return (
    // teal-40, the same light blue as the pau hana stub's tear-off panel.
    // The two are the page's only teal grounds, and they are the same kind of
    // thing: a strip of news laid over the cream.
    <div className="hidden md:block shrink-0 w-full" style={{ background: TEAL_40 }}>
      {/* Capped and guttered like the header and the card, so the copy inside
          the strip lines up with the page even though its ground runs edge to
          edge. */}
      <div className="xl:max-w-[1440px] xl:mx-auto xl:w-full px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          {/* One colour for the whole sentence: in a band this size a ranked
              byline read as two strips of copy sharing a row rather than one
              line, and the title's bold already carries the emphasis.

              `caption`, not `body`. It went up a role when the strip still had
              a phone version and 14px was too small to meet it there; the
              phone version is gone, and at body the bar was heavier than the
              header under it. Desktop reads this at 15 and 16. */}
          <p className={TYPE.caption} style={{ color: PURPLE }}>
            <span aria-hidden="true">🌟</span> The keynote is here:{" "}
            <span className="font-bold">{keynote.session.title}</span>{" "}
            by {SPEAKER}, {AFFILIATION}.
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
