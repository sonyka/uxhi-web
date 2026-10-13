"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SectionIcon } from "@/components/ui/SectionIcon";

/* ------------------------------------------------------------------ */
/*  FormAlert — error / info banner                                    */
/* ------------------------------------------------------------------ */

interface FormAlertProps {
  message: string;
  variant?: "error" | "info";
  /**
   * Id of an element to bring to the top of the view instead of centring the
   * alert — the form's section, so a failed submit lands where the section's
   * own anchor does and the visitor starts again from the top of the form.
   */
  scrollToId?: string;
  className?: string;
}

const alertStyles = {
  error: "bg-warning-subtle border-white/20 text-white",
  info: "bg-white/10 border-white/20 text-white",
} as const;

export function FormAlert({ message, variant = "error", scrollToId, className }: FormAlertProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = scrollToId ? document.getElementById(scrollToId) : null;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    else ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [scrollToId]);
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3 text-base",
        alertStyles[variant],
        className,
      )}
    >
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FieldError — field-level validation message                        */
/* ------------------------------------------------------------------ */

interface FieldErrorProps {
  errors?: Record<string, string[]>;
  field: string;
  className?: string;
}

export function FieldError({ errors, field, className }: FieldErrorProps) {
  const messages = errors?.[field];
  if (!messages?.length) return null;
  return (
    <p
      role="alert"
      id={`${field}-error`}
      className={cn("text-yellow-80 text-base mt-1", className)}
    >
      {messages[0]}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  FormSuccess — post-submission success card                         */
/* ------------------------------------------------------------------ */

interface FormSuccessProps {
  /**
   * Spot illustration path, shown at SectionIcon's default 80px — the same
   * size as a section mark, so the outcome reads as the moment it is.
   */
  iconSrc: string;
  title: string;
  message: string;
  /** The next step, under the message — e.g. the join form's link to the directory. */
  action?: React.ReactNode;
  className?: string;
}

export function FormSuccess({ iconSrc, title, message, action, className }: FormSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);
  // To the top of the view, not the centre: the card replaces a long form,
  // and centring it left the section intro above it in view, competing with
  // it. scroll-mt clears the floating nav.
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
    // A lifted purple-120 surface with a shadow, so the card stands off the
    // purple-140 section rather than sitting flush with it.
    <div ref={ref} className={cn("bg-purple-120 border border-white/20 rounded-2xl shadow-2xl shadow-purple-150/50 p-8 md:p-10 text-center scroll-mt-36", className)}>
      <SectionIcon src={iconSrc} alt="" className="mb-5" />
      <h3 className="font-display text-2xl text-white text-balance mb-2">{title}</h3>
      <p className="text-white">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
