import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

// Session speakers for a conference year.
//
// Same shape as conferenceTeam: an optional link to the standing team member,
// with local fields as fallback and override. Most speakers are not UXHI team —
// of the 2026 lineup only three have a teamMember record — so the link has to
// be optional and the local fields have to be able to carry a whole person.
//
// The schedule itself stays in code (conference/2026/agenda.ts). Times, rooms
// and session titles are structure, edited when someone is already in the
// codebase; people are content, and this is where they live. `slug` is the
// join between the two.
export const conferenceSpeaker = defineType({
  name: "conferenceSpeaker",
  title: "Conference Speaker",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "year",
      title: "Conference Year",
      type: "number",
      description:
        "Auto-set from the year folder. Read-only so it can't be changed by accident — a wrong value drops the speaker from both the Studio folder and the live agenda.",
      initialValue: 2026,
      readOnly: true,
      validation: (rule) => rule.required().min(2024).integer(),
    }),
    defineField({
      name: "slug",
      title: "Agenda key",
      type: "slug",
      description:
        "Matches the speaker's `slug` in agenda.ts, which is how a session finds them. Changing it silently detaches the speaker from their session, so treat it as fixed once set.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "person",
      title: "Team Member",
      type: "reference",
      to: [{ type: "teamMember" }],
      description:
        "Link if the speaker is also on the UXHI team. Name, photo and bio are then taken from that record. Leave empty for an outside speaker and fill in the fields below.",
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
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description:
        "Shown in the speaker drawer. Overrides a linked team member's bio; leave empty to inherit.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Overrides a linked team member's photo. Leave empty to inherit.",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "title",
      title: "Title / Affiliation",
      type: "string",
      description: "e.g., Director of Research, Culturalyst",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      personName: "person.name",
      subtitle: "title",
      media: "photo",
      personMedia: "person.photo",
    },
    prepare({ title, personName, subtitle, media, personMedia }) {
      return {
        title: title || personName,
        subtitle,
        media: media || personMedia,
      };
    },
  },
});
