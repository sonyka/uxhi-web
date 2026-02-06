import { defineType, defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Event Date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "time",
      type: "string",
      title: "Time",
      description: "e.g. 3:00pm - 5:00pm",
    }),
    defineField({
      name: "location",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Event URL",
    }),
    defineField({
      name: "tentative",
      type: "boolean",
      title: "Tentative (TBC)",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      tentative: "tentative",
    },
    prepare({ title, date, tentative }) {
      const dateStr = date
        ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No date";
      return {
        title,
        subtitle: `${dateStr}${tentative ? " (TBC)" : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Date (Ascending)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
