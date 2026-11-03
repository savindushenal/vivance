import type { Metadata } from "next";
import { EventCard } from "@/components/site/EventCard";
import { PageHeader } from "@/components/site/PageHeader";
import { getPastEvents } from "@/lib/queries";

export const metadata: Metadata = { title: "Past Events" };

export default async function PastEventsPage() {
  const events = await getPastEvents();
  const byYear = new Map<number, typeof events>();
  for (const event of events) {
    const year = event.date.getFullYear();
    byYear.set(year, [...(byYear.get(year) ?? []), event]);
  }

  return (
    <>
      <PageHeader
        title="Past events"
        subtitle="A look back at the concerts and celebrations we have been part of."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {events.length === 0 && (
          <p className="text-center text-[var(--color-ink)]/55">No past events yet.</p>
        )}
        <div className="space-y-14">
          {[...byYear.entries()].map(([year, yearEvents]) => (
            <div key={year}>
              <h2 className="font-serif text-3xl font-semibold tracking-wide text-[var(--color-navy)]">
                {year}
              </h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {yearEvents.map((event) => (
                  <EventCard key={event.id} event={event} past />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
