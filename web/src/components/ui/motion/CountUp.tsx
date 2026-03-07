"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  suffix,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(from);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, motionValue, to, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unsubscribe = rounded.on("change", (v) => {
      el.textContent = suffix ? `${v}${suffix}` : `${v}`;
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      {from}{suffix}
    </motion.span>
  );
}
