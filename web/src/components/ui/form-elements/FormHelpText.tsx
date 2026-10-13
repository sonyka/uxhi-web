import { cn } from "@/lib/utils";

interface FormHelpTextProps {
  children: React.ReactNode;
  className?: string;
}

/** Quiet note under a field: format hints, privacy notes, "one of these two". */
export function FormHelpText({ children, className }: FormHelpTextProps) {
  return <p className={cn("text-base text-purple-30 mt-1.5", className)}>{children}</p>;
}
