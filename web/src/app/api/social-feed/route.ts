import { NextResponse } from "next/server";
import type { SocialPost } from "@/lib/social-feed";
import { mergeSocialPosts } from "@/lib/social-feed";

/**
 * Combined social feed endpoint
 * Fetches posts from Instagram and LinkedIn, merges them with Instagram priority on same-day conflicts
 */

interface InstagramApiPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string;
  timestamp: string;
}

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;

  // Fetch both APIs in parallel
  const [instagramResult, linkedInResult] = await Promise.allSettled([
    fetch(`${baseUrl}/api/instagram`, { next: { revalidate: 3600 } }),
    fetch(`${baseUrl}/api/linkedin`, { next: { revalidate: 3600 } }),
  ]);

  // Parse Instagram response
  let instagramPosts: SocialPost[] = [];
  if (instagramResult.status === "fulfilled" && instagramResult.value.ok) {
    try {
      const data = await instagramResult.value.json();
      // Transform Instagram API response to SocialPost format
      instagramPosts = (data.posts || []).map((post: InstagramApiPost) => ({
        id: post.id,
        platform: "instagram" as const,
        imageUrl: post.media_url,
        permalink: post.permalink,
        caption: post.caption,
        timestamp: post.timestamp,
      }));
    } catch (error) {
      console.error("Error parsing Instagram response:", error);
    }
  }

  // Parse LinkedIn response
  let linkedInPosts: SocialPost[] = [];
  if (linkedInResult.status === "fulfilled" && linkedInResult.value.ok) {
    try {
      const data = await linkedInResult.value.json();
      // LinkedIn API already returns SocialPost format
      linkedInPosts = data.posts || [];
    } catch (error) {
      console.error("Error parsing LinkedIn response:", error);
    }
  }

  // Merge posts with Instagram priority on same-day conflicts
  const mergedPosts = mergeSocialPosts(instagramPosts, linkedInPosts, 8);

  return NextResponse.json({
    posts: mergedPosts,
    sources: {
      instagram: instagramPosts.length,
      linkedin: linkedInPosts.length,
    },
  });
}
