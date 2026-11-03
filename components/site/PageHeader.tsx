export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] pt-24 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 15% 20%, rgba(197,165,114,0.18), transparent 55%), radial-gradient(ellipse 50% 60% at 90% 80%, rgba(255,255,255,0.05), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="section-rule mb-5 justify-start text-[var(--color-champagne-soft)] before:bg-[var(--color-champagne-soft)] after:hidden">
          Vivàce
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-wide sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">{subtitle}</p>}
      </div>
    </section>
  );
}
