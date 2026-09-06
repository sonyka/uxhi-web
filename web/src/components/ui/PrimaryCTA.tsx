import Link from "next/link";
import { ArrowIcon, ExternalLinkIcon } from "./icons";
import { TextSlideUp } from "./TextSlideUp";

interface PrimaryCTAProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "default" | "dark" | "subdued";
  /**
   * Shorter wording below md, for a label that survives a desktop line but not
   * a phone's. Both are in the markup and one is display:none, so a screen
   * reader is only ever offered the one on screen.
   */
  shortLabel?: React.ReactNode;
  /**
   * Leading mark, before the label. Decorative — the label carries the meaning,
   * so pass a glyph with an empty alt.
   *
   * The button already carries `group`, so a SocialGlyph dropped in here does
   * its grey-to-colour reveal on the button's own hover without wiring.
   */
  icon?: React.ReactNode;
}

const variants = {
  default: {
    button: "bg-white border border-gray-30 hover:bg-gray-10",
    text: "text-gray-140",
    circle: "bg-yellow-80 group-hover:bg-yellow-100",
    icon: "text-gray-140",
  },
  subdued: {
    button: "bg-white border border-gray-30 hover:bg-gray-10",
    text: "text-gray-140",
    circle: "bg-gray-30 group-hover:bg-gray-40",
    icon: "text-gray-140",
  },
  dark: {
    button: "bg-white/10 border border-white/30 hover:bg-white/20",
    text: "text-white",
    circle: "bg-white/20 group-hover:bg-white/30",
    icon: "text-white",
  },
};

export function PrimaryCTA({ href, children, external = false, variant = "default", shortLabel, icon }: PrimaryCTAProps) {
  const styles = variants[variant];
  const label = shortLabel ? (
    <>
      <span className="md:hidden">{shortLabel}</span>
      <span className="hidden md:inline">{children}</span>
    </>
  ) : (
    children
  );
  // A mark of its own carries weight the label does not, so the leading edge
  // closes up when one is present — 24px of air before a glyph reads as a gap.
  const className = `inline-flex items-center gap-3 rounded-full ${icon ? "pl-4" : "pl-6"} pr-2 py-2 font-medium transition-colors group ${styles.button}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {icon}
        <TextSlideUp className={styles.text}>
          {label}
        </TextSlideUp>
        <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${styles.circle}`}>
          <ExternalLinkIcon className={`w-4 h-4 ${styles.icon}`} />
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {icon}
      <TextSlideUp className={styles.text}>
        {label}
      </TextSlideUp>
      <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${styles.circle}`}>
        <ArrowIcon className={`w-4 h-4 ${styles.icon}`} />
      </span>
    </Link>
  );
}
