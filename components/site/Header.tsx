"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/site/BrandMark";
import { SmoothHashLink } from "@/components/site/SmoothHashLink";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#about", label: "Our choir" },
  { href: "/#occasions", label: "Occasions" },
  { href: "/#contact", label: "Contact" },
];

export function Header({ choirName }: { choirName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onDark = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        onDark ? "bg-transparent" : "bg-[var(--color-pearl)]/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <BrandMark choirName={choirName} compact light={onDark} />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <SmoothHashLink
              key={item.href}
              href={item.href}
              className={cn(
                "px-3.5 py-2 text-sm font-medium tracking-wide transition",
                onDark
                  ? "text-white/80 hover:text-white"
                  : "text-[var(--color-ink)]/70 hover:text-[var(--color-navy)]",
              )}
            >
              {item.label}
            </SmoothHashLink>
          ))}
          <SmoothHashLink href="/#book" className="btn-primary ml-3">
            Book us
          </SmoothHashLink>
        </nav>

        <button
          type="button"
          className={cn(
            "flex h-11 w-11 items-center justify-center md:hidden",
            onDark
              ? "bg-white/15 text-white"
              : "bg-[var(--color-navy)] text-[var(--color-gold-soft)]",
          )}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 9h14M5 15h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-navy)]/10 bg-[var(--color-pearl)] px-4 py-4 md:hidden">
          {NAV.map((item) => (
            <SmoothHashLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="mt-1 block px-3 py-3 text-base font-medium text-[var(--color-ink)]"
            >
              {item.label}
            </SmoothHashLink>
          ))}
          <SmoothHashLink
            href="/#book"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            Book us
          </SmoothHashLink>
        </nav>
      )}
    </header>
  );
}
