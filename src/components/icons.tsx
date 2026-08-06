interface IconProps {
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function ClipboardIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h6M9 19h4" />
    </svg>
  );
}

export function PillIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="10.5" width="17" height="7.5" rx="3.75" transform="rotate(-45 12 14.25)" />
      <path d="M9.5 9.5 14.5 14.5" />
    </svg>
  );
}

export function HeartPulseIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20.5s-7.5-4.6-9.6-9A5.3 5.3 0 0 1 12 6.4 5.3 5.3 0 0 1 21.6 11.5c-2.1 4.4-9.6 9-9.6 9Z" />
      <path d="M4.5 12h3l1.5-2.5L11 15l1.8-4.5 1.2 1.5h4" />
    </svg>
  );
}

export function VideoIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="6" width="12.5" height="12" rx="2" />
      <path d="M15.5 10.3 21 7.5v9l-5.5-2.8" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 19 6v5.5c0 4.5-3 7.2-7 9-4-1.8-7-4.5-7-9V6l7-2.5Z" />
      <path d="M9 12l2 2 4-4.2" />
    </svg>
  );
}

export function TargetIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </svg>
  );
}

export function StarIcon({ className = "h-5 w-5", filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
    </svg>
  );
}

export function CheckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.3 2.3 4.7-5" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function EnvelopeIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

export function ClockIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21.5s7-6.2 7-11.7a7 7 0 0 0-14 0c0 5.5 7 11.7 7 11.7Z" />
      <circle cx="12" cy="9.8" r="2.5" />
    </svg>
  );
}
