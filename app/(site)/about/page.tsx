import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const content = await getSiteContent();
  const paragraphs = content.aboutText.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <PageHeader title={content.aboutTitle} subtitle={content.tagline} />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="space-y-5 text-lg leading-relaxed text-[var(--color-ink)]/75 lg:col-span-2">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
        <aside className="space-y-8">
          <div className="border-t border-[var(--color-champagne)]/50 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Rehearsals</h2>
            <p className="mt-2 text-[var(--color-ink)]/70">{content.rehearsalInfo}</p>
            <Link href="/schedule" className="link-champagne mt-3 inline-block text-sm font-semibold">
              View schedule →
            </Link>
          </div>
          <div className="border-t border-[var(--color-navy)]/10 pt-5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-navy)]">Want to sing with us?</h2>
            <p className="mt-2 text-[var(--color-ink)]/70">
              We welcome new members of all voice parts. Send us a message and we will arrange an informal audition.
            </p>
            <Link href="/contact" className="link-champagne mt-3 inline-block text-sm font-semibold">
              Get in touch →
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
