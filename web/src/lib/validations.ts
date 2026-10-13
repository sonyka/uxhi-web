import { z } from "zod";
import { EXPERIENCE_LEVEL_OPTIONS } from "@/components/directory/constants";

// ── Inquiry (Contact) Form ──────────────────────────────────────────────────

export const inquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().optional(),
  company: z.string().optional(),
  interestType: z.enum(
    [
      "Becoming a volunteer",
      "Becoming a speaker",
      "Becoming partners and collaborators",
      "Updating my directory profile",
      "Something else",
    ],
    { message: "Please select what you're interested in" },
  ),
  message: z.string().min(1, "Message is required"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

// ── Membership (Join) Form ──────────────────────────────────────────────────

// Experience uses the directory's years scale, so the join form's answer can
// carry straight into the member's directory profile instead of being asked
// twice on two different scales.
const EXPERIENCE_LEVEL_VALUES = EXPERIENCE_LEVEL_OPTIONS.map((o) => o.value) as [
  (typeof EXPERIENCE_LEVEL_OPTIONS)[number]["value"],
  ...(typeof EXPERIENCE_LEVEL_OPTIONS)[number]["value"][],
];

// One question for both what people want and what they'd give; it replaced a
// "hopes" text box and a "what can you contribute" list that overlapped.
export const INTEREST_OPTIONS = [
  "Learn & grow",
  "Find work",
  "Meet people",
  "Mentor others",
  "Speak at events",
  "Write for the blog",
  "Volunteer",
] as const;

export const HEAR_ABOUT_OPTIONS = [
  "Event",
  "Friend or Colleague",
  "Google Search",
  "LinkedIn",
  "Other",
] as const;

export const membershipSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  linkedIn: z.string().url("Please enter a valid URL"),
  experienceLevel: z.enum(EXPERIENCE_LEVEL_VALUES, {
    message: "Please select your experience level",
  }),
  interests: z.array(z.enum(INTEREST_OPTIONS)).optional(),
  hearAboutUs: z.string().optional(),
});

export type MembershipFormData = z.infer<typeof membershipSchema>;

// ── Directory Submission Form ───────────────────────────────────────────────

// The directory is members-only. New members reach this form as step 2 of the
// join form; members joining later fill it in on /directory. Membership is
// checked at review time (see directory-submit.ts), not here.
export const directorySubmissionSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  jobTitle: z.string().optional(),
  openToWork: z.boolean().optional(),
  focus: z.array(z.string()).optional(),
  experienceLevel: z.string().optional(),
  industries: z.array(z.string()).optional(),
  island: z.string().optional(),
  city: z.string().optional(),
  location: z.string().optional(),
  educationBootcamp: z.string().optional(),
  linkedIn: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type DirectorySubmissionFormData = z.infer<typeof directorySubmissionSchema>;
