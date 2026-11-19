import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHeader
        title="Contact us"
        subtitle="Hiring the choir? Use the booking request. This form is for general questions and membership."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-[1.5rem] bg-[var(--color-navy)] px-6 py-7 text-white sm:px-8">
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[var(--color-champagne)]">
              Hiring Vivàce?
            </p>
            <h2 className="mt-3 font-serif text-2xl font-extrabold tracking-tight sm:text-3xl">
              Start with a booking request
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              Occasion, date, venue, and contact details in three short steps — so we can qualify your
              lead and reply with a clear next step.
            </p>
            <div className="mt-6">
              <Link href="/booking" className="btn-primary">
                Book the Choir
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--color-navy)]/10 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold tracking-tight text-[var(--color-navy)]">
              General inquiry
            </h2>
            <p className="mt-2 text-sm text-[var(--color-ink)]/60">
              Questions about membership, repertoire, or anything else — send a note below.
            </p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>

        <aside className="space-y-8 text-sm text-[var(--color-ink)]/70">
          <div className="border-t border-[var(--color-navy)]/10 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Get in touch</h2>
            <dl className="mt-4 space-y-3">
              {content.contactAddress && (
                <div>
                  <dt className="font-semibold text-[var(--color-navy)]">Address</dt>
                  <dd className="whitespace-pre-line">{content.contactAddress}</dd>
                </div>
              )}
              {content.contactEmail && (
                <div>
                  <dt className="font-semibold text-[var(--color-navy)]">Email</dt>
                  <dd>
                    <a href={`mailto:${content.contactEmail}`} className="link-champagne">
                      {content.contactEmail}
                    </a>
                  </dd>
                </div>
              )}
              {content.contactPhone && (
                <div>
                  <dt className="font-semibold text-[var(--color-navy)]">Phone</dt>
                  <dd>
                    <a href={`tel:${content.contactPhone.replace(/\s+/g, "")}`} className="link-champagne">
                      {content.contactPhone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className="border-t border-[var(--color-champagne)]/50 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Popular requests</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/booking?type=WEDDING" className="link-champagne">
                  Wedding →
                </Link>
              </li>
              <li>
                <Link href="/booking?type=CHURCH_SERVICE" className="link-champagne">
                  Church service →
                </Link>
              </li>
              <li>
                <Link href="/booking?type=CORPORATE" className="link-champagne">
                  Corporate event →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
