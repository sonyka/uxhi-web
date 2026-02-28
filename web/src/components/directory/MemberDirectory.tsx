"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { MemberFilters } from "./MemberFilters";
import { MemberGrid } from "./MemberGrid";
import { MemberDrawer } from "./MemberDrawer";
import { Pagination } from "@/components/ui/Pagination";
import type { DirectoryMember } from "./MemberCard";

const ITEMS_PER_PAGE = 15;

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedIsland, setSelectedIsland] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [openToWorkOnly, setOpenToWorkOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("shuffle");
  const [selectedMember, setSelectedMember] = useState<DirectoryMember | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Stable seed per mount so shuffle doesn't change on every re-render
  const shuffleSeed = useRef(Date.now());
  const directoryRef = useRef<HTMLDivElement>(null);

  const handleMemberClick = (member: DirectoryMember) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const filteredAndSortedMembers = useMemo(() => {
    const filtered = members.filter((member) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = member.name.toLowerCase().includes(q);
        const matchesTitle = member.title?.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle) return false;
      }

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

      if (selectedIsland.length > 0) {
        if (!member.island || !selectedIsland.includes(member.island)) {
          return false;
        }
      }

      if (selectedExperience && member.experienceLevel !== selectedExperience) {
        return false;
      }

      return true;
    });

    // Auto-sort alphabetically when searching, otherwise use selected sort
    const effectiveSort = searchQuery ? "alpha" : sortBy;

    switch (effectiveSort) {
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
  }, [members, searchQuery, selectedFocus, selectedIsland, selectedExperience, openToWorkOnly, sortBy]);

  // Reset to page 1 whenever filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFocus, selectedIsland, selectedExperience, openToWorkOnly, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredAndSortedMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    directoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedFocus([]);
    setSelectedIsland([]);
    setSelectedExperience(null);
    setOpenToWorkOnly(false);
  };

  return (
    <>
      <div ref={directoryRef} className="space-y-6 scroll-mt-24">
        <MemberFilters
          searchQuery={searchQuery}
          selectedFocus={selectedFocus}
          selectedIsland={selectedIsland}
          selectedExperience={selectedExperience}
          openToWorkOnly={openToWorkOnly}
          sortBy={sortBy}
          onSearchChange={setSearchQuery}
          onFocusChange={setSelectedFocus}
          onIslandChange={setSelectedIsland}
          onExperienceChange={setSelectedExperience}
          onOpenToWorkChange={setOpenToWorkOnly}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
          totalCount={members.length}
          filteredCount={filteredAndSortedMembers.length}
        />
        <MemberGrid members={paginatedMembers} onMemberClick={handleMemberClick} />
        {totalPages > 1 && (
          <div className="pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <MemberDrawer
        member={selectedMember}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
