"use client";

import { useActionState } from "react";
import { submitMembership, type MembershipState } from "@/lib/actions/membership";
import {
  EXPERIENCE_OPTIONS,
  CONTRIBUTE_OPTIONS,
  HEAR_ABOUT_OPTIONS,
} from "@/lib/validations";
import { FormAlert, FieldError, FormSuccess } from "@/components/ui/FormFeedback";
import {
  FormLabel,
  FormInput,
  FormTextarea,
  FormRadio,
  FormCheckbox,
  FormSubmitButton,
} from "@/components/ui/form-elements";

export function MembershipForm() {
  const [state, formAction, isPending] = useActionState<MembershipState, FormData>(
    submitMembership,
    null,
  );

  if (state?.success) {
    return (
      <FormSuccess icon="&#127881;" title="Application received!" message={state.message} />
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
        <FormLabel htmlFor="email">Email *</FormLabel>
        <FormInput type="email" id="email" name="email" required />
        <FieldError errors={state?.errors} field="email" />
      </div>

      <div>
        <FormLabel htmlFor="linkedinOrWebsite">LinkedIn or Website *</FormLabel>
        <FormInput
          type="url"
          id="linkedinOrWebsite"
          name="linkedinOrWebsite"
          required
          placeholder="https://"
        />
        <FieldError errors={state?.errors} field="linkedinOrWebsite" />
      </div>

      <fieldset>
        <FormLabel as="legend">Experience Level *</FormLabel>
        <div className="space-y-2 mt-1">
          {EXPERIENCE_OPTIONS.map((option) => (
            <FormRadio
              key={option}
              name="experienceLevel"
              value={option}
              label={option}
              required
            />
          ))}
        </div>
        <FieldError errors={state?.errors} field="experienceLevel" />
      </fieldset>

      <div>
        <FormLabel htmlFor="hopes">What do you hope to get out of the community?</FormLabel>
        <FormTextarea id="hopes" name="hopes" rows={3} />
      </div>

      <fieldset>
        <FormLabel as="legend">What can you contribute?</FormLabel>
        <div className="space-y-2 mt-1">
          {CONTRIBUTE_OPTIONS.map((option) => (
            <FormCheckbox
              key={option}
              name="contributions"
              value={option}
              label={option}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <FormLabel as="legend">How did you hear about us?</FormLabel>
        <div className="space-y-2 mt-1">
          {HEAR_ABOUT_OPTIONS.map((option) => (
            <FormRadio
              key={option}
              name="hearAboutUs"
              value={option}
              label={option}
            />
          ))}
        </div>
      </fieldset>

      <FormSubmitButton
        label="Submit application"
        pendingLabel="Submitting..."
        isPending={isPending}
        icon="arrow"
      />
    </form>
  );
}
