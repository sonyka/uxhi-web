import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const directoryMember = defineType({
  name: "directoryMember",
  title: "Directory Member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      description: "e.g., Freelance Product Designer, Senior UX Researcher",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openToWork",
      title: "Open to Work",
      type: "boolean",
      description: "Is this member currently open to job opportunities?",
      initialValue: false,
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "specialty" }],
        },
      ],
      description: "Select one or more specialties",
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Technology", value: "technology" },
          { title: "Healthcare", value: "healthcare" },
          { title: "Finance", value: "finance" },
          { title: "E-commerce", value: "ecommerce" },
          { title: "Education", value: "education" },
          { title: "Government", value: "government" },
          { title: "Non-profit", value: "nonprofit" },
          { title: "Entertainment", value: "entertainment" },
          { title: "Travel & Hospitality", value: "travel-hospitality" },
          { title: "Real Estate", value: "real-estate" },
          { title: "Food & Beverage", value: "food-beverage" },
          { title: "Retail", value: "retail" },
          { title: "Automotive", value: "automotive" },
          { title: "Energy", value: "energy" },
          { title: "Agriculture", value: "agriculture" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "experienceLevel",
      title: "Experience Level",
      type: "reference",
      to: [{ type: "experienceLevel" }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., Honolulu, Maui, Remote",
    }),
    defineField({
      name: "educationBootcamp",
      title: "Education/Bootcamp",
      type: "string",
      description: "UX-related education or bootcamp attended",
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "portfolio",
      title: "Portfolio URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (within same openToWork status)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "photo",
      openToWork: "openToWork",
    },
    prepare({ title, subtitle, media, openToWork }) {
      return {
        title: openToWork ? `🟢 ${title}` : title,
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Open to Work First",
      name: "openToWorkDesc",
      by: [
        { field: "openToWork", direction: "desc" },
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
