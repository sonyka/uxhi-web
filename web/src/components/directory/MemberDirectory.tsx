"use client";

import { useState, useMemo } from "react";
import { MemberFilters } from "./MemberFilters";
import { MemberGrid } from "./MemberGrid";
import type { DirectoryMember } from "./MemberCard";

interface FilterOption {
  _id: string;
  title: string;
  slug: string;
}

interface MemberDirectoryProps {
  members: DirectoryMember[];
  specialties: FilterOption[];
  experienceLevels: FilterOption[];
}

export function MemberDirectory({
  members,
  specialties,
  experienceLevels,
}: MemberDirectoryProps) {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [openToWorkOnly, setOpenToWorkOnly] = useState(false);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Filter by open to work
      if (openToWorkOnly && !member.openToWork) {
        return false;
      }

      // Filter by specialties (OR logic - member must have at least one selected specialty)
      if (selectedSpecialties.length > 0) {
        const memberSpecialtySlugs = member.specialties?.map((s) => s.slug) || [];
        const hasMatchingSpecialty = selectedSpecialties.some((slug) =>
          memberSpecialtySlugs.includes(slug)
        );
        if (!hasMatchingSpecialty) {
          return false;
        }
      }

      // Filter by experience level
      if (selectedExperience && member.experienceLevel?.slug !== selectedExperience) {
        return false;
      }

      return true;
    });
  }, [members, selectedSpecialties, selectedExperience, openToWorkOnly]);

  const handleClearFilters = () => {
    setSelectedSpecialties([]);
    setSelectedExperience(null);
    setOpenToWorkOnly(false);
  };

  return (
    <div className="space-y-6">
      <MemberFilters
        specialties={specialties}
        experienceLevels={experienceLevels}
        selectedSpecialties={selectedSpecialties}
        selectedExperience={selectedExperience}
        openToWorkOnly={openToWorkOnly}
        onSpecialtiesChange={setSelectedSpecialties}
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
