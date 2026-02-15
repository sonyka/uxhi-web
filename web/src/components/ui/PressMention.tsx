import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { InfoBox } from "@/components/ui/InfoBox";

interface PressMentionProps {
  source: string;
  title: string;
  href: string;
  ctaLabel?: string;
}

export function PressMention({
  source,
  title,
  href,
  ctaLabel = "Read Article",
}: PressMentionProps) {
  return (
    <InfoBox className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <span className="block text-sm font-bold uppercase tracking-wider text-purple-700 mb-1">
          {source}
        </span>
        <p className="text-base text-gray-800 font-medium">{title}</p>
      </div>
      <PrimaryCTA href={href} external>
        {ctaLabel}
      </PrimaryCTA>
    </InfoBox>
  );
}
