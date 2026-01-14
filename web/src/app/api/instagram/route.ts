import { NextResponse } from "next/server";

// Instagram Graph API endpoint (requires Business/Creator account)
const INSTAGRAM_GRAPH_API = "https://graph.instagram.com";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string;
  timestamp: string;
}

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  // If no access token, return curated posts from Sanity or static list
  if (!accessToken) {
    // Return empty - component will use placeholder/static posts
    return NextResponse.json({
      posts: [],
      message: "Instagram API not configured.",
    });
  }

  try {
    // Instagram Graph API - requires Business/Creator account token
    const response = await fetch(
      `${INSTAGRAM_GRAPH_API}/me/media?fields=id,media_url,permalink,caption,media_type,timestamp&limit=12&access_token=${accessToken}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Instagram API response:", errorText);
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    // Filter for images and carousel albums only (no videos)
    const filteredPosts: InstagramPost[] = (data.data || []).filter(
      (post: InstagramPost) =>
        post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM"
    );

    // Sort by timestamp (newest first)
    const sortedPosts = filteredPosts.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Return first 8 posts
    return NextResponse.json({ posts: sortedPosts.slice(0, 8) });
  } catch (error) {
    console.error("Instagram API error:", error);
    return NextResponse.json(
      { posts: [], error: "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}

// Token refresh endpoint - call this periodically to extend token life
export async function POST() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json({ error: "No token to refresh" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${INSTAGRAM_GRAPH_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
    );

    const data = await response.json();

    if (data.access_token) {
      // Note: You'll need to manually update your env variable with the new token
      // Or use a database/secret manager that supports updates
      return NextResponse.json({
        message: "Token refreshed. Update INSTAGRAM_ACCESS_TOKEN with new value.",
        newToken: data.access_token,
        expiresIn: data.expires_in
      });
    }

    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json({ error: "Token refresh failed" }, { status: 500 });
  }
}
