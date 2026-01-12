import { NextResponse } from "next/server";

// Instagram Basic Display API endpoint
const INSTAGRAM_API_URL = "https://graph.instagram.com/me/media";

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  // If no access token, return empty array (component will use placeholders)
  if (!accessToken) {
    return NextResponse.json({
      posts: [],
      message: "Instagram API not configured. Using placeholder images.",
    });
  }

  try {
    const response = await fetch(
      `${INSTAGRAM_API_URL}?fields=id,media_url,permalink,caption,media_type&limit=8&access_token=${accessToken}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    // Filter for images and carousel albums only (no videos)
    const posts = data.data?.filter(
      (post: { media_type: string }) =>
        post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM"
    ) || [];

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Instagram API error:", error);
    return NextResponse.json(
      { posts: [], error: "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}
