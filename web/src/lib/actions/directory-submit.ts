"use server";

import { directorySubmissionSchema } from "@/lib/validations";
import { client } from "@/sanity/lib/client";
import { sendSlackNotification } from "@/lib/slack";

export type DirectorySubmitState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const submissions = new Map<string, number>();

export async function submitDirectoryEntry(
  _prevState: DirectorySubmitState,
  formData: FormData,
): Promise<DirectorySubmitState> {
  // Honeypot check
  if (formData.get("company_url")) {
    return { success: true, message: "Your profile has been submitted for review." };
  }

  // Rate limiting by name (no email field in this form)
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const now = Date.now();
  const key = `${firstName} ${lastName}`.toLowerCase().trim();
  const lastSubmission = submissions.get(key);
  if (lastSubmission && now - lastSubmission < 60 * 60 * 1000) {
    return {
      success: false,
      message: "You've already submitted recently. Please try again later.",
    };
  }

  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    jobTitle: formData.get("jobTitle") || undefined,
    openToWork: formData.get("openToWork") === "on",
    focus: formData.getAll("focus").filter(Boolean) as string[],
    experienceLevel: (formData.get("experienceLevel") as string) || undefined,
    industries: formData.getAll("industries").filter(Boolean) as string[],
    island: (formData.get("island") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    location: formData.get("location") || undefined,
    educationBootcamp: formData.get("educationBootcamp") || undefined,
    linkedIn: (formData.get("linkedIn") as string) || "",
    portfolio: (formData.get("portfolio") as string) || "",
  };

  const result = directorySubmissionSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  // Validate photo
  const photo = formData.get("photo") as File | null;
  if (!photo || photo.size === 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: { photo: ["Photo is required"] },
    };
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(photo.type)) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: { photo: ["Please upload a JPG, PNG, or WebP image"] },
    };
  }

  // Max 5MB
  if (photo.size > 5 * 1024 * 1024) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: { photo: ["Image must be under 5MB"] },
    };
  }

  try {
    // Upload photo to Sanity
    const photoBuffer = Buffer.from(await photo.arrayBuffer());
    const asset = await writeClient.assets.upload("image", photoBuffer, {
      filename: photo.name,
      contentType: photo.type,
    });

    // Create draft directoryMember
    const draftId = `drafts.directory-${Date.now()}`;
    await writeClient.create({
      _id: draftId,
      _type: "directoryMember",
      name: `${data.firstName} ${data.lastName}`,
      title: data.jobTitle || "",
      photo: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: `Headshot of ${data.firstName} ${data.lastName}`,
      },
      openToWork: data.openToWork || false,
      focus: data.focus?.length ? data.focus : undefined,
      experienceLevel: data.experienceLevel || undefined,
      industries: data.industries?.length ? data.industries : undefined,
      island: data.island || undefined,
      city: data.city || undefined,
      educationBootcamp: data.educationBootcamp || "",
      linkedIn: data.linkedIn || "",
      portfolio: data.portfolio || "",
      order: 0,
    });

    // Slack notification
    await sendSlackNotification([
      {
        type: "header",
        text: { type: "plain_text", text: "New Directory Submission", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${data.firstName} ${data.lastName}` },
          ...(data.jobTitle ? [{ type: "mrkdwn", text: `*Title:*\n${data.jobTitle}` }] : []),
          ...(data.island ? [{ type: "mrkdwn", text: `*Location:*\n${[data.city, data.island].filter(Boolean).join(", ")}` }] : []),
          ...(data.experienceLevel ? [{ type: "mrkdwn", text: `*Experience:*\n${data.experienceLevel}` }] : []),
        ],
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: "Awaiting admin review — publish in Sanity Studio to add to directory" }],
      },
    ]);

    if (key) submissions.set(key, now);
    return {
      success: true,
      message: "Your profile has been submitted for review. A team member will publish it within a few business days.",
    };
  } catch (error) {
    console.error("Directory submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
