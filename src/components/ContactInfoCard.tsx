import type { ReactNode } from "react";

interface ContactInfoCardProps {
  icon: ReactNode;
  title: string;
  primary: string;
  primaryHref?: string;
  secondary?: string[];
  link?: { label: string; href: string };
}

export default function ContactInfoCard({
  icon,
  title,
  primary,
  primaryHref,
  secondary = [],
  link,
}: ContactInfoCardProps) {
  return (
    <div className="flex h-full min-w-0 flex-col items-start rounded-xl border border-border bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-light text-primary-dark">
        {icon}
      </div>
      <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      {primaryHref ? (
        <a
          href={primaryHref}
          className="mt-2 w-full min-w-0 break-words text-lg font-semibold text-accent transition-colors hover:text-accent-dark"
        >
          {primary}
        </a>
      ) : (
        <p className="mt-2 w-full min-w-0 break-words text-lg font-semibold text-foreground">
          {primary}
        </p>
      )}
      {secondary.map((line) => (
        <p
          key={line}
          className="mt-1 w-full min-w-0 break-words text-[1.05rem] leading-relaxed text-soft"
        >
          {line}
        </p>
      ))}
      {link && (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-[1.05rem] font-semibold text-accent transition-colors hover:text-accent-dark"
        >
          {link.label}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
}
