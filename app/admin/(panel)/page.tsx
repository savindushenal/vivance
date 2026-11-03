import Link from "next/link";
import { AdminPageHeader, Card, EmptyState, StatusBadge } from "@/components/admin/common";
import { BOOKING_EVENT_TYPE_LABELS, labelFor } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDate, formatDateTime, startOfToday } from "@/lib/dates";

export default async function DashboardPage() {
  const today = startOfToday();
  const [newInquiries, pendingBookings, upcomingEvents, upcomingSchedule, recentInquiries, recentBookings] =
    await Promise.all([
      db.inquiry.count({ where: { status: "NEW" } }),
      db.booking.count({ where: { status: "PENDING" } }),
      db.event.count({ where: { date: { gte: today } } }),
      db.scheduleItem.count({ where: { date: { gte: today } } }),
      db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      db.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "New inquiries", value: newInquiries, href: "/admin/inquiries?status=NEW" },
    { label: "Pending bookings", value: pendingBookings, href: "/admin/bookings?status=PENDING" },
    { label: "Upcoming events", value: upcomingEvents, href: "/admin/events" },
    { label: "Upcoming schedule items", value: upcomingSchedule, href: "/admin/schedule" },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Overview of what needs your attention." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="p-5 transition hover:border-amber-300">
              <p className="text-sm text-stone-500">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold text-indigo-950">{stat.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <h2 className="font-semibold text-stone-900">Recent inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm text-amber-700 hover:underline">View all</Link>
          </div>
          {recentInquiries.length === 0 ? (
            <EmptyState>No inquiries yet.</EmptyState>
          ) : (
            <ul className="divide-y divide-stone-100">
              {recentInquiries.map((inq) => (
                <li key={inq.id}>
                  <Link href={`/admin/inquiries/${inq.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-stone-50">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-stone-900">{inq.subject}</p>
                      <p className="truncate text-xs text-stone-500">{inq.name} · {formatDateTime(inq.createdAt)}</p>
                    </div>
                    <StatusBadge status={inq.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <h2 className="font-semibold text-stone-900">Recent booking requests</h2>
            <Link href="/admin/bookings" className="text-sm text-amber-700 hover:underline">View all</Link>
          </div>
          {recentBookings.length === 0 ? (
            <EmptyState>No booking requests yet.</EmptyState>
          ) : (
            <ul className="divide-y divide-stone-100">
              {recentBookings.map((b) => (
                <li key={b.id}>
                  <Link href={`/admin/bookings/${b.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-stone-50">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-stone-900">
                        {labelFor(BOOKING_EVENT_TYPE_LABELS, b.eventType)} – {b.name}
                      </p>
                      <p className="truncate text-xs text-stone-500">{formatDate(b.eventDate, "short")} · {b.venue}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
