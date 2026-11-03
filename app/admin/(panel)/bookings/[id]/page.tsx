import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteBooking, updateBookingNotes, updateBookingStatus } from "@/app/actions/bookings";
import { AdminPageHeader, Card, StatusBadge } from "@/components/admin/common";
import { SubmitButton } from "@/components/SubmitButton";
import { Textarea, buttonStyles } from "@/components/ui";
import { BOOKING_EVENT_TYPE_LABELS, BOOKING_STATUSES, labelFor } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDate, formatDateTime, formatTime } from "@/lib/dates";

export const metadata: Metadata = { title: "Booking" };

const STATUS_ACTION_LABELS: Record<string, string> = {
  PENDING: "Mark pending",
  CONFIRMED: "Confirm",
  DECLINED: "Decline",
  CANCELLED: "Mark cancelled",
};

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await db.booking.findUnique({ where: { id } });
  if (!booking) notFound();

  const eventLabel = labelFor(BOOKING_EVENT_TYPE_LABELS, booking.eventType);
  const replyHref = `mailto:${booking.email}?subject=${encodeURIComponent(
    `Your booking request – ${eventLabel} on ${formatDate(booking.eventDate, "short")}`,
  )}`;

  const details: Array<[string, string | number | null]> = [
    ["Event type", eventLabel],
    ["Date", formatDate(booking.eventDate)],
    ["Time", booking.eventTime ? formatTime(booking.eventTime) : null],
    ["Venue", booking.venue],
    ["Expected guests", booking.expectedGuests],
  ];

  return (
    <>
      <Link href="/admin/bookings" className="text-sm text-amber-700 hover:underline">
        ← Back to bookings
      </Link>
      <div className="mt-3">
        <AdminPageHeader
          title={`${eventLabel} – ${booking.name}`}
          description={`Received ${formatDateTime(booking.createdAt)}`}
          action={<StatusBadge status={booking.status} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold text-stone-900">Event details</h2>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              {details
                .filter(([, value]) => value !== null && value !== "")
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase text-stone-500">{label}</dt>
                    <dd className="text-stone-900">{value}</dd>
                  </div>
                ))}
            </dl>
            {booking.message && (
              <div className="mt-6 border-t border-stone-100 pt-4">
                <p className="text-xs uppercase text-stone-500">Message</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-stone-800">{booking.message}</p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 font-semibold text-stone-900">Internal notes</h2>
            <form action={updateBookingNotes} className="space-y-3">
              <input type="hidden" name="id" value={booking.id} />
              <Textarea
                name="adminNotes"
                rows={4}
                defaultValue={booking.adminNotes ?? ""}
                placeholder="Fee agreed, repertoire, contact history... (only visible to admins)"
              />
              <SubmitButton variant="secondary">Save notes</SubmitButton>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-3 p-6 text-sm">
            <div>
              <p className="text-xs uppercase text-stone-500">Client</p>
              <p className="font-medium text-stone-900">{booking.name}</p>
              {booking.organization && <p className="text-stone-600">{booking.organization}</p>}
            </div>
            <div>
              <p className="text-xs uppercase text-stone-500">Email</p>
              <a href={`mailto:${booking.email}`} className="text-amber-700 hover:underline">
                {booking.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase text-stone-500">Phone</p>
              <a href={`tel:${booking.phone}`} className="text-stone-900">
                {booking.phone}
              </a>
            </div>
            <a href={replyHref} className={`${buttonStyles.primary} w-full`}>
              Reply by email
            </a>
          </Card>

          <Card className="space-y-3 p-6">
            <p className="text-sm font-semibold text-stone-900">Update status</p>
            <div className="flex flex-wrap gap-2">
              {BOOKING_STATUSES.filter((s) => s !== booking.status).map((status) => (
                <form key={status} action={updateBookingStatus}>
                  <input type="hidden" name="id" value={booking.id} />
                  <input type="hidden" name="status" value={status} />
                  <SubmitButton
                    variant={status === "CONFIRMED" ? "primary" : status === "DECLINED" ? "danger" : "secondary"}
                    pendingText="..."
                  >
                    {STATUS_ACTION_LABELS[status]}
                  </SubmitButton>
                </form>
              ))}
            </div>
            <form action={deleteBooking} className="border-t border-stone-100 pt-3">
              <input type="hidden" name="id" value={booking.id} />
              <SubmitButton
                variant="ghost"
                pendingText="Deleting..."
                className="text-red-600 hover:bg-red-50"
                confirmMessage="Delete this booking request permanently?"
              >
                Delete booking
              </SubmitButton>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
