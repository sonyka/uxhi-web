"use client";

import { useState, useMemo } from "react";
import { MemberFilters } from "./MemberFilters";
import { MemberGrid } from "./MemberGrid";
import type { DirectoryMember } from "./MemberCard";

interface MemberDirectoryProps {
  members: DirectoryMember[];
}

export function MemberDirectory({ members }: MemberDirectoryProps) {
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [openToWorkOnly, setOpenToWorkOnly] = useState(false);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Filter by open to work
      if (openToWorkOnly && !member.openToWork) {
        return false;
      }

      // Filter by focus (OR logic - member must have at least one selected focus)
      if (selectedFocus.length > 0) {
        const memberFocus = member.focus || [];
        const hasMatchingFocus = selectedFocus.some((value) =>
          memberFocus.includes(value)
        );
        if (!hasMatchingFocus) {
          return false;
        }
      }

      // Filter by experience level
      if (selectedExperience && member.experienceLevel !== selectedExperience) {
        return false;
      }

      return true;
    });
  }, [members, selectedFocus, selectedExperience, openToWorkOnly]);

  const handleClearFilters = () => {
    setSelectedFocus([]);
    setSelectedExperience(null);
    setOpenToWorkOnly(false);
  };

  return (
    <div className="space-y-6">
      <MemberFilters
        selectedFocus={selectedFocus}
        selectedExperience={selectedExperience}
        openToWorkOnly={openToWorkOnly}
        onFocusChange={setSelectedFocus}
        onExperienceChange={setSelectedExperience}
        onOpenToWorkChange={setOpenToWorkOnly}
        onClearFilters={handleClearFilters}
        totalCount={members.length}
        filteredCount={filteredMembers.length}
      />
      <MemberGrid members={filteredMembers} />
    </div>
  );
}
