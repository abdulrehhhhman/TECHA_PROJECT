import Link from "next/link";
import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href = "/services",
}: ServiceCardProps) {
  return (
    <div className="ease-calm group flex h-full flex-col rounded-xl border border-border/70 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft-lg sm:p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary-dark transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-soft">
        {description}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-[1.05rem] font-semibold text-accent transition-colors group-hover:text-accent-dark"
      >
        Learn More
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
