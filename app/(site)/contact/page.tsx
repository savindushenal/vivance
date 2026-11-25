import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { phoneList, telHref } from "@/lib/phones";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const content = await getSiteContent();
  const phones = phoneList(content.contactPhone);

  return (
    <>
      <section className="bg-[var(--color-navy)] px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="section-label text-[var(--color-gold-soft)]">Contact</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            We are happy to help
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Reach us by phone, WhatsApp or email. For a booking request, the form is the fastest
            path.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-pearl)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="border border-[var(--color-navy)]/10 bg-white px-6 py-8 sm:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              Details
            </h2>
            {content.contactAddress && (
              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-[var(--color-ink)]/70">
                {content.contactAddress}
              </p>
            )}
            {phones.length > 0 && (
              <div className="mt-6 space-y-2">
                {phones.map((phone) => (
                  <p key={phone}>
                    <a
                      href={telHref(phone)}
                      className="text-lg font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
            )}
            {content.contactEmail && (
              <p className="mt-4">
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="text-base text-[var(--color-ink)]/70 underline-offset-4 hover:underline"
                >
                  {content.contactEmail}
                </a>
              </p>
            )}
          </div>

          <div className="bg-[var(--color-navy)] px-6 py-8 text-white sm:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Ready to book?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Share your function, date and venue. We confirm availability before anything is final.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/booking" className="btn-primary">
                Book the choir
              </Link>
              <a
                href="https://wa.me/94702433654"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
