import { defineQuery } from "next-sanity";

// Image fragment for reuse
const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot,
  crop
`;

// Testimonials (for standalone testimonials page if needed)
export const TESTIMONIALS_QUERY = defineQuery(/* groq */ `
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    author {
      name,
      role,
      company,
      photo { ${imageFragment} }
    }
  }
`);

// Products (Merch)
export const PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && available == true] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    images[] { ${imageFragment} },
    purchaseUrl,
    featured
  }
`);

// Single Product
export const PRODUCT_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    images[] { ${imageFragment} },
    purchaseUrl,
    available
  }
`);

// Team members (for About page)
export const FOUNDERS_QUERY = defineQuery(/* groq */ `
  *[_type == "member"] | order(order asc, name asc) {
    _id,
    name,
    role,
    bio,
    photo { ${imageFragment} },
    socialLinks,
    company
  }
`);

// FAQs (for About page)
export const FAQS_QUERY = defineQuery(/* groq */ `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }
`);

// Instagram Posts (for homepage feed)
export const INSTAGRAM_POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "instagramPost"] | order(order asc)[0...8] {
    _id,
    image { ${imageFragment} },
    permalink,
    caption
  }
`);

// Community Photos (for "A community for designers" section)
export const COMMUNITY_PHOTOS_QUERY = defineQuery(/* groq */ `
  *[_type == "communityPhoto"] | order(column asc, row asc) {
    _id,
    image { ${imageFragment} },
    name,
    column,
    row
  }
`);

// Values (for About page)
export const VALUES_QUERY = defineQuery(/* groq */ `
  *[_type == "value"] | order(order asc) {
    _id,
    title,
    description,
    icon { ${imageFragment} }
  }
`);

// Resource Categories
export const RESOURCE_CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "resourceCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon { ${imageFragment} }
  }
`);

// Resource Items (optionally filtered by category)
export const RESOURCE_ITEMS_QUERY = defineQuery(/* groq */ `
  *[_type == "resourceItem"] | order(order asc) {
    _id,
    title,
    description,
    url,
    subcategory,
    icon { ${imageFragment} },
    category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`);

// State of UX Reports
export const STATE_OF_UX_REPORTS_QUERY = defineQuery(/* groq */ `
  *[_type == "stateOfUxReport"] | order(year desc) {
    _id,
    title,
    year,
    description,
    reportUrl,
    coverImage { ${imageFragment} },
    highlights,
    featured
  }
`);

// Tech Organizations
export const TECH_ORGANIZATIONS_QUERY = defineQuery(/* groq */ `
  *[_type == "techOrganization"] | order(order asc, name asc) {
    _id,
    name,
    description,
    website,
    logo { ${imageFragment} },
    category,
    location
  }
`);
