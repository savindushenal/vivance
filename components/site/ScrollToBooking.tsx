"use client";

import { useEffect } from "react";

function scrollToBooking() {
  const el = document.getElementById("booking");
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/**
 * Scrolls to #booking when:
 * - URL has ?type=… (occasion deep-link)
 * - URL hash is #booking
 */
export function ScrollToBooking({ type }: { type?: string }) {
  useEffect(() => {
    function shouldScroll() {
      if (type) return true;
      return window.location.hash === "#booking";
    }

    function run() {
      if (!shouldScroll()) return;
      if (window.location.hash !== "#booking") {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}#booking`,
        );
      }
      scrollToBooking();
    }

    // Layout / images can shift the target — retry a few times.
    const timers = [0, 100, 350, 700].map((ms) => window.setTimeout(run, ms));
    window.addEventListener("hashchange", run);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", run);
    };
  }, [type]);

  return null;
}
