import Link from "next/link";
import type { Event } from "@prisma/client";
import { formatDate, formatTimeRange } from "@/lib/dates";

export function EventImage({
  src,
  alt,
  className = "aspect-[16/10]",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  if (src) {
    return <img src={src} alt={alt} className={`${className} w-full object-cover`} />;
  }
  return (
    <div
      className={`${className} relative flex w-full items-center justify-center overflow-hidden bg-[var(--color-navy)]`}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(197,165,114,0.35), transparent 45%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
      <span className="relative font-serif text-5xl tracking-[0.2em] text-[var(--color-champagne-soft)]/80">
        ♫
      </span>
    </div>
  );
}

export function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
  const day = event.date.getDate();
  const month = event.date.toLocaleDateString("en-US", { month: "short" });

  return (
    <Link href={`/events/${event.slug}`} className="group flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <EventImage
          src={event.imageUrl}
          alt={event.title}
          className="aspect-[16/10] transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-0 top-0 bg-[var(--color-navy)]/90 px-3 py-2 text-center text-white backdrop-blur-sm">
          <p className="font-serif text-2xl font-semibold leading-none">{day}</p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-champagne-soft)]">
            {month}
          </p>
        </div>
        {past && (
          <span className="absolute right-3 top-3 bg-black/55 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            Past event
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col border-b border-[var(--color-navy)]/10 py-5">
        <h3 className="font-serif text-xl font-semibold tracking-wide text-[var(--color-navy)] transition group-hover:text-[var(--color-champagne-deep)]">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-ink)]/55">
          {formatDate(event.date)}
          {event.startTime && ` · ${formatTimeRange(event.startTime, event.endTime)}`}
        </p>
        {event.venue && <p className="mt-1 text-sm text-[var(--color-ink)]/55">{event.venue}</p>}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-ink)]/65">
          {event.description}
        </p>
        <span className="mt-auto pt-4 text-sm font-semibold tracking-wide text-[var(--color-champagne-deep)]">
          View details →
        </span>
      </div>
    </Link>
  );
}
