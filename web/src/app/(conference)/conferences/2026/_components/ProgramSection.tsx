import { SectionHeading } from "./SectionHeading";
import { PURPLE, YELLOW_80 as GOLD, GRAY_110 as GRAY, TYPE } from "../theme";
import { ConferenceButton } from "./ConferenceButton";
import { TICKETS_URL } from "../constants";
import { ShakaIcon } from "./icons";

// "Share, Learn, & Connect" — the program overview: intro, an oversized headline
// of benefits, a Get Tickets CTA, and the new Pre-Conference Mixer. Styled with
// the conference brand palette (purple / teal / gold).


export function ProgramSection() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Intro */}
      <div className="flex flex-col gap-3 md:gap-4">
        <p className={TYPE.eyebrow} style={{ color: PURPLE }}>
          UXHICon &bull; Saturday, October 17, 2026
        </p>
        <SectionHeading>Share, Learn, &amp; Connect</SectionHeading>
        <p className={`${TYPE.lead} max-w-[62ch]`} style={{ color: GRAY }}>
          UXHICon is where Hawai&#699;i&rsquo;s design community gathers to exchange the knowledge, craft, and
          mo&#699;olelo we each carry.
        </p>
        <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
          Spend the day in culturally grounded keynotes, panels, and hands-on workshops &mdash; led by industry
          experts and local voices &mdash; and leave with new pilina.
        </p>
        <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
          The speaker lineup and full agenda will be announced soon.
        </p>
      </div>

      {/* The Pre-Conference Mixer — normal content (no card) */}
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className={TYPE.eyebrow} style={{ color: PURPLE }}>
            Pre-Conference &middot; Date TBA
          </span>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 font-bold uppercase tracking-[0.06em] text-[12px]"
            style={{ background: GOLD, color: PURPLE }}
          >
            New this year
          </span>
        </div>

        <SectionHeading>Pre UXHICon Mixer</SectionHeading>

        <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
          For the first time, kick off UXHICon with an evening of stories, drinks, and connection, co-hosted by
          Stories Out Loud. Experience the art of storytelling through shared mo&#699;olelo, creative perspectives,
          and meaningful conversation. Come gather, mingle, and get inspired by the stories that connect us.
        </p>

        <ConferenceButton href={TICKETS_URL} icon={ShakaIcon} className="w-fit mt-1">
          Get tickets
        </ConferenceButton>
      </div>
    </div>
  );
}
