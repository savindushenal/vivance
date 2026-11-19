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
    <footer className="px-4 pb-6 sm:px-6">
      <div className="panel mx-auto max-w-6xl bg-[var(--color-navy)] text-white/70">
        <div className="grid gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandWordmark light className="text-2xl" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Voices for hire — weddings, celebrations, sacred services, and occasions that deserve a
              living tempo.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-4 text-sm">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-champagne)] transition hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--color-champagne)]">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#occasions" className="hover:text-white">
                  Occasions
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#booking" className="hover:text-white">
                  Book the choir
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--color-champagne)]">
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
            <Link href="/#booking" className="btn-primary mt-6 inline-flex">
              Book the Choir
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40 sm:px-10">
          © {new Date().getFullYear()} {content.choirName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
