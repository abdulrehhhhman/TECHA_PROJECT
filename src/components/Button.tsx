import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "ease-calm inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-secondary text-foreground shadow-soft hover:bg-secondary-dark hover:-translate-y-0.5 hover:shadow-soft-lg",
  secondary:
    "bg-primary-dark text-white shadow-soft hover:bg-primary-deep hover:-translate-y-0.5 hover:shadow-soft-lg",
  accent:
    "bg-accent text-white shadow-soft hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-soft-lg",
  outline:
    "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    const isNewTabExternal = /^https?:/.test(href);
    const isSameTabExternal = /^(tel:|mailto:)/.test(href);

    if (isNewTabExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    if (isSameTabExternal) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
