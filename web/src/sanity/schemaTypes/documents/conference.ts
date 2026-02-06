import { defineType, defineField } from "sanity";
import { PresentationIcon } from "@sanity/icons";

export const conference = defineType({
  name: "conference",
  title: "Conference",
  type: "document",
  icon: PresentationIcon,
  fields: [
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Conference Title",
      description: "e.g. 2025 UXHI Conference",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Conference URL",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isCurrent",
      type: "boolean",
      title: "Current Conference",
      description: "The current/upcoming conference gets the primary CTA",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      isCurrent: "isCurrent",
    },
    prepare({ title, year, isCurrent }) {
      return {
        title,
        subtitle: `${year}${isCurrent ? " — Current" : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Year (Descending)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
