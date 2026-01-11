"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { scrollReveal } from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: scrollReveal.hidden,
        visible: {
          ...scrollReveal.visible,
          transition: {
            ...(typeof scrollReveal.visible === "object" &&
            "transition" in scrollReveal.visible
              ? scrollReveal.visible.transition
              : {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
