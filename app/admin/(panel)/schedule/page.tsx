import type { Metadata } from "next";
import Link from "next/link";
import { deleteScheduleItem } from "@/app/actions/schedule";
import { AdminPageHeader, Card, EmptyState, StatusBadge } from "@/components/admin/common";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, buttonStyles } from "@/components/ui";
import { SCHEDULE_TYPE_LABELS, labelFor } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDate, formatTimeRange, startOfToday } from "@/lib/dates";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Schedule" };

export default async function AdminSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; saved?: string }>;
}) {
  const { view, saved } = await searchParams;
  const showPast = view === "past";
  const today = startOfToday();
  const items = await db.scheduleItem.findMany({
    where: showPast ? { date: { lt: today } } : { date: { gte: today } },
    orderBy: [{ date: showPast ? "desc" : "asc" }, { startTime: "asc" }],
  });

  return (
    <>
      <AdminPageHeader
        title="Schedule"
        description="Rehearsals, services and performances shown on the Schedule page."
        action={
          <Link href="/admin/schedule/new" className={buttonStyles.primary}>
            + Add item
          </Link>
        }
      />
      {saved && (
        <div className="mb-4">
          <Alert variant="success">Schedule item saved.</Alert>
        </div>
      )}

      <div className="mb-4 flex gap-2">
        {[
          { label: "Upcoming", href: "/admin/schedule", active: !showPast },
          { label: "Past", href: "/admin/schedule?view=past", active: showPast },
        ].map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium",
              tab.active ? "bg-indigo-950 text-white" : "bg-white text-stone-600 hover:bg-stone-200",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <Card>
        {items.length === 0 ? (
          <EmptyState>No {showPast ? "past" : "upcoming"} schedule items.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase text-stone-500">
                <tr>
                  <th className="px-5 py-3">Item</th>
                  <th className="px-5 py-3">Date &amp; time</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50">
                    <td className="px-5 py-3">
                      <Link href={`/admin/schedule/${item.id}`} className="font-medium text-stone-900 hover:text-amber-700">
                        {item.title}
                      </Link>
                      {item.location && <p className="text-xs text-stone-500">{item.location}</p>}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-stone-600">
                      {formatDate(item.date, "short")}
                      <p className="text-xs text-stone-500">{formatTimeRange(item.startTime, item.endTime)}</p>
                    </td>
                    <td className="px-5 py-3 text-stone-600">{labelFor(SCHEDULE_TYPE_LABELS, item.type)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={item.isPublished ? "PUBLISHED" : "DRAFT"} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/schedule/${item.id}`} className={buttonStyles.ghost}>
                          Edit
                        </Link>
                        <form action={deleteScheduleItem}>
                          <input type="hidden" name="id" value={item.id} />
                          <SubmitButton
                            variant="ghost"
                            pendingText="..."
                            className="text-red-600 hover:bg-red-50"
                            confirmMessage={`Delete "${item.title}"?`}
                          >
                            Delete
                          </SubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
