// Sanity configuration - fallbacks provided for build time
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "evh83z0t";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Used for server-side fetching
export const token = process.env.SANITY_API_READ_TOKEN;
