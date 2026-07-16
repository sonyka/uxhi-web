"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Data comes from Sanity (conferenceCochair, year-scoped) — see queries.ts.
export type Cochair = {
  _id: string;
  name: string;
  title?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  photo?: string | null; // Sanity asset URL
  photoAlt?: string | null;
};

const PURPLE = "#231769";
const GRAY = "#50555A";
const LINKEDIN_GRAY = "grayscale(1) brightness(0.4)";

function initials(name: string) {
  return name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Size Sanity images on the CDN rather than shipping the full-res asset.
function sized(url: string, w: number, h: number) {
  return `${url}?w=${w}&h=${h}&fit=crop&auto=format`;
}

export function CochairsSection({ cochairs }: { cochairs: Cochair[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!cochairs || cochairs.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Heading — mirrors the FAQ/venue section sizing */}
      <h2 className="font-semibold leading-[1.3] tracking-[-0.01em] text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px]">
        Meet the Organizers
      </h2>
      <p className="font-normal leading-[1.4] text-[16px] lg:text-[17px] xl:text-[18px]" style={{ color: GRAY }}>
        The co-chairs and volunteers bringing UXHICon 2026 to life. Tap a card to learn more.
      </p>

      <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-1">
          {cochairs.map((c) => {
            const isOpen = expanded === c._id;
            return (
              <motion.div
                key={c._id}
                layout
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !isOpen && setExpanded(c._id)}
                className={`relative rounded-2xl overflow-hidden select-none aspect-[4/5] ${isOpen ? "bg-white" : "cursor-pointer"}`}
                style={isOpen ? { boxShadow: "0 10px 30px rgba(0,0,0,0.12)" } : undefined}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 p-5 flex flex-col"
                    >
                      {/* Close */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(null);
                        }}
                        aria-label="Close"
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GRAY} strokeWidth="2" strokeLinecap="round">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Header: name/title (no avatar — keeps the narrow mobile card readable) */}
                      <div className="mb-3 pr-8 shrink-0">
                        <h3 className="font-semibold text-[17px] leading-tight text-[#1A1A1A]">{c.name}</h3>
                        {c.title && <p className="text-[14px] mt-1" style={{ color: GRAY }}>{c.title}</p>}
                      </div>

                      {/* Bio — fills remaining height, scrolls when long */}
                      <div className="flex-1 min-h-0 overflow-y-auto pr-1 mb-4">
                        <p className="text-[15px] leading-[1.6]" style={{ color: GRAY }}>
                          {c.bio || "Full bio coming soon."}
                        </p>
                      </div>

                      {/* LinkedIn */}
                      {c.linkedin && (
                        <a
                          href={c.linkedin}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${c.name} on LinkedIn`}
                          className="inline-flex shrink-0 hover:opacity-70 transition-opacity"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/conferences/2026/assets/icons/icon-linkedin.svg" alt="" width={22} height={22} style={{ width: 22, height: 22, filter: LINKEDIN_GRAY }} />
                        </a>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0"
                    >
                      {/* Photo when available, otherwise a purple initials tile */}
                      {c.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={sized(c.photo, 800, 1000)} alt={c.photoAlt || c.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: PURPLE }}>
                          <span className="text-white font-semibold text-[34px]">{initials(c.name)}</span>
                        </div>
                      )}

                      {/* Gradient + name/title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-[15px] leading-tight text-white">{c.name}</h3>
                        {c.title && <p className="text-white/85 text-[13px] mt-0.5 line-clamp-1">{c.title}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
