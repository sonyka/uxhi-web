import { defineType, defineField } from "sanity";
import { HeartIcon } from "@sanity/icons";

// Conference content is kept entirely separate from the main UXHI site content.
// Every conference document carries a `year` and is surfaced in Studio under a
// dedicated "Conference" → <year> section (see src/sanity/structure.ts).
export const conferenceSponsor = defineType({
  name: "conferenceSponsor",
  title: "Conference Sponsor",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "year",
      title: "Conference Year",
      type: "number",
      description:
        "Auto-set from the year folder you create the sponsor under (defaults to 2026). Read-only so it can't be changed by accident.",
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
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Sponsor logo — shown in the card. Use a transparent PNG/SVG where possible.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
      description: "The card links out to this address.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "A short one-liner shown under the name.",
    }),
  ],
  preview: {
    select: { title: "name", year: "year", subtitle: "description", media: "logo" },
    prepare({ title, year, subtitle, media }) {
      return {
        title,
        subtitle: [year, subtitle].filter(Boolean).join(" · "),
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
