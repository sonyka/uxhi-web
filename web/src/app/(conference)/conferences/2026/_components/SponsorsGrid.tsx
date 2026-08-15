import { SectionHeading } from "./SectionHeading";
import { GRAY_110 as GRAY, PURPLE } from "../../../_theme";

// Data comes from Sanity (conferenceSponsor, year-scoped) — see queries.ts.
export type Sponsor = {
  _id: string;
  name: string;
  tier?: string | null;
  description?: string | null;
  url?: string | null;
  logo?: string | null; // Sanity asset URL
  logoAlt?: string | null;
  logoAspect?: number | null; // width / height of the logo asset
  logoScale?: number | null; // optional per-logo size multiplier (1 = default)
};

// Tiers render in this order, each under its own label; only non-empty tiers show.
const TIER_ORDER = ["platinum", "gold", "silver", "bronze", "community"] as const;
const TIER_LABELS: Record<string, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
  community: "Community",
};

// Size Sanity images on the CDN rather than shipping the full-res asset.
function sized(url: string, w: number) {
  return `${url}?w=${w}&fit=max&auto=format`;
}

function SponsorCard({ s }: { s: Sponsor }) {
  // Logos are normalized by height (h-10 ≈ 40px). A stacked/multi-line lockup
  // (e.g. ANTHOLOGY / FINN / PARTNERS) reads a touch small at that height, so tall
  // logos (low aspect ratio) get a taller box (48px).
  const isTall = s.logoAspect != null && s.logoAspect < 2.5;
  const boxClass = isTall ? "h-12" : "h-10";

  // Height for the auto bucket, plus a uniform MAX WIDTH so wide wordmarks (~5:1
  // and up, and the ~10:1 outlier) don't outsize the more compact logos — every
  // logo now fits the same 140×48 box. `logoScale` (Sanity) fine-tunes any single
  // logo. Box height is unchanged, so scaled logos stay vertically centred and
  // aligned within their row.
  const scale = s.logoScale && s.logoScale > 0 ? s.logoScale : 1;
  const baseH = isTall ? 48 : 40;
  const imgStyle: React.CSSProperties = {
    maxHeight: baseH * scale,
    maxWidth: 140 * scale,
  };

  const inner = (
    <>
      {/* Logo (gray-120 tint by default; reveals full colour on hover). */}
      <div className={`${boxClass} flex items-center`}>
        {s.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sized(s.logo, 480)}
            alt={s.logoAlt || s.name}
            style={imgStyle}
            className="w-auto object-contain grayscale opacity-90 brightness-75 contrast-75 transition duration-200 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100"
          />
        ) : (
          <span className="font-semibold text-[16px] text-conf-ink">{s.name}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {s.logo && <h3 className="font-semibold text-[16px] leading-tight text-conf-ink">{s.name}</h3>}
        {s.description && (
          <p className="text-[14px] leading-[1.5]" style={{ color: GRAY }}>
            {s.description}
          </p>
        )}
      </div>
    </>
  );

  // 24px gap between logo and name (gap-6). Shared hover: subtle lift + shadow.
  const cardClass =
    "group flex flex-col gap-6 rounded-2xl border border-black/10 bg-white p-5 h-full transition duration-200 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]";

  return s.url ? (
    <a href={s.url} target="_blank" rel="noopener" className={cardClass}>
      {inner}
    </a>
  ) : (
    <div className={cardClass}>{inner}</div>
  );
}

export function SponsorsGrid({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors || sponsors.length === 0) return null;

  // Group into tiers, preserving the query order within each tier.
  const groups = TIER_ORDER.map((tier) => ({
    tier,
    items: sponsors.filter((s) => (s.tier || "platinum") === tier),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>UXHI Conference Sponsors</SectionHeading>
      <p className="font-normal leading-[1.4] text-[16px] lg:text-[17px] xl:text-[18px]" style={{ color: GRAY }}>
        We couldn&rsquo;t tell this mo&#699;olelo alone. Big mahalo to our incredible partners and sponsors for investing in our diverse community — your support fuels the creativity and innovation that bring together the brightest minds and the most exciting ideas in tech.
      </p>

      <div className="flex flex-col gap-6 md:gap-8 mt-1">
        {groups.map(({ tier, items }) => (
          <div key={tier} className="flex flex-col gap-3 md:gap-4">
            <h3 className="font-bold uppercase tracking-[0.06em] text-[13px] md:text-[14px]" style={{ color: PURPLE }}>
              {TIER_LABELS[tier]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {items.map((s) => (
                <SponsorCard key={s._id} s={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
