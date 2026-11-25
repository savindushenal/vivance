"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { GALLERY_IMAGES } from "@/lib/site-images";
import { cn } from "@/lib/utils";

/** Repeat enough copies so the strip always fills wide viewports; loop half the set. */
const COPIES = 4;
const TAPE = Array.from({ length: COPIES }, () => GALLERY_IMAGES).flat();

export function GalleryCarousel() {
  const titleId = useId();
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;
  const photo = active !== null ? GALLERY_IMAGES[active] : null;

  const close = useCallback(() => setActive(null), []);

  const show = useCallback((tapeIndex: number) => {
    setActive(tapeIndex % GALLERY_IMAGES.length);
  }, []);

  const step = useCallback((dir: -1 | 1) => {
    setActive((current) => {
      if (current === null) return current;
      const next = (current + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <section
        id="gallery"
        className={cn("film-tape scroll-mt-0", open && "film-tape-paused")}
        aria-label="Choir photo tape"
      >
        <div className="film-tape-edge" aria-hidden />

        <div className="film-tape-window">
          <div className="film-tape-track">
            {TAPE.map((img, i) => (
                <button
                  key={`${img.src}-${i}`}
                  type="button"
                  className="film-tape-frame"
                  aria-label={`View ${img.label}`}
                  onClick={() => show(i)}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 320px, 140px"
                    className="object-cover"
                    quality={85}
                    draggable={false}
                  />
                </button>
            ))}
          </div>
        </div>

        <div className="film-tape-edge" aria-hidden />
      </section>

      {open && photo && (
        <div
          className="camera-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <div
            className="camera-body"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="camera-chrome">
              <span className="camera-brand">VIVÀCE</span>
              <span className="camera-rec" aria-hidden>
                <span className="camera-rec-dot" />
                VIEW
              </span>
              <button type="button" className="camera-close" onClick={close} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="camera-screen">
              <div className="camera-viewfinder" aria-hidden>
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="camera-photo">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 900px"
                  className="object-contain"
                  quality={92}
                  priority
                />
              </div>

              <p id={titleId} className="camera-caption">
                {photo.label}
              </p>
            </div>

            <div className="camera-controls">
              <button type="button" className="camera-nav" onClick={() => step(-1)} aria-label="Previous photo">
                ‹
              </button>
              <button type="button" className="camera-shutter" onClick={close} aria-label="Close viewer">
                <span />
              </button>
              <button type="button" className="camera-nav" onClick={() => step(1)} aria-label="Next photo">
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
