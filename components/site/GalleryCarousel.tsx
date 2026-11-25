"use client";

import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/site-images";

/** Duplicate once so the CSS marquee loop is seamless. */
const TAPE = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export function GalleryCarousel() {
  return (
    <section
      id="gallery"
      className="film-tape scroll-mt-0"
      aria-label="Choir photo tape"
    >
      <div className="film-tape-edge" aria-hidden>
        <Sprockets />
      </div>

      <div className="film-tape-window">
        <div className="film-tape-track">
          {TAPE.map((img, i) => (
            <figure key={`${img.src}-${i}`} className="film-tape-frame">
              <Image
                src={img.src}
                alt={i < GALLERY_IMAGES.length ? img.alt : ""}
                fill
                sizes="280px"
                className="object-cover"
                quality={85}
                draggable={false}
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="film-tape-edge" aria-hidden>
        <Sprockets />
      </div>
    </section>
  );
}

function Sprockets() {
  return (
    <div className="film-sprockets">
      {Array.from({ length: 48 }, (_, i) => (
        <span key={i} className="film-sprocket" />
      ))}
    </div>
  );
}
