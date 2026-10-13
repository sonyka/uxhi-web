import { defineType, defineField, defineArrayMember } from "sanity";
import { AddUserIcon } from "@sanity/icons";

export const membershipApplication = defineType({
  name: "membershipApplication",
  title: "Membership Application",
  type: "document",
  icon: AddUserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "linkedinOrWebsite",
      title: "LinkedIn",
      description: "Older applications may hold a website instead",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "experienceLevel",
      title: "Experience Level",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "interests",
      title: "What Brings Them to UXHI",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      readOnly: true,
    }),
    // Older applications only: the join form asked these two before
    // "What brings you to UXHI?" replaced them. Hidden when empty.
    defineField({
      name: "hopes",
      title: "Hopes for Membership",
      description: "Older applications only",
      type: "text",
      readOnly: true,
      hidden: ({ value }) => !value,
    }),
    defineField({
      name: "contributions",
      description: "Older applications only",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      readOnly: true,
      hidden: ({ value }) => !value || (Array.isArray(value) && value.length === 0),
    }),
    defineField({
      name: "hearAboutUs",
      title: "How They Heard About Us",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      type: "text",
      title: "Internal Notes",
    }),
  ],
  preview: {
    select: {
      name: "name",
      email: "email",
      status: "status",
      date: "submittedAt",
    },
    prepare({ name, email, status, date }) {
      return {
        title: name || email,
        subtitle: `${status || "new"} - ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
