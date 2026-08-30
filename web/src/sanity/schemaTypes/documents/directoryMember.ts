import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";
import { FOCUS_OPTIONS, INDUSTRY_OPTIONS } from "@/components/directory/constants";

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
      name: "focus",
      title: "Focus",
      type: "array",
      of: [{ type: "string" }],
      description: "Select one or more areas of focus",
      // Single source: FOCUS_OPTIONS in components/directory/constants.ts, which
      // mirrors the live submission form. Imported rather than duplicated so the
      // Studio, the directory UI and the submit form cannot drift apart.
      options: {
        list: [...FOCUS_OPTIONS],
      },
    }),
    defineField({
      name: "experienceLevel",
      title: "Experience Level",
      type: "string",
      options: {
        list: [
          { title: "Student or Transitioning", value: "student-transitioning" },
          { title: "< 1 year", value: "less-than-1-year" },
          { title: "1-2 years", value: "1-2-years" },
          { title: "3-4 years", value: "3-4-years" },
          { title: "5-9 years", value: "5-9-years" },
          { title: "10-19 years", value: "10-19-years" },
          { title: "20+ years", value: "20-plus-years" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [{ type: "string" }],
      // Single source: INDUSTRY_OPTIONS in components/directory/constants.ts.
      options: {
        list: [...INDUSTRY_OPTIONS],
      },
    }),
    defineField({
      name: "island",
      title: "Island",
      type: "string",
      options: {
        list: [
          { title: "O\u02BBahu", value: "oahu" },
          { title: "Hawai\u02BBi (Big Island)", value: "hawaii" },
          { title: "Maui", value: "maui" },
          { title: "Kaua\u02BBi", value: "kauai" },
          { title: "Moloka\u02BBi", value: "molokai" },
          { title: "L\u0101na\u02BBi", value: "lanai" },
          { title: "Mainland / International", value: "mainland-international" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      description: "e.g., Honolulu, Kailua, Portland",
    }),
    defineField({
      name: "location",
      title: "Location (Legacy)",
      type: "string",
      description: "Deprecated — use Island + City instead",
      hidden: true,
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
      island: "island",
      city: "city",
    },
    prepare({ title, subtitle, media, openToWork, island, city }) {
      const locationParts = [city, island].filter(Boolean).join(", ");
      const display = [subtitle, locationParts].filter(Boolean).join(" · ");
      return {
        title: openToWork ? `🟢 ${title}` : title,
        subtitle: display,
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
