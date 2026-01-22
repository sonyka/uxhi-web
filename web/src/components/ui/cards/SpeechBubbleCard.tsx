import Image from "next/image";
import { ReactNode } from "react";

interface SpeechBubbleCardProps {
  quote: string;
  authorName: string;
  /** URL string for the author image */
  authorImage?: string;
  /** ReactNode for custom image (e.g., SanityImage) - takes precedence over authorImage */
  authorImageNode?: ReactNode;
  /** Timestamp for speech-bubble variant */
  timestamp?: string;
  /** Role for testimonial variant */
  authorRole?: string;
  /** Company for testimonial variant */
  authorCompany?: string;
  /** Variant style: 'speech-bubble' (default) or 'testimonial' */
  variant?: "speech-bubble" | "testimonial";
  className?: string;
}

export function SpeechBubbleCard({
  quote,
  authorName,
  authorImage,
  authorImageNode,
  timestamp,
  authorRole,
  authorCompany,
  variant = "speech-bubble",
  className = "",
}: SpeechBubbleCardProps) {
  const isTestimonial = variant === "testimonial";

  // Card styles based on variant
  const cardStyles = isTestimonial
    ? "bg-cream rounded-[20px] p-6"
    : "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative";

  // Quote styles based on variant
  const quoteStyles = isTestimonial
    ? "text-gray-600 mb-6 leading-relaxed"
    : "text-teal-600 text-base leading-relaxed mb-4";

  // Author name styles based on variant
  const authorNameStyles = isTestimonial
    ? "font-medium text-purple-700"
    : "font-medium text-teal-600";

  // Subtitle text (role/company or timestamp)
  const subtitleText = isTestimonial
    ? authorRole
      ? `${authorRole}${authorCompany ? ` at ${authorCompany}` : ""}`
      : authorCompany
    : timestamp;

  // Subtitle styles based on variant
  const subtitleStyles = isTestimonial
    ? "text-sm text-gray-500"
    : "text-teal-500 text-sm";

  // Default placeholder for missing image
  const defaultPlaceholder = isTestimonial ? (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-300 to-teal-400 flex-shrink-0" />
  ) : (
    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
  );

  // Render author image
  const renderAuthorImage = () => {
    if (authorImageNode) {
      return authorImageNode;
    }
    if (authorImage) {
      return (
        <Image
          src={authorImage}
          alt={authorName}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
      );
    }
    return defaultPlaceholder;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Card */}
      <div className={cardStyles}>
        <blockquote className={quoteStyles}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        {/* Notch at bottom left - only for speech-bubble variant */}
        {!isTestimonial && (
          <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b border-r border-gray-100 transform rotate-45" />
        )}
        {/* Author info inside card for testimonial variant */}
        {isTestimonial && (
          <div className="flex items-center gap-3">
            {renderAuthorImage()}
            <div>
              <p className={authorNameStyles}>{authorName}</p>
              {subtitleText && <p className={subtitleStyles}>{subtitleText}</p>}
            </div>
          </div>
        )}
      </div>
      {/* Author info below card for speech-bubble variant */}
      {!isTestimonial && (
        <div className="flex items-center gap-3 mt-6 ml-4">
          {renderAuthorImage()}
          <div>
            <p className={authorNameStyles}>{authorName}</p>
            {subtitleText && <p className={subtitleStyles}>{subtitleText}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
