import { NextResponse } from "next/server";
import { client, writeClient } from "@/sanity/lib/client";
import type { SocialPost } from "@/lib/social-feed";

/**
 * LinkedIn API endpoint to fetch organization posts with auto-refresh
 *
 * Token priority:
 * 1. Sanity apiSettings document (auto-refreshed)
 * 2. Environment variables (initial setup)
 *
 * Required environment variables for initial setup:
 * - LINKEDIN_ACCESS_TOKEN
 * - LINKEDIN_REFRESH_TOKEN
 * - LINKEDIN_CLIENT_ID
 * - LINKEDIN_CLIENT_SECRET
 * - LINKEDIN_ORGANIZATION_ID
 */

const LINKEDIN_API_BASE = "https://api.linkedin.com/rest";
const LINKEDIN_OAUTH_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const API_SETTINGS_ID = "apiSettings";

interface LinkedInTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string;
}

interface LinkedInPost {
  id: string;
  author: string;
  commentary?: string;
  publishedAt: string;
  content?: {
    media?: {
      id: string;
    };
    multiImage?: {
      images: Array<{ id: string }>;
    };
  };
}

interface LinkedInMediaResponse {
  downloadUrl?: string;
}

/**
 * Get LinkedIn tokens from Sanity or fall back to env vars
 */
async function getTokens(): Promise<LinkedInTokens | null> {
  // Try Sanity first
  try {
    const settings = await client.fetch(
      `*[_type == "apiSettings"][0]{ linkedin }`
    );

    if (settings?.linkedin?.accessToken && settings?.linkedin?.refreshToken) {
      return {
        accessToken: settings.linkedin.accessToken,
        refreshToken: settings.linkedin.refreshToken,
        expiresAt: settings.linkedin.expiresAt,
      };
    }
  } catch (error) {
    console.error("Error fetching tokens from Sanity:", error);
  }

  // Fall back to env vars
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;

  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  }

  return null;
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(
  refreshToken: string
): Promise<LinkedInTokens | null> {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("LinkedIn client credentials not configured");
    return null;
  }

  try {
    const response = await fetch(LINKEDIN_OAUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Token refresh failed:", response.status, errorText);
      return null;
    }

    const data = await response.json();

    // Calculate expiration time (LinkedIn tokens expire in ~60 days)
    const expiresAt = new Date(
      Date.now() + (data.expires_in || 5184000) * 1000
    ).toISOString();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken, // Use new refresh token if provided
      expiresAt,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

/**
 * Store tokens in Sanity for persistence
 */
async function storeTokens(tokens: LinkedInTokens): Promise<void> {
  if (!writeClient.config().token) {
    console.warn("Sanity write token not configured, cannot persist tokens");
    return;
  }

  try {
    // Check if apiSettings document exists
    const existing = await client.fetch(
      `*[_type == "apiSettings"][0]{ _id }`
    );

    if (existing) {
      // Update existing document
      await writeClient
        .patch(existing._id)
        .set({
          "linkedin.accessToken": tokens.accessToken,
          "linkedin.refreshToken": tokens.refreshToken,
          "linkedin.expiresAt": tokens.expiresAt,
        })
        .commit();
    } else {
      // Create new document
      await writeClient.create({
        _type: "apiSettings",
        _id: API_SETTINGS_ID,
        title: "API Settings",
        linkedin: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: tokens.expiresAt,
        },
      });
    }

    console.log("LinkedIn tokens stored in Sanity");
  } catch (error) {
    console.error("Error storing tokens in Sanity:", error);
  }
}

/**
 * Fetch posts from LinkedIn API
 */
async function fetchLinkedInPosts(
  accessToken: string,
  organizationId: string
): Promise<{ posts: SocialPost[]; status: number }> {
  const postsResponse = await fetch(
    `${LINKEDIN_API_BASE}/posts?author=urn%3Ali%3Aorganization%3A${organizationId}&q=author&count=12`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "LinkedIn-Version": "202401",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      cache: "no-store", // Don't cache since we may need to retry with new token
    }
  );

  if (!postsResponse.ok) {
    return { posts: [], status: postsResponse.status };
  }

  const postsData = await postsResponse.json();
  const elements: LinkedInPost[] = postsData.elements || [];

  // Filter to posts with images and transform to SocialPost format
  const posts: SocialPost[] = [];

  for (const post of elements) {
    const mediaId =
      post.content?.media?.id || post.content?.multiImage?.images?.[0]?.id;
    if (!mediaId) continue;

    try {
      const mediaResponse = await fetch(
        `${LINKEDIN_API_BASE}/images/${encodeURIComponent(mediaId)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "LinkedIn-Version": "202401",
            "X-Restli-Protocol-Version": "2.0.0",
          },
        }
      );

      if (!mediaResponse.ok) continue;

      const mediaData: LinkedInMediaResponse = await mediaResponse.json();
      if (!mediaData.downloadUrl) continue;

      posts.push({
        id: post.id,
        platform: "linkedin",
        imageUrl: mediaData.downloadUrl,
        permalink: `https://www.linkedin.com/feed/update/${post.id}`,
        caption: post.commentary,
        timestamp: post.publishedAt,
      });

      if (posts.length >= 8) break;
    } catch {
      continue;
    }
  }

  return { posts, status: 200 };
}

export async function GET() {
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

  if (!organizationId) {
    return NextResponse.json({
      posts: [],
      message: "LinkedIn Organization ID not configured.",
    });
  }

  // Get tokens
  let tokens = await getTokens();

  if (!tokens) {
    return NextResponse.json({
      posts: [],
      message: "LinkedIn API not configured.",
    });
  }

  // Try to fetch posts
  let result = await fetchLinkedInPosts(tokens.accessToken, organizationId);

  // If unauthorized (401), try refreshing the token
  if (result.status === 401) {
    console.log("LinkedIn token expired, attempting refresh...");

    const newTokens = await refreshAccessToken(tokens.refreshToken);

    if (newTokens) {
      // Store the new tokens
      await storeTokens(newTokens);

      // Retry the request
      result = await fetchLinkedInPosts(newTokens.accessToken, organizationId);
    } else {
      return NextResponse.json({
        posts: [],
        error: "Token refresh failed. Please re-authenticate.",
      });
    }
  }

  if (result.status !== 200) {
    return NextResponse.json(
      { posts: [], error: `LinkedIn API error: ${result.status}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ posts: result.posts });
}
