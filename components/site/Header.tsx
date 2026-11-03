"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/site/BrandMark";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/schedule", label: "Schedule" },
  { href: "/events", label: "Events" },
  { href: "/events/past", label: "Past Events" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/events") return pathname === "/events" || /^\/events\/(?!past)/.test(pathname);
  return pathname.startsWith(href);
}

export function Header({ choirName }: { choirName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[var(--color-navy)]/10 bg-[var(--color-pearl)]/92 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <BrandMark choirName={choirName} compact light={transparent} />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium tracking-wide transition",
                transparent
                  ? isActive(pathname, item.href)
                    ? "text-[var(--color-champagne-soft)]"
                    : "text-white/70 hover:text-white"
                  : isActive(pathname, item.href)
                    ? "text-[var(--color-champagne-deep)]"
                    : "text-[var(--color-ink)]/65 hover:text-[var(--color-navy)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className={cn(
              "ml-3 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition",
              transparent
                ? "bg-white text-[var(--color-navy)] hover:bg-[var(--color-champagne-soft)]"
                : "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-soft)]",
            )}
          >
            Book the Choir
          </Link>
        </nav>

        <button
          type="button"
          className={cn("rounded-sm p-2 lg:hidden", transparent ? "text-white" : "text-[var(--color-ink)]")}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-navy)]/10 bg-[var(--color-pearl)] px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-3 py-2.5 text-base font-medium",
                isActive(pathname, item.href)
                  ? "text-[var(--color-champagne-deep)]"
                  : "text-[var(--color-ink)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="mt-2 block bg-[var(--color-navy)] px-3 py-2.5 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white"
          >
            Book the Choir
          </Link>
        </nav>
      )}
    </header>
  );
}
