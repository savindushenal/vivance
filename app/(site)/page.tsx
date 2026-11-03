import Image from "next/image";
import Link from "next/link";
import { BrandWordmark } from "@/components/site/BrandMark";
import { EventCard } from "@/components/site/EventCard";
import { getSiteContent } from "@/lib/content";
import { formatDate, formatTimeRange } from "@/lib/dates";
import { getUpcomingEvents, getUpcomingSchedule } from "@/lib/queries";
import { SCHEDULE_TYPE_LABELS, labelFor } from "@/lib/constants";

export default async function HomePage() {
  const [content, events, schedule] = await Promise.all([
    getSiteContent(),
    getUpcomingEvents(3),
    getUpcomingSchedule(),
  ]);
  const nextUp = schedule.slice(0, 4);

  return (
    <>
      <section className="hero-stage relative min-h-[100svh] overflow-hidden text-white">
        <div className="pointer-events-none absolute left-1/2 top-[28%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 logo-halo animate-glow sm:h-[36rem] sm:w-[36rem]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-6">
          <div className="animate-fade-up relative mb-8">
            <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-sm ring-1 ring-white/15 sm:h-36 sm:w-36">
              <Image
                src="/brand/logo.jpg"
                alt={`${content.choirName} logo`}
                fill
                priority
                sizes="144px"
                className="object-cover"
              />
            </div>
          </div>

          <BrandWordmark light className="animate-fade-up-delay-1 text-5xl sm:text-7xl md:text-8xl" />
          <p className="animate-fade-up-delay-1 mt-3 text-xs font-medium uppercase tracking-[0.42em] text-[var(--color-champagne-soft)]">
            The Living Tempo
          </p>

          <h1 className="animate-fade-up-delay-2 mt-8 max-w-2xl font-serif text-2xl font-medium leading-snug text-white/90 sm:text-3xl">
            {content.heroTitle}
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {content.heroSubtitle}
          </p>

          <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/booking" className="btn-primary">
              Book the Choir
            </Link>
            <Link href="/events" className="btn-ghost">
              Upcoming Events
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-pearl)] to-transparent" />
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="section-rule justify-center">For hire</p>
        <h2 className="mt-4 text-center font-serif text-3xl font-semibold tracking-wide text-[var(--color-navy)] sm:text-4xl">
          Presence for the moments that matter
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-ink)]/65">
          {content.homeIntro}
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {[
            {
              title: "Weddings",
              copy: "Processionals, hymns, and ceremony moments shaped with warmth and polish.",
            },
            {
              title: "Private events",
              copy: "Receptions, anniversaries, and celebrations where live voices set the tone.",
            },
            {
              title: "Corporate & sacred",
              copy: "Services, galas, and formal occasions that call for refined choral sound.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-4 h-px w-10 bg-[var(--color-champagne)]" />
              <h3 className="font-serif text-2xl font-semibold text-[var(--color-navy)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/60">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/about" className="link-champagne text-sm font-semibold tracking-wide">
            Learn more about us →
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--color-navy)]/8 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-rule justify-start">Calendar</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-wide text-[var(--color-navy)]">
                Upcoming events
              </h2>
            </div>
            <Link href="/events" className="link-champagne text-sm font-semibold">
              View all events →
            </Link>
          </div>
          {events.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-[var(--color-ink)]/55">
              No upcoming events right now. Check back soon or{" "}
              <Link href="/events/past" className="link-champagne">
                browse our past events
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {nextUp.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-rule justify-start">Next</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-wide text-[var(--color-navy)]">
                Coming up
              </h2>
            </div>
            <Link href="/schedule" className="link-champagne text-sm font-semibold">
              Full schedule →
            </Link>
          </div>
          <ul className="mt-10 divide-y divide-[var(--color-navy)]/10 border-y border-[var(--color-navy)]/10">
            {nextUp.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-5">
                <div>
                  <p className="font-medium text-[var(--color-navy)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--color-ink)]/55">
                    {formatDate(item.date)}
                    {item.startTime && ` · ${formatTimeRange(item.startTime, item.endTime)}`}
                    {item.location && ` · ${item.location}`}
                  </p>
                </div>
                <span className="rounded-sm bg-[var(--color-navy)]/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-navy)]/70">
                  {labelFor(SCHEDULE_TYPE_LABELS, item.type)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="relative overflow-hidden bg-[var(--color-navy)] py-24 text-center text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(197,165,114,0.2), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4">
          <p className="section-rule justify-center text-[var(--color-champagne-soft)] before:bg-[var(--color-champagne-soft)] after:bg-[var(--color-champagne-soft)]">
            Bookings
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-wide sm:text-4xl">
            Make your occasion unforgettable
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Weddings, church services, corporate functions and concerts — tell us about your event and
            we will get back to you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-primary">
              Request a booking
            </Link>
            <Link href="/contact" className="btn-ghost">
              Send an inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
