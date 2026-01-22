import { ExternalLinkIcon } from "./icons";

interface LinkCardProps {
  href: string;
  title: string;
  description?: string;
  className?: string;
}

export function LinkCard({ href, title, description, className = "" }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group ${className}`}
    >
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        {description && (
          <p className="text-sm text-teal-600">{description}</p>
        )}
      </div>
      <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0" />
    </a>
  );
}
