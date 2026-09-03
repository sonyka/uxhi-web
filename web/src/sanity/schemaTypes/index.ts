// Documents
import { product } from "./documents/product";
import { submission } from "./documents/submission";
import { teamMember } from "./documents/teamMember";
import { faq } from "./documents/faq";
import { aboutFaq } from "./documents/aboutFaq";
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

// Conference (kept separate from the main site content)
import { conferenceTeam } from "./documents/conferenceTeam";
import { conferenceSponsor } from "./documents/conferenceSponsor";
import { conferenceInstagramPost } from "./documents/conferenceInstagramPost";

// Member Directory
import { directoryMember } from "./documents/directoryMember";

// Form Submissions
import { membershipApplication } from "./documents/membershipApplication";

export const schemaTypes = [
  // Documents
  product,
  submission,
  teamMember,
  faq,
  aboutFaq,
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

  // Conference (kept separate from the main site content)
  conferenceTeam,
  conferenceSponsor,
  conferenceInstagramPost,

  // Member Directory
  directoryMember,

  // Form Submissions
  membershipApplication,
];
