import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Instagram icon component
function InstagramIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

interface InstagramPost {
  _id: string;
  image: {
    asset: { _id: string; url: string };
  };
  permalink?: string;
  caption?: string;
}

interface InstagramFeedProps {
  posts: InstagramPost[];
}

// Fallback posts when Sanity has no data
const fallbackPosts = [
  { id: "1", image: "/images/instagram/post-1.jpg" },
  { id: "2", image: "/images/instagram/post-2.jpg" },
  { id: "3", image: "/images/instagram/post-3.jpg" },
  { id: "4", image: "/images/instagram/post-4.jpg" },
  { id: "5", image: "/images/instagram/post-5.jpg" },
  { id: "6", image: "/images/instagram/post-6.jpg" },
  { id: "7", image: "/images/instagram/post-7.jpg" },
  { id: "8", image: "/images/instagram/post-8.jpg" },
];

export function InstagramFeed({ posts }: InstagramFeedProps) {
  const instagramUrl = "https://www.instagram.com/uxhicommunity/";

  // Use Sanity posts if available, otherwise fallback
  if (posts && posts.length > 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {posts.map((post) => (
          <a
            key={post._id}
            href={post.permalink || instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[20px] overflow-hidden aspect-[4/5] relative group cursor-pointer bg-gray-100"
          >
            <Image
              src={urlFor(post.image).width(400).height(500).url()}
              alt={post.caption || "UXHI Instagram post"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
              <InstagramIcon className="w-10 h-10 text-white" />
              <span className="text-white text-sm font-medium">View on Instagram</span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  // Fallback to static images
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {fallbackPosts.map((post) => (
        <a
          key={post.id}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[20px] overflow-hidden aspect-[4/5] relative group cursor-pointer bg-gray-100"
        >
          <Image
            src={post.image}
            alt="UXHI Instagram post"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <InstagramIcon className="w-10 h-10 text-white" />
            <span className="text-white text-sm font-medium">View on Instagram</span>
          </div>
        </a>
      ))}
    </div>
  );
}
