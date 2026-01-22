import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FeatureCardVariant = "cream" | "white" | "teal" | "purple";

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  variant?: FeatureCardVariant;
  className?: string;
}

const variantStyles: Record<FeatureCardVariant, { card: string; icon: string; title: string; description: string }> = {
  cream: {
    card: "bg-cream",
    icon: "text-teal-500",
    title: "text-purple-700",
    description: "text-gray-600",
  },
  white: {
    card: "bg-white shadow-sm border border-gray-100",
    icon: "text-teal-500",
    title: "text-purple-700",
    description: "text-gray-600",
  },
  teal: {
    card: "bg-teal-500",
    icon: "text-white",
    title: "text-white",
    description: "text-white/90",
  },
  purple: {
    card: "bg-purple-700",
    icon: "text-white",
    title: "text-white",
    description: "text-white/90",
  },
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "cream",
  className = "",
}: FeatureCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "p-6 md:p-8 rounded-2xl hover:shadow-lg transition-shadow",
        styles.card,
        className
      )}
    >
      {icon && (
        <div className={cn("mb-4", styles.icon)}>
          {icon}
        </div>
      )}
      <h3 className={cn("font-semibold text-xl mb-2", styles.title)}>
        {title}
      </h3>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}
