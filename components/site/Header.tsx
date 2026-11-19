"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/site/BrandMark";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/schedule", label: "Schedule" },
  { href: "/events", label: "Events" },
  { href: "/events/past", label: "Past Events" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/events") return pathname === "/events" || /^\/events\/(?!past)/.test(pathname);
  return pathname.startsWith(href);
}

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

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled || open ? "bg-[var(--color-pearl)]/95 backdrop-blur-md" : "bg-[var(--color-pearl)]",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <BrandMark choirName={choirName} compact />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium tracking-wide transition",
                isActive(pathname, item.href)
                  ? "bg-[var(--color-navy)] text-white"
                  : "text-[var(--color-ink)]/70 hover:bg-black/5 hover:text-[var(--color-navy)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary ml-2">
            Book the Choir
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy)] text-[var(--color-champagne-soft)] lg:hidden"
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
        <nav className="border-t border-[var(--color-navy)]/10 px-4 py-4 lg:hidden">
          <Link
            href="/"
            className={cn(
              "block rounded-xl px-3 py-3 text-base font-medium",
              pathname === "/" ? "bg-[var(--color-navy)] text-white" : "text-[var(--color-ink)]",
            )}
          >
            Home
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mt-1 block rounded-xl px-3 py-3 text-base font-medium",
                isActive(pathname, item.href)
                  ? "bg-[var(--color-navy)] text-white"
                  : "text-[var(--color-ink)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary mt-3 w-full">
            Book the Choir
          </Link>
        </nav>
      )}
    </header>
  );
}
