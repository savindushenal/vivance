"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

type Counts = { newInquiries: number; pendingBookings: number };

export function Sidebar({ email, counts }: { email: string; counts: Counts }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/schedule", label: "Schedule" },
    { href: "/admin/inquiries", label: "Inquiries", badge: counts.newInquiries },
    { href: "/admin/bookings", label: "Bookings", badge: counts.pendingBookings },
    { href: "/admin/content", label: "Site content" },
  ];

  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-stone-200 bg-indigo-950 px-4 text-white lg:hidden">
        <span className="font-serif text-lg font-semibold">Choir Admin</span>
        <button type="button" onClick={() => setOpen((v) => !v)} className="rounded p-1" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <aside
        className={cn(
          "w-full flex-col bg-indigo-950 text-indigo-100 lg:fixed lg:inset-y-0 lg:flex lg:w-60",
          open ? "flex" : "hidden",
        )}
      >
        <div className="hidden h-16 items-center px-6 lg:flex">
          <span className="font-serif text-xl font-semibold text-white">Choir Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive(item.href) ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white",
              )}
            >
              {item.label}
              {item.badge ? (
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-indigo-950">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 border-t border-white/10 p-4 text-sm">
          <Link href="/" target="_blank" className="block hover:text-white">
            View website ↗
          </Link>
          <p className="truncate text-xs text-indigo-300">{email}</p>
          <form action={logout}>
            <button type="submit" className="text-amber-400 hover:text-amber-300">
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
