"use client";

import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/site-images";

/** Repeat enough copies so the strip always fills wide viewports; loop half the set. */
const COPIES = 4;
const TAPE = Array.from({ length: COPIES }, () => GALLERY_IMAGES).flat();

export function GalleryCarousel() {
  return (
    <section
      id="gallery"
      className="film-tape scroll-mt-0"
      aria-label="Choir photo tape"
    >
      <div className="film-tape-edge" aria-hidden />

      <div className="film-tape-window">
        <div className="film-tape-track">
          {TAPE.map((img, i) => (
            <figure key={`${img.src}-${i}`} className="film-tape-frame">
              <Image
                src={img.src}
                alt={i < GALLERY_IMAGES.length ? img.alt : ""}
                fill
                sizes="140px"
                className="object-cover"
                quality={85}
                draggable={false}
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="film-tape-edge" aria-hidden />
    </section>
  );
}
