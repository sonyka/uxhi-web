"use server";

import { membershipSchema } from "@/lib/validations";
import { sendSlackNotification } from "@/lib/slack";
import { appendToSheet } from "@/lib/google-sheets";

export type MembershipState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

const submissions = new Map<string, number>();

export async function submitMembership(
  _prevState: MembershipState,
  formData: FormData,
): Promise<MembershipState> {
  // Honeypot check
  if (formData.get("website")) {
    return { success: true, message: "Thanks for applying! We'll review your application and be in touch soon." };
  }

  // Rate limiting
  const email = formData.get("email") as string;
  const now = Date.now();
  const lastSubmission = submissions.get(email);
  if (lastSubmission && now - lastSubmission < 60 * 60 * 1000) {
    return {
      success: false,
      message: "You've already submitted recently. Please try again later.",
    };
  }

  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    linkedinOrWebsite: formData.get("linkedinOrWebsite"),
    experienceLevel: formData.get("experienceLevel"),
    hopes: formData.get("hopes") || undefined,
    contributions: formData.getAll("contributions").filter(Boolean) as string[],
    hearAboutUs: formData.get("hearAboutUs") || undefined,
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

  try {
    // Append to Google Sheet
    await appendToSheet([
      new Date().toISOString(),
      data.firstName,
      data.lastName,
      data.email,
      data.linkedinOrWebsite,
      data.experienceLevel,
      data.hopes || "",
      (data.contributions || []).join(", "),
      data.hearAboutUs || "",
    ]);

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
          { type: "mrkdwn", text: `*LinkedIn/Website:*\n${data.linkedinOrWebsite}` },
          { type: "mrkdwn", text: `*Experience:*\n${data.experienceLevel}` },
        ],
      },
      ...(data.hopes
        ? [{ type: "section", text: { type: "mrkdwn", text: `*Hopes:*\n${data.hopes}` } }]
        : []),
      ...(data.contributions?.length
        ? [{ type: "section", text: { type: "mrkdwn", text: `*Can contribute:*\n${data.contributions.join(", ")}` } }]
        : []),
    ]);

    submissions.set(data.email, now);
    return {
      success: true,
      message: "Thanks for applying! We'll review your application and be in touch soon.",
    };
  } catch (error) {
    console.error("Membership submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
