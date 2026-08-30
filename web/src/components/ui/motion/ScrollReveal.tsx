"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { ReactNode } from "react";

// motion.create() returns a NEW component type on each call, so calling it
// during render gave every re-render a different component identity and React
// remounted the subtree — losing DOM state and restarting the animation.
//
// framer-motion already exposes a pre-made, stable component per tag, so this
// is a lookup rather than a creation. Add a tag here if a caller needs one.
const MOTION_BY_TAG = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
} as const;

type MotionTag = keyof typeof MOTION_BY_TAG;

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  amount?: number;
  margin?: string;
  as?: MotionTag;
};

export function ScrollReveal({
  children,
  className,
  variants,
  stagger = false,
  amount = 0.3,
  margin,
  as = "div",
}: ScrollRevealProps) {
  const Component = MOTION_BY_TAG[as];
  const resolvedVariants = stagger
    ? staggerContainer
    : (variants ?? fadeInUp);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin }}
      variants={resolvedVariants}
      className={className}
    >
      {children}
    </Component>
  );
}
