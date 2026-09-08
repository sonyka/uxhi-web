"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Honours "reduce motion" across every animation on the site.
 *
 * Nearly everything here arrives by animating into view — headings, cards,
 * whole sections — and until now the site did that regardless of whether the
 * person had asked their device for less movement. For some people motion is
 * genuinely nauseating; for others it is simply noise they have opted out of.
 * It is also WCAG 2.3.3.
 *
 * One provider rather than a check in each of the six motion components:
 * ScrollReveal, MotionDiv, HeroEntrance, HeroItem, FadeInOnMount and CountUp
 * all read this through Framer's context, and so will anything added later —
 * which is the point. A rule that has to be remembered at each call site is a
 * rule that will be missed at one of them.
 *
 * "user" rather than "always": it follows the setting rather than overriding
 * it. Framer then drops transform and layout animations — the movement — while
 * leaving opacity alone, so content still fades in and simply stops flying
 * about. Fading is not what the setting is asking to be rid of.
 */
export function MotionPreferences({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
