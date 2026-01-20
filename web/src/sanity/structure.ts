import type { StructureBuilder } from "sanity/structure";
import {
  UsersIcon,
  BookIcon,
  CommentIcon,
  BasketIcon,
  EnvelopeIcon,
  ImageIcon,
  ImagesIcon,
  StarIcon,
  FolderIcon,
  LinkIcon,
  DocumentIcon,
} from "@sanity/icons";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Homepage Content
      S.listItem()
        .title("Homepage")
        .icon(ImageIcon)
        .child(
          S.list()
            .title("Homepage Content")
            .items([
              S.documentTypeListItem("instagramPost").title("Instagram Feed").icon(ImageIcon),
              S.documentTypeListItem("communityPhoto").title("Community Photos").icon(ImagesIcon),
            ])
        ),

      S.divider(),

      // About Page
      S.listItem()
        .title("About Page")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("About Page Content")
            .items([
              S.documentTypeListItem("member").title("Team Members").icon(UsersIcon),
              S.documentTypeListItem("value").title("Values").icon(StarIcon),
            ])
        ),

      S.divider(),

      // Resources
      S.listItem()
        .title("Resources")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Resources Content")
            .items([
              S.documentTypeListItem("resourceCategory").title("Resource Categories").icon(FolderIcon),
              S.documentTypeListItem("resourceItem").title("Resource Items").icon(LinkIcon),
              S.documentTypeListItem("stateOfUxReport").title("State of UX Reports").icon(DocumentIcon),
              S.documentTypeListItem("techOrganization").title("Tech Organizations").icon(UsersIcon),
            ])
        ),

      S.divider(),

      // Other content
      S.documentTypeListItem("testimonial").title("Testimonials").icon(CommentIcon),
      S.documentTypeListItem("product").title("Merch Products").icon(BasketIcon),
      S.documentTypeListItem("faq").title("FAQs").icon(BookIcon),

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
