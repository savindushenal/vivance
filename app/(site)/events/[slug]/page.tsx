import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventImage } from "@/components/site/EventCard";
import { db } from "@/lib/db";
import { formatDate, formatTimeRange, startOfToday } from "@/lib/dates";
import { parseGallery } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

async function getEvent(slug: string) {
  return db.event.findFirst({ where: { slug, isPublished: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  return event ? { title: event.title, description: event.description.slice(0, 160) } : {};
}

export default async function EventDetailPage({ params }: Props) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();

  const isPast = event.date < startOfToday();
  const gallery = parseGallery(event.gallery);

  return (
    <article>
      <div className="relative pt-16">
        <EventImage src={event.imageUrl} alt={event.title} className="h-72 sm:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/90 via-[var(--color-navy)]/35 to-[var(--color-navy)]/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
            <Link
              href={isPast ? "/events/past" : "/events"}
              className="text-sm font-medium text-[var(--color-champagne-soft)] hover:text-white"
            >
              ← {isPast ? "Past events" : "Upcoming events"}
            </Link>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-wide text-white sm:text-5xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="whitespace-pre-line text-lg leading-relaxed text-[var(--color-ink)]/75">
            {event.description}
          </p>
        </div>
        <aside className="h-fit space-y-4 border border-[var(--color-navy)]/10 bg-white p-6 text-sm">
          {isPast && (
            <span className="inline-block bg-[var(--color-mist)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-ink)]/65">
              This event has taken place
            </span>
          )}
          <div>
            <p className="font-semibold text-[var(--color-navy)]">Date</p>
            <p className="text-[var(--color-ink)]/65">{formatDate(event.date)}</p>
          </div>
          {event.startTime && (
            <div>
              <p className="font-semibold text-[var(--color-navy)]">Time</p>
              <p className="text-[var(--color-ink)]/65">
                {formatTimeRange(event.startTime, event.endTime)}
              </p>
            </div>
          )}
          {event.venue && (
            <div>
              <p className="font-semibold text-[var(--color-navy)]">Venue</p>
              <p className="text-[var(--color-ink)]/65">{event.venue}</p>
            </div>
          )}
          {!isPast && (
            <Link
              href="/contact"
              className="block bg-[var(--color-navy)] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--color-navy-soft)]"
            >
              Ask about this event
            </Link>
          )}
        </aside>
      </div>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold tracking-wide text-[var(--color-navy)]">
            Gallery
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((src, i) => (
              <a
                key={src + i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden"
              >
                <img
                  src={src}
                  alt={`${event.title} photo ${i + 1}`}
                  className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                />
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
