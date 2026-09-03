import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

// Renamed from `member` in Sept 2026. The old name was indistinguishable from
// `directoryMember` — the public /find-ux-pro directory — in queries and schema
// files, which is a bad thing to be guessing about. Studio labels are unchanged:
// this has always shown as "Team Members".
//
// Sanity cannot rename a type in place, so the 9 documents were copied to new
// `teamMember` ids rather than mutated. The originals are deliberately still
// there: production is serving /about#team from them until this code ships.
export const teamMember = defineType({
  name: "teamMember",
  title: "Team",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first)",
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g., Co-Founder, Events Manager, Advisor",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Team category for grouping on the About page",
      options: {
        list: [
          { title: "Founder", value: "founder" },
          { title: "Community & Events", value: "community-events" },
          { title: "Annual Conference", value: "annual-conference" },
          { title: "Professional Development", value: "professional-development" },
          // Hidden from /about#team since 2026-08-29 — both held only a "TBD"
          // placeholder. Disabled here too so nobody assigns a member to a
          // category that will not render. Restore alongside HIDDEN_CATEGORIES
          // in components/sections/team/TeamSection.tsx.
          // { title: "Communication & Outreach", value: "communication-outreach" },
          // { title: "Standards & Credentialing", value: "standards-credentialing" },
          { title: "Research & Industry Partnerships", value: "research-partnerships" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
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
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter/X URL",
          type: "url",
        }),
        defineField({
          name: "website",
          title: "Personal Website",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "isFounder",
      title: "Is Founder",
      type: "boolean",
      description: "Check if this member is a founder/core team member shown on About page",
      initialValue: false,
    }),
    defineField({
      name: "hidden",
      title: "Hidden from /about",
      type: "boolean",
      description:
        "Hide from the team grid without deleting the record. Deleting would blank this person out of any past conference year that borrows their bio, which would quietly rewrite an archive.",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show in featured team sections",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
