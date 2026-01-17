/**
 * Social feed types and utilities for combining Instagram and LinkedIn posts
 */

export interface SocialPost {
  id: string;
  platform: "instagram" | "linkedin";
  imageUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

/**
 * Merge Instagram and LinkedIn posts with the following rules:
 * 1. If both platforms have posts on the same day, only show Instagram
 * 2. Sort all posts by timestamp (newest first)
 * 3. Return maximum of `limit` posts
 */
export function mergeSocialPosts(
  instagramPosts: SocialPost[],
  linkedInPosts: SocialPost[],
  limit: number = 8
): SocialPost[] {
  // Create a set of dates that have Instagram posts
  const instagramDates = new Set(
    instagramPosts.map((post) => new Date(post.timestamp).toDateString())
  );

  // Filter LinkedIn posts to exclude those on days that have Instagram posts
  const filteredLinkedIn = linkedInPosts.filter(
    (post) => !instagramDates.has(new Date(post.timestamp).toDateString())
  );

  // Combine and sort by timestamp (newest first)
  const combined = [...instagramPosts, ...filteredLinkedIn];
  combined.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Return limited results
  return combined.slice(0, limit);
}
