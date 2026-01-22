import Link from "next/link";
import { ArrowIcon } from "./icons";

interface ArrowLinkButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function ArrowLinkButton({ href, children, external = false, className = "" }: ArrowLinkButtonProps) {
  const baseClassName = `inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium group ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClassName}
      >
        <span>{children}</span>
        <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    );
  }

  return (
    <Link href={href} className={baseClassName}>
      <span>{children}</span>
      <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
