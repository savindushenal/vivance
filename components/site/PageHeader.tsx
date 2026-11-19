export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="px-4 pb-4 pt-2 sm:px-6">
      <div className="panel mx-auto max-w-6xl bg-[var(--color-navy)] px-6 py-12 text-white sm:px-10 sm:py-16">
        <p className="badge-pill text-white/85">
          <span className="badge-dot" />
          Vivàce
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">{subtitle}</p>}
      </div>
    </section>
  );
}
