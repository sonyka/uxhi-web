import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const communityPhoto = defineType({
  name: "communityPhoto",
  title: "Community Photo",
  type: "document",
  icon: UsersIcon,
  description: "Photos displayed in the 'A community for designers, by designers' section",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Person Name",
      type: "string",
      description: "Optional - for accessibility",
    }),
    defineField({
      name: "column",
      title: "Column Position",
      type: "number",
      description: "Which column (1-9) this image appears in",
      validation: (rule) => rule.required().min(1).max(9),
      initialValue: 1,
    }),
    defineField({
      name: "row",
      title: "Row Position",
      type: "number",
      description: "Position within the column (1 = top)",
      validation: (rule) => rule.required().min(1).max(3),
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      media: "image",
      name: "name",
      column: "column",
      row: "row",
    },
    prepare({ media, name, column, row }) {
      return {
        title: name || `Column ${column}, Row ${row}`,
        subtitle: `Position: Column ${column}, Row ${row}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "By Column",
      name: "columnAsc",
      by: [
        { field: "column", direction: "asc" },
        { field: "row", direction: "asc" },
      ],
    },
  ],
});
