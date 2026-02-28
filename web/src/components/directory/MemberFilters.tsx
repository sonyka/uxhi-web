"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FOCUS_OPTIONS, ISLAND_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from "./constants";

import type { SortOption } from "./MemberDirectory";

interface MemberFiltersProps {
  searchQuery: string;
  selectedFocus: string[];
  selectedIsland: string[];
  selectedExperience: string | null;
  openToWorkOnly: boolean;
  sortBy: SortOption;
  onSearchChange: (value: string) => void;
  onFocusChange: (values: string[]) => void;
  onIslandChange: (values: string[]) => void;
  onExperienceChange: (value: string | null) => void;
  onOpenToWorkChange: (value: boolean) => void;
  onSortChange: (value: SortOption) => void;
  onClearFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

function Dropdown({
  label,
  options,
  selected,
  onChange,
  isMulti = false,
}: {
  label: string;
  options: readonly { title: string; value: string }[];
  selected: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
  isMulti?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedArray = isMulti
    ? (selected as string[] || [])
    : selected
    ? [selected as string]
    : [];

  const selectedCount = selectedArray.length;

  const handleOptionClick = (value: string) => {
    if (isMulti) {
      const currentSelected = selected as string[] || [];
      if (currentSelected.includes(value)) {
        onChange(currentSelected.filter((s) => s !== value));
      } else {
        onChange([...currentSelected, value]);
      }
    } else {
      onChange(selected === value ? null : value);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors min-w-[160px]",
          selectedCount > 0
            ? "bg-teal-10 border-teal-50 text-teal-120"
            : "bg-white border-gray-30 text-gray-120 hover:border-gray-40"
        )}
      >
        <span className="truncate">
          {selectedCount > 0
            ? isMulti
              ? `${label} (${selectedCount})`
              : options.find((o) => o.value === selected)?.title || label
            : label}
        </span>
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 max-h-64 overflow-y-auto bg-white rounded-xl border border-gray-30 shadow-lg z-50">
          <div className="p-2">
            {options.map((option) => {
              const isSelected = selectedArray.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors",
                    isSelected
                      ? "bg-teal-10 text-teal-120"
                      : "text-gray-120 hover:bg-gray-10"
                  )}
                >
                  {isMulti && (
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                        isSelected
                          ? "bg-teal-90 border-teal-90"
                          : "border-gray-40"
                      )}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  )}
                  <span className="truncate">{option.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "shuffle", label: "Shuffle" },
  { value: "alpha", label: "A–Z" },
  { value: "newest", label: "Newest" },
];

export function MemberFilters({
  searchQuery,
  selectedFocus,
  selectedIsland,
  selectedExperience,
  openToWorkOnly,
  sortBy,
  onSearchChange,
  onFocusChange,
  onIslandChange,
  onExperienceChange,
  onOpenToWorkChange,
  onSortChange,
  onClearFilters,
  totalCount,
  filteredCount,
}: MemberFiltersProps) {
  const hasActiveFilters =
    searchQuery.length > 0 || selectedFocus.length > 0 || selectedIsland.length > 0 || selectedExperience !== null || openToWorkOnly;

  return (
    <div className="bg-white rounded-[20px] p-4 md:p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-80 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or title..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-30 text-sm text-gray-140 placeholder:text-gray-80 focus:outline-none focus:border-teal-90 focus:ring-1 focus:ring-teal-90 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-30 flex items-center justify-center hover:bg-gray-40 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-3 h-3 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Focus Dropdown */}
          <Dropdown
            label="Focus"
            options={FOCUS_OPTIONS}
            selected={selectedFocus}
            onChange={(value) => onFocusChange(value as string[])}
            isMulti
          />

          {/* Island Dropdown */}
          <Dropdown
            label="Island"
            options={ISLAND_OPTIONS}
            selected={selectedIsland}
            onChange={(value) => onIslandChange(value as string[])}
            isMulti
          />

          {/* Experience Level Dropdown */}
          <Dropdown
            label="Experience"
            options={EXPERIENCE_LEVEL_OPTIONS}
            selected={selectedExperience}
            onChange={(value) => onExperienceChange(value as string | null)}
          />

          {/* Open to Work Toggle */}
          <button
            onClick={() => onOpenToWorkChange(!openToWorkOnly)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap",
              openToWorkOnly
                ? "bg-teal-90 border-teal-90 text-teal-130"
                : "bg-white border-gray-30 text-gray-120 hover:border-gray-40"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-75",
                  openToWorkOnly ? "bg-teal-130 animate-ping" : "bg-teal-90"
                )}
              ></span>
              <span
                className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  openToWorkOnly ? "bg-teal-130" : "bg-teal-90"
                )}
              ></span>
            </span>
            Open to Work
          </button>

          {/* Sort — pushed to the right on desktop */}
          <div className="flex items-center gap-1 bg-gray-20 rounded-lg p-1 sm:ml-auto">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                  sortBy === option.value
                    ? "bg-white text-gray-140 shadow-sm"
                    : "text-gray-110 hover:text-gray-120"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Clear */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-20">
          <p className="text-sm text-gray-110">
            Showing <span className="font-semibold text-gray-140">{filteredCount}</span> of{" "}
            <span className="font-semibold text-gray-140">{totalCount}</span> members
          </p>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-teal-100 hover:text-teal-120 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
