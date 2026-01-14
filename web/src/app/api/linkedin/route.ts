import { NextResponse } from "next/server";
import type { SocialPost } from "@/lib/social-feed";

/**
 * LinkedIn API endpoint to fetch organization posts
 *
 * Required environment variables:
 * - LINKEDIN_ACCESS_TOKEN: OAuth access token with r_organization_social scope
 * - LINKEDIN_ORGANIZATION_ID: The organization/company page ID
 *
 * LinkedIn API docs: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
 */

const LINKEDIN_API_BASE = "https://api.linkedin.com/rest";

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

export async function GET() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

  // If not configured, return empty array gracefully
  if (!accessToken || !organizationId) {
    return NextResponse.json({
      posts: [],
      message: "LinkedIn API not configured.",
    });
  }

  try {
    // Fetch posts from the organization
    const postsResponse = await fetch(
      `${LINKEDIN_API_BASE}/posts?author=urn%3Ali%3Aorganization%3A${organizationId}&q=author&count=12`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "LinkedIn-Version": "202401",
          "X-Restli-Protocol-Version": "2.0.0",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!postsResponse.ok) {
      const errorText = await postsResponse.text();
      console.error("LinkedIn API response:", postsResponse.status, errorText);
      throw new Error(`LinkedIn API error: ${postsResponse.status}`);
    }

    const postsData = await postsResponse.json();
    const elements: LinkedInPost[] = postsData.elements || [];

    // Filter to posts with images and transform to SocialPost format
    const posts: SocialPost[] = [];

    for (const post of elements) {
      // Only include posts with media
      const mediaId = post.content?.media?.id || post.content?.multiImage?.images?.[0]?.id;
      if (!mediaId) continue;

      // Fetch the media download URL
      try {
        const mediaResponse = await fetch(
          `${LINKEDIN_API_BASE}/images/${encodeURIComponent(mediaId)}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "LinkedIn-Version": "202401",
              "X-Restli-Protocol-Version": "2.0.0",
            },
            next: { revalidate: 3600 },
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

        // Limit to 8 posts max
        if (posts.length >= 8) break;
      } catch {
        // Skip posts where media fetch fails
        continue;
      }
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("LinkedIn API error:", error);
    return NextResponse.json(
      { posts: [], error: "Failed to fetch LinkedIn posts" },
      { status: 500 }
    );
  }
}
