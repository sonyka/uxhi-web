import Link from "next/link";
import { ArrowIcon, ExternalLinkIcon } from "./icons";

interface PrimaryCTAProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function PrimaryCTA({ href, children, external = false }: PrimaryCTAProps) {
  const className = "inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <span className="text-gray-900">{children}</span>
        <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
          <ExternalLinkIcon className="w-4 h-4 text-gray-900" />
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span className="text-gray-900">{children}</span>
      <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
        <ArrowIcon className="w-4 h-4 text-gray-900" />
      </span>
    </Link>
  );
}
