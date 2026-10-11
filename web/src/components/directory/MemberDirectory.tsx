"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { MemberFilters } from "./MemberFilters";
import { MemberGrid } from "./MemberGrid";
import { MemberDrawer } from "./MemberDrawer";
import { Pagination } from "@/components/ui/Pagination";
import type { DirectoryMember } from "./MemberCard";

const ITEMS_PER_PAGE = 15;

interface MemberDirectoryProps {
  members: DirectoryMember[];
}

export function MemberDirectory({ members }: MemberDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedIsland, setSelectedIsland] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [openToWorkOnly, setOpenToWorkOnly] = useState(false);
  const [selectedMember, setSelectedMember] = useState<DirectoryMember | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

    // A–Z is the only order. Shuffle and Newest were removed in Oct 2026:
    // Newest sorted by Sanity creation date, which every member migrated from
    // Notion shares, so it was never a real order.
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [members, searchQuery, selectedFocus, selectedIsland, selectedExperience, openToWorkOnly]);

  // Reset to page 1 whenever the filters change.
  //
  // Adjusted during render rather than in an effect: an effect would let the
  // stale page render first and then correct it, so a user on page 4 who
  // narrows the filters briefly sees an empty grid. React supports this
  // pattern explicitly — compare against the previous value and set state
  // while rendering, which re-runs the component before anything is painted.
  const filterKey = [
    searchQuery,
    selectedFocus.join(","),
    selectedIsland,
    selectedExperience,
    openToWorkOnly,
  ].join("|");
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setCurrentPage(1);
  }

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
          onSearchChange={setSearchQuery}
          onFocusChange={setSelectedFocus}
          onIslandChange={setSelectedIsland}
          onExperienceChange={setSelectedExperience}
          onOpenToWorkChange={setOpenToWorkOnly}
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
