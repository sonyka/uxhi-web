import { cn } from "@/lib/utils";

interface FormSubmitButtonProps {
  label: string;
  pendingLabel: string;
  isPending: boolean;
  icon?: "send" | "arrow";
  className?: string;
}

function SendSvg() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

function ArrowSvg() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function FormSubmitButton({
  label,
  pendingLabel,
  isPending,
  icon = "arrow",
  className,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={cn(
        "inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-medium transition-colors bg-white/10 border border-white/30 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      <span>{isPending ? pendingLabel : label}</span>
      <span className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20 transition-colors">
        {icon === "send" ? <SendSvg /> : <ArrowSvg />}
      </span>
    </button>
  );
}
