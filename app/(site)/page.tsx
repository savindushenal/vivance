import Image from "next/image";
import { BookingForm } from "@/components/forms/BookingForm";
import { GalleryCarousel } from "@/components/site/GalleryCarousel";
import { ScrollToBooking } from "@/components/site/ScrollToBooking";
import { SmoothHashLink } from "@/components/site/SmoothHashLink";
import { getSiteContent } from "@/lib/content";
import { toDateInput } from "@/lib/dates";
import { getUnavailableBookingDates } from "@/lib/queries";
import { phoneList, telHref } from "@/lib/phones";
import { SITE_IMAGES } from "@/lib/site-images";

const OCCASIONS = [
  {
    title: "Wedding Holy Mass",
    copy: "Sacred music for the ceremony, from processional to recessional.",
    image: SITE_IMAGES.wedding,
    href: "/?type=WEDDING_HOLY_MASS#book",
  },
  {
    title: "Wedding Reception",
    copy: "Live voices for dinner, toasts and celebration moments.",
    image: SITE_IMAGES.candid,
    href: "/?type=WEDDING_RECEPTION#book",
  },
  {
    title: "Corporate & awards",
    copy: "Polished performances for nights that need presence.",
    image: SITE_IMAGES.performance,
    href: "/?type=CORPORATE_AWARDS#book",
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const [{ type }, content, unavailableDates] = await Promise.all([
    searchParams,
    getSiteContent(),
    getUnavailableBookingDates(),
  ]);

  const aboutParagraphs = content.aboutText.split(/\n\s*\n/).filter(Boolean);
  const phones = phoneList(content.contactPhone);

  return (
    <>
      <ScrollToBooking type={type} />

      {/* Hero — brand first, full-bleed, responsive */}
      <section className="hero-stage relative isolate min-h-[100svh] overflow-hidden text-white">
        <div className="hero-atmosphere" aria-hidden />

        {/* Mobile hero image (portrait crop, faces lower) */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={SITE_IMAGES.heroMobile}
            alt={`${content.choirName} choir`}
            fill
            priority
            quality={88}
            sizes="100vw"
            className="hero-photo object-cover object-center"
          />
          <div className="hero-veil-mobile absolute inset-0" aria-hidden />
        </div>

        {/* Desktop hero image (ensemble to the right, room for copy left) */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={SITE_IMAGES.hero}
            alt={`${content.choirName} choir`}
            fill
            priority
            quality={92}
            sizes="(min-width: 768px) 100vw, 1px"
            className="hero-photo object-cover object-[80%_center]"
          />
          <div className="hero-veil-desktop absolute inset-0" aria-hidden />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col px-4 pb-10 pt-24 sm:px-6 sm:pb-14 md:justify-center md:pb-20 md:pt-28">
          <div className="mt-2 max-w-xl md:mt-0">
            <p className="animate-rise font-[family-name:var(--font-display)] text-[2.75rem] font-semibold leading-none tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
              VIV<span className="text-[var(--color-gold-soft)]">À</span>CE
            </p>
            <span className="accent-line mt-4 sm:mt-5" />
            <h1 className="animate-rise-1 mt-5 font-[family-name:var(--font-display)] text-[1.65rem] font-medium leading-[1.15] text-white sm:mt-6 sm:text-4xl md:text-5xl">
              {content.heroTitle || "A choir for your occasion"}
            </h1>
            <p className="animate-rise-2 mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/80 sm:mt-4 sm:text-base md:text-lg">
              {content.heroSubtitle}
            </p>
            <div className="animate-rise-3 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <SmoothHashLink href="#book" className="btn-primary w-full sm:w-auto">
                Book the choir
              </SmoothHashLink>
              <SmoothHashLink href="#about" className="btn-ghost w-full sm:w-auto">
                Our story
              </SmoothHashLink>
            </div>
          </div>

          {/* Spacer so copy stays above the group on phones */}
          <div className="min-h-[42svh] flex-1 md:hidden" aria-hidden />
        </div>
      </section>

      {/* Flush retro film tape — no gap under hero */}
      <GalleryCarousel />

      {/* Our choir — one story, like a simple restaurant intro */}
      <section id="about" className="scroll-mt-24 bg-[var(--color-pearl)] px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[5/4]">
            <Image
              src={SITE_IMAGES.about}
              alt={`${content.choirName} ensemble`}
              fill
              quality={88}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_35%]"
            />
          </div>
          <div>
            <p className="section-label">Our choir</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
              {content.aboutTitle || "Who we are"}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-ink)]/70 sm:text-lg">
              {aboutParagraphs.slice(0, 2).map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
            <SmoothHashLink href="#book" className="btn-outline mt-8">
              Book us
            </SmoothHashLink>
          </div>
        </div>
      </section>

      {/* Occasions — clear “menu” of what we offer */}
      <section id="occasions" className="scroll-mt-24 bg-[var(--color-sand)] px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="section-label">What we sing for</p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
            Clear functions. One choir.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-ink)]/65 sm:text-lg">
            Pick the moment that fits. Tell us the date. We handle the rest.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {OCCASIONS.map((item) => (
              <SmoothHashLink key={item.title} href={item.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/80">{item.copy}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-deep)]">
                  Start booking →
                </p>
              </SmoothHashLink>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section
        id="book"
        className="scroll-mt-28 bg-[var(--color-pearl)] px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Book the choir</p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
            Tell us about your day
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-ink)]/65 sm:text-lg">
            Pick the function, date, time and venue. A request does not lock the date until we
            confirm.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
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
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  How booking works
                </h3>
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
                    <span className="font-semibold text-[var(--color-gold-soft)]">3.</span> We reply in
                    1 to 2 business days
                  </li>
                </ol>
              </div>

              <div
                id="contact"
                className="scroll-mt-28 border border-[var(--color-navy)]/10 bg-white px-6 py-7"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
                  Contact
                </h3>
                {content.contactAddress && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--color-ink)]/70">
                    {content.contactAddress}
                  </p>
                )}
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
                {content.contactEmail && (
                  <p className="mt-2">
                    <a
                      href={`mailto:${content.contactEmail}`}
                      className="text-sm text-[var(--color-ink)]/70 underline-offset-4 hover:underline"
                    >
                      {content.contactEmail}
                    </a>
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
