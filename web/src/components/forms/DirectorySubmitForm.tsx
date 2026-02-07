"use client";

import { useActionState, useState } from "react";
import { submitDirectoryEntry, type DirectorySubmitState } from "@/lib/actions/directory-submit";
import {
  FOCUS_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/components/directory/constants";

const labelClass = "block text-sm font-semibold text-purple-200 mb-1.5";
const inputClass =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors";
const errorClass = "text-yellow text-sm mt-1";

function FieldError({ errors, field }: { errors?: Record<string, string[]>; field: string }) {
  const messages = errors?.[field];
  if (!messages?.length) return null;
  return <p className={errorClass}>{messages[0]}</p>;
}

export function DirectorySubmitForm() {
  const [state, formAction, isPending] = useActionState<DirectorySubmitState, FormData>(
    submitDirectoryEntry,
    null,
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  }

  if (state?.success) {
    return (
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="font-display text-2xl text-white mb-2">Profile submitted!</h3>
        <p className="text-purple-200">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6 text-left">
      {/* Honeypot */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <label htmlFor="company_url">Company URL</label>
        <input type="text" id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      {state?.message && !state.success && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-red-200 text-sm">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>Name *</label>
        <input type="text" id="name" name="name" required className={inputClass} />
        <FieldError errors={state?.errors} field="name" />
      </div>

      <div>
        <label htmlFor="jobTitle" className={labelClass}>Job Title</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="e.g., Freelance Product Designer"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="photo" className={labelClass}>Photo *</label>
        <div className="flex items-start gap-4">
          {photoPreview && (
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={handlePhotoChange}
            className="block w-full text-sm text-purple-200 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border file:border-white/20 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer file:transition-colors"
          />
        </div>
        <p className="text-xs text-purple-300/60 mt-1">JPG, PNG, or WebP. Max 5MB.</p>
        <FieldError errors={state?.errors} field="photo" />
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="openToWork"
            className="w-4 h-4 text-teal-500 border-white/30 bg-white/10 rounded focus:ring-teal-500 accent-teal-500"
          />
          <span className="text-sm font-semibold text-purple-200">Open to Work</span>
        </label>
      </div>

      <fieldset>
        <legend className={labelClass}>Focus</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {FOCUS_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="focus"
                value={option.value}
                className="w-4 h-4 text-teal-500 border-white/30 bg-white/10 rounded focus:ring-teal-500 accent-teal-500"
              />
              <span className="text-purple-200 group-hover:text-white transition-colors text-sm">{option.title}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="experienceLevel" className={labelClass}>Experience Level</label>
        <select id="experienceLevel" name="experienceLevel" className={inputClass}>
          <option value="">Select...</option>
          {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.title}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>Industries</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {INDUSTRY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="industries"
                value={option.value}
                className="w-4 h-4 text-teal-500 border-white/30 bg-white/10 rounded focus:ring-teal-500 accent-teal-500"
              />
              <span className="text-purple-200 group-hover:text-white transition-colors text-sm">{option.title}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="location" className={labelClass}>Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="e.g., Honolulu, Maui, Remote"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="educationBootcamp" className={labelClass}>Education/Bootcamp</label>
        <input
          type="text"
          id="educationBootcamp"
          name="educationBootcamp"
          placeholder="UX-related education or bootcamp attended"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="linkedIn" className={labelClass}>LinkedIn URL</label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            placeholder="https://linkedin.com/in/..."
            className={inputClass}
          />
          <FieldError errors={state?.errors} field="linkedIn" />
        </div>
        <div>
          <label htmlFor="portfolio" className={labelClass}>Portfolio URL</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            placeholder="https://"
            className={inputClass}
          />
          <FieldError errors={state?.errors} field="portfolio" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-medium transition-colors bg-white/10 border border-white/30 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isPending ? "Submitting..." : "Submit profile"}</span>
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
