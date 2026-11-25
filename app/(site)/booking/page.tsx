import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { getSiteContent } from "@/lib/content";
import { toDateInput } from "@/lib/dates";
import { getUnavailableBookingDates } from "@/lib/queries";
import { phoneList, telHref } from "@/lib/phones";

export const metadata: Metadata = {
  title: "Book us",
};

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

  const phones = phoneList(content.contactPhone);

  return (
    <>
      <section className="bg-[var(--color-navy)] px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="section-label text-[var(--color-gold-soft)]">Book the choir</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Tell us about your day
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Pick the function, date, time and venue. A request does not lock the date until we
            confirm.
          </p>
        </div>
      </section>

      <section
        id="book"
        className="scroll-mt-28 bg-[var(--color-pearl)] px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="border border-[var(--color-navy)]/10 bg-white p-6 sm:p-8">
            <BookingForm
              minDate={toDateInput(new Date())}
              unavailableDates={unavailableDates}
              defaultEventType={type}
              contactEmail={content.contactEmail}
              contactPhone={content.contactPhone}
            />
          </div>

          <aside className="space-y-8">
            <div className="bg-[var(--color-navy)] px-6 py-7 text-white">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                How booking works
              </h2>
              <ol className="mt-5 space-y-4 text-sm text-white/70">
                <li>
                  <span className="font-semibold text-[var(--color-gold-soft)]">1.</span> Choose
                  function, date and starting time
                </li>
                <li>
                  <span className="font-semibold text-[var(--color-gold-soft)]">2.</span> Share venue
                  and how to reach you
                </li>
                <li>
                  <span className="font-semibold text-[var(--color-gold-soft)]">3.</span> We reply in 1
                  to 2 business days
                </li>
              </ol>
            </div>

            <div className="border border-[var(--color-navy)]/10 bg-white px-6 py-7">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
                Prefer to talk?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/65">
                Call or WhatsApp and we will help you from there.
              </p>
              {phones.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  {phones.map((phone) => (
                    <p key={phone}>
                      <a
                        href={telHref(phone)}
                        className="text-base font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                      >
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              )}
              <a
                href="https://wa.me/94702433654"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-6"
              >
                WhatsApp us
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
