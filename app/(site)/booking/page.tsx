import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteContent } from "@/lib/content";
import { toDateInput } from "@/lib/dates";
import { getUnavailableBookingDates } from "@/lib/queries";

export const metadata: Metadata = { title: "Book the Choir" };

export default async function BookingPage() {
  const [content, unavailableDates] = await Promise.all([
    getSiteContent(),
    getUnavailableBookingDates(),
  ]);

  return (
    <>
      <PageHeader
        title="Book the choir"
        subtitle="Choose a date on the calendar, tell us about your occasion, and we will confirm availability."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="border border-[var(--color-navy)]/10 bg-white p-6 sm:p-8 lg:col-span-2">
          <BookingForm minDate={toDateInput(new Date())} unavailableDates={unavailableDates} />
        </div>
        <aside className="space-y-8 text-sm text-[var(--color-ink)]/70">
          <div className="border-t border-[var(--color-champagne)]/50 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">How it works</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Pick an available date on the calendar.</li>
              <li>Send your booking request with event details.</li>
              <li>We confirm availability and agree on repertoire together.</li>
            </ol>
          </div>
          <div className="border-t border-[var(--color-navy)]/10 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Calendar key</h2>
            <ul className="mt-3 space-y-2">
              <li>Past dates cannot be selected.</li>
              <li>Struck-through dates are already reserved for performances or confirmed bookings.</li>
              <li>A request does not lock the date until we confirm.</li>
            </ul>
          </div>
          <div className="border-t border-[var(--color-navy)]/10 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Prefer to talk?</h2>
            {content.contactPhone && <p className="mt-2">Call us: {content.contactPhone}</p>}
            {content.contactEmail && (
              <p className="mt-1">
                Email:{" "}
                <a href={`mailto:${content.contactEmail}`} className="link-champagne">
                  {content.contactEmail}
                </a>
              </p>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}
