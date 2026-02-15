"use client";

import { useState, useMemo, useRef } from "react";
import { MemberFilters } from "./MemberFilters";
import { MemberGrid } from "./MemberGrid";
import { MemberDrawer } from "./MemberDrawer";
import type { DirectoryMember } from "./MemberCard";

export type SortOption = "shuffle" | "alpha" | "newest";

// Seeded shuffle so the order is stable across re-renders but random per page load
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface MemberDirectoryProps {
  members: DirectoryMember[];
}

export function MemberDirectory({ members }: MemberDirectoryProps) {
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [openToWorkOnly, setOpenToWorkOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("shuffle");
  const [selectedMember, setSelectedMember] = useState<DirectoryMember | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Stable seed per mount so shuffle doesn't change on every re-render
  const shuffleSeed = useRef(Date.now());

  const handleMemberClick = (member: DirectoryMember) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const filteredAndSortedMembers = useMemo(() => {
    const filtered = members.filter((member) => {
      if (openToWorkOnly && !member.openToWork) {
        return false;
      }

      if (selectedFocus.length > 0) {
        const memberFocus = member.focus || [];
        const hasMatchingFocus = selectedFocus.some((value) =>
          memberFocus.includes(value)
        );
        if (!hasMatchingFocus) {
          return false;
        }
      }

      if (selectedExperience && member.experienceLevel !== selectedExperience) {
        return false;
      }

      return true;
    });

    switch (sortBy) {
      case "alpha":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return [...filtered].sort((a, b) =>
          (b._createdAt || "").localeCompare(a._createdAt || "")
        );
      case "shuffle":
      default:
        return shuffleArray(filtered, shuffleSeed.current);
    }
  }, [members, selectedFocus, selectedExperience, openToWorkOnly, sortBy]);

  const handleClearFilters = () => {
    setSelectedFocus([]);
    setSelectedExperience(null);
    setOpenToWorkOnly(false);
  };

  return (
    <>
      <div className="space-y-6">
        <MemberFilters
          selectedFocus={selectedFocus}
          selectedExperience={selectedExperience}
          openToWorkOnly={openToWorkOnly}
          sortBy={sortBy}
          onFocusChange={setSelectedFocus}
          onExperienceChange={setSelectedExperience}
          onOpenToWorkChange={setOpenToWorkOnly}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
          totalCount={members.length}
          filteredCount={filteredAndSortedMembers.length}
        />
        <MemberGrid members={filteredAndSortedMembers} onMemberClick={handleMemberClick} />
      </div>
      <MemberDrawer
        member={selectedMember}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
