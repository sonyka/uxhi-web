"use client";

import { useEffect, useRef } from "react";

export function LogoBadge() {
  const ref = useRef<HTMLImageElement>(null);
  const deg = useRef(0);

  function spin() {
    const el = ref.current;
    if (!el) return;
    deg.current += 360;
    el.style.transition = "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)";
    el.style.transform = `rotate(${deg.current}deg)`;
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      spin();
      interval = setInterval(spin, 7000);
    }, 1800);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="w-24 h-24 flex-shrink-0 cursor-pointer"
      onClick={spin}
      role="img"
      aria-label="UXHI Conference 2026 logo"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src="/conferences/2026/assets/logos/uxhicon_circular.svg"
        alt=""
        width={96}
        height={96}
        style={{ willChange: "transform", display: "block" }}
      />
    </div>
  );
}
