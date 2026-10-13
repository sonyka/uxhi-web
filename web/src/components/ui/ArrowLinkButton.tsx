import Link from "next/link";
import { ArrowIcon } from "./icons";

interface ArrowLinkButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  /**
   * Ground the link sits on: dark for purple panels, light for white and beige.
   *
   * Both draw their pill only under the cursor — they are links that reward a
   * hover, not buttons. `solid` is the third case: the same link wearing its
   * pill at rest, for the one CTA a panel is actually asking to be clicked.
   * Its fill and border are PrimaryCTA's dark variant, so the two filled
   * things the site puts on purple agree.
   *
   * Below md, dark and light wear their pill at rest too. A pill drawn only
   * under the cursor is never drawn on a phone, which left them as bare text
   * with an arrow that did not read as tappable. Dark goes solid; light takes
   * PrimaryCTA's default white pill, its counterpart on a light ground.
   */
  variant?: "dark" | "light" | "solid";
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
    light: "text-gray-100 hover:text-teal-100 hover:bg-teal-10 max-md:text-gray-140 max-md:bg-white max-md:border max-md:border-gray-30",
    dark: "text-purple-30 hover:text-white hover:bg-white/10 max-md:text-white max-md:bg-white/10 max-md:border max-md:border-white/30",
    solid: "text-white bg-white/10 border border-white/30 hover:bg-white/20",
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
