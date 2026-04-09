import Image from "next/image";
import Link from "next/link";

type HeaderAction = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

type GlassHeaderProps = {
  title: string;
  subtitle: string;
  logoSrc: string;
  logoAlt: string;
  actions: HeaderAction[];
  className?: string;
};

export default function GlassHeader({
  title,
  subtitle,
  logoSrc,
  logoAlt,
  actions,
  className,
}: GlassHeaderProps) {
  return (
    <header
      className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/15 bg-[linear-gradient(140deg,rgba(15,23,42,0.76),rgba(30,41,59,0.4))] px-4 py-3 shadow-[0_10px_36px_rgba(2,6,23,0.48)] backdrop-blur-xl md:px-6 md:py-4 ${className ?? ""}`}
    >
      <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-lg px-2 py-1.5">
        <span className="grid h-9 w-9 place-content-center">
          <Image src={logoSrc} alt={logoAlt} width={36} height={36} />
        </span>
        <span>
          <strong className="block text-sm uppercase tracking-[0.18em] text-(--text-strong)">{title}</strong>
          <span className="block text-xs tracking-[0.14em] text-(--text-muted)">{subtitle}</span>
        </span>
      </Link>

      <nav className="flex items-center gap-3" aria-label="Header actions">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={
              action.variant === "primary"
                ? "focus-ring inline-flex h-10 items-center justify-center rounded-full bg-(--color-primary) px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-(--color-primary-hover)"
                : "focus-ring inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-medium text-(--text-strong) transition-colors duration-200 hover:border-blue-300/60 hover:bg-blue-500/14"
            }
          >
            {action.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
