import { cn } from "@/lib/utils";

interface FormRadioProps {
  name: string;
  value: string;
  label: string;
  required?: boolean;
  defaultChecked?: boolean;
  className?: string;
}

export function FormRadio({
  name,
  value,
  label,
  required,
  defaultChecked,
  className,
}: FormRadioProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group/radio", className)}>
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        defaultChecked={defaultChecked}
        className="sr-only"
      />
      {/* Custom radio circle */}
      <span className="w-4 h-4 rounded-full border-2 border-white/30 bg-white/5 flex items-center justify-center transition-colors group-has-[:checked]/radio:border-teal-500 group-has-[:checked]/radio:bg-teal-500 group-has-[:focus-visible]/radio:ring-2 group-has-[:focus-visible]/radio:ring-teal-500 group-has-[:focus-visible]/radio:ring-offset-2 group-has-[:focus-visible]/radio:ring-offset-purple-700">
        <span className="w-1.5 h-1.5 rounded-full bg-white scale-0 transition-transform group-has-[:checked]/radio:scale-100" />
      </span>
      <span className="text-purple-200 group-hover/radio:text-white transition-colors">{label}</span>
    </label>
  );
}
