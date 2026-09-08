"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
  motion,
  animate,
} from "framer-motion";

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
  // Asked for explicitly rather than inherited. MotionConfig covers the
  // declarative components; this counts with the imperative animate(), which
  // does not read that context — so without this the numbers would keep
  // ticking for someone who had asked the site to hold still.
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(from);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    // The figure is the point, not the count. Reduced motion gets it at once.
    if (reduceMotion) {
      motionValue.set(to);
      return;
    }
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, motionValue, to, duration, reduceMotion]);

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
