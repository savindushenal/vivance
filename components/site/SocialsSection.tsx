type SocialLink = {
  href: string;
  label: string;
  kind: "facebook" | "instagram" | "youtube";
};

function SocialIcon({ kind }: { kind: SocialLink["kind"] }) {
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          fill="currentColor"
          d="M26.8 36V25.2h3.6l.5-4h-4.1v-2.5c0-1.2.3-2 2-2h2.2v-3.6c-.4-.1-1.7-.2-3.2-.2-3.2 0-5.4 1.9-5.4 5.5v3h-3.6v4H22V36h4.8z"
        />
      </svg>
    );
  }

  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect
          x="14"
          y="14"
          width="20"
          height="20"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="24" cy="24" r="5" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="30.5" cy="17.5" r="1.4" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        fill="currentColor"
        d="M31.8 18.2c-.7-.3-4-.5-7.8-.5s-7.1.2-7.8.5c-.9.3-1.6 1.1-1.8 2.1-.3 1.3-.4 3.4-.4 3.7s.1 2.4.4 3.7c.2 1 .9 1.8 1.8 2.1.7.3 4 .5 7.8.5s7.1-.2 7.8-.5c.9-.3 1.6-1.1 1.8-2.1.3-1.3.4-3.4.4-3.7s-.1-2.4-.4-3.7c-.2-1-.9-1.8-1.8-2.1zm-10.1 8.3v-6.6l6.4 3.3-6.4 3.3z"
      />
    </svg>
  );
}

export function SocialsSection({
  choirName,
  facebookUrl,
  instagramUrl,
  youtubeUrl,
}: {
  choirName: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}) {
  const links: SocialLink[] = [
    facebookUrl
      ? { href: facebookUrl, label: `${choirName} Facebook`, kind: "facebook" as const }
      : null,
    instagramUrl
      ? { href: instagramUrl, label: `${choirName} Instagram`, kind: "instagram" as const }
      : null,
    youtubeUrl
      ? { href: youtubeUrl, label: `${choirName} YouTube`, kind: "youtube" as const }
      : null,
  ].filter(Boolean) as SocialLink[];

  if (links.length === 0) return null;

  return (
    <section
      id="socials"
      className="scroll-mt-24 bg-[var(--color-navy-deep)] px-4 py-24 text-center text-white sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-sm tracking-[0.12em] text-white/45">{choirName}</p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Want to stay up-to-date?
          <br />
          Follow us on socials.
        </h2>

        <ul className="mt-14 flex flex-col items-center gap-12 sm:mt-16 sm:gap-14">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 text-white transition hover:text-[var(--color-gold-soft)]"
              >
                <span className="transition duration-300 group-hover:scale-105">
                  <SocialIcon kind={link.kind} />
                </span>
                <span className="font-[family-name:var(--font-display)] text-xl tracking-wide sm:text-2xl">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
