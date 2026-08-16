"use client";

// FAQ accordion — design adapted from method.framer.media (warm pill rows,
// "+" toggle that rotates into "×" on open, gray answer text).
//
// Uses Framer Motion (not native <details>) so the answer height animates open/
// closed smoothly instead of snapping. Items open independently.
//
// NOTE: copy is pulled from the 2025 conference site as placeholder content.
// Update dates, parking, and refund details for 2026 when confirmed.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GRAY_80 as ICON_GRAY, GRAY_110, PURPLE, TYPE } from "../theme";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Who should attend the conference?",
    a: "This event is ideal for anyone interested in design and innovation, including students, beginners, and senior professionals in UX/UI, graphic, and product design, as well as UX teams, developers, project managers, and creative directors.",
  },
  {
    q: "Is the conference in-person, virtual, or hybrid?",
    a: "The conference will be in person only.",
  },
  {
    q: "What does the registration ticket include?",
    a: "The registration fee includes entry to all sessions and networking, all-day coffee, breakfast, lunch, snacks, and swag.",
  },
  {
    q: "What is the Pre-Conference event?",
    a: "New this year, we’re hosting a pre-conference night to kick things off. Tickets are sold separately and include entry to the mixer plus drinks — no conference ticket required. More details to be announced.",
  },
  {
    q: "Are there group discounts available?",
    a: "Currently, we don’t offer group discounts. We highly encourage your team to take advantage of the Early Bird tickets, which are already available at a reduced rate.",
  },
  {
    q: "Will the sessions be recorded?",
    a: "No, the sessions won’t be recorded.",
  },
  {
    q: "Can I get a refund if I’m not able to attend?",
    a: "Yes, cancellations made by Thursday, September 25 will receive a full refund. After that date, no refunds can be made.",
  },
  {
    q: "What are the parking options available for attendees?",
    a: "Attendees may park in the white-striped stalls near the entrance of Lot C at the venue (paid parking). Limited metered street parking is also available nearby. Please note: parking passes will not be provided this year.",
  },
  {
    q: "Who can I contact for more information?",
    a: (
      <>
        For general inquiries, please{" "}
        <a
          href="mailto:uxhiconference@gmail.com"
          className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          style={{ color: PURPLE }}
        >
          send us an email
        </a>
        .
      </>
    ),
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>FAQ</SectionHeading>
      <p
        className={`${TYPE.body} max-w-[62ch]`}
        style={{ color: GRAY_110 }}
      >
        Got questions? We&rsquo;ve got answers — here&rsquo;s everything you need to know
        about UXHICon.
      </p>

      {/* Accordion list */}
      <div className="flex flex-col gap-2 md:gap-3 mt-1">
        {FAQS.map(({ q, a }) => {
          const isOpen = !!open[q];
          return (
            <div
              key={q}
              className={`rounded-2xl transition-colors ${isOpen ? "bg-beige-40" : "bg-beige-30"}`}
            >
              <button
                type="button"
                onClick={() => setOpen((prev) => ({ ...prev, [q]: !prev[q] }))}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 cursor-pointer select-none text-left px-5 py-[18px]"
              >
                <span className="font-medium leading-[1.35] tracking-[-0.01em] text-[16px] md:text-[17px] text-gray-140">
                  {q}
                </span>
                {/* "+" rotates 45° → "×" when open */}
                <svg
                  className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* stroke set via style, not the presentation attribute — CSS
                      var() does not resolve in SVG attributes. */}
                  <line x1="10" y1="4" x2="10" y2="16" style={{ stroke: ICON_GRAY }} strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="4" y1="10" x2="16" y2="10" style={{ stroke: ICON_GRAY }} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-5 pb-[18px] font-normal leading-[1.5] text-[15px] md:text-[16px]"
                      style={{ color: GRAY_110 }}
                    >
                      {a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
