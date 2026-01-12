"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string;
}

// Instagram icon component
function InstagramIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        const response = await fetch("/api/instagram");
        if (!response.ok) {
          throw new Error("Failed to fetch Instagram posts");
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
        // Use fallback placeholder posts
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, []);

  // Fallback/placeholder posts when API is not configured
  const placeholderPosts: InstagramPost[] = [
    { id: "1", media_url: "/images/instagram/placeholder-1.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
    { id: "2", media_url: "/images/instagram/placeholder-2.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
    { id: "3", media_url: "/images/instagram/placeholder-3.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
    { id: "4", media_url: "/images/instagram/placeholder-4.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
    { id: "5", media_url: "/images/instagram/placeholder-5.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
    { id: "6", media_url: "/images/instagram/placeholder-6.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
    { id: "7", media_url: "/images/instagram/placeholder-7.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
    { id: "8", media_url: "/images/instagram/placeholder-8.jpg", permalink: "https://www.instagram.com/uxhicommunity/", media_type: "IMAGE" },
  ];

  const displayPosts = posts.length > 0 ? posts.slice(0, 8) : placeholderPosts;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-[20px] overflow-hidden aspect-square bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {displayPosts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[20px] overflow-hidden aspect-square relative group cursor-pointer"
        >
          {/* Post Image */}
          <Image
            src={post.media_url}
            alt={post.caption || "Instagram post"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <InstagramIcon className="w-10 h-10 text-white" />
            <span className="text-white text-sm font-medium">View on Instagram</span>
          </div>
        </a>
      ))}
    </div>
  );
}
