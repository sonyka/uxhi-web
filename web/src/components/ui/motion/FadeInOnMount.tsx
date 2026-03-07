"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInOnMountProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeInOnMount({
  children,
  className,
  delay = 0,
}: FadeInOnMountProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
