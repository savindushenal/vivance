import Image from "next/image";
import { BookingForm } from "@/components/forms/BookingForm";
import { ScrollToBooking } from "@/components/site/ScrollToBooking";
import { SmoothHashLink } from "@/components/site/SmoothHashLink";
import { getSiteContent } from "@/lib/content";
import { toDateInput } from "@/lib/dates";
import { getUnavailableBookingDates } from "@/lib/queries";
import { SITE_IMAGES } from "@/lib/site-images";

const OCCASIONS = [
  {
    title: "Weddings",
    copy: "Ceremony, signing and reception moments with live harmony.",
    image: SITE_IMAGES.group,
    href: "/?type=WEDDING#book",
  },
  {
    title: "Celebrations",
    copy: "Anniversaries, private parties and gatherings that need a living tempo.",
    image: SITE_IMAGES.candid,
    href: "/?type=OTHER#book",
  },
  {
    title: "Sacred & corporate",
    copy: "Services, memorials, galas and formal programmes.",
    image: SITE_IMAGES.performance,
    href: "/?type=CHURCH_SERVICE#book",
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

  return (
    <>
      <ScrollToBooking type={type} />

      {/* Hero — brand first, one idea */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[var(--color-navy-deep)] text-white">
        <Image
          src={SITE_IMAGES.hero}
          alt={`${content.choirName} choir`}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="hero-photo object-cover object-[center_28%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)] via-[var(--color-navy-deep)]/55 to-[var(--color-navy-deep)]/25"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="animate-rise font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[0.06em] text-white sm:text-6xl md:text-7xl">
            VIV<span className="text-[var(--color-gold-soft)]">À</span>CE
          </p>
          <span className="accent-line mt-5" />
          <h1 className="animate-rise-1 mt-6 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
            A choir for your occasion
          </h1>
          <p className="animate-rise-2 mt-4 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            We sing for weddings, celebrations and sacred services — live voices, ready to book.
          </p>
          <div className="animate-rise-3 mt-8 flex flex-wrap gap-3">
            <SmoothHashLink href="#book" className="btn-primary">
              Book the choir
            </SmoothHashLink>
            <SmoothHashLink href="#about" className="btn-ghost">
              Our story
            </SmoothHashLink>
          </div>
        </div>
      </section>

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
            Three clear occasions. One choir.
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

      {/* Book + contact */}
      <section
        id="book"
        className="scroll-mt-28 bg-[var(--color-pearl)] px-4 py-20 sm:px-6 sm:py-28"
      >
        <div id="contact" className="mx-auto max-w-6xl scroll-mt-28">
          <p className="section-label">Book the choir</p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
            Tell us about your day
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-ink)]/65 sm:text-lg">
            Occasion, date and a few details. A request does not lock the date until we confirm.
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
                    occasion and date
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--color-gold-soft)]">2.</span> Share venue
                    and details
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--color-gold-soft)]">3.</span> We reply in
                    1–2 business days
                  </li>
                </ol>
              </div>

              <div className="border border-[var(--color-navy)]/10 bg-white px-6 py-7">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
                  Contact
                </h3>
                {content.contactAddress && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--color-ink)]/70">
                    {content.contactAddress}
                  </p>
                )}
                {content.contactPhone && (
                  <p className="mt-4">
                    <a
                      href={`tel:${content.contactPhone.replace(/\s+/g, "")}`}
                      className="text-base font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                    >
                      {content.contactPhone}
                    </a>
                  </p>
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
