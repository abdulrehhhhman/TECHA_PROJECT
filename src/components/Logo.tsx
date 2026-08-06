interface LogoMarkProps {
  className?: string;
}

/**
 * Signature mark: a sprouting leaf — the practice's recurring motif for
 * growth and healing. Reused as the nav/footer icon and echoed as a small
 * accent elsewhere; kept restrained rather than repeated as decoration.
 */
export function LogoMark({ className = "h-9 w-9" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" className="fill-primary-light" />
      <path
        d="M20 29V17"
        stroke="var(--color-sage-dark)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 22c0-5.2 4-8.6 8.5-9-1 5-4.3 8.6-8.5 9Z"
        className="fill-primary"
      />
      <path
        d="M20 18c0-4.6-3.6-7.6-7.5-8 .9 4.4 3.9 7.6 7.5 8Z"
        className="fill-secondary"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
}

export default function Logo({ className = "", markClassName }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName ?? "h-9 w-9 shrink-0"} />
      <span className="font-heading leading-tight">
        <span className="block text-lg font-semibold text-foreground sm:hidden">
          Proactive
        </span>
        <span className="hidden text-lg font-semibold text-foreground sm:block sm:text-xl">
          Proactive Medical & Wellness
        </span>
      </span>
    </span>
  );
}
