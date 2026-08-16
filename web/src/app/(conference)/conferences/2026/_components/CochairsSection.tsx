"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GRAY_110 as GRAY, PURPLE, TYPE } from "../theme";
import { LinkedInIcon } from "./icons";

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

// Tracks the md breakpoint (768px). Below it we reveal bios in a bottom sheet
// instead of expanding the small 2-up card in place; at/above it we keep the
// desktop in-place flip. Defaults false so SSR/first paint matches mobile; the
// closed cards render identically either way, so there's no hydration flash.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

// Mobile-only bottom sheet that reveals a person's full bio with a comfortable
// reading width. Backdrop tap, the × button, or Escape all dismiss it.
function MobileBioSheet({ c, onClose }: { c: Cochair; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // stop background scroll while open
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Sheet */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${c.name} bio`}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
      >
        {/* Grab handle */}
        <div className="sticky top-0 bg-white pt-3 pb-2 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-black/15" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ stroke: GRAY }} strokeWidth="2" strokeLinecap="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-5 pb-9">
          {/* Header: photo + name/title */}
          <div className="flex items-center gap-4 mb-4">
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sized(c.photo, 160, 160)} alt={c.photoAlt || c.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: PURPLE }}>
                <span className="text-white font-semibold text-[20px]">{initials(c.name)}</span>
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-[19px] leading-tight text-conf-ink">{c.name}</h3>
              {c.title && <p className="text-[14px] mt-1" style={{ color: GRAY }}>{c.title}</p>}
            </div>
          </div>

          {/* Bio */}
          <p className="text-[15px] leading-[1.7]" style={{ color: GRAY }}>
            {c.bio || "Full bio coming soon."}
          </p>

          {/* LinkedIn */}
          {c.linkedin && (
            <a
              href={c.linkedin}
              target="_blank"
              rel="noopener"
              aria-label={`${c.name} on LinkedIn`}
              className="inline-flex mt-5 hover:opacity-70 transition-opacity"
              // No label text here, so the icon color is set explicitly rather
              // than inherited — matches the bio copy beside it.
              style={{ color: GRAY }}
            >
              <LinkedInIcon size={22} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CochairsSection({ cochairs }: { cochairs: Cochair[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  if (!cochairs || cochairs.length === 0) return null;

  const selected = cochairs.find((c) => c._id === expanded) ?? null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>Meet the Organizers</SectionHeading>
      <p className={`font-normal leading-[1.4] ${TYPE.body}`} style={{ color: GRAY }}>
        The co-chairs and volunteers bringing UXHICon 2026 to life. Tap a card to learn more.
      </p>

      <LayoutGroup>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-1">
          {cochairs.map((c) => {
            // Below md the bio opens in a bottom sheet, so the card itself never
            // expands in place — only the desktop flip does.
            const isOpen = expanded === c._id && isDesktop;
            return (
              <motion.div
                key={c._id}
                layout
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                // Shared hover with the sponsor cards: subtle lift + shadow (closed cards only).
                whileHover={!isOpen ? { y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" } : undefined}
                onClick={() => setExpanded(expanded === c._id ? null : c._id)}
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ stroke: GRAY }} strokeWidth="2" strokeLinecap="round">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Header: name/title (no avatar — keeps the narrow mobile card readable) */}
                      <div className="mb-3 pr-8 shrink-0">
                        <h3 className="font-semibold text-[17px] leading-tight text-conf-ink">{c.name}</h3>
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
                          style={{ color: GRAY }}
                        >
                          <LinkedInIcon size={22} />
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

      {/* Mobile bio reveal — bottom sheet (desktop uses the in-place flip above) */}
      <AnimatePresence>
        {!isDesktop && selected && (
          <MobileBioSheet c={selected} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
