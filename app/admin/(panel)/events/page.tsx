import type { Metadata } from "next";
import Link from "next/link";
import { deleteEvent, toggleEventPublished } from "@/app/actions/events";
import { AdminPageHeader, Card, EmptyState, StatusBadge } from "@/components/admin/common";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, buttonStyles } from "@/components/ui";
import { db } from "@/lib/db";
import { formatDate, startOfToday } from "@/lib/dates";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Events" };

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; saved?: string }>;
}) {
  const { view, saved } = await searchParams;
  const showPast = view === "past";
  const today = startOfToday();
  const events = await db.event.findMany({
    where: showPast ? { date: { lt: today } } : { date: { gte: today } },
    orderBy: { date: showPast ? "desc" : "asc" },
  });

  return (
    <>
      <AdminPageHeader
        title="Events"
        description="Concerts and performances shown on the Events and Past Events pages."
        action={
          <Link href="/admin/events/new" className={buttonStyles.primary}>
            + New event
          </Link>
        }
      />
      {saved && (
        <div className="mb-4">
          <Alert variant="success">Event saved.</Alert>
        </div>
      )}

      <div className="mb-4 flex gap-2">
        {[
          { label: "Upcoming", href: "/admin/events", active: !showPast },
          { label: "Past", href: "/admin/events?view=past", active: showPast },
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
        {events.length === 0 ? (
          <EmptyState>No {showPast ? "past" : "upcoming"} events.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase text-stone-500">
                <tr>
                  <th className="px-5 py-3">Event</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-stone-50">
                    <td className="px-5 py-3">
                      <Link href={`/admin/events/${event.id}`} className="font-medium text-stone-900 hover:text-amber-700">
                        {event.title}
                      </Link>
                      {event.venue && <p className="text-xs text-stone-500">{event.venue}</p>}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-stone-600">{formatDate(event.date, "short")}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={event.isPublished ? "PUBLISHED" : "DRAFT"} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/events/${event.id}`} className={buttonStyles.ghost}>
                          Edit
                        </Link>
                        <form action={toggleEventPublished}>
                          <input type="hidden" name="id" value={event.id} />
                          <SubmitButton variant="ghost" pendingText="...">
                            {event.isPublished ? "Unpublish" : "Publish"}
                          </SubmitButton>
                        </form>
                        <form action={deleteEvent}>
                          <input type="hidden" name="id" value={event.id} />
                          <SubmitButton
                            variant="ghost"
                            pendingText="..."
                            className="text-red-600 hover:bg-red-50"
                            confirmMessage={`Delete "${event.title}"? This cannot be undone.`}
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
