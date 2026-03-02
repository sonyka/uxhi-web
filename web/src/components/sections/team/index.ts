export { TeamSection } from "./TeamSection";
export { TeamCard } from "./TeamCard";

export interface TeamMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  category?: string;
  photo?: {
    asset?: { _id?: string; url?: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } };
    alt?: string;
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  company?: string;
}
