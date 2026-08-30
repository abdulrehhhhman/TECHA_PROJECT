"use client";

import { useState, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import Button from "./Button";
import { CheckIcon } from "./icons";

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-4 py-3.5 text-[1.05rem] text-foreground placeholder:text-soft/70 transition-all duration-200 focus:border-secondary-dark focus:outline-2 focus:outline-secondary focus:outline-offset-2 focus:shadow-[0_0_0_5px_rgba(201,154,95,0.15)]";

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

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setErrorMessage("Please fill out all required fields before submitting.");
      setStatus("error");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!turnstileToken) {
      setErrorMessage("Please complete the security check.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: data.get("phone"),
          subject,
          message,
          fax_number: data.get("fax_number"), // Honeypot
          turnstileToken,
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
          Thank you for reaching out.
        </h3>
        <p className="mt-2 max-w-md text-lg leading-relaxed text-soft">
          We&apos;ll respond as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[1.05rem] font-semibold text-accent hover:text-accent-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-xl border border-border bg-white p-7 shadow-soft-lg sm:p-9"
    >
      <input type="text" name="fax_number" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-secondary-dark/30 bg-secondary-50 px-4 py-3 text-[1.05rem] text-foreground"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input type="text" name="name" required className={inputClasses} />
        </Field>
        <Field label="Email">
          <input type="email" name="email" required className={inputClasses} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone" optional>
          <input type="tel" name="phone" className={inputClasses} />
        </Field>
        <Field label="Subject">
          <input type="text" name="subject" required className={inputClasses} />
        </Field>
      </div>
      <Field label="Message">
        <textarea
          name="message"
          required
          rows={5}
          className={`${inputClasses} resize-none`}
        />
      </Field>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setTurnstileToken(token)}
        onError={() => setErrorMessage("Security check failed. Please try again.")}
        options={{ theme: 'light' }}
      />

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
            "Send Message"
          )}
        </Button>
        <p className="mt-4 text-sm leading-relaxed text-soft">
          Your information is confidential and will only be used to respond to
          your inquiry.
        </p>
      </div>
    </form>
  );
}
