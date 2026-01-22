import Link from "next/link";
import { ReactNode } from "react";

interface QuickLinkPillProps {
  href: string;
  icon: ReactNode;
  label: string;
  subtitle: string;
  external?: boolean;
  className?: string;
}

export function QuickLinkPill({ href, icon, label, subtitle, external = false, className = "" }: QuickLinkPillProps) {
  const baseClassName = `flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group ${className}`;

  const content = (
    <>
      <span className="text-gray-400 group-hover:text-purple-600 transition-colors">
        {icon}
      </span>
      <div className="text-left">
        <span className="block text-[16px] font-medium text-black">{label}</span>
        <span className="block text-[14px] text-[#6b7282]">{subtitle}</span>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClassName}>
      {content}
    </Link>
  );
}
