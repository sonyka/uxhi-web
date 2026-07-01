"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Content from the 2025 conference site ("Meet the Co-Chairs behind the conference").
// Names, titles, and LinkedIn URLs are carried over from 2025; bios are placeholders
// for now and photos aren't available yet (cards fall back to initials).
type Cochair = {
  name: string;
  title: string;
  bio: string;
  linkedin?: string;
  photo?: string; // /conferences/2026/assets/... when headshots are added
};

const COCHAIRS: Cochair[] = [
  { name: "Jennifer Kumura", title: "Co-Founder, UXHI", linkedin: "https://www.linkedin.com/in/jenniferkumura", bio: "Full bio coming soon." },
  { name: "Karli Young", title: "Audience Engagement, Kamehameha Schools", linkedin: "https://www.linkedin.com/in/karli-young", bio: "Full bio coming soon." },
  { name: "Micah Chao", title: "Data Specialist, RCUH", linkedin: "https://www.linkedin.com/in/sungyanmicahchao", bio: "Full bio coming soon." },
  { name: "Sony Atmadjaja", title: "Product Design Director, Doximity", linkedin: "https://www.linkedin.com/in/sonyka", bio: "Full bio coming soon." },
  { name: "Taryn Fukuji", title: "Events Manager, UXHI", linkedin: "https://www.linkedin.com/in/tarynfukuji", bio: "Full bio coming soon." },
  { name: "Yiting Wang, Ph.D.", title: "Researcher, UH Mānoa", linkedin: "https://www.linkedin.com/in/dr-yiting-wang", bio: "Full bio coming soon." },
];

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

export function CochairsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Heading — mirrors the FAQ/venue section sizing */}
      <h2 className="font-semibold leading-[1.3] tracking-[-0.01em] text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px]">
        Meet the Co-Chairs
      </h2>
      <p className="font-normal leading-[1.4] text-[16px] lg:text-[17px] xl:text-[18px]" style={{ color: GRAY }}>
        The volunteers bringing UXHICon 2026 to life. Tap a card to learn more.
      </p>

      <LayoutGroup>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-1">
          {COCHAIRS.map((c) => {
            const isOpen = expanded === c.name;
            return (
              <motion.div
                key={c.name}
                layout
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !isOpen && setExpanded(c.name)}
                className={`relative rounded-2xl overflow-hidden select-none ${isOpen ? "col-span-2 bg-white" : "cursor-pointer"}`}
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
                      className="p-5"
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

                      {/* Header: avatar + name/title */}
                      <div className="flex items-center gap-4 mb-4 pr-8">
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-semibold text-[18px]" style={{ background: PURPLE }}>
                          {c.photo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={c.photo} alt={c.name} className="w-full h-full object-cover" />
                          ) : (
                            initials(c.name)
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[17px] leading-tight text-[#1A1A1A]">{c.name}</h3>
                          <p className="text-[14px]" style={{ color: GRAY }}>{c.title}</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-[15px] leading-[1.6] mb-4" style={{ color: GRAY }}>{c.bio}</p>

                      {/* LinkedIn */}
                      {c.linkedin && (
                        <a
                          href={c.linkedin}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${c.name} on LinkedIn`}
                          className="inline-flex hover:opacity-70 transition-opacity"
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
                      className="relative aspect-[4/5]"
                    >
                      {/* Photo when available, otherwise a purple initials tile */}
                      {c.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.photo} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: PURPLE }}>
                          <span className="text-white font-semibold text-[34px]">{initials(c.name)}</span>
                        </div>
                      )}

                      {/* Gradient + name/title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-[15px] leading-tight text-white">{c.name}</h3>
                        <p className="text-white/85 text-[13px] mt-0.5 line-clamp-1">{c.title}</p>
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
