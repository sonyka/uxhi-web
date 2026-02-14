"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitInquiry, type InquiryState } from "@/lib/actions/inquiry";
import { FormAlert, FieldError, FormSuccess } from "@/components/ui/FormFeedback";
import {
  FormLabel,
  FormInput,
  FormTextarea,
  FormRadio,
  FormSubmitButton,
} from "@/components/ui/form-elements";

const INTEREST_OPTIONS = [
  "Becoming a volunteer",
  "Becoming a speaker",
  "Becoming partners and collaborators",
  "Something else",
] as const;

function InquiryFormInner() {
  const searchParams = useSearchParams();
  const preselectedInterest = searchParams.get("interest");
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FormLabel htmlFor="role">Role</FormLabel>
          <FormInput type="text" id="role" name="role" />
        </div>
        <div>
          <FormLabel htmlFor="company">Company Name</FormLabel>
          <FormInput type="text" id="company" name="company" />
        </div>
      </div>

      <fieldset>
        <FormLabel as="legend">I&apos;m interested in... *</FormLabel>
        <div className="space-y-2 mt-1">
          {INTEREST_OPTIONS.map((option) => (
            <FormRadio
              key={option}
              name="interestType"
              value={option}
              label={option}
              required
              defaultChecked={preselectedInterest === option}
            />
          ))}
        </div>
        <FieldError errors={state?.errors} field="interestType" />
      </fieldset>

      <div>
        <FormLabel htmlFor="message">Message *</FormLabel>
        <FormTextarea id="message" name="message" required rows={4} />
        <FieldError errors={state?.errors} field="message" />
      </div>

      <FormSubmitButton
        label="Send message"
        pendingLabel="Sending..."
        isPending={isPending}
        icon="send"
      />
    </form>
  );
}

export function InquiryForm() {
  return (
    <Suspense>
      <InquiryFormInner />
    </Suspense>
  );
}
