import type { ReactNode } from "react";

export const inputClasses =
  "w-full rounded-lg border border-border bg-white px-4 py-3.5 text-[1.05rem] text-foreground placeholder:text-soft/70 transition-all duration-200 focus:border-secondary-dark focus:outline-2 focus:outline-secondary focus:outline-offset-2 focus:shadow-[0_0_0_5px_rgba(201,154,95,0.15)]";

export function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[1.05rem] font-medium text-foreground">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-soft">(optional)</span>
        )}
      </span>
      {children}
    </label>
  );
}

export function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <span className="mb-2 block text-[1.05rem] font-medium text-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

export function RadioOption({
  name,
  value,
  label,
  required,
}: {
  name: string;
  value: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-white px-4 py-3 text-[1.05rem] text-foreground transition-colors has-[:checked]:border-secondary-dark has-[:checked]:bg-secondary-50">
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        className="h-4 w-4 accent-secondary-dark"
      />
      {label}
    </label>
  );
}

export function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
      />
    </svg>
  );
}
