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
      eyebrow={source}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <p className="text-base text-purple-700 font-medium">{title}</p>
      <PrimaryCTA href={href} external>
        {ctaLabel}
      </PrimaryCTA>
    </InfoBox>
  );
}
