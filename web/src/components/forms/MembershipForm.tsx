"use client";

import { useActionState } from "react";
import { submitMembership, type MembershipState } from "@/lib/actions/membership";
import {
  EXPERIENCE_OPTIONS,
  CONTRIBUTE_OPTIONS,
  HEAR_ABOUT_OPTIONS,
} from "@/lib/validations";

const labelClass = "block text-sm font-semibold text-purple-200 mb-1.5";
const inputClass =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors";
const errorClass = "text-yellow text-sm mt-1";

function FieldError({ errors, field }: { errors?: Record<string, string[]>; field: string }) {
  const messages = errors?.[field];
  if (!messages?.length) return null;
  return <p className={errorClass}>{messages[0]}</p>;
}

export function MembershipForm() {
  const [state, formAction, isPending] = useActionState<MembershipState, FormData>(
    submitMembership,
    null,
  );

  if (state?.success) {
    return (
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">&#127881;</div>
        <h3 className="font-display text-2xl text-white mb-2">Application received!</h3>
        <p className="text-purple-200">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6 text-left">
      {/* Honeypot */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state?.message && !state.success && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-red-200 text-sm">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="firstName" className={labelClass}>First Name *</label>
        <input type="text" id="firstName" name="firstName" required className={inputClass} />
        <FieldError errors={state?.errors} field="firstName" />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email *</label>
        <input type="email" id="email" name="email" required className={inputClass} />
        <FieldError errors={state?.errors} field="email" />
      </div>

      <div>
        <label htmlFor="linkedinOrWebsite" className={labelClass}>LinkedIn or Website *</label>
        <input
          type="url"
          id="linkedinOrWebsite"
          name="linkedinOrWebsite"
          required
          placeholder="https://"
          className={inputClass}
        />
        <FieldError errors={state?.errors} field="linkedinOrWebsite" />
      </div>

      <fieldset>
        <legend className={labelClass}>Experience Level *</legend>
        <div className="space-y-2 mt-1">
          {EXPERIENCE_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="experienceLevel"
                value={option}
                required
                className="w-4 h-4 text-teal-500 border-white/30 bg-white/10 focus:ring-teal-500 accent-teal-500"
              />
              <span className="text-purple-200 group-hover:text-white transition-colors">{option}</span>
            </label>
          ))}
        </div>
        <FieldError errors={state?.errors} field="experienceLevel" />
      </fieldset>

      <div>
        <label htmlFor="hopes" className={labelClass}>What do you hope to get out of the community?</label>
        <textarea
          id="hopes"
          name="hopes"
          rows={3}
          className={inputClass + " resize-y"}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>What can you contribute?</legend>
        <div className="space-y-2 mt-1">
          {CONTRIBUTE_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="contributions"
                value={option}
                className="w-4 h-4 text-teal-500 border-white/30 bg-white/10 rounded focus:ring-teal-500 accent-teal-500"
              />
              <span className="text-purple-200 group-hover:text-white transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>How did you hear about us?</legend>
        <div className="space-y-2 mt-1">
          {HEAR_ABOUT_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="hearAboutUs"
                value={option}
                className="w-4 h-4 text-teal-500 border-white/30 bg-white/10 focus:ring-teal-500 accent-teal-500"
              />
              <span className="text-purple-200 group-hover:text-white transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-medium transition-colors bg-white/10 border border-white/30 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isPending ? "Submitting..." : "Submit application"}</span>
        <span className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20 transition-colors">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </button>
    </form>
  );
}
