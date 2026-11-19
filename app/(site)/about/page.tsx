import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteContent } from "@/lib/content";
import { GALLERY_IMAGES, SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const content = await getSiteContent();
  const paragraphs = content.aboutText.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <PageHeader title={content.aboutTitle} subtitle={content.tagline} />

      <section className="px-4 py-4 sm:px-6">
        <div className="panel relative mx-auto aspect-[16/10] max-w-6xl overflow-hidden sm:aspect-[2.2/1]">
          <Image
            src={SITE_IMAGES.about}
            alt={`${content.choirName} ensemble`}
            fill
            priority
            quality={90}
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover object-center"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div className="space-y-5 text-lg leading-relaxed text-[var(--color-ink)]/75 lg:col-span-2">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
          <div className="pt-2">
            <Link href="/booking" className="btn-primary">
              Book the Choir
            </Link>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="stat-light">
            <h2 className="font-serif text-xl font-bold text-[var(--color-navy)]">Bookings</h2>
            <p className="mt-2 text-sm text-[var(--color-ink)]/70">
              Available for weddings, private celebrations, sacred services, and corporate gatherings.
            </p>
            <Link href="/booking" className="link-champagne mt-3 inline-block text-sm">
              Request a booking →
            </Link>
          </div>
          <div className="stat-light">
            <h2 className="font-serif text-xl font-bold text-[var(--color-navy)]">Want to sing with us?</h2>
            <p className="mt-2 text-sm text-[var(--color-ink)]/70">
              We welcome new members of all voice parts. Send us a message and we will arrange an informal audition.
            </p>
            <Link href="/contact" className="link-champagne mt-3 inline-block text-sm">
              Get in touch →
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image
              src={SITE_IMAGES.portrait}
              alt={`${content.choirName} member`}
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <p className="section-rule">Inside Vivàce</p>
        <h2 className="mt-5 font-serif text-3xl font-extrabold uppercase tracking-tight text-[var(--color-navy)] sm:text-4xl">
          Moments from the ensemble
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.src} className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/90">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
