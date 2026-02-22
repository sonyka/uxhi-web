import { cn } from "@/lib/utils";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const inputClass =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-60/60 focus:outline-none focus:ring-2 focus:ring-teal-90 focus:border-transparent transition-colors";

export function FormInput({ className, ...props }: FormInputProps) {
  return <input className={cn(inputClass, className)} {...props} />;
}
