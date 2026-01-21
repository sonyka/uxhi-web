import Link from "next/link";

// Arrow Icon Component (right arrow)
function ArrowIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// External Link Icon (up-right arrow)
function ExternalArrowIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M7 7h10v10" />
      <path d="M7 17L17 7" />
    </svg>
  );
}

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
          <ExternalArrowIcon className="w-4 h-4 text-gray-900" />
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
