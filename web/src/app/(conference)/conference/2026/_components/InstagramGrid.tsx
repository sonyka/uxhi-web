import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";
import { GRAY_110 as GRAY, PURPLE, LINK, TYPE } from "../theme";
import { ConferenceButton } from "./ConferenceButton";
import { InstagramGlyph, LinkedInGlyph } from "./SocialLink";
import {
  IG_PROFILE,
  IG_HANDLE,
  LINKEDIN_PROFILE,
  LINKEDIN_HANDLE,
} from "../constants";

// Curated Instagram posts (Sanity: conferenceInstagramPost, year-scoped).
// Editors hand-pick which conference posts appear — see the schema for why we
// curate rather than pull the whole feed via Instagram's API.
export type InstagramPost = {
  _id: string;
  caption?: string | null;
  postUrl: string;
  image?: string | null; // Sanity asset URL
  imageAlt?: string | null;
  lqip?: string | null;
};

// Size Sanity images on the CDN to Instagram's 4:5 portrait crop (1080×1350)
// rather than shipping the full-res asset.
function sized(url: string, w: number) {
  const h = Math.round((w * 1350) / 1080);
  return `${url}?w=${w}&h=${h}&fit=crop&auto=format`;
}

function PostCard({ p }: { p: InstagramPost }) {
  return (
    <a
      href={p.postUrl}
      target="_blank"
      rel="noopener"
      className="group flex flex-col gap-2 no-underline"
    >
      <div
        className="relative aspect-[1080/1350] overflow-hidden rounded-2xl border border-black/10 bg-black/5"
        style={p.lqip ? { backgroundImage: `url(${p.lqip})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sized(p.image, 864)}
            alt={p.imageAlt || p.caption || "UXHI Conference Instagram post"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          />
        )}
        {/* Hover: dim the image and center the Instagram logo over it */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition duration-300 group-hover:opacity-100">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="drop-shadow">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#fff" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.8" />
            <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
          </svg>
        </div>
      </div>
      {p.caption && (
        <p className="line-clamp-2 text-[14px] leading-[1.45]" style={{ color: GRAY }}>
          {p.caption}
        </p>
      )}
    </a>
  );
}

export function InstagramGrid({ posts }: { posts: InstagramPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>Stay in the loop</SectionHeading>
      <p className={`${TYPE.body} max-w-[62ch]`} style={{ color: GRAY }}>
        Catch the latest news on ticket sales, speaker lineup, and behind-the-scenes stories on Instagram{" "}
        <a href={IG_PROFILE} target="_blank" rel="noopener" className={cn(LINK, "font-semibold")} style={{ color: PURPLE }}>
          {IG_HANDLE}
        </a>{" "}
        and LinkedIn{" "}
        <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener" className={cn(LINK, "font-semibold")} style={{ color: PURPLE }}>
          {LINKEDIN_HANDLE}
        </a>
        .
      </p>

      <div className="@container mt-1">
        <div className="grid gap-3 md:gap-4 grid-cols-1 @xs:grid-cols-2 @xl:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p._id} p={p} />
          ))}
        </div>
      </div>

      {/* The paragraph above names both handles as inline links; these repeat
          them as targets you can hit. Outline rather than filled: the grid
          above is already dense with imagery, and two solid pills under it
          would read as the loudest thing in the section.

          They wrap on a narrow rail instead of shrinking — the labels carry
          handles, which should not be allowed to break mid-word. */}
      <div className="flex flex-wrap gap-3 mt-2">
        <ConferenceButton
          href={IG_PROFILE}
          variant="outline"
          icon={InstagramGlyph}
          className="w-fit"
        >
          Follow {IG_HANDLE}
        </ConferenceButton>
        <ConferenceButton
          href={LINKEDIN_PROFILE}
          variant="outline"
          icon={LinkedInGlyph}
          className="w-fit"
        >
          Follow {LINKEDIN_HANDLE}
        </ConferenceButton>
      </div>
    </div>
  );
}
