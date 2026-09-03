"use client";

// Side drawer for the agenda: session descriptions and speaker bios share it,
// because they are the same interaction — tap a thing in the schedule, read
// more about it without losing your place in the day.
//
// Deliberately not the directory's MemberDrawer. That one belongs to the main
// site; per CLAUDE.md a conference year owns its own visual components, and
// this one is built from the 2026 theme.

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BEIGE_30, GRAY_100, GRAY_110, PURPLE, TYPE } from "../theme";

/**
 * Which edge the panel comes from. A side panel on a phone leaves a sliver of
 * page beside it and takes a reach across the screen to close; a sheet from the
 * bottom is where a thumb already is. Matched to Tailwind's md so it changes at
 * the same width the rest of the layout does.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function AgendaDrawer({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    // The page behind is a scroll rail of its own; leaving it scrollable means
    // the day slides away underneath the drawer while you read.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus in, so Escape and Tab belong to the drawer rather than to
    // whatever was clicked behind it.
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end items-end md:items-stretch">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="relative w-full max-h-[85vh] rounded-t-3xl overflow-y-auto p-6 outline-none md:max-h-none md:h-full md:max-w-[440px] md:rounded-none md:p-8"
            style={{ backgroundColor: BEIGE_30 }}
            // Bottom sheet on a phone, side panel from md. The axis has to be
            // chosen in JS because Framer animates transforms directly and
            // cannot read a breakpoint from a class.
            initial={isDesktop ? { x: "100%" } : { y: "100%" }}
            animate={isDesktop ? { x: 0 } : { y: 0 }}
            exit={isDesktop ? { x: "100%" } : { y: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center bg-white/70 hover:bg-white transition-colors cursor-pointer"
              style={{ color: PURPLE }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {eyebrow && (
              <div className={`${TYPE.eyebrow} mb-2 pr-10`} style={{ color: GRAY_100 }}>
                {eyebrow}
              </div>
            )}
            <h2
              className="font-semibold text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-gray-140 pr-10"
              style={{ textWrap: "balance" }}
            >
              {title}
            </h2>

            <div className={`${TYPE.body} mt-4 flex flex-col gap-4`} style={{ color: GRAY_110 }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Bio text arrives as plain text with blank lines; keep the paragraphs. */
export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => (
          <p key={p.slice(0, 40)} className="whitespace-pre-line">
            {p}
          </p>
        ))}
    </>
  );
}
