import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const partnerSponsor = defineType({
  name: "partnerSponsor",
  title: "Partner / Sponsor",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Partner", value: "partner" },
          { title: "Sponsor", value: "sponsor" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: false },
    }),
    defineField({
      name: "website",
      type: "url",
    }),
    defineField({
      name: "displayWidth",
      type: "number",
      title: "Display Width (px)",
      description: "Optical sizing — controls the rendered width of the logo",
    }),
    defineField({
      name: "darkGray",
      type: "boolean",
      title: "Dark gray logo",
      description: "Enable for logos that are too dark at 50% opacity",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
    }),
  ],
  preview: {
    select: {
      title: "name",
      type: "type",
      media: "logo",
    },
    prepare({ title, type, media }) {
      return {
        title,
        subtitle: type === "partner" ? "Partner" : "Sponsor",
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
