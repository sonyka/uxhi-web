import { z } from "zod";

// ── Inquiry (Contact) Form ──────────────────────────────────────────────────

export const inquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().optional(),
  company: z.string().optional(),
  interestType: z.enum(
    ["Becoming a volunteer", "Becoming a speaker", "Becoming partners and collaborators", "Something else"],
    { message: "Please select what you're interested in" },
  ),
  message: z.string().min(1, "Message is required"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

// ── Membership (Join) Form ──────────────────────────────────────────────────

export const EXPERIENCE_OPTIONS = [
  "Curious about UX design",
  "Currently self-studying",
  "Enrolled in a UX design education program",
  "Recently graduated and actively job hunting",
  "Volunteering/interning in a UX design-related role",
  "Working full-time in a UX design-related role",
] as const;

export const CONTRIBUTE_OPTIONS = [
  "I just want to learn more about UX",
  "Volunteer to speak",
  "Volunteer to mentor",
  "Contribute to a community blog",
  "Other",
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
  linkedinOrWebsite: z.string().url("Please enter a valid URL"),
  experienceLevel: z.enum(EXPERIENCE_OPTIONS, {
    message: "Please select your experience level",
  }),
  hopes: z.string().optional(),
  contributions: z.array(z.string()).optional(),
  hearAboutUs: z.string().optional(),
});

export type MembershipFormData = z.infer<typeof membershipSchema>;

// ── Directory Submission Form ───────────────────────────────────────────────

export const directorySubmissionSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
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
