import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ContactCta } from "@/components/site/ContactCta";
import { GalleryCarousel } from "@/components/site/GalleryCarousel";
import { SocialsSection } from "@/components/site/SocialsSection";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { getSiteContent } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/site-images";

const OCCASIONS = [
  {
    title: "Wedding Holy Mass",
    copy: "Sacred music for the ceremony, from processional to recessional.",
    image: SITE_IMAGES.wedding,
    href: "/booking?type=WEDDING_HOLY_MASS",
  },
  {
    title: "Wedding Reception",
    copy: "Live voices for dinner, toasts and celebration moments.",
    image: SITE_IMAGES.candid,
    href: "/booking?type=WEDDING_RECEPTION",
  },
  {
    title: "Corporate & awards",
    copy: "Polished performances for nights that need presence.",
    image: SITE_IMAGES.performance,
    href: "/booking?type=CORPORATE_AWARDS",
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  if (type) {
    redirect(`/booking?type=${encodeURIComponent(type)}`);
  }

  const content = await getSiteContent();
  const aboutParagraphs = content.aboutText.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      {/* Hero — brand first, full-bleed, responsive */}
      <section className="hero-stage relative isolate min-h-[100svh] overflow-hidden text-white">
        <div className="hero-atmosphere" aria-hidden />

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
              <Link href="/booking" className="btn-primary w-full sm:w-auto">
                Book the choir
              </Link>
              <WhatsAppLink href="/booking" className="w-full sm:w-auto" />
            </div>
          </div>

          <div className="min-h-[42svh] flex-1 md:hidden" aria-hidden />
        </div>
      </section>

      <GalleryCarousel />

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
            <Link href="/booking" className="btn-outline mt-8">
              Book us
            </Link>
          </div>
        </div>
      </section>

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
              <Link key={item.title} href={item.href} className="group block">
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        contactAddress={content.contactAddress}
        contactPhone={content.contactPhone}
        contactEmail={content.contactEmail}
      />

      <SocialsSection
        choirName={content.choirName}
        facebookUrl={content.facebookUrl}
        instagramUrl={content.instagramUrl}
        youtubeUrl={content.youtubeUrl}
      />
    </>
  );
}
