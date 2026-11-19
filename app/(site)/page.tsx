import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { formatDate, formatTimeRange } from "@/lib/dates";
import { getUpcomingSchedule } from "@/lib/queries";
import { SCHEDULE_TYPE_LABELS, labelFor } from "@/lib/constants";
import { GALLERY_IMAGES, SITE_IMAGES } from "@/lib/site-images";

export default async function HomePage() {
  const [content, schedule] = await Promise.all([getSiteContent(), getUpcomingSchedule()]);
  const nextUp = schedule.filter((item) => item.type !== "REHEARSAL").slice(0, 3);

  return (
    <>
      <section className="px-4 pb-6 pt-2 sm:px-6">
        <div className="hero-panel mx-auto max-w-6xl">
          <Image
            src={SITE_IMAGES.hero}
            alt={`${content.choirName} choir`}
            fill
            priority
            quality={92}
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="hero-photo"
          />
          <div className="hero-veil absolute inset-0" aria-hidden />

          <div className="relative flex min-h-[min(78vh,44rem)] flex-col justify-end px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14">
            <div className="max-w-2xl">
              <p className="badge-pill animate-fade-up text-white/90">
                <span className="badge-dot" />
                {content.tagline || "The Living Tempo"}
              </p>

              <h1 className="animate-fade-up-delay-1 mt-4 max-w-3xl font-serif text-3xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                <span className="text-[var(--color-champagne)]">Find your harmony.</span>{" "}
                <span className="text-white">Hire the choir.</span>
              </h1>

              <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                {content.heroSubtitle}
              </p>

              <div className="animate-fade-up-delay-3 mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
                <Link href="/booking" className="btn-primary">
                  Book the Choir
                </Link>
                <Link href="#booking-journey" className="btn-ghost">
                  How booking works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-4 sm:grid-cols-3 sm:px-6">
        <div className="stat-dark">
          <p className="font-serif text-5xl font-extrabold tracking-tight text-[var(--color-champagne)]">03</p>
          <p className="mt-3 text-sm font-semibold text-white">Occasions we sing for</p>
          <p className="mt-1 text-sm text-white/55">Weddings, private celebrations, sacred & corporate</p>
        </div>
        <div className="stat-dark">
          <p className="font-serif text-5xl font-extrabold tracking-tight text-[var(--color-champagne)]">Live</p>
          <p className="mt-3 text-sm font-semibold text-white">Ensemble presence</p>
          <p className="mt-1 text-sm text-white/55">Polished voices shaped for the room you are in</p>
        </div>
        <div className="stat-light">
          <p className="font-serif text-4xl font-extrabold uppercase tracking-tight text-[var(--color-navy)]">
            For hire
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-navy)]">Bookings open</p>
          <p className="mt-1 text-sm text-[var(--color-ink)]/55">
            Tell us the date, venue, and moments that need music
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="section-rule">Explore the sound</p>
        <h2 className="mt-5 max-w-3xl font-serif text-3xl font-extrabold uppercase tracking-tight text-[var(--color-navy)] sm:text-4xl md:text-5xl">
          One choir. A living tempo for every occasion.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink)]/65 sm:text-lg">
          {content.homeIntro}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              num: "01",
              title: "Weddings",
              copy: "Processionals, hymns, and ceremony moments shaped with warmth and polish.",
              image: SITE_IMAGES.group,
              href: "/booking?type=WEDDING",
            },
            {
              num: "02",
              title: "Private celebrations",
              copy: "Receptions, anniversaries, and gatherings where live harmony sets the tone.",
              image: SITE_IMAGES.candid,
              href: "/booking?type=OTHER",
            },
            {
              num: "03",
              title: "Sacred & corporate",
              copy: "Services, galas, and formal occasions that call for refined choral sound.",
              image: SITE_IMAGES.performance,
              href: "/booking?type=CHURCH_SERVICE",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="occasion-card group !p-0 overflow-hidden transition hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--color-champagne-deep)]">
                  {item.num}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-extrabold tracking-tight text-[var(--color-navy)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/60">{item.copy}</p>
                <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-navy)]/55">
                  Start this request →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/booking" className="btn-primary">
            Request a booking
          </Link>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6">
        <div className="panel mx-auto grid max-w-6xl overflow-hidden bg-[var(--color-navy)] text-white lg:grid-cols-2">
          <div className="relative min-h-[18rem] lg:min-h-full">
            <Image
              src={SITE_IMAGES.about}
              alt={`${content.choirName} ensemble`}
              fill
              quality={88}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14">
            <p className="badge-pill text-white/85">
              <span className="badge-dot" />
              About {content.choirName}
            </p>
            <h2 className="mt-5 font-serif text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              A place where every note moves the room
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              Formal black, shared pins, and a living tempo built for ceremonies and celebrations —
              polished, warm, and ready for hire.
            </p>
            <div className="mt-8">
              <Link href="/about" className="btn-primary">
                Get to know Vivàce
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="section-rule">Inside Vivàce</p>
        <h2 className="mt-5 max-w-3xl font-serif text-3xl font-extrabold uppercase tracking-tight text-[var(--color-navy)] sm:text-4xl">
          A little look inside our music community
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink)]/65">
          From focused practice to shared performances, explore the moments that make Vivàce special.
        </p>
        <div className="mt-10 grid auto-rows-[12rem] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[14rem]">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`group relative overflow-hidden rounded-[1.5rem] ${
                i === 0 || i === 3 ? "sm:row-span-2 sm:min-h-[28rem]" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/90">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="booking-journey" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
        <p className="section-rule">Your booking journey</p>
        <h2 className="mt-5 max-w-3xl font-serif text-3xl font-extrabold uppercase tracking-tight text-[var(--color-navy)] sm:text-4xl">
          Three steps from interest to a confirmed choir
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink)]/65">
          Start with the occasion. We qualify the date and details, then confirm repertoire and ensemble
          size before anything is locked.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick occasion & date",
              copy: "Weddings, services, corporate, or another celebration — choose what fits and an open date.",
            },
            {
              step: "02",
              title: "Share the brief",
              copy: "Venue, timing, guest count, and the moments you want sung. Better briefs mean better replies.",
            },
            {
              step: "03",
              title: "We confirm & prepare",
              copy: "We reply in 1–2 business days, lock availability, shape repertoire, and arrive ready.",
            },
          ].map((item) => (
            <div key={item.step} className="stat-light">
              <p className="font-serif text-4xl font-extrabold text-[var(--color-champagne-deep)]">
                {item.step}
              </p>
              <h3 className="mt-4 font-serif text-xl font-bold tracking-tight text-[var(--color-navy)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/60">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/booking" className="btn-primary">
            Start your booking request
          </Link>
        </div>
      </section>

      {nextUp.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-rule">Schedule</p>
              <h2 className="mt-5 font-serif text-3xl font-extrabold uppercase tracking-tight text-[var(--color-navy)] sm:text-4xl">
                Coming up
              </h2>
            </div>
            <Link href="/schedule" className="link-champagne text-sm">
              Full schedule →
            </Link>
          </div>
          <ul className="mt-8 overflow-hidden rounded-[1.5rem] border border-[var(--color-navy)]/10 bg-white/60">
            {nextUp.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-navy)]/8 px-5 py-5 last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-[var(--color-navy)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--color-ink)]/55">
                    {formatDate(item.date)}
                    {item.startTime && ` · ${formatTimeRange(item.startTime, item.endTime)}`}
                    {item.location && ` · ${item.location}`}
                  </p>
                </div>
                <span className="rounded-full bg-[var(--color-navy)]/5 px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-[var(--color-navy)]/70">
                  {labelFor(SCHEDULE_TYPE_LABELS, item.type)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="px-4 py-10 sm:px-6 sm:py-16">
        <div className="panel mx-auto max-w-6xl bg-[var(--color-navy)] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <p className="badge-pill mx-auto text-white/85">
            <span className="badge-dot" />
            Bookings
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Your first note starts here
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Tell us about your wedding, service, or celebration — we&apos;ll help shape the music and
            the ensemble for the day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="btn-primary">
              Book the Choir
            </Link>
            <Link href="/contact" className="btn-ghost">
              Send an inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
