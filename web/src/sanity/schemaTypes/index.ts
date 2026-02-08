// Documents
import { product } from "./documents/product";
import { submission } from "./documents/submission";
import { member } from "./documents/member";
import { faq } from "./documents/faq";
import { aboutFaq } from "./documents/aboutFaq";
import { instagramPost } from "./documents/instagramPost";
import { communityPhoto } from "./documents/communityPhoto";
import { value } from "./documents/value";
import { resourceCategory } from "./documents/resourceCategory";
import { resourceItem } from "./documents/resourceItem";
import { stateOfUxReport } from "./documents/stateOfUxReport";
import { techOrganization } from "./documents/techOrganization";
import { event } from "./documents/event";
import { partner } from "./documents/partner";
import { sponsor } from "./documents/sponsor";
import { committee } from "./documents/committee";

// Member Directory
import { directoryMember } from "./documents/directoryMember";

// Form Submissions
import { membershipApplication } from "./documents/membershipApplication";

export const schemaTypes = [
  // Documents
  product,
  submission,
  member,
  faq,
  aboutFaq,
  instagramPost,
  communityPhoto,
  value,
  resourceCategory,
  resourceItem,
  stateOfUxReport,
  techOrganization,
  event,
  partner,
  sponsor,
  committee,

  // Member Directory
  directoryMember,

  // Form Submissions
  membershipApplication,
];
