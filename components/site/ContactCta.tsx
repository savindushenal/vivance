import Image from "next/image";
import Link from "next/link";
import { phoneList, telHref } from "@/lib/phones";
import { SITE_IMAGES } from "@/lib/site-images";

const WHATSAPP_HREF = "https://wa.me/94702433654";

export function ContactCta({
  contactAddress,
  contactPhone,
  contactEmail,
}: {
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
}) {
  const phones = phoneList(contactPhone ?? "");

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden scroll-mt-28 text-white"
    >
      <div className="relative px-4 py-28 text-center sm:px-6 sm:py-36">
        <Image
          src={SITE_IMAGES.livePresence}
          alt=""
          fill
          quality={75}
          sizes="100vw"
          className="object-cover object-center brightness-[0.35] saturate-[0.7]"
        />
        <div className="absolute inset-0 bg-[var(--color-navy-deep)]/55" aria-hidden />

        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-[2.35rem] font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
            Got a question?
            <br />
            Contact us now
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp us
            </a>
            <Link href="/booking" className="btn-ghost">
              Book now
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[var(--color-navy)] px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 text-center sm:grid-cols-3 sm:gap-6 sm:text-left">
          {contactAddress && (
            <div>
              <p className="section-label text-[var(--color-gold-soft)]">Address</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/75">
                {contactAddress}
              </p>
            </div>
          )}
          {phones.length > 0 && (
            <div>
              <p className="section-label text-[var(--color-gold-soft)]">Call or WhatsApp</p>
              <div className="mt-3 space-y-1.5">
                {phones.map((phone) => (
                  <p key={phone}>
                    <a
                      href={telHref(phone)}
                      className="text-base font-semibold text-white underline-offset-4 hover:underline"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-gold-soft)] underline-offset-4 hover:underline"
              >
                Open WhatsApp
              </a>
            </div>
          )}
          {contactEmail && (
            <div>
              <p className="section-label text-[var(--color-gold-soft)]">Email</p>
              <p className="mt-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sm text-white/75 underline-offset-4 hover:underline"
                >
                  {contactEmail}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
