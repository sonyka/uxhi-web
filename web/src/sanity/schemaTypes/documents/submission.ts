import { defineType, defineField, defineArrayMember } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const submission = defineType({
  name: "submission",
  title: "Form Submission",
  type: "document",
  icon: EnvelopeIcon,
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
      name: "interests",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      readOnly: true,
    }),
    defineField({
      name: "message",
      type: "text",
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
          { title: "Joined", value: "joined" },
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
