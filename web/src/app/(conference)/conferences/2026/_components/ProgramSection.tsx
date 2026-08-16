import { SectionHeading } from "./SectionHeading";
import { PURPLE, YELLOW_80 as GOLD, GRAY_110 as GRAY, TYPE } from "../../../_theme";

// "Share, Learn, & Connect" — the program overview: intro, an oversized headline
// of benefits, a Get Tickets CTA, and the new Pre-Conference Mixer. Styled with
// the conference brand palette (purple / teal / gold).

const TICKETS_URL = "https://givebutter.com/uxhi-con-26-tickets";

export function ProgramSection() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Intro */}
      <div className="flex flex-col gap-3 md:gap-4">
        <p className={`font-bold uppercase tracking-[0.08em] ${TYPE.eyebrow}`} style={{ color: PURPLE }}>
          UXHICon &bull; Saturday, October 17, 2026
        </p>
        <SectionHeading>Share, Learn, &amp; Connect</SectionHeading>
        <p className={`font-normal leading-[1.4] tracking-[-0.02em] ${TYPE.lead}`} style={{ color: GRAY }}>
          UXHICon is where Hawai&#699;i&rsquo;s design community gathers to exchange the knowledge, craft, and
          mo&#699;olelo we each carry.
        </p>
        <p className={`font-normal leading-[1.5] ${TYPE.body}`} style={{ color: GRAY }}>
          Spend the day in culturally grounded keynotes, panels, and hands-on workshops &mdash; led by industry
          experts and local voices &mdash; and leave with new pilina.
        </p>
        <p className={`font-normal leading-[1.5] ${TYPE.body}`} style={{ color: GRAY }}>
          The speaker lineup and full agenda will be announced soon.
        </p>
      </div>

      {/* The Pre-Conference Mixer — normal content (no card) */}
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className={`font-bold uppercase tracking-[0.08em] ${TYPE.eyebrow}`} style={{ color: PURPLE }}>
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

        <p className={`font-normal leading-[1.5] ${TYPE.body}`} style={{ color: GRAY }}>
          For the first time, kick off UXHICon with an evening of stories, drinks, and connection, co-hosted by
          Stories Out Loud. Experience the art of storytelling through shared mo&#699;olelo, creative perspectives,
          and meaningful conversation. Come gather, mingle, and get inspired by the stories that connect us.
        </p>

        <a
          href={TICKETS_URL}
          target="_blank"
          rel="noopener"
          className={`inline-flex w-fit items-center gap-2 h-[44px] px-5 rounded-full ${TYPE.ui} font-normal text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap mt-1`}
          style={{ background: PURPLE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/conferences/2026/assets/icons/icon-shaka.svg" alt="" width={20} height={20} style={{ width: 20, height: 20, filter: "invert(1)" }} />
          Get tickets
        </a>
      </div>
    </div>
  );
}
