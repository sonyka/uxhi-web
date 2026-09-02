"use client";

import { MobileTooltip } from "./MobileTooltip";

export const ALOHA_CENTERED_TOOLTIP =
  "Aloha-centered design applies Hawaiʻi's values of care, reciprocity, and respect for place to how we design for people.";

/**
 * MissionStatement - UXHI's mission sentence, with both terms explained.
 *
 * Renders the sentence only, not a heading, so each page keeps its own type
 * treatment: the homepage sets it centred in a SectionHeading, /about sets it
 * left-aligned in the mission section. The wording lives here so the two can
 * never drift apart — the mission is one statement, stated once.
 *
 * "aloha-centered design" carries the yellow underline — the one term in the
 * sentence that needs explaining, and one underline per sentence is enough.
 *
 * @see /design-system for usage examples
 */
export function MissionStatement() {
  return (
    <>
      Our mission is to champion and elevate{" "}
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
      organizations with our craft.{" "}
      <span className="inline-block">🌺</span>
    </>
  );
}
