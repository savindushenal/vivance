import type { Metadata } from "next";
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
        subtitle="Questions, membership enquiries or anything else – we would love to hear from you."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="border border-[var(--color-navy)]/10 bg-white p-6 sm:p-8 lg:col-span-2">
          <InquiryForm />
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
                  <dd>{content.contactPhone}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="border-t border-[var(--color-champagne)]/50 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Rehearsals</h2>
            <p className="mt-2">{content.rehearsalInfo}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
