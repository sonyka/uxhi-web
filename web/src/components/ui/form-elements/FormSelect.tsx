"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FormSelectOption {
  title: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  options: readonly FormSelectOption[];
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export function FormSelect({
  name,
  options,
  placeholder = "Select...",
  defaultValue = "",
  required,
  className,
  onChange,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === selectedValue);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={selectedValue} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-teal-90 focus:border-transparent flex items-center justify-between",
          selectedValue ? "text-white" : "text-purple-60/60",
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.title : placeholder}
        </span>
        <svg
          className={cn("w-4 h-4 text-purple-60/60 transition-transform flex-shrink-0 ml-2", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-purple-120 rounded-xl border border-white/20 shadow-lg z-50">
          <div className="p-2">
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors",
                    isSelected
                      ? "bg-teal-90/20 text-teal-60"
                      : "text-purple-50 hover:bg-white/10",
                  )}
                >
                  <span className="truncate">{option.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {required && !selectedValue && (
        <input
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          value={selectedValue}
          onChange={() => {}}
          required
        />
      )}
    </div>
  );
}
