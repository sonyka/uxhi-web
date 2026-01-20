import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const stateOfUxReport = defineType({
  name: "stateOfUxReport",
  title: "State of UX Report",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "reportUrl",
      type: "url",
      title: "Report URL",
      description: "Link to the full report",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "highlights",
      type: "array",
      title: "Key Highlights",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "icon",
              type: "image",
              title: "Icon",
            }),
            defineField({
              name: "stats",
              type: "string",
              title: "Key Stat",
              description: "e.g., '75%' or '3.5x'",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Report",
      description: "Show this report prominently on the resources page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "coverImage",
    },
    prepare({ title, year, media }) {
      return {
        title: title || `State of UX ${year}`,
        subtitle: year?.toString(),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Year (Newest)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
