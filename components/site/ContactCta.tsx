import Image from "next/image";
import Link from "next/link";
import { SITE_IMAGES } from "@/lib/site-images";

export function ContactCta() {
  return (
    <section
      id="ask"
      className="relative isolate overflow-hidden px-4 py-28 text-center text-white sm:px-6 sm:py-36"
    >
      <Image
        src={SITE_IMAGES.livePresence}
        alt=""
        fill
        quality={75}
        sizes="100vw"
        className="object-cover object-center brightness-[0.35] saturate-[0.7]"
      />
      <div
        className="absolute inset-0 bg-[var(--color-navy-deep)]/55"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-[family-name:var(--font-display)] text-[2.35rem] font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          Got a question?
          <br />
          Contact us now
        </h2>
        <Link href="/contact" className="btn-primary mt-10">
          Contact us
        </Link>
      </div>
    </section>
  );
}
