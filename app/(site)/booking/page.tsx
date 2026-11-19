import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/forms/BookingForm";
import { PageHeader } from "@/components/site/PageHeader";
import { BOOKING_EVENT_TYPE_LABELS, type BookingEventType } from "@/lib/constants";
import { getSiteContent } from "@/lib/content";
import { toDateInput } from "@/lib/dates";
import { getUnavailableBookingDates } from "@/lib/queries";

export const metadata: Metadata = { title: "Book the Choir" };

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const [{ type }, content, unavailableDates] = await Promise.all([
    searchParams,
    getSiteContent(),
    getUnavailableBookingDates(),
  ]);

  const typeLabel =
    type && type in BOOKING_EVENT_TYPE_LABELS
      ? BOOKING_EVENT_TYPE_LABELS[type as BookingEventType]
      : null;

  return (
    <>
      <PageHeader
        title="Book the choir"
        subtitle={
          typeLabel
            ? `Request Vivàce for your ${typeLabel.toLowerCase()}. Occasion first, then details — we confirm before anything is locked.`
            : "A short three-step request: occasion, details, contact. We confirm availability before anything is locked."
        }
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="rounded-[1.5rem] border border-[var(--color-navy)]/10 bg-white p-6 sm:p-8 lg:col-span-2">
          <BookingForm
            minDate={toDateInput(new Date())}
            unavailableDates={unavailableDates}
            defaultEventType={type}
            contactEmail={content.contactEmail}
            contactPhone={content.contactPhone}
          />
        </div>
        <aside className="space-y-8 text-sm text-[var(--color-ink)]/70">
          <div className="rounded-[1.5rem] bg-[var(--color-navy)] px-5 py-6 text-white">
            <h2 className="font-serif text-xl font-semibold">What makes a strong request</h2>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>Occasion + preferred date</li>
              <li>Venue and approximate guest count</li>
              <li>Moments you want sung (processional, hymns…)</li>
              <li>A phone number we can reach you on</li>
            </ul>
          </div>
          <div className="border-t border-[var(--color-champagne)]/50 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">How it works</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Pick the occasion and an open date.</li>
              <li>Share venue, timing, and musical notes.</li>
              <li>Leave contact details — we reply in 1–2 business days.</li>
            </ol>
          </div>
          <div className="border-t border-[var(--color-navy)]/10 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Prefer to talk?</h2>
            {content.contactPhone && (
              <p className="mt-2">
                Call:{" "}
                <a href={`tel:${content.contactPhone.replace(/\s+/g, "")}`} className="link-champagne">
                  {content.contactPhone}
                </a>
              </p>
            )}
            {content.contactEmail && (
              <p className="mt-1">
                Email:{" "}
                <a href={`mailto:${content.contactEmail}`} className="link-champagne">
                  {content.contactEmail}
                </a>
              </p>
            )}
            <p className="mt-4">
              Just have a question?{" "}
              <Link href="/contact" className="link-champagne">
                Send a quick inquiry →
              </Link>
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
