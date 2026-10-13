"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FieldError } from "@/components/ui/FormFeedback";
import { PlusIcon, MinusIcon } from "@/components/ui/icons";
import { FormCheckbox } from "./FormCheckbox";

interface FormAgreementProps {
  /** Panel heading; it is also the toggle that reveals `children`. */
  title: string;
  /** The background, behind the toggle: values, principles, context. */
  children: React.ReactNode;
  /** Small heading over the statement being agreed to, e.g. "Member commitment". */
  commitmentTitle: string;
  /** The statement itself. Always visible, so no one agrees to text they can't see. */
  commitment: string;
  /** Checkbox label. */
  label: string;
  /** Field name; the server requires it to be "on". */
  name: string;
  errors?: Record<string, string[]>;
}

/**
 * FormAgreement - A required commitment at the end of a form, before submit.
 *
 * The why can run long, so it folds away behind the heading; the statement and
 * its checkbox never fold. Collapsed, the panel costs a few lines; expanded, it
 * reads as a short page. Required natively and again on the server.
 *
 * @see /design-system for usage examples
 */
export function FormAgreement({
  title,
  children,
  commitmentTitle,
  commitment,
  label,
  name,
  errors,
}: FormAgreementProps) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();

  return (
    <div className="rounded-2xl border border-white/20 bg-white/5">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={detailsId}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
      >
        <span>
          {/* h4 style, not display: this is part of a form, not a section of the page. */}
          <span className="block font-semibold text-xl text-white text-balance">{title}</span>
          <span className="block mt-1 text-base text-purple-30 group-hover:text-white transition-colors">
            {isOpen ? "Hide details" : "Read before you submit"}
          </span>
        </span>
        <span className="flex-shrink-0 mt-1">
          {isOpen ? (
            <MinusIcon className="w-6 h-6 text-white" />
          ) : (
            <PlusIcon className="w-6 h-6 text-teal-90" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4 text-base leading-relaxed text-purple-30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-white/20 px-6 py-5 space-y-4">
        <div>
          <p className="font-semibold text-white mb-1">{commitmentTitle}</p>
          <p className="text-base leading-relaxed text-purple-30">{commitment}</p>
        </div>
        <FormCheckbox name={name} label={`${label} *`} required emphasis />
        <FieldError errors={errors} field={name} />
      </div>
    </div>
  );
}
