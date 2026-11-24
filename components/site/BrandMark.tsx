import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandWordmark({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-[family-name:var(--font-display)] font-semibold tracking-[0.04em]",
        light ? "text-white" : "text-[var(--color-navy)]",
        className,
      )}
    >
      VIV
      <span className="text-[var(--color-gold)]">À</span>
      CE
    </span>
  );
}

export function BrandMark({
  choirName,
  compact = false,
  light = false,
}: {
  choirName: string;
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span
        className={cn(
          "relative overflow-hidden bg-[var(--color-navy)]",
          compact ? "h-10 w-10" : "h-11 w-11",
        )}
      >
        <Image
          src="/brand/logo.jpg"
          alt={`${choirName} logo`}
          fill
          sizes="44px"
          className="object-cover object-center"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <BrandWordmark light={light} className={compact ? "text-2xl" : "text-[1.7rem]"} />
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em]",
            light ? "text-white/55" : "text-[var(--color-navy)]/45",
          )}
        >
          Choir for hire
        </span>
      </span>
    </Link>
  );
}
