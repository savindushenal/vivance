import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Our choir",
};

export default async function AboutPage() {
  const content = await getSiteContent();
  const aboutParagraphs = content.aboutText.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <section className="bg-[var(--color-navy)] px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="section-label text-[var(--color-gold-soft)]">Our choir</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {content.aboutTitle || "Who we are"}
          </h1>
        </div>
      </section>

      <section className="bg-[var(--color-pearl)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[5/4]">
            <Image
              src={SITE_IMAGES.about}
              alt={`${content.choirName} ensemble`}
              fill
              priority
              quality={88}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_35%]"
            />
          </div>
          <div>
            <div className="space-y-4 text-base leading-relaxed text-[var(--color-ink)]/70 sm:text-lg">
              {aboutParagraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
            <Link href="/booking" className="btn-outline mt-10">
              Book us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
