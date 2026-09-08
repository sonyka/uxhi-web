"use server";

import { membershipSchema } from "@/lib/validations";
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
} | null;

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
    // Save to Sanity
    await writeClient.create({
      _type: "membershipApplication",
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      linkedinOrWebsite: data.linkedinOrWebsite,
      experienceLevel: data.experienceLevel,
      hopes: data.hopes || "",
      contributions: data.contributions || [],
      hearAboutUs: data.hearAboutUs || "",
      status: "new",
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

    rememberSubmission(data.email);
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
