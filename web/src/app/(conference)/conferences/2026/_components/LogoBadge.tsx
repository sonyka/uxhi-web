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

    function startInterval() {
      interval = setInterval(spin, 12000);
    }

    // Page Visibility API: clear the interval when the tab is hidden so
    // callbacks don't queue up in the background. On return, just restart
    // the interval silently — no spin — so the badge stays still.
    function handleVisibilityChange() {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        startInterval(); // resume regular cadence, no immediate spin
      }
    }

    const timeout = setTimeout(() => {
      spin();
      startInterval();
    }, 1800);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
