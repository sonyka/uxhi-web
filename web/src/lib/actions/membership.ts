"use server";

import { membershipSchema } from "@/lib/validations";
import { EXPERIENCE_LEVEL_OPTIONS } from "@/components/directory/constants";
import { client } from "@/sanity/lib/client";
import { sendSlackNotification } from "@/lib/slack";
import { looksAutomated, isRepeatSubmission, rememberSubmission } from "@/lib/spam";

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export type MembershipState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  /** Carried into step 2, the directory form, so a new member doesn't type it all again. */
  prefill?: MembershipPrefill;
} | null;

export type MembershipPrefill = {
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  /** The value slug, e.g. "3-4-years", as the directory form stores it. */
  experienceLevel: string;
};

export async function submitMembership(
  _prevState: MembershipState,
  formData: FormData,
): Promise<MembershipState> {
  if (looksAutomated(formData)) {
    return { success: true, message: "Thanks for applying! We'll review your application and be in touch soon." };
  }

  const email = formData.get("email") as string;
  if (isRepeatSubmission(email)) {
    return {
      success: false,
      message: "You've already submitted recently. Please try again later.",
    };
  }

  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    linkedIn: formData.get("linkedIn"),
    experienceLevel: formData.get("experienceLevel"),
    interests: formData.getAll("interests").filter(Boolean) as string[],
    hearAboutUs: formData.get("hearAboutUs") || undefined,
    agreement: formData.get("agreement") === "on",
  };

  const result = membershipSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;
  // Saved as the label: Studio shows it next to older applications, whose
  // answers are on the career-stage scale this replaced.
  const experienceTitle =
    EXPERIENCE_LEVEL_OPTIONS.find((o) => o.value === data.experienceLevel)?.title ?? data.experienceLevel;

  try {
    // Save to Sanity
    await writeClient.create({
      _type: "membershipApplication",
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      linkedinOrWebsite: data.linkedIn,
      experienceLevel: experienceTitle,
      interests: data.interests || [],
      hearAboutUs: data.hearAboutUs || "",
      status: "new",
      // Only reachable with the box ticked, so this is when they agreed.
      commitmentAgreedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    });

    // Slack notification
    await sendSlackNotification([
      {
        type: "header",
        text: { type: "plain_text", text: "New Membership Application", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${data.firstName} ${data.lastName}` },
          { type: "mrkdwn", text: `*Email:*\n${data.email}` },
          { type: "mrkdwn", text: `*LinkedIn:*\n${data.linkedIn}` },
          { type: "mrkdwn", text: `*Experience:*\n${experienceTitle}` },
        ],
      },
      ...(data.interests?.length
        ? [{ type: "section", text: { type: "mrkdwn", text: `*What brings them:*\n${data.interests.join(", ")}` } }]
        : []),
    ]);

    rememberSubmission(data.email);
    return {
      success: true,
      message: "Thanks for applying! We'll review your application and be in touch soon.",
      prefill: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        linkedIn: data.linkedIn,
        experienceLevel: data.experienceLevel,
      },
    };
  } catch (error) {
    console.error("Membership submission error:", error);
    return {
      success: false,
      // Our side failed, not theirs, and keepAnswers leaves the form filled in,
      // so the honest advice is the one thing they can do: wait and resend.
      message: "We couldn't save your application just now. Your answers are still here, so please try again in a few minutes.",
    };
  }
}
