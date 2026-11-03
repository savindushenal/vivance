import Link from "next/link";
import { BrandWordmark } from "@/components/site/BrandMark";
import type { SiteContent } from "@/lib/content-fields";

export function Footer({ content }: { content: SiteContent }) {
  const socials = [
    { label: "Facebook", href: content.facebookUrl },
    { label: "Instagram", href: content.instagramUrl },
    { label: "YouTube", href: content.youtubeUrl },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[var(--color-navy)] text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <BrandWordmark light className="text-2xl" />
          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-[var(--color-champagne)]">
            {content.tagline || "The Living Tempo"}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            Voices for hire — weddings, celebrations, and occasions that deserve a living tempo.
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-5 text-sm">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-champagne-soft)] transition hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-champagne)]">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/schedule" className="hover:text-white">
                Schedule
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">
                Upcoming events
              </Link>
            </li>
            <li>
              <Link href="/events/past" className="hover:text-white">
                Past events
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-white">
                Book the choir
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-champagne)]">
            Contact
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p className="whitespace-pre-line">{content.contactAddress}</p>
            {content.contactEmail && (
              <p>
                <a href={`mailto:${content.contactEmail}`} className="hover:text-white">
                  {content.contactEmail}
                </a>
              </p>
            )}
            {content.contactPhone && <p>{content.contactPhone}</p>}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {content.choirName}. All rights reserved.
      </div>
    </footer>
  );
}
