import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, writeToken } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
});

// Client with write access for mutations (e.g., storing refreshed tokens)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});
