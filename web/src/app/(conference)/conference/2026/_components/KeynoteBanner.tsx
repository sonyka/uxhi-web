// The keynote announcement, in the band above the hero's countdown.
//
// That band was the one piece of the page with nothing in it — the right panel
// opens on 128px of padding at xl — and an announcement is exactly what wants
// to sit there: it is news, it expires, and it should be the first thing read
// on arrival without displacing "Hana Hou!" as the page's opening line.
//
// So it is chrome, not a section. No heading element (an h2 above the h1 would
// invert the document outline), no anchor of its own, and nothing in the nav.
// It is an <aside> with a label, which is what a promotional band actually is.
//
// The content is read out of the agenda rather than typed here. The banner
// cannot name a session the schedule does not have, cannot go stale when the
// title is edited, and disappears on its own the moment the Keynote badge does
// — which is what should happen to an announcement once it stops being news.

import { GRAY_110, PURPLE, TYPE, YELLOW_80 } from "../theme";
import { ConferenceButton } from "./ConferenceButton";
import { ArrowRightIcon } from "./icons";
import { keynoteSession, type AgendaSlot } from "./agendaTypes";

export function KeynoteBanner({ slots }: { slots: AgendaSlot[] }) {
  const keynote = keynoteSession(slots);
  if (!keynote) return null;

  const { session, time } = keynote;
  const speakers = (session.speakers ?? []).map((s) => s.name).join(", ");

  return (
    // Beige on the panel's white, the same surface the side-programme cards
    // use. The band reads as laid on the page rather than cut into it, which is
    // the right weight for something temporary.
    //
    // Stacks below sm and sits as a row above it: at the rail's narrow widths a
    // pill beside the copy leaves the title about four words a line.
    <aside
      aria-label="Keynote announcement"
      className="bg-beige-30 rounded-2xl p-5 md:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div className="flex flex-col gap-2 min-w-0">
        {/* The agenda's own Keynote pill, in the same yellow — someone who
            scrolls to the schedule should recognise the thing they were sent
            to look for. */}
        <span
          className="inline-flex self-start items-center rounded-full px-3 py-1 font-bold uppercase tracking-[0.06em] text-[12px]"
          style={{ background: YELLOW_80, color: PURPLE }}
        >
          Keynote announced
        </span>

        {/* itemTitle, the role the agenda gives a session name. This is the
            same object, quoted somewhere else on the page. */}
        <p className={`${TYPE.itemTitle} text-gray-140`}>{session.title}</p>

        {speakers && (
          <p className={TYPE.caption} style={{ color: GRAY_110 }}>
            {speakers} · {time}
          </p>
        )}
      </div>

      {/* #agenda, which the nav labels "Lineup" — that is where the keynote's
          own card sits, badge and all, and tapping it opens the full session
          description. #speakers would land on Reuben's face and make the
          reader hunt for the talk they were just sold.

          Outline rather than a fill. The hero's two filled pills sit directly
          under this one, and Get tickets is the page's actual conversion — a
          third filled pill above it competes with the thing it should be
          feeding. The yellow badge is already doing the work of being seen. */}
      <ConferenceButton
        href="#agenda"
        variant="outline"
        icon={ArrowRightIcon}
        iconPosition="trailing"
        className="shrink-0 self-start sm:self-auto"
      >
        See the keynote
      </ConferenceButton>
    </aside>
  );
}
