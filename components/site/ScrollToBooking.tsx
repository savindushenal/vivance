"use client";

import { useEffect } from "react";

function scrollToBooking() {
  const el = document.getElementById("book");
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/**
 * Scrolls to #book when:
 * - URL has ?type=… (occasion deep-link)
 * - URL hash is #book or #booking
 */
export function ScrollToBooking({ type }: { type?: string }) {
  useEffect(() => {
    function shouldScroll() {
      if (type) return true;
      const hash = window.location.hash;
      return hash === "#book" || hash === "#booking";
    }

    function run() {
      if (!shouldScroll()) return;
      if (window.location.hash !== "#book") {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}#book`,
        );
      }
      scrollToBooking();
    }

    const timers = [0, 100, 350, 700].map((ms) => window.setTimeout(run, ms));
    window.addEventListener("hashchange", run);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", run);
    };
  }, [type]);

  return null;
}
