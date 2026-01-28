"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { FOCUS_OPTIONS, EXPERIENCE_LEVEL_OPTIONS, INDUSTRY_OPTIONS } from "./constants";
import type { DirectoryMember } from "./MemberCard";

interface MemberDrawerProps {
  member: DirectoryMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberDrawer({ member, isOpen, onClose }: MemberDrawerProps) {
  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const imageUrl = member?.photo?.asset
    ? urlFor(member.photo).width(600).height(800).auto("format").url()
    : null;

  const experienceLevelLabel = member?.experienceLevel
    ? EXPERIENCE_LEVEL_OPTIONS.find((o) => o.value === member.experienceLevel)?.title
    : null;

  const focusLabels = member?.focus?.map(
    (value) => FOCUS_OPTIONS.find((o) => o.value === value)?.title || value
  ) || [];

  const industryLabels = member?.industries?.map(
    (value) => INDUSTRY_OPTIONS.find((o) => o.value === value)?.title || value
  ) || [];

  return (
    <AnimatePresence>
      {isOpen && member && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Close drawer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Photo */}
            <div className="relative aspect-[3/4] bg-gray-100">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={member.photo.alt || member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 512px) 100vw, 512px"
                  placeholder={member.photo.asset?.metadata?.lqip ? "blur" : undefined}
                  blurDataURL={member.photo.asset?.metadata?.lqip}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-8xl font-light">{member.name.charAt(0)}</span>
                </div>
              )}

              {/* Open to Work Badge */}
              {member.openToWork && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  Open to Work
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                {member.title && (
                  <p className="text-lg text-gray-600 mt-1">{member.title}</p>
                )}
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-3 text-sm">
                {experienceLevelLabel && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {experienceLevelLabel}
                  </div>
                )}
                {member.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {member.location}
                  </div>
                )}
              </div>

              {/* Focus Areas */}
              {focusLabels.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {focusLabels.map((label) => (
                      <span
                        key={label}
                        className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries */}
              {industryLabels.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {industryLabels.map((label) => (
                      <span
                        key={label}
                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education/Bootcamp */}
              {member.educationBootcamp && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Education / Bootcamp</h3>
                  <p className="text-gray-600">{member.educationBootcamp}</p>
                </div>
              )}

              {/* Links */}
              {(member.linkedIn || member.portfolio) && (
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-700 text-white px-4 py-3 rounded-xl font-medium hover:bg-purple-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {member.portfolio && (
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-teal-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Portfolio
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
