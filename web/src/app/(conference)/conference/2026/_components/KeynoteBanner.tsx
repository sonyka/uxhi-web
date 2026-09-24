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
// Two versions of the same sentence, split at md. The bar is one line on a
// desktop and three on a phone, so the phone gets the shorter affiliation and
// the CTA as a link inside the sentence rather than a pill under it — at that
// width a pill is a fourth line for two words, and the sentence ends up
// reading as a paragraph with a button stranded beneath it.

import { LINK, PURPLE, TEAL_40, TYPE } from "../theme";
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

// Speaker as the banner says it. The affiliation is shorter than the CMS on
// purpose — Sanity carries "Senior Vice President, Principal, and Lead Designer
// at WCIT", which is right in a bio drawer and too long for a line someone
// reads on the way past — and shorter again on a phone, where it is competing
// with the title for the same three lines.
const SPEAKER = "Reuben Chock";
const AFFILIATION = "VP & Principal at WCIT Architecture";
const AFFILIATION_SHORT = "of WCIT Architecture";

const CTA = "See the session";

export function KeynoteBanner({ slots }: { slots: AgendaSlot[] }) {
  const keynote = keynoteSession(slots);
  if (!keynote) return null;

  const openKeynote = () => window.dispatchEvent(new Event(OPEN_KEYNOTE_EVENT));

  return (
    // teal-40, the same light blue as the pau hana stub's tear-off panel.
    // The two are the page's only teal grounds, and they are the same kind of
    // thing: a strip of news laid over the cream.
    <div className="shrink-0 w-full" style={{ background: TEAL_40 }}>
      {/* Capped and guttered like the header and the card, so the copy inside
          the strip lines up with the page even though its ground runs edge to
          edge. */}
      <div className="xl:max-w-[1440px] xl:mx-auto xl:w-full px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          {/* `body`, not `caption`. This is the first sentence on the page and
              it was being read at 14px on the device most likely to meet it
              first. A role rather than a one-off size, so it keeps a ramp. */}
          {/* One colour for the whole sentence. The byline used to sit in grey
              to rank it under the announcement, but in a band this size that
              read as two strips of copy rather than one line, and the title's
              bold already carries the emphasis. */}
          <p className={TYPE.body} style={{ color: PURPLE }}>
            <span aria-hidden="true">🌟</span> The keynote is here:{" "}
            <span className="font-bold">{keynote.session.title}</span>{" "}
            by {SPEAKER}, <span className="md:hidden">{AFFILIATION_SHORT}</span>
            <span className="hidden md:inline">{AFFILIATION}</span>.{" "}
            {/* Phone CTA: inside the sentence, so the bar stays three lines
                instead of four. Same anchor and same click as the pill. */}
            <a
              href="#agenda"
              onClick={openKeynote}
              className={`md:hidden whitespace-nowrap ${LINK}`}
              style={{ color: PURPLE }}
            >
              {CTA}
            </a>
          </p>

          <ConferenceButton
            href="#agenda"
            variant="outline"
            size="sm"
            icon={ArrowRightIcon}
            iconPosition="trailing"
            className="hidden shrink-0 md:inline-flex"
            onClick={openKeynote}
          >
            {CTA}
          </ConferenceButton>
        </div>
      </div>
    </div>
  );
}
