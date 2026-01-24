"use client";

import { useState, useRef, useEffect } from "react";

interface MobileTooltipProps {
  children: React.ReactNode;
  tooltip: string;
  className?: string;
  decorationElement?: React.ReactNode;
}

export function MobileTooltip({ children, tooltip, className = "", decorationElement }: MobileTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span
      ref={ref}
      className={`relative inline-block cursor-pointer md:cursor-default ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Text with dotted underline on mobile only */}
      <span className="underline decoration-dotted decoration-gray-400 underline-offset-2 md:no-underline">
        {children}
      </span>

      {/* Decoration element (circle, underline, etc.) */}
      {decorationElement}

      {/* Tooltip - mobile only, tap to toggle */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-700 text-sm font-body font-normal leading-relaxed tracking-normal rounded-xl shadow-lg border border-gray-100 w-72 text-left z-50 whitespace-normal transition-all duration-200 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ wordSpacing: '0.1em' }}
      >
        {tooltip}
        {/* Tail */}
        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
      </span>
    </span>
  );
}
