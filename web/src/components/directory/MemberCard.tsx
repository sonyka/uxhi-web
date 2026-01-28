"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Specialty {
  _id: string;
  title: string;
  slug: string;
}

interface ExperienceLevel {
  _id: string;
  title: string;
  slug: string;
}

interface Photo {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface DirectoryMember {
  _id: string;
  name: string;
  title?: string;
  photo: Photo;
  openToWork?: boolean;
  specialties?: Specialty[];
  experienceLevel?: ExperienceLevel;
  location?: string;
  linkedIn?: string;
  portfolio?: string;
}

interface MemberCardProps {
  member: DirectoryMember;
}

export function MemberCard({ member }: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = member.photo?.asset
    ? urlFor(member.photo).width(400).height(533).auto("format").url()
    : null;

  const displayedSpecialties = member.specialties?.slice(0, 3) || [];
  const remainingCount = (member.specialties?.length || 0) - 3;

  return (
    <motion.div
      className="group relative bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.photo.alt || member.name}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered && "scale-105"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder={member.photo.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={member.photo.asset?.metadata?.lqip}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">{member.name.charAt(0)}</span>
          </div>
        )}

        {/* Open to Work Badge */}
        {member.openToWork && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Open to Work
          </div>
        )}

        {/* Hover Overlay with Links */}
        <div
          className={cn(
            "absolute inset-0 bg-purple-700/90 flex items-center justify-center gap-4 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-teal-50 transition-colors"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <svg className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {member.portfolio && (
            <a
              href={member.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-teal-50 transition-colors"
              aria-label={`${member.name}'s Portfolio`}
            >
              <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 leading-tight">{member.name}</h3>
        {member.title && (
          <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">{member.title}</p>
        )}

        {/* Experience Level & Location */}
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          {member.experienceLevel && (
            <span>{member.experienceLevel.title}</span>
          )}
          {member.experienceLevel && member.location && (
            <span className="text-gray-300">•</span>
          )}
          {member.location && <span>{member.location}</span>}
        </div>

        {/* Specialty Tags */}
        {displayedSpecialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {displayedSpecialties.map((specialty) => (
              <span
                key={specialty._id}
                className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-xs"
              >
                {specialty.title}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">
                +{remainingCount}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
