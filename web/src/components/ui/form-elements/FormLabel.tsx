import { cn } from "@/lib/utils";

interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  as?: "label" | "legend";
  className?: string;
}

const baseClass = "block text-sm font-semibold text-purple-200 mb-1.5";

export function FormLabel({
  children,
  htmlFor,
  as = "label",
  className,
}: FormLabelProps) {
  const Tag = as;
  return (
    <Tag htmlFor={as === "label" ? htmlFor : undefined} className={cn(baseClass, className)}>
      {children}
    </Tag>
  );
}
