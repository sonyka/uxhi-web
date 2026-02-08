"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/lib/actions/inquiry";
import { FormAlert, FieldError, FormSuccess } from "@/components/ui/FormFeedback";

const INTEREST_OPTIONS = [
  "Guest speaking",
  "Partnerships and collaborations",
  "Something else",
] as const;

const labelClass = "block text-sm font-semibold text-purple-200 mb-1.5";
const inputClass =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors";

export function InquiryForm() {
  const [state, formAction, isPending] = useActionState<InquiryState, FormData>(
    submitInquiry,
    null,
  );

  if (state?.success) {
    return (
      <FormSuccess icon="&#9989;" title="Message sent!" message={state.message} />
    );
  }

  return (
    <form action={formAction} className="space-y-5 text-left max-w-[600px] mx-auto">
      {/* Honeypot */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state?.message && !state.success && (
        <FormAlert message={state.message} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name *</label>
          <input type="text" id="firstName" name="firstName" required className={inputClass} />
          <FieldError errors={state?.errors} field="firstName" />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name *</label>
          <input type="text" id="lastName" name="lastName" required className={inputClass} />
          <FieldError errors={state?.errors} field="lastName" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email *</label>
        <input type="email" id="email" name="email" required className={inputClass} />
        <FieldError errors={state?.errors} field="email" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="role" className={labelClass}>Role</label>
          <input type="text" id="role" name="role" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>Company Name</label>
          <input type="text" id="company" name="company" className={inputClass} />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>I&apos;m interested in... *</legend>
        <div className="space-y-2 mt-1">
          {INTEREST_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="interestType"
                value={option}
                required
                className="w-4 h-4 text-teal-500 border-white/30 bg-white/10 focus:ring-teal-500 accent-teal-500"
              />
              <span className="text-purple-200 group-hover:text-white transition-colors">{option}</span>
            </label>
          ))}
        </div>
        <FieldError errors={state?.errors} field="interestType" />
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={inputClass + " resize-y"}
        />
        <FieldError errors={state?.errors} field="message" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-medium transition-colors bg-white/10 border border-white/30 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isPending ? "Sending..." : "Send message"}</span>
        <span className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
        </span>
      </button>
    </form>
  );
}
