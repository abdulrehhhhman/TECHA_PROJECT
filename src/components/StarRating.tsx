import { StarIcon } from "./icons";

export default function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1 text-secondary-dark" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} className="h-4.5 w-4.5" />
      ))}
    </div>
  );
}
