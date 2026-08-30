"use client";

import { MobileTooltip } from "./MobileTooltip";

export const ALOHA_CENTERED_TOOLTIP =
  "Aloha-centered design applies Hawaiʻi's values — care, reciprocity, and respect for place — to how we design for people.";

export const HUMAN_CENTERED_TOOLTIP =
  "Human-centered design is an approach that prioritizes the unique needs of users.";

/**
 * MissionStatement - UXHI's mission sentence, with both terms explained.
 *
 * Renders the sentence only, not a heading, so each page keeps its own type
 * treatment: the homepage sets it centred in a SectionHeading, /about sets it
 * left-aligned in the mission section. The wording lives here so the two can
 * never drift apart — the mission is one statement, stated once.
 *
 * "aloha-centered design" carries the yellow underline; "human-centered
 * design" deliberately does not. One underline per sentence is enough.
 *
 * @see /design-system for usage examples
 */
export function MissionStatement() {
  return (
    <>
      UXHI&apos;s mission is to champion and elevate{" "}
      <MobileTooltip
        tooltip={ALOHA_CENTERED_TOOLTIP}
        href="/about#aloha-centered-design"
        className="whitespace-nowrap"
        decorationElement={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/home/hcd-underline.svg"
            alt=""
            className="absolute left-0 right-0 -bottom-2 w-full h-[9px] lg:h-[10px] pointer-events-none hidden md:block"
          />
        }
      >
        aloha-centered design
      </MobileTooltip>{" "}
      in Hawaiʻi by developing practitioners, building community, and connecting
      organizations with{" "}
      <MobileTooltip
        tooltip={HUMAN_CENTERED_TOOLTIP}
        className="whitespace-nowrap"
      >
        human-centered design
      </MobileTooltip>.{" "}
      <span className="inline-block">🌺</span>
    </>
  );
}
