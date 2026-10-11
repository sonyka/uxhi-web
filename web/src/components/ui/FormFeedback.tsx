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
  className?: string;
}

const alertStyles = {
  error: "bg-orange-90/20 border-orange-70/30 text-orange-30",
  info: "bg-white/10 border-white/20 text-white",
} as const;

export function FormAlert({ message, variant = "error", className }: FormAlertProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
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
   * Spot illustration path, shown at SectionIcon's `sm` (56px) — the card
   * labels the outcome rather than opening a section, which is the case `sm`
   * exists for.
   */
  iconSrc: string;
  title: string;
  message: string;
  className?: string;
}

export function FormSuccess({ iconSrc, title, message, className }: FormSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  return (
    <div ref={ref} className={cn("border border-white/20 rounded-2xl p-8 text-center", className)}>
      <SectionIcon src={iconSrc} alt="" size="sm" className="mb-4" />
      <h3 className="font-display text-2xl text-white text-balance mb-2">{title}</h3>
      <p className="text-white">{message}</p>
    </div>
  );
}
