import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const controlClass =
  "block w-full rounded-sm border border-[var(--color-navy)]/15 bg-white px-3 py-2.5 text-[var(--color-ink)] shadow-none placeholder:text-[var(--color-ink)]/35 focus:border-[var(--color-champagne-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--color-champagne)]/25 disabled:bg-[var(--color-mist)]";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "min-h-28", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controlClass, className)} {...props} />;
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string[] | string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const message = Array.isArray(error) ? error[0] : error;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-stone-700">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      {children}
      {hint && !message && <p className="text-xs text-stone-500">{hint}</p>}
      {message && <p className="text-sm text-red-600">{message}</p>}
    </div>
  );
}

export function Alert({
  variant = "info",
  children,
}: {
  variant?: "info" | "success" | "error";
  children: ReactNode;
}) {
  const styles = {
    info: "border-sky-200 bg-sky-50 text-sky-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
  };
  return (
    <div role="status" className={cn("rounded-lg border px-4 py-3 text-sm", styles[variant])}>
      {children}
    </div>
  );
}

export const buttonStyles = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--color-navy)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--color-navy-soft)] disabled:opacity-60",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--color-navy)]/20 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-navy)] transition hover:bg-[var(--color-pearl)] disabled:opacity-60",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-sm bg-red-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-red-700 disabled:opacity-60",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium text-[var(--color-ink)]/65 transition hover:bg-[var(--color-mist)]",
};
