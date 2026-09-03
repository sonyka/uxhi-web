import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

// Conference content is kept entirely separate from the main UXHI site content.
// Every conference document carries a `year` and is surfaced in Studio under a
// dedicated "Conference" → <year> section (see src/sanity/structure.ts).
export const conferenceTeam = defineType({
  name: "conferenceTeam",
  title: "Conference Team Member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "year",
      title: "Conference Year",
      type: "number",
      description:
        "Auto-set from the year folder you create the member under (defaults to 2026). Read-only so it can't be changed by accident — a wrong value would drop the person from both the Studio folder and the live site.",
      initialValue: 2026,
      readOnly: true,
      validation: (rule) => rule.required().min(2024).integer(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first).",
      initialValue: 0,
    }),
    // People who are on the standing UXHI team are the same person here, not a
    // second copy of them. Optional on purpose: three of the eight 2026 team
    // are conference volunteers with no standing-team record, and a required
    // reference would have stranded them.
    defineField({
      name: "person",
      title: "Team Member",
      type: "reference",
      to: [{ type: "teamMember" }],
      description:
        "Link to the UXHI team member, if they are one. Name, photo and bio are then taken from that record, so there is one place to update them. Leave empty for a conference-only volunteer and fill in the fields below instead.",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Only needed when there is no linked team member above.",
      hidden: ({ parent }) => Boolean(parent?.person),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { person?: unknown } | undefined;
          if (parent?.person || value) return true;
          return "Add a name, or link a team member above.";
        }),
    }),
    defineField({
      name: "title",
      title: "Title / Affiliation",
      type: "string",
      description: "e.g., Co-Founder, UXHI",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description:
        'Conference role — free text. E.g. "Programming Cochair", "Marketing & Design Cochair", "Logistics Cochair", "Sponsorship Cochair", "Brand Designer Volunteer", "Social Media Volunteer". Internal — not shown on the public site.',
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description:
        "Overrides the linked team member's bio. Use it when the year needs its own words — \"this year's conference co-chair\" belongs to 2026, not to the person's standing bio. Leave empty to inherit.",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Overrides the linked team member's photo. Leave empty to inherit.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      personName: "person.name",
      year: "year",
      role: "title",
      media: "photo",
      personMedia: "person.photo",
    },
    prepare({ title, personName, year, role, media, personMedia }) {
      return {
        title: title || personName,
        subtitle: [year, role].filter(Boolean).join(" · "),
        media: media || personMedia,
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
