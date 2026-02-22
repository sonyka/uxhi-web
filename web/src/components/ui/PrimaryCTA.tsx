import Link from "next/link";
import { ArrowIcon, ExternalLinkIcon } from "./icons";
import { TextSlideUp } from "./TextSlideUp";

interface PrimaryCTAProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "default" | "dark" | "subdued";
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

export function PrimaryCTA({ href, children, external = false, variant = "default" }: PrimaryCTAProps) {
  const styles = variants[variant];
  const className = `inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-medium transition-colors group ${styles.button}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <TextSlideUp className={styles.text}>
          {children}
        </TextSlideUp>
        <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${styles.circle}`}>
          <ExternalLinkIcon className={`w-4 h-4 ${styles.icon}`} />
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <TextSlideUp className={styles.text}>
        {children}
      </TextSlideUp>
      <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${styles.circle}`}>
        <ArrowIcon className={`w-4 h-4 ${styles.icon}`} />
      </span>
    </Link>
  );
}
