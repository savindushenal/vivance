import { db } from "@/lib/db";
import { startOfToday, toDateInput } from "@/lib/dates";

export function getUpcomingEvents(take?: number) {
  return db.event.findMany({
    where: { isPublished: true, date: { gte: startOfToday() } },
    orderBy: { date: "asc" },
    take,
  });
}

export function getPastEvents() {
  return db.event.findMany({
    where: { isPublished: true, date: { lt: startOfToday() } },
    orderBy: { date: "desc" },
  });
}

export function getUpcomingSchedule() {
  return db.scheduleItem.findMany({
    where: { isPublished: true, date: { gte: startOfToday() } },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });
}

/** Dates the choir is already committed to (confirmed bookings, performances, events). */
export async function getUnavailableBookingDates(): Promise<string[]> {
  const today = startOfToday();
  const [bookings, schedule, events] = await Promise.all([
    db.booking.findMany({
      where: { status: "CONFIRMED", eventDate: { gte: today } },
      select: { eventDate: true },
    }),
    db.scheduleItem.findMany({
      where: {
        isPublished: true,
        date: { gte: today },
        type: { in: ["PERFORMANCE", "SERVICE"] },
      },
      select: { date: true },
    }),
    db.event.findMany({
      where: { isPublished: true, date: { gte: today } },
      select: { date: true },
    }),
  ]);

  return [
    ...new Set([
      ...bookings.map((b) => toDateInput(b.eventDate)),
      ...schedule.map((s) => toDateInput(s.date)),
      ...events.map((e) => toDateInput(e.date)),
    ]),
  ].sort();
}
