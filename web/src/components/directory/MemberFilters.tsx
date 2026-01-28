"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
  _id: string;
  title: string;
  slug: string;
}

interface MemberFiltersProps {
  specialties: FilterOption[];
  experienceLevels: FilterOption[];
  selectedSpecialties: string[];
  selectedExperience: string | null;
  openToWorkOnly: boolean;
  onSpecialtiesChange: (slugs: string[]) => void;
  onExperienceChange: (slug: string | null) => void;
  onOpenToWorkChange: (value: boolean) => void;
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
  options: FilterOption[];
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

  const handleOptionClick = (slug: string) => {
    if (isMulti) {
      const currentSelected = selected as string[] || [];
      if (currentSelected.includes(slug)) {
        onChange(currentSelected.filter((s) => s !== slug));
      } else {
        onChange([...currentSelected, slug]);
      }
    } else {
      onChange(selected === slug ? null : slug);
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
            ? "bg-teal-50 border-teal-200 text-teal-700"
            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
        )}
      >
        <span className="truncate">
          {selectedCount > 0
            ? isMulti
              ? `${label} (${selectedCount})`
              : options.find((o) => o.slug === selected)?.title || label
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
        <div className="absolute top-full left-0 mt-2 w-64 max-h-64 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-lg z-50">
          <div className="p-2">
            {options.map((option) => {
              const isSelected = selectedArray.includes(option.slug);
              return (
                <button
                  key={option._id}
                  onClick={() => handleOptionClick(option.slug)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors",
                    isSelected
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {isMulti && (
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                        isSelected
                          ? "bg-teal-500 border-teal-500"
                          : "border-gray-300"
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

export function MemberFilters({
  specialties,
  experienceLevels,
  selectedSpecialties,
  selectedExperience,
  openToWorkOnly,
  onSpecialtiesChange,
  onExperienceChange,
  onOpenToWorkChange,
  onClearFilters,
  totalCount,
  filteredCount,
}: MemberFiltersProps) {
  const hasActiveFilters =
    selectedSpecialties.length > 0 || selectedExperience !== null || openToWorkOnly;

  return (
    <div className="bg-white rounded-[20px] p-4 md:p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Specialty Dropdown */}
          <Dropdown
            label="Specialty"
            options={specialties}
            selected={selectedSpecialties}
            onChange={(value) => onSpecialtiesChange(value as string[])}
            isMulti
          />

          {/* Experience Level Dropdown */}
          <Dropdown
            label="Experience"
            options={experienceLevels}
            selected={selectedExperience}
            onChange={(value) => onExperienceChange(value as string | null)}
          />

          {/* Open to Work Toggle */}
          <button
            onClick={() => onOpenToWorkChange(!openToWorkOnly)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors",
              openToWorkOnly
                ? "bg-teal-500 border-teal-500 text-white"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-75",
                  openToWorkOnly ? "bg-white animate-ping" : "bg-teal-500"
                )}
              ></span>
              <span
                className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  openToWorkOnly ? "bg-white" : "bg-teal-500"
                )}
              ></span>
            </span>
            Open to Work
          </button>
        </div>

        {/* Results Count & Clear */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredCount}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalCount}</span> members
          </p>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
