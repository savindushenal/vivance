"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY_IMAGES } from "@/lib/site-images";
import { cn } from "@/lib/utils";

const AUTO_MS = 4500;

export function GalleryCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = GALLERY_IMAGES.length;

  const goTo = useCallback((next: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = ((next % count) + count) % count;
    const slide = el.children[i] as HTMLElement | undefined;
    if (!slide) return;
    indexRef.current = i;
    setIndex(i);
    el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, [count]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const children = Array.from(el.children) as HTMLElement[];
        if (!children.length) return;
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        children.forEach((child, i) => {
          const center = child.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(center - mid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        if (best !== indexRef.current) {
          indexRef.current = best;
          setIndex(best);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => goTo(indexRef.current + 1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, goTo]);

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-[var(--color-navy)] py-12 text-white sm:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label text-[var(--color-gold-soft)]">Inside Vivàce</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Moments from the choir
            </h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous photo"
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition hover:border-white/60 hover:bg-white/10"
              onClick={() => goTo(index - 1)}
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition hover:border-white/60 hover:bg-white/10"
              onClick={() => goTo(index + 1)}
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-none sm:gap-4 sm:px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        style={{ scrollbarWidth: "none" }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Choir photo gallery"
      >
        {GALLERY_IMAGES.map((img, i) => (
          <figure
            key={img.src}
            className="relative aspect-[4/3] w-[85%] max-w-xl shrink-0 snap-center overflow-hidden sm:w-[70%] md:w-[48%] lg:w-[36%]"
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 36vw"
              className="object-cover"
              quality={85}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                {img.label}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex gap-2" role="tablist" aria-label="Gallery slides">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${img.label}`}
              className={cn(
                "h-1.5 transition-all",
                i === index ? "w-8 bg-[var(--color-gold)]" : "w-1.5 bg-white/35 hover:bg-white/60",
              )}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            aria-label="Previous photo"
            className="flex h-10 w-10 items-center justify-center border border-white/25"
            onClick={() => goTo(index - 1)}
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="flex h-10 w-10 items-center justify-center border border-white/25"
            onClick={() => goTo(index + 1)}
          >
            <Arrow dir="right" />
          </button>
        </div>

        <p className="hidden text-xs uppercase tracking-[0.16em] text-white/45 sm:block">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {dir === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}
