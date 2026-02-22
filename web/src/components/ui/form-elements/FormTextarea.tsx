import { cn } from "@/lib/utils";

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const textareaClass =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-60/60 focus:outline-none focus:ring-2 focus:ring-teal-90 focus:border-transparent transition-colors resize-y";

export function FormTextarea({ className, ...props }: FormTextareaProps) {
  return <textarea className={cn(textareaClass, className)} {...props} />;
}
