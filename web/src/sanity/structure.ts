import type { StructureBuilder } from "sanity/structure";
import {
  CogIcon,
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  BookIcon,
  CommentIcon,
  BasketIcon,
  EnvelopeIcon,
} from "@sanity/icons";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      // Singleton: Landing Page
      S.listItem()
        .title("Landing Page")
        .icon(HomeIcon)
        .child(S.document().schemaType("landingPage").documentId("landingPage")),

      S.divider(),

      // Regular document lists
      S.documentTypeListItem("testimonial").title("Testimonials").icon(CommentIcon),
      S.documentTypeListItem("product").title("Merch Products").icon(BasketIcon),

      S.divider(),

      // Form submissions
      S.listItem()
        .title("Form Submissions")
        .icon(EnvelopeIcon)
        .child(
          S.documentList()
            .title("Submissions")
            .filter('_type == "submission"')
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),
    ]);
