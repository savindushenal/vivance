"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/** Next.js soft nav often ignores same-page hashes — force scroll. */
export function SmoothHashLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const hrefStr = typeof href === "string" ? href : "";
  const hashIndex = hrefStr.indexOf("#");
  const id = hashIndex >= 0 ? hrefStr.slice(hashIndex + 1).split("?")[0] : "";

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || !id) return;

    const onHome = window.location.pathname === "/" || window.location.pathname === "";
    // Leaving another route for `/#section` — let Next navigate; hash scroll hooks finish.
    if (!onHome && hrefStr.startsWith("/#")) return;

    e.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new Event("hashchange"));

    if (!scrollToId(id)) {
      requestAnimationFrame(() => scrollToId(id));
      window.setTimeout(() => scrollToId(id), 300);
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
