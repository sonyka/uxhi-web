import Link from "next/link";
import { ArrowIcon } from "./icons";

interface ArrowLinkButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  /** Ground the link sits on: dark for purple panels, light for white and beige. */
  variant?: "dark" | "light";
  /**
   * Leading mark, before the label. Decorative — the label carries the meaning,
   * so pass a glyph with an empty alt.
   *
   * The link already carries `group`, so a SocialGlyph dropped in here does its
   * grey-to-colour reveal on the link's own hover without wiring.
   */
  icon?: React.ReactNode;
  className?: string;
}

export function ArrowLinkButton({ href, children, external = false, variant = "dark", icon, className = "" }: ArrowLinkButtonProps) {
  const variantClassName = {
    light: "text-gray-100 hover:text-teal-100 hover:bg-teal-10",
    dark: "text-purple-30 hover:text-white hover:bg-white/10",
  }[variant];

  const baseClassName = `inline-flex items-center gap-2 ${variantClassName} rounded-full px-4 py-2 transition-all text-base font-medium group ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClassName}
      >
        {icon}
        <span>{children}</span>
        <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    );
  }

  return (
    <Link href={href} className={baseClassName}>
      {icon}
      <span>{children}</span>
      <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
