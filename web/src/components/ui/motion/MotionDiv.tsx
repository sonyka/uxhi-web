"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { ReactNode } from "react";

type MotionDivProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function MotionDiv({
  children,
  className,
  variants = fadeInUp,
}: MotionDivProps) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
