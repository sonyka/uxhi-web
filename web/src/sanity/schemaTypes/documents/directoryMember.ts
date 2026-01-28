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
      name: "focus",
      title: "Focus",
      type: "array",
      of: [{ type: "string" }],
      description: "Select one or more areas of focus",
      options: {
        list: [
          { title: "Accessibility Design", value: "accessibility-design" },
          { title: "AR/VR Design", value: "ar-vr-design" },
          { title: "Brand Identity", value: "brand-identity" },
          { title: "Content Strategy", value: "content-strategy" },
          { title: "Design Ops", value: "design-ops" },
          { title: "Information Architecture", value: "information-architecture" },
          { title: "Interaction Design", value: "interaction-design" },
          { title: "Product Design", value: "product-design" },
          { title: "Product Strategy", value: "product-strategy" },
          { title: "Product Management", value: "product-management" },
          { title: "Service Design", value: "service-design" },
          { title: "UI Design", value: "ui-design" },
          { title: "Usability Evaluation", value: "usability-evaluation" },
          { title: "User Research", value: "user-research" },
          { title: "UX Leadership", value: "ux-leadership" },
        ],
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
