import type { Metadata } from "next";
import Link from "next/link";
import { EventCard } from "@/components/site/EventCard";
import { PageHeader } from "@/components/site/PageHeader";
import { getUpcomingEvents } from "@/lib/queries";

export const metadata: Metadata = { title: "Upcoming Events" };

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <>
      <PageHeader
        title="Upcoming events"
        subtitle="Concerts, services and celebrations – we would love to see you there."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {events.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-ink)]/55">No upcoming events right now.</p>
        )}
        <p className="mt-12 text-center">
          <Link href="/events/past" className="link-champagne text-sm font-semibold">
            Browse past events →
          </Link>
        </p>
      </section>
    </>
  );
}
