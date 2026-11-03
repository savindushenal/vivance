import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-stone-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-stone-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-stone-200 bg-white shadow-sm", className)}>{children}</div>;
}

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-800",
  READ: "bg-sky-100 text-sky-800",
  REPLIED: "bg-emerald-100 text-emerald-800",
  ARCHIVED: "bg-stone-200 text-stone-600",
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  DECLINED: "bg-red-100 text-red-800",
  CANCELLED: "bg-stone-200 text-stone-600",
  PUBLISHED: "bg-emerald-100 text-emerald-800",
  DRAFT: "bg-stone-200 text-stone-600",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
        STATUS_STYLES[status] ?? "bg-stone-100 text-stone-700",
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}

export function StatusFilter({
  basePath,
  statuses,
  current,
}: {
  basePath: string;
  statuses: readonly string[];
  current?: string;
}) {
  const options = [{ value: undefined, label: "All" }, ...statuses.map((s) => ({ value: s, label: s.toLowerCase() }))];
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {options.map((opt) => (
        <Link
          key={opt.label}
          href={opt.value ? `${basePath}?status=${opt.value}` : basePath}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium capitalize transition",
            current === opt.value ? "bg-indigo-950 text-white" : "bg-white text-stone-600 hover:bg-stone-200",
          )}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="px-6 py-12 text-center text-sm text-stone-500">{children}</div>;
}
