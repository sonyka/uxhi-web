"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormCheckboxProps {
  name: string;
  value?: string;
  label: string;
  defaultChecked?: boolean;
  className?: string;
}

export function FormCheckbox({
  name,
  value,
  label,
  defaultChecked = false,
  className,
}: FormCheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />
      {/* Custom checkbox */}
      <div
        className={cn(
          "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
          checked
            ? "bg-teal-500 border-teal-500"
            : "border-white/30 bg-white/5",
        )}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-purple-200 group-hover:text-white transition-colors text-sm">{label}</span>
    </label>
  );
}
