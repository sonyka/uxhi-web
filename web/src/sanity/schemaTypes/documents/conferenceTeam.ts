import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

// Conference content is kept entirely separate from the main UXHI site content.
// Every conference document carries a `year` and is surfaced in Studio under a
// dedicated "Conference" → <year> section (see src/sanity/structure.ts).
export const conferenceTeam = defineType({
  name: "conferenceTeam",
  title: "Conference Team Member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "year",
      title: "Conference Year",
      type: "number",
      description:
        "Auto-set from the year folder you create the member under (defaults to 2026). Read-only so it can't be changed by accident — a wrong value would drop the person from both the Studio folder and the live site.",
      initialValue: 2026,
      readOnly: true,
      validation: (rule) => rule.required().min(2024).integer(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first).",
      initialValue: 0,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title / Affiliation",
      type: "string",
      description: "e.g., Co-Founder, UXHI",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description:
        'Conference role — free text. E.g. "Programming Cochair", "Marketing & Design Cochair", "Logistics Cochair", "Sponsorship Cochair", "Brand Designer Volunteer", "Social Media Volunteer". Internal — not shown on the public site.',
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", year: "year", role: "title", media: "photo" },
    prepare({ title, year, role, media }) {
      return {
        title,
        subtitle: [year, role].filter(Boolean).join(" · "),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
