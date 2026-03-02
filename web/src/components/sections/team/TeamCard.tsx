"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";
import type { TeamMember } from "./index";

interface TeamCardProps {
  member: TeamMember;
  isExpanded: boolean;
  onToggle: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TeamCard({ member, isExpanded, onToggle }: TeamCardProps) {
  const hasPhoto = !!member.photo?.asset;

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer select-none",
        isExpanded
          ? "bg-white shadow-lg col-span-2 md:col-span-2"
          : "bg-purple-30 group"
      )}
      onClick={() => !isExpanded && onToggle()}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-5"
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-20 hover:bg-gray-30 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-gray-110" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header: photo circle + name/role */}
            <div className="flex items-center gap-4 mb-4 pr-8">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-purple-30">
                {hasPhoto ? (
                  <SanityImage
                    value={member.photo!}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-60 font-display text-lg">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg text-purple-140 leading-tight truncate">
                  {member.name}
                </h3>
                {member.role && (
                  <p className="text-gray-110 text-sm truncate">{member.role}</p>
                )}
                {member.company && (
                  <p className="text-gray-80 text-sm truncate">{member.company}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            {member.bio && (
              <div className="max-h-[200px] overflow-y-auto mb-4 pr-1">
                <p className="text-gray-120 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            )}

            {/* Social links */}
            <div className="flex items-center gap-3">
              {member.socialLinks?.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block group/link"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Image
                    src="/images/nav/glyph-linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="grayscale opacity-50 group-hover/link:grayscale-0 group-hover/link:opacity-100 transition-all duration-300"
                  />
                </a>
              )}
              {member.socialLinks?.website && (
                <a
                  href={member.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-80 hover:text-teal-90 transition-colors"
                  aria-label={`${member.name}'s website`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative aspect-[4/5]"
          >
            {/* Photo or initials fallback */}
            {hasPhoto ? (
              <SanityImage
                value={member.photo!}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-30 text-purple-60 font-display text-3xl">
                {getInitials(member.name)}
              </div>
            )}

            {/* Gradient overlay + name/role */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-display text-base text-white leading-tight">
                {member.name}
              </h3>
              {member.role && (
                <p className="text-white/80 text-sm mt-0.5 line-clamp-1">
                  {member.role}
                </p>
              )}
            </div>

            {/* Hover shadow */}
            <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-teal-90/30 transition-all duration-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
