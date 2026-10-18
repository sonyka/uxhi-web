"use client";
import { SpamGuard } from "./SpamGuard";
import { keepAnswers } from "@/lib/keepAnswers";

import { Suspense, useEffect, useState, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitDirectoryEntry, type DirectorySubmitState } from "@/lib/actions/directory-submit";
import type { MembershipPrefill } from "@/lib/actions/membership";
import {
  FOCUS_OPTIONS,
  ISLAND_OPTIONS,
  ISLAND_CITIES,
  EXPERIENCE_LEVEL_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/components/directory/constants";
import { FormAlert, FieldError, FormSuccess } from "@/components/ui/FormFeedback";
import { DirectoryCommitment } from "./commitments";
import {
  FormLabel,
  FormInput,
  FormCheckbox,
  FormSelect,
  FormFileUpload,
  FormHelpText,
  FormSubmitButton,
} from "@/components/ui/form-elements";

interface DirectorySubmitFormProps {
  /**
   * Step 2 of the join form. What the member just told us travels as hidden
   * inputs behind a one-line summary, so the form asks only for what joining
   * didn't: photo, title, focus, location, website.
   */
  prefill?: MembershipPrefill;
  /** Adds a "Skip for now" button beside Submit. */
  onSkip?: () => void;
  /** Hands the success card to the parent, which shows one final card instead of two. */
  onSuccess?: () => void;
}

// Without `prefill` this is the full form on /add-profile, for members adding
// a profile later. It pre-fills from the URL, for member outreach links and
// the join form's "Skip for now" link:
// /add-profile?firstName=…&lastName=…&email=…&linkedIn=…&experienceLevel=…
function DirectorySubmitFormInner({ prefill, onSkip, onSuccess }: DirectorySubmitFormProps) {
  const searchParams = useSearchParams();
  const fromUrl = (key: string) => searchParams.get(key) || undefined;
  const [state, formAction, isPending] = useActionState<DirectorySubmitState, FormData>(
    submitDirectoryEntry,
    null,
  );
  const [selectedIsland, setSelectedIsland] = useState("");

  useEffect(() => {
    if (state?.success) onSuccess?.();
  }, [state?.success, onSuccess]);

  if (state?.success) {
    if (onSuccess) return null;
    return (
      <FormSuccess iconSrc="/images/icons/icon-directory-success.svg" title="Profile submitted!" message={state.message} />
    );
  }

  return (
    <form action={formAction} onSubmit={keepAnswers(formAction)} className="space-y-6 text-left">
      <SpamGuard />

      {state?.message && !state.success && (
        <FormAlert message={state.message} />
      )}

      {prefill ? (
        <>
          <input type="hidden" name="firstName" value={prefill.firstName} />
          <input type="hidden" name="lastName" value={prefill.lastName} />
          <input type="hidden" name="email" value={prefill.email} />
          <input type="hidden" name="linkedIn" value={prefill.linkedIn} />
          <input type="hidden" name="experienceLevel" value={prefill.experienceLevel} />
          <p className="text-white">
            <span className="font-semibold">{prefill.firstName} {prefill.lastName}</span>
            <span className="text-purple-30"> · {prefill.email}</span>
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <FormLabel htmlFor="firstName">First Name *</FormLabel>
              <FormInput type="text" id="firstName" name="firstName" required defaultValue={fromUrl("firstName")} />
              <FieldError errors={state?.errors} field="firstName" />
            </div>
            <div>
              <FormLabel htmlFor="lastName">Last Name *</FormLabel>
              <FormInput type="text" id="lastName" name="lastName" required defaultValue={fromUrl("lastName")} />
              <FieldError errors={state?.errors} field="lastName" />
            </div>
          </div>

          <div>
            <FormLabel htmlFor="email">Email *</FormLabel>
            <FormInput type="email" id="email" name="email" required defaultValue={fromUrl("email")} />
            <FormHelpText>Private. Never shown in the directory. We use it to match your profile to your membership.</FormHelpText>
            <FieldError errors={state?.errors} field="email" />
          </div>
        </>
      )}

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
          // Under the 5MB server-action body limit with room for the rest of
          // the form; a larger photo is shrunk in the browser to fit.
          maxBytes={4_000_000}
          helpText="JPG, PNG, or WebP, up to 4MB. Larger photos are resized for you."
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

      {!prefill && (
        <div>
          <FormLabel htmlFor="experienceLevel">Experience Level</FormLabel>
          <FormSelect
            name="experienceLevel"
            options={EXPERIENCE_LEVEL_OPTIONS}
            placeholder="Select..."
            defaultValue={fromUrl("experienceLevel")}
          />
        </div>
      )}

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

      <div className={prefill ? undefined : "grid grid-cols-1 sm:grid-cols-2 gap-5"}>
        {!prefill && (
          <div>
            <FormLabel htmlFor="linkedIn">LinkedIn URL</FormLabel>
            <FormInput
              type="url"
              id="linkedIn"
              name="linkedIn"
              placeholder="https://linkedin.com/in/..."
              defaultValue={fromUrl("linkedIn")}
            />
            <FieldError errors={state?.errors} field="linkedIn" />
          </div>
        )}
        <div>
          <FormLabel htmlFor="portfolio">Website or Portfolio</FormLabel>
          <FormInput
            type="url"
            id="portfolio"
            name="portfolio"
            placeholder="https://"
          />
          <FieldError errors={state?.errors} field="portfolio" />
        </div>
      </div>

      <DirectoryCommitment errors={state?.errors} />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <FormSubmitButton
          label="Submit profile"
          pendingLabel="Submitting..."
          isPending={isPending}
          icon="arrow"
        />
        {onSkip && (
          // InlineLink's look (inherited colour, dotted rule, hover fade) on a
          // button, since skipping changes state rather than navigating.
          <button
            type="button"
            onClick={onSkip}
            disabled={isPending}
            className="text-white font-medium underline decoration-dotted decoration-current/40 underline-offset-2 hover:opacity-70 transition-opacity disabled:opacity-50"
          >
            Skip for now
          </button>
        )}
      </div>
    </form>
  );
}

export function DirectorySubmitForm(props: DirectorySubmitFormProps) {
  return (
    <Suspense>
      <DirectorySubmitFormInner {...props} />
    </Suspense>
  );
}
