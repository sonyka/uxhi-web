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
    <InfoBox
      eyebrow={`Featured in ${source}`}
      className="flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p className="text-base text-gray-700 font-medium">{title}</p>
      <PrimaryCTA href={href} external>
        {ctaLabel}
      </PrimaryCTA>
    </InfoBox>
  );
}
