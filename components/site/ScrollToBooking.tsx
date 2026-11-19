"use client";

import { useEffect } from "react";

/** When `?type=` is present, scroll the booking section into view. */
export function ScrollToBooking({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const el = document.getElementById("booking");
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [enabled]);

  return null;
}
