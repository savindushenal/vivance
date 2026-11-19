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
        "font-serif font-extrabold tracking-tight",
        light ? "text-white" : "text-[var(--color-navy)]",
        className,
      )}
    >
      VIV
      <span className="text-[var(--color-champagne)]">À</span>
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
          "relative overflow-hidden rounded-full bg-[var(--color-navy)] ring-1",
          compact ? "h-10 w-10" : "h-11 w-11",
          light ? "ring-white/20" : "ring-[var(--color-navy)]/15",
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
        <BrandWordmark light={light} className={compact ? "text-lg" : "text-xl"} />
        <span
          className={cn(
            "mt-1 text-[0.58rem] font-medium uppercase tracking-[0.2em]",
            light ? "text-white/55" : "text-[var(--color-navy)]/50",
          )}
        >
          The Living Tempo
        </span>
      </span>
    </Link>
  );
}
