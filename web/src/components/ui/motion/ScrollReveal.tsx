"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { ElementType, ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  amount?: number;
  margin?: string;
  as?: ElementType;
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
  const Component = motion.create(as);
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
