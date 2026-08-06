import StarRating from "./StarRating";

interface TestimonialCardProps {
  quote: string;
  name: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function TestimonialCard({ quote, name }: TestimonialCardProps) {
  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:p-9">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 right-6 font-heading text-8xl leading-none text-secondary/15"
      >
        &rdquo;
      </span>
      <StarRating />
      <blockquote className="relative mt-5 flex-1 font-heading text-xl italic leading-relaxed text-foreground">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="relative mt-7 flex items-center gap-3 border-t border-border/70 pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {initials(name)}
        </span>
        <div>
          <p className="font-heading font-semibold text-foreground">{name}</p>
          <p className="text-sm text-soft">Patient</p>
        </div>
      </figcaption>
    </figure>
  );
}
