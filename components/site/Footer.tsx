import { BrandWordmark } from "@/components/site/BrandMark";
import { SmoothHashLink } from "@/components/site/SmoothHashLink";
import type { SiteContent } from "@/lib/content-fields";

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-[var(--color-navy)] text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandWordmark light className="text-3xl" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            A choir for hire — clear voices for weddings, celebrations, sacred services and private
            events.
          </p>
        </div>

        <div>
          <p className="section-label text-[var(--color-gold-soft)]">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <SmoothHashLink href="/#about" className="hover:text-white">
                Our choir
              </SmoothHashLink>
            </li>
            <li>
              <SmoothHashLink href="/#occasions" className="hover:text-white">
                Occasions
              </SmoothHashLink>
            </li>
            <li>
              <SmoothHashLink href="/#book" className="hover:text-white">
                Book us
              </SmoothHashLink>
            </li>
            <li>
              <SmoothHashLink href="/#contact" className="hover:text-white">
                Contact
              </SmoothHashLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="section-label text-[var(--color-gold-soft)]">Contact</p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p className="whitespace-pre-line">{content.contactAddress}</p>
            {content.contactPhone && <p>{content.contactPhone}</p>}
            {content.contactEmail && (
              <p>
                <a href={`mailto:${content.contactEmail}`} className="hover:text-white">
                  {content.contactEmail}
                </a>
              </p>
            )}
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/35 sm:px-6">
        © {new Date().getFullYear()} {content.choirName}. All rights reserved.
      </div>
    </footer>
  );
}
