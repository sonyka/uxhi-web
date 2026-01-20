import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const techOrganization = defineType({
  name: "techOrganization",
  title: "Tech Organization",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "website",
      type: "url",
      title: "Website URL",
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: false },
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Tech Community", value: "community" },
          { title: "Startup/Incubator", value: "startup" },
          { title: "Professional Association", value: "association" },
          { title: "Educational", value: "educational" },
          { title: "Government/Nonprofit", value: "government" },
        ],
      },
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Location",
      description: "e.g., 'Honolulu', 'Maui', 'Statewide'",
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
      subtitle: "category",
      media: "logo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
