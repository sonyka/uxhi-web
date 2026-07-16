import { SectionHeading } from "./SectionHeading";

// Data comes from Sanity (conferenceSponsor, year-scoped) — see queries.ts.
export type Sponsor = {
  _id: string;
  name: string;
  description?: string | null;
  url?: string | null;
  logo?: string | null; // Sanity asset URL
  logoAlt?: string | null;
};

const GRAY = "#50555A";

// Size Sanity images on the CDN rather than shipping the full-res asset.
function sized(url: string, w: number) {
  return `${url}?w=${w}&fit=max&auto=format`;
}

function SponsorCard({ s }: { s: Sponsor }) {
  const inner = (
    <>
      {/* Logo (gray-120 tint by default; reveals full colour on hover).
          h-10 keeps it ~30% smaller than the original h-14. */}
      <div className="h-10 flex items-center">
        {s.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sized(s.logo, 480)}
            alt={s.logoAlt || s.name}
            className="max-h-10 w-auto max-w-full object-contain grayscale opacity-90 brightness-75 contrast-75 transition duration-200 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100"
          />
        ) : (
          <span className="font-semibold text-[16px] text-[#1A1A1A]">{s.name}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {s.logo && <h3 className="font-semibold text-[16px] leading-tight text-[#1A1A1A]">{s.name}</h3>}
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

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <SectionHeading>UXHI Conference Sponsors</SectionHeading>
      <p className="font-normal leading-[1.4] text-[16px] lg:text-[17px] xl:text-[18px]" style={{ color: GRAY }}>
        We couldn&rsquo;t tell this mo&#699;olelo alone. Big mahalo to our incredible partners and sponsors for investing in our diverse community — your support fuels the creativity and innovation that bring together the brightest minds and the most exciting ideas in tech.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-1">
        {sponsors.map((s) => (
          <SponsorCard key={s._id} s={s} />
        ))}
      </div>
    </div>
  );
}
