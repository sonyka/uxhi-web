"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-10-17T00:00:00");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-[clamp(1.75rem,8vw,3.75rem)] text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs lg:text-sm uppercase tracking-widest font-semibold text-teal-90">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-2 sm:gap-4 lg:gap-6">
      <Unit value={time.days} label="Days" />
      <span className="font-display text-[clamp(1.25rem,5vw,3rem)] text-white/30 pb-3">:</span>
      <Unit value={time.hours} label="Hours" />
      <span className="font-display text-[clamp(1.25rem,5vw,3rem)] text-white/30 pb-3">:</span>
      <Unit value={time.minutes} label="Min" />
      <span className="font-display text-[clamp(1.25rem,5vw,3rem)] text-white/30 pb-3">:</span>
      <Unit value={time.seconds} label="Sec" />
    </div>
  );
}
