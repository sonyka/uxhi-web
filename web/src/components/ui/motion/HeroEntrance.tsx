"use client";

import { motion, type Variants } from "framer-motion";
import { heroStaggerContainer, fadeInUp } from "@/lib/animations";
import type { ReactNode } from "react";

type HeroEntranceProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function HeroEntrance({
  children,
  className,
  variants = heroStaggerContainer,
}: HeroEntranceProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
  variants = fadeInUp,
}: HeroEntranceProps) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
