import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotIllustrationCardVariant = "dark" | "cream" | "white";

interface SpotIllustrationCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description?: string;
  variant?: SpotIllustrationCardVariant;
  footer?: ReactNode;
  className?: string;
}

const variantStyles: Record<SpotIllustrationCardVariant, { card: string; title: string; description: string }> = {
  dark: {
    card: "bg-purple-700 border border-purple-500/30",
    title: "font-display text-2xl text-white",
    description: "text-purple-200",
  },
  cream: {
    card: "bg-cream hover:shadow-lg transition-shadow duration-300",
    title: "font-semibold text-gray-900 group-hover:text-purple-700 transition-colors",
    description: "text-gray-600 text-sm",
  },
  white: {
    card: "bg-white shadow-sm hover:shadow-lg transition-shadow duration-300",
    title: "font-display text-lg text-purple-700",
    description: "text-gray-600 text-sm",
  },
};

export function SpotIllustrationCard({
  imageSrc,
  imageAlt,
  title,
  description,
  variant = "cream",
  footer,
  className = "",
}: SpotIllustrationCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-[24px] p-6 md:p-8 flex flex-col items-center text-center group",
        styles.card,
        className
      )}
    >
      <div className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
        />
      </div>
      <h4 className={cn("mb-3 md:mb-4", styles.title)}>
        {title}
      </h4>
      {description && (
        <p className={cn("leading-relaxed flex-grow", styles.description)}>
          {description}
        </p>
      )}
      {footer && (
        <div className="mt-6">
          {footer}
        </div>
      )}
    </div>
  );
}
