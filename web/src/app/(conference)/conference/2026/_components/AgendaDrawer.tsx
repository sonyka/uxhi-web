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
  byline,
  title,
  media,
  children,
}: {
  open: boolean;
  onClose: () => void;
  /**
   * Supporting line under the title: "3:00 pm • Purple Box" for a session, a
   * speaker's title and company for a person. It sits below rather than above
   * because the thing you tapped is the thing you came to read — leading with
   * the room or the job title made you scan past a label to find out which
   * panel had opened.
   */
  byline?: string;
  title: string;
  /**
   * A small thing to identify what opened, beside the title rather than above
   * the body: a speaker's portrait, say. It sits here because the body is for
   * reading — a portrait leading it pushes the first line of a bio a panel's
   * worth down the page, to repeat a face the reader just tapped.
   */
  media?: React.ReactNode;
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

            <div className="flex items-center gap-4">
              {media}
              {/* min-w-0 so a long unbroken name wraps inside the column
                  instead of pushing the portrait out of the panel. */}
              <div className="min-w-0 flex-1">
                <h2 className={`${TYPE.panelTitle} text-gray-140 pr-10`}>
                  {title}
                </h2>
                {byline && (
                  <div className={`${TYPE.caption} mt-1.5 pr-10`} style={{ color: GRAY_100 }}>
                    {byline}
                  </div>
                )}
              </div>
            </div>

            <div className={`${TYPE.body} mt-4 flex flex-col gap-4`} style={{ color: GRAY_110 }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * A line that opens a list item. Written as "- " in the copy; "\u2022 " is
 * accepted too, because that is what a pasted list from a doc arrives as.
 */
const BULLET = /^[-\u2022]\s+/;

type Run = { kind: "prose" | "list"; lines: string[] };

/**
 * Split one paragraph into alternating runs of prose and list items, so a
 * lead-in line can sit directly above its own list ("Participants will be able
 * to:" and the three objectives under it) without a blank line forcing them
 * into separate paragraphs.
 */
function runs(block: string): Run[] {
  const out: Run[] = [];
  for (const raw of block.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const kind = BULLET.test(line) ? "list" : "prose";
    const text = kind === "list" ? line.replace(BULLET, "") : raw;
    const last = out.at(-1);
    if (last?.kind === kind) last.lines.push(text);
    else out.push({ kind, lines: [text] });
  }
  return out;
}

/**
 * Bio and session text arrives as plain text: blank lines separate paragraphs,
 * and a line starting with "- " is a list item. That is the whole syntax — the
 * copy lives in agenda.ts and in Sanity text fields, neither of which renders
 * markup, so anything richer would have to be authored as something a
 * collaborator typing into Studio would never guess.
 *
 * Bullets are the parent site's: teal marker, the same list treatment /privacy
 * uses. The drawer's own `gap-4` spaces the list from the prose around it, so a
 * list is spaced exactly like the paragraph it replaces.
 */
export function Paragraphs({ text }: { text: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.flatMap((block, bi) =>
        runs(block).map((run, ri) =>
          run.kind === "list" ? (
            <ul
              key={`${bi}-${ri}`}
              className="list-disc space-y-2 pl-5 marker:text-teal-90"
            >
              {run.lines.map((line) => (
                <li key={line.slice(0, 40)}>{line}</li>
              ))}
            </ul>
          ) : (
            <p key={`${bi}-${ri}`} className="whitespace-pre-line">
              {run.lines.join("\n")}
            </p>
          ),
        ),
      )}
    </>
  );
}
