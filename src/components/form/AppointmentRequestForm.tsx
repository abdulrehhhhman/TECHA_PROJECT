"use client";

import { useState, type FormEvent } from "react";
import Button from "../Button";
import { CheckIcon } from "../icons";
import { Field, FieldGroup, RadioOption, Spinner, inputClasses } from "./shared";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Kept intentionally short per the practice's request — a focused list is
// easier for patients to scan than the full services list shown elsewhere.
const SERVICE_OPTIONS = [
  "Mental Health/Psychiatry",
  "Psychiatric Evaluation",
  "Medication Management",
  "Anxiety & Depression",
  "ADHD Evaluation/Management",
  "Addiction Medicine/Suboxone (MAT)",
  "Primary Care/Family Medicine",
];

const REQUIRED_FIELDS = [
  "full_name",
  "phone",
  "email",
  "patient_type",
  "preferred_contact_method",
  "insurance_type",
  "preferred_day_time",
  "service_requested",
  "reason_for_visit",
] as const;

export default function AppointmentRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = Object.fromEntries(
      REQUIRED_FIELDS.map((key) => [key, String(data.get(key) || "").trim()]),
    ) as Record<(typeof REQUIRED_FIELDS)[number], string>;

    if (REQUIRED_FIELDS.some((key) => !values[key])) {
      setErrorMessage("Please fill out all fields before submitting.");
      setStatus("error");
      return;
    }
    if (!EMAIL_PATTERN.test(values.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/consultation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
          Thank you! Your appointment request has been received.
        </h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-soft">
          A member of our team will contact you to confirm your appointment.
          Submitting a request does not guarantee an appointment.
        </p>
        <p className="mt-4 text-[1.05rem] text-soft">
          If you need immediate assistance, please call{" "}
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone Number">
          <input type="tel" name="phone" required className={inputClasses} />
        </Field>
        <Field label="Email Address">
          <input type="email" name="email" required className={inputClasses} />
        </Field>
      </div>

      <FieldGroup label="New Patient or Existing Patient">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <RadioOption name="patient_type" value="New Patient" label="New Patient" required />
          <RadioOption
            name="patient_type"
            value="Existing Patient"
            label="Existing Patient"
          />
        </div>
      </FieldGroup>

      <FieldGroup label="Preferred Contact Method">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <RadioOption
            name="preferred_contact_method"
            value="Phone Call"
            label="Phone Call"
            required
          />
          <RadioOption name="preferred_contact_method" value="Email" label="Email" />
          <RadioOption
            name="preferred_contact_method"
            value="Text Message"
            label="Text Message"
          />
        </div>
      </FieldGroup>

      <FieldGroup label="Insurance or Self-Pay">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <RadioOption
            name="insurance_type"
            value="I have insurance"
            label="I have insurance"
            required
          />
          <RadioOption name="insurance_type" value="Self-pay" label="Self-pay" />
        </div>
      </FieldGroup>

      <Field label="Preferred Appointment Day/Time">
        <input
          type="text"
          name="preferred_day_time"
          required
          placeholder="e.g. Weekday mornings, Tuesday afternoon, etc."
          className={inputClasses}
        />
      </Field>

      <Field label="Service Requested">
        <select
          name="service_requested"
          required
          defaultValue=""
          className={inputClasses}
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Brief Reason for Visit">
        <textarea
          name="reason_for_visit"
          required
          rows={4}
          placeholder="Briefly, what would you like help with? Please keep this general — detailed health information will be discussed when we contact you."
          className={`${inputClasses} resize-none`}
        />
      </Field>

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
            "Submit Request"
          )}
        </Button>
        <p className="mt-4 text-sm leading-relaxed text-soft">
          Your information is confidential and shared only with our care
          team.
        </p>
      </div>
    </form>
  );
}
