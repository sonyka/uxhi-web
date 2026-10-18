"use client";
import { SpamGuard } from "./SpamGuard";
import { keepAnswers } from "@/lib/keepAnswers";

import { useActionState, useCallback, useState } from "react";
import { submitMembership, type MembershipState } from "@/lib/actions/membership";
import { INTEREST_OPTIONS, HEAR_ABOUT_OPTIONS } from "@/lib/validations";
import { EXPERIENCE_LEVEL_OPTIONS } from "@/components/directory/constants";
import { FormAlert, FieldError, FormSuccess } from "@/components/ui/FormFeedback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionLead } from "@/components/ui/SectionLead";
import { InlineLink } from "@/components/ui/InlineLink";
import { DirectorySubmitForm } from "./DirectorySubmitForm";
import { MemberCommitment } from "./commitments";
import {
  FormLabel,
  FormInput,
  FormRadio,
  FormCheckbox,
  FormSubmitButton,
} from "@/components/ui/form-elements";

/**
 * Joining is step 1; adding a directory profile is an optional step 2 in the
 * same spot. The application is saved when step 1 submits, so skipping,
 * leaving or refreshing at step 2 never loses it.
 */
export function MembershipForm() {
  const [state, formAction, isPending] = useActionState<MembershipState, FormData>(
    submitMembership,
    null,
  );
  const [profileStep, setProfileStep] = useState<"open" | "done" | "skipped">("open");
  const finishProfile = useCallback(() => setProfileStep("done"), []);
  const skipProfile = useCallback(() => setProfileStep("skipped"), []);

  // Every success state sits under pt-32: FormSuccess scrolls itself to 144px
  // below the top of the view, and the page's Contact us line sits just
  // above the form. Without the extra room it shows through the glass nav.
  if (state?.success) {
    if (profileStep === "done") {
      return (
        <div className="pt-32">
          <FormSuccess
            iconSrc="/images/icons/icon-directory-success.svg"
            title="You're all set!"
            message="Your membership application and directory profile are in. We'll review both and publish your profile within a few business days."
          />
        </div>
      );
    }

    // Carries what they told us, so coming back later still opens a filled-in form.
    const addProfileHref = state.prefill
      ? `/add-profile?${new URLSearchParams(state.prefill)}`
      : "/add-profile";

    // Keyed on the step so skipping remounts the card, and its mount scroll
    // runs again. Otherwise React keeps the same card, the step 2 form below
    // it vanishes, and the page collapses with the view left at the bottom.
    const received = (
      <FormSuccess
        key={profileStep}
        iconSrc="/images/icons/icon-apply-success.svg"
        title="Application received!"
        message={state.message}
        action={
          profileStep === "skipped" ? (
            <p className="text-white">
              Changed your mind? You can{" "}
              <InlineLink href={addProfileHref}>add your directory profile</InlineLink> anytime.
            </p>
          ) : undefined
        }
      />
    );

    // No prefill means the spam guard answered, not a person: no step 2.
    if (profileStep === "skipped" || !state.prefill) return <div className="pt-32">{received}</div>;

    return (
      <div className="pt-32">
        {received}
        <div className="text-center mt-20 mb-10">
          <SectionEyebrow as="p" variant="dark" className="mb-3">
            Next step
          </SectionEyebrow>
          <SectionHeading as="h3" size="md" color="white" className="mb-4">
            Join our member directory
          </SectionHeading>
          <SectionLead size="md" color="white" className="mb-4">
            Are you passionate about designing better experiences and making a positive
            impact in Hawaiʻi? Request to be included in the UXHI Directory to connect with
            others, discover opportunities, find collaborators, and share your knowledge
            with our growing community.
          </SectionLead>
          <SectionLead size="md" color="white" className="mb-4">
            Whether you&apos;re an experienced practitioner, a student, transitioning into
            the field, or applying human-centered approaches in your work, we welcome you.
            Anyone who lives in Hawaiʻi or has strong ties to Hawaiʻi and is passionate
            about design, people, and community is encouraged to apply.
          </SectionLead>
          <SectionLead size="md" color="white">
            We&apos;ve filled in what you just told us, so it only takes a minute.
          </SectionLead>
        </div>
        <DirectorySubmitForm prefill={state.prefill} onSkip={skipProfile} onSuccess={finishProfile} />
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={keepAnswers(formAction)} className="space-y-6 text-left">
      <SpamGuard />

      {state?.message && !state.success && (
        <FormAlert message={state.message} scrollToId="join-form" />
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
        <FormLabel htmlFor="linkedIn">LinkedIn URL *</FormLabel>
        <FormInput
          type="url"
          id="linkedIn"
          name="linkedIn"
          required
          placeholder="https://linkedin.com/in/..."
        />
        <FieldError errors={state?.errors} field="linkedIn" />
      </div>

      <fieldset>
        <FormLabel as="legend">Experience in UX *</FormLabel>
        {/* One column: an ordered scale zigzags when split in two. */}
        <div className="space-y-2 mt-1">
          {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
            <FormRadio
              key={option.value}
              name="experienceLevel"
              value={option.value}
              label={option.title}
              required
            />
          ))}
        </div>
        <FieldError errors={state?.errors} field="experienceLevel" />
      </fieldset>

      <fieldset>
        <FormLabel as="legend">What brings you to UXHI?</FormLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {INTEREST_OPTIONS.map((option) => (
            <FormCheckbox
              key={option}
              name="interests"
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

      <MemberCommitment errors={state?.errors} />

      <FormSubmitButton
        label="Submit application"
        pendingLabel="Submitting..."
        isPending={isPending}
        icon="arrow"
      />
    </form>
  );
}
