"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";
import { CheckIcon } from "./icons";

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-4 py-3.5 text-[1.05rem] text-foreground placeholder:text-soft/70 transition-all duration-200 focus:border-secondary-dark focus:outline-2 focus:outline-secondary focus:outline-offset-2 focus:shadow-[0_0_0_5px_rgba(201,154,95,0.15)]";

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let minutes = 8 * 60; minutes <= 17 * 60; minutes += 30) {
    const hour24 = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour24 < 12 || hour24 === 24 ? "AM" : "PM";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    slots.push(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`);
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
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

function Spinner() {
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

interface ConsultationFormProps {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  reasonLabel?: string;
  reasonPlaceholder?: string;
  /** Compact variant used in the home hero: drops the optional notes field. */
  compact?: boolean;
}

export default function ConsultationForm({
  title,
  subtitle,
  submitLabel = "Request Consultation",
  reasonLabel = "Reason for Visit",
  reasonPlaceholder = "What brings you in today? Feel free to share as much or as little as you'd like.",
  compact = false,
}: ConsultationFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const full_name = String(data.get("full_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const reason_for_visit = String(data.get("reason_for_visit") || "").trim();

    if (!full_name || !email || !phone || !reason_for_visit) {
      setErrorMessage("Please fill out all required fields before submitting.");
      setStatus("error");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/consultation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          email,
          phone,
          preferred_date: data.get("preferred_date"),
          preferred_time: data.get("preferred_time"),
          reason_for_visit,
          message: data.get("message"),
        }),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-xl border border-primary/15 bg-primary-50 p-10 text-center shadow-soft sm:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-soft">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-semibold text-foreground">
          Thank you — we&apos;ve received your request
        </h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-soft">
          A member of our care team will contact you within 24 hours to
          confirm your appointment. If you need immediate assistance, please
          call{" "}
          <a href="tel:+13468785272" className="font-semibold text-accent">
            (346) 878-5272
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-xl border border-border bg-white p-7 shadow-soft-lg sm:p-9"
    >
      {(title || subtitle) && (
        <div className="mb-1">
          {title && (
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              {title}
            </h3>
          )}
          {subtitle && <p className="mt-1.5 text-[1.05rem] text-soft">{subtitle}</p>}
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-secondary-dark/30 bg-secondary-50 px-4 py-3 text-[1.05rem] text-foreground"
        >
          {errorMessage}
        </div>
      )}

      <Field label="Full Name">
        <input type="text" name="full_name" required className={inputClasses} />
      </Field>
      <Field label="Email Address">
        <input type="email" name="email" required className={inputClasses} />
      </Field>
      <Field label="Phone Number">
        <input type="tel" name="phone" required className={inputClasses} />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Preferred Date" optional>
          <input type="date" name="preferred_date" className={inputClasses} />
        </Field>
        <Field label="Preferred Time" optional>
          <select name="preferred_time" className={inputClasses} defaultValue="">
            <option value="" disabled>
              Select a time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={reasonLabel}>
        <textarea
          name="reason_for_visit"
          required
          rows={compact ? 3 : 4}
          placeholder={reasonPlaceholder}
          className={`${inputClasses} resize-none`}
        />
      </Field>
      {!compact && (
        <Field label="Additional Notes" optional>
          <textarea
            name="message"
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </Field>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending...
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <p className="mt-4 text-sm leading-relaxed text-soft">
          Your information is strictly confidential and shared only with our
          care team.
        </p>
      </div>
    </form>
  );
}
