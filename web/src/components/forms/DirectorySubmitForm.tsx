"use client";

import { useState, useActionState } from "react";
import { submitDirectoryEntry, type DirectorySubmitState } from "@/lib/actions/directory-submit";
import {
  FOCUS_OPTIONS,
  ISLAND_OPTIONS,
  ISLAND_CITIES,
  EXPERIENCE_LEVEL_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/components/directory/constants";
import { FormAlert, FieldError, FormSuccess } from "@/components/ui/FormFeedback";
import {
  FormLabel,
  FormInput,
  FormCheckbox,
  FormSelect,
  FormFileUpload,
  FormSubmitButton,
} from "@/components/ui/form-elements";

export function DirectorySubmitForm() {
  const [state, formAction, isPending] = useActionState<DirectorySubmitState, FormData>(
    submitDirectoryEntry,
    null,
  );
  const [selectedIsland, setSelectedIsland] = useState("");

  if (state?.success) {
    return (
      <FormSuccess icon="&#9989;" title="Profile submitted!" message={state.message} />
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
        <FormAlert message={state.message} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FormLabel htmlFor="firstName">First Name *</FormLabel>
          <FormInput type="text" id="firstName" name="firstName" required />
          <FieldError errors={state?.errors} field="firstName" />
        </div>
        <div>
          <FormLabel htmlFor="lastName">Last Name *</FormLabel>
          <FormInput type="text" id="lastName" name="lastName" required />
          <FieldError errors={state?.errors} field="lastName" />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
        <FormInput
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="e.g., Freelance Product Designer"
        />
      </div>

      <div>
        <FormLabel htmlFor="photo">Photo *</FormLabel>
        <FormFileUpload
          name="photo"
          accept="image/jpeg,image/png,image/webp"
          required
          showPreview
          helpText="JPG, PNG, or WebP. Max 5MB."
        />
        <FieldError errors={state?.errors} field="photo" />
      </div>

      <div>
        <FormCheckbox
          name="openToWork"
          label="Open to Work"
        />
      </div>

      <fieldset>
        <FormLabel as="legend">Focus</FormLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {FOCUS_OPTIONS.map((option) => (
            <FormCheckbox
              key={option.value}
              name="focus"
              value={option.value}
              label={option.title}
            />
          ))}
        </div>
      </fieldset>

      <div>
        <FormLabel htmlFor="experienceLevel">Experience Level</FormLabel>
        <FormSelect
          name="experienceLevel"
          options={EXPERIENCE_LEVEL_OPTIONS}
          placeholder="Select..."
        />
      </div>

      <fieldset>
        <FormLabel as="legend">Industries</FormLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {INDUSTRY_OPTIONS.map((option) => (
            <FormCheckbox
              key={option.value}
              name="industries"
              value={option.value}
              label={option.title}
            />
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FormLabel htmlFor="island">Island</FormLabel>
          <FormSelect
            name="island"
            options={ISLAND_OPTIONS}
            placeholder="Select..."
            onChange={setSelectedIsland}
          />
        </div>
        <div key={selectedIsland}>
          <FormLabel htmlFor="city">City</FormLabel>
          {selectedIsland && selectedIsland !== "mainland-international" && ISLAND_CITIES[selectedIsland] ? (
            <FormSelect
              name="city"
              options={ISLAND_CITIES[selectedIsland]}
              placeholder="Select city..."
            />
          ) : (
            <FormInput
              type="text"
              id="city"
              name="city"
              placeholder={
                selectedIsland === "mainland-international"
                  ? "e.g., Portland, OR"
                  : "Select an island first"
              }
            />
          )}
        </div>
      </div>

      <div>
        <FormLabel htmlFor="educationBootcamp">Education/Bootcamp</FormLabel>
        <FormInput
          type="text"
          id="educationBootcamp"
          name="educationBootcamp"
          placeholder="UX-related education or bootcamp attended"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FormLabel htmlFor="linkedIn">LinkedIn URL</FormLabel>
          <FormInput
            type="url"
            id="linkedIn"
            name="linkedIn"
            placeholder="https://linkedin.com/in/..."
          />
          <FieldError errors={state?.errors} field="linkedIn" />
        </div>
        <div>
          <FormLabel htmlFor="portfolio">Portfolio URL</FormLabel>
          <FormInput
            type="url"
            id="portfolio"
            name="portfolio"
            placeholder="https://"
          />
          <FieldError errors={state?.errors} field="portfolio" />
        </div>
      </div>

      <FormSubmitButton
        label="Submit profile"
        pendingLabel="Submitting..."
        isPending={isPending}
        icon="arrow"
      />
    </form>
  );
}
