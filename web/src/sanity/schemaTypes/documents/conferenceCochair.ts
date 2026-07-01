import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

// Conference content is kept entirely separate from the main UXHI site content.
// Every conference document carries a `year` and is surfaced in Studio under a
// dedicated "Conference" → <year> section (see src/sanity/structure.ts).
export const conferenceCochair = defineType({
  name: "conferenceCochair",
  title: "Conference Co-Chair",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "year",
      title: "Conference Year",
      type: "number",
      description: "Which conference year this co-chair belongs to (e.g., 2026).",
      initialValue: 2026,
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
