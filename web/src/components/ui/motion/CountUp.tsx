"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Group digits with locale separators, e.g. 110203 -> 110,203 */
  grouped?: boolean;
  className?: string;
};

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  prefix,
  suffix,
  grouped = false,
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
      const digits = grouped ? v.toLocaleString("en-US") : `${v}`;
      el.textContent = `${prefix ?? ""}${digits}${suffix ?? ""}`;
    });
    return unsubscribe;
  }, [rounded, prefix, suffix, grouped]);

  const initial = grouped ? from.toLocaleString("en-US") : `${from}`;

  return (
    <motion.span ref={ref} className={className}>
      {prefix}{initial}{suffix}
    </motion.span>
  );
}
