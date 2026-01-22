import Image from "next/image";

interface SpeechBubbleCardProps {
  quote: string;
  authorName: string;
  authorImage?: string;
  timestamp?: string;
  className?: string;
}

export function SpeechBubbleCard({
  quote,
  authorName,
  authorImage,
  timestamp,
  className = "",
}: SpeechBubbleCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Speech bubble card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
        <blockquote className="text-teal-600 text-base leading-relaxed mb-4">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {/* Notch at bottom left */}
        <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b border-r border-gray-100 transform rotate-45" />
      </div>
      {/* Author info below */}
      <div className="flex items-center gap-3 mt-6 ml-4">
        {authorImage ? (
          <Image
            src={authorImage}
            alt={authorName}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
        )}
        <div>
          <p className="font-medium text-teal-600">{authorName}</p>
          {timestamp && (
            <p className="text-teal-500 text-sm">{timestamp}</p>
          )}
        </div>
      </div>
    </div>
  );
}
