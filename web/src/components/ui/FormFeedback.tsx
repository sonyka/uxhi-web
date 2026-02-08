import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  FormAlert — error / info banner                                    */
/* ------------------------------------------------------------------ */

interface FormAlertProps {
  message: string;
  variant?: "error" | "info";
  className?: string;
}

const alertStyles = {
  error: "bg-red-500/20 border-red-400/30 text-red-200",
  info: "bg-white/10 border-white/20 text-purple-200",
} as const;

export function FormAlert({ message, variant = "error", className }: FormAlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        alertStyles[variant],
        className,
      )}
    >
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FieldError — field-level validation message                        */
/* ------------------------------------------------------------------ */

interface FieldErrorProps {
  errors?: Record<string, string[]>;
  field: string;
  className?: string;
}

export function FieldError({ errors, field, className }: FieldErrorProps) {
  const messages = errors?.[field];
  if (!messages?.length) return null;
  return (
    <p
      role="alert"
      id={`${field}-error`}
      className={cn("text-yellow text-sm mt-1", className)}
    >
      {messages[0]}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  FormSuccess — post-submission success card                         */
/* ------------------------------------------------------------------ */

interface FormSuccessProps {
  icon: string;
  title: string;
  message: string;
  className?: string;
}

export function FormSuccess({ icon, title, message, className }: FormSuccessProps) {
  return (
    <div className={cn("bg-white/10 border border-white/20 rounded-2xl p-8 text-center", className)}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-display text-2xl text-white mb-2">{title}</h3>
      <p className="text-purple-200">{message}</p>
    </div>
  );
}
