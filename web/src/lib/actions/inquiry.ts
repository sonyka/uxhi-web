"use server";

import { inquirySchema } from "@/lib/validations";
import { client } from "@/sanity/lib/client";
import { sendSlackNotification } from "@/lib/slack";

export type InquiryState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Simple in-memory rate limiting
const submissions = new Map<string, number>();

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot check
  if (formData.get("website")) {
    // Bot detected — silently succeed
    return { success: true, message: "Thanks! We'll be in touch soon." };
  }

  // Rate limiting: 3 submissions per email per hour
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
    role: formData.get("role") || undefined,
    company: formData.get("company") || undefined,
    interestType: formData.get("interestType"),
    message: formData.get("message"),
  };

  const result = inquirySchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;
  const fullName = `${data.firstName} ${data.lastName}`;

  try {
    // Save to Sanity
    await writeClient.create({
      _type: "submission",
      name: fullName,
      email: data.email,
      role: data.role || "",
      company: data.company || "",
      interestType: data.interestType,
      interests: [data.interestType],
      message: data.message,
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    // Slack notification
    await sendSlackNotification([
      {
        type: "header",
        text: { type: "plain_text", text: "New Inquiry", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${fullName}` },
          { type: "mrkdwn", text: `*Email:*\n${data.email}` },
          { type: "mrkdwn", text: `*Interest:*\n${data.interestType}` },
          ...(data.role ? [{ type: "mrkdwn", text: `*Role:*\n${data.role}` }] : []),
          ...(data.company ? [{ type: "mrkdwn", text: `*Company:*\n${data.company}` }] : []),
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Message:*\n${data.message}` },
      },
    ]);

    submissions.set(data.email, now);
    return { success: true, message: "Thanks! We'll be in touch soon." };
  } catch (error) {
    console.error("Inquiry submission error:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Something went wrong: ${errMsg}`,
    };
  }
}
