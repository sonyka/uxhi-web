// Mirrors the "field of work" multi-select on the live directory submission form,
// which is the source of truth for this taxonomy.
//
// Three options are kept that the form no longer offers — Brand Identity, Product
// Management and Product Strategy — because six imported members are tagged with
// them. Dropping the options would silently strip real data. Retire them only after
// those members are re-tagged.
//
// See docs/notion-directory-taxonomy.md for the full mapping.
export const FOCUS_OPTIONS = [
  { title: "Accessibility Design", value: "accessibility-design" },
  { title: "AR/VR Design", value: "ar-vr-design" },
  { title: "Brand Identity", value: "brand-identity" },
  { title: "Content Strategy", value: "content-strategy" },
  { title: "DesignOps", value: "design-ops" },
  { title: "Information Architecture", value: "information-architecture" },
  { title: "Interaction Design", value: "interaction-design" },
  { title: "Product Design", value: "product-design" },
  { title: "Product Management", value: "product-management" },
  { title: "Product Strategy", value: "product-strategy" },
  { title: "Service Design", value: "service-design" },
  { title: "Software Development", value: "software-development" },
  { title: "UI Design", value: "ui-design" },
  { title: "Usability Evaluation", value: "usability-evaluation" },
  { title: "User Research", value: "user-research" },
  { title: "UX Leadership", value: "ux-leadership" },
  { title: "UX Strategy", value: "ux-strategy" },
  { title: "UX Writing", value: "ux-writing" },
  { title: "Visual Design", value: "visual-design" },
  { title: "Voice User Interface Design", value: "voice-user-interface-design" },
] as const;

export const ISLAND_OPTIONS = [
  { title: "O\u02BBahu", value: "oahu" },
  { title: "Hawai\u02BBi (Big Island)", value: "hawaii" },
  { title: "Maui", value: "maui" },
  { title: "Kaua\u02BBi", value: "kauai" },
  { title: "Moloka\u02BBi", value: "molokai" },
  { title: "L\u0101na\u02BBi", value: "lanai" },
  { title: "Mainland / International", value: "mainland-international" },
] as const;

export const ISLAND_CITIES: Record<string, readonly { title: string; value: string }[]> = {
  oahu: [
    { title: "Honolulu", value: "Honolulu" },
    { title: "Waikīkī", value: "Waikīkī" },
    { title: "Kailua", value: "Kailua" },
    { title: "Kāneʻohe", value: "Kāneʻohe" },
    { title: "Pearl City", value: "Pearl City" },
    { title: "ʻAiea", value: "ʻAiea" },
    { title: "Kapolei", value: "Kapolei" },
    { title: "ʻEwa Beach", value: "ʻEwa Beach" },
    { title: "Mililani", value: "Mililani" },
    { title: "Wahiawā", value: "Wahiawā" },
    { title: "Waipahu", value: "Waipahu" },
    { title: "Haleʻiwa", value: "Haleʻiwa" },
  ],
  hawaii: [
    { title: "Hilo", value: "Hilo" },
    { title: "Kailua-Kona", value: "Kailua-Kona" },
    { title: "Waimea (Kamuela)", value: "Waimea (Kamuela)" },
    { title: "Waikōloa", value: "Waikōloa" },
    { title: "Captain Cook", value: "Captain Cook" },
    { title: "Pāhoa", value: "Pāhoa" },
    { title: "Keaʻau", value: "Keaʻau" },
    { title: "Volcano", value: "Volcano" },
  ],
  maui: [
    { title: "Kahului", value: "Kahului" },
    { title: "Wailuku", value: "Wailuku" },
    { title: "Kīhei", value: "Kīhei" },
    { title: "Lahaina", value: "Lahaina" },
    { title: "Pāʻia", value: "Pāʻia" },
    { title: "Haʻikū", value: "Haʻikū" },
    { title: "Makawao", value: "Makawao" },
    { title: "Pukalani", value: "Pukalani" },
  ],
  kauai: [
    { title: "Līhuʻe", value: "Līhuʻe" },
    { title: "Kapaʻa", value: "Kapaʻa" },
    { title: "Pōʻipū", value: "Pōʻipū" },
    { title: "Princeville", value: "Princeville" },
    { title: "Kōloa", value: "Kōloa" },
    { title: "Hanalei", value: "Hanalei" },
    { title: "Waimea", value: "Waimea" },
    { title: "Kalāheo", value: "Kalāheo" },
  ],
  molokai: [
    { title: "Kaunakakai", value: "Kaunakakai" },
    { title: "Maunaloa", value: "Maunaloa" },
  ],
  lanai: [
    { title: "Lānaʻi City", value: "Lānaʻi City" },
  ],
};

export const EXPERIENCE_LEVEL_OPTIONS = [
  { title: "Student or Transitioning", value: "student-transitioning" },
  { title: "< 1 year", value: "less-than-1-year" },
  { title: "1-2 years", value: "1-2-years" },
  { title: "3-4 years", value: "3-4-years" },
  { title: "5-9 years", value: "5-9-years" },
  { title: "10-19 years", value: "10-19-years" },
  { title: "20+ years", value: "20-plus-years" },
] as const;

// Mirrors the "industries you work within" multi-select on the live submission form.
// No member currently carries an industry value, so this list can track the form
// exactly without risking existing data.
export const INDUSTRY_OPTIONS = [
  { title: "Aerospace", value: "aerospace" },
  { title: "Architecture", value: "architecture" },
  { title: "Biomedical", value: "biomedical" },
  { title: "Consulting", value: "consulting" },
  { title: "Customer Relationship Management", value: "crm" },
  { title: "Cybersecurity", value: "cybersecurity" },
  { title: "Education", value: "education" },
  { title: "Energy, Sustainability & Infrastructure", value: "energy-sustainability" },
  { title: "Entertainment", value: "entertainment" },
  { title: "Finance", value: "finance" },
  { title: "Government", value: "government" },
  { title: "Healthcare", value: "healthcare" },
  { title: "Indigenous Tech", value: "indigenous-tech" },
  { title: "Insurance", value: "insurance" },
  { title: "Internet / Technology", value: "technology" },
  { title: "Marketing / Branding", value: "marketing-branding" },
  { title: "Real Estate", value: "real-estate" },
  { title: "Restaurants, Bars & Food", value: "restaurants-bars-food" },
  { title: "Retail", value: "retail" },
  { title: "Telecommunication", value: "telecommunication" },
  { title: "Transportation & Logistics", value: "transportation-logistics" },
  { title: "Travel & Tourism", value: "travel-tourism" },
  { title: "Video Games", value: "video-games" },
  { title: "Web Design", value: "web-design" },
] as const;
