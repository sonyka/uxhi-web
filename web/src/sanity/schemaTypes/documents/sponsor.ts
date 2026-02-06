import { defineType, defineField } from "sanity";
import { CreditCardIcon } from "@sanity/icons";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
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
      media: "logo",
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
