import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader, Card, EmptyState, StatusBadge, StatusFilter } from "@/components/admin/common";
import { BOOKING_EVENT_TYPE_LABELS, BOOKING_STATUSES, labelFor } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDate, formatDateTime, formatTime } from "@/lib/dates";
import { bookingStatusSchema } from "@/lib/validations";

export const metadata: Metadata = { title: "Bookings" };

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const parsed = bookingStatusSchema.safeParse((await searchParams).status);
  const status = parsed.success ? parsed.data : undefined;
  const bookings = await db.booking.findMany({
    where: status ? { status } : undefined,
    orderBy: [{ eventDate: "asc" }],
  });

  return (
    <>
      <AdminPageHeader title="Bookings" description="Booking requests sent through the booking form." />
      <StatusFilter basePath="/admin/bookings" statuses={BOOKING_STATUSES} current={status} />
      <Card>
        {bookings.length === 0 ? (
          <EmptyState>No booking requests found.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase text-stone-500">
                <tr>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Event</th>
                  <th className="px-5 py-3">Event date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50">
                    <td className="px-5 py-3">
                      <Link href={`/admin/bookings/${b.id}`} className="font-medium text-stone-900 hover:text-amber-700">
                        {b.name}
                      </Link>
                      {b.organization && <p className="text-xs text-stone-500">{b.organization}</p>}
                    </td>
                    <td className="px-5 py-3 text-stone-600">
                      {labelFor(BOOKING_EVENT_TYPE_LABELS, b.eventType)}
                      <p className="text-xs text-stone-500">{b.venue}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-stone-600">
                      {formatDate(b.eventDate, "short")}
                      {b.eventTime && <p className="text-xs text-stone-500">{formatTime(b.eventTime)}</p>}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-xs text-stone-500">{formatDateTime(b.createdAt)}</td>
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
