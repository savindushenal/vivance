import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader, Card, EmptyState, StatusBadge, StatusFilter } from "@/components/admin/common";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/dates";
import { inquiryStatusSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Inquiries" };

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const parsed = inquiryStatusSchema.safeParse((await searchParams).status);
  const status = parsed.success ? parsed.data : undefined;
  const inquiries = await db.inquiry.findMany({
    where: status ? { status } : { status: { not: "ARCHIVED" } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageHeader title="Inquiries" description="Messages sent through the contact form." />
      <StatusFilter basePath="/admin/inquiries" statuses={INQUIRY_STATUSES} current={status} />
      <Card>
        {inquiries.length === 0 ? (
          <EmptyState>No inquiries found.</EmptyState>
        ) : (
          <ul className="divide-y divide-stone-100">
            {inquiries.map((inq) => (
              <li key={inq.id}>
                <Link
                  href={`/admin/inquiries/${inq.id}`}
                  className="flex flex-wrap items-start justify-between gap-3 px-5 py-4 hover:bg-stone-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-stone-900", inq.status === "NEW" && "font-semibold")}>
                      {inq.subject}
                    </p>
                    <p className="truncate text-sm text-stone-500">
                      {inq.name} &lt;{inq.email}&gt;
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-stone-600">{inq.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={inq.status} />
                    <span className="text-xs text-stone-500">{formatDateTime(inq.createdAt)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
      {!status && (
        <p className="mt-3 text-xs text-stone-500">Archived inquiries are hidden. Use the &quot;archived&quot; filter to see them.</p>
      )}
    </>
  );
}
