"use client";

import { useState, useEffect, type FormEvent } from "react";
import Button from "../Button";
import { CheckIcon } from "../icons";
import { Field, Spinner, inputClasses } from "./shared";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS = [
  "referrer_name",
  "referrer_organization",
  "referrer_phone",
  "referrer_email",
  "patient_name",
  "patient_phone",
  "reason_for_referral",
] as const;

export default function ReferralForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [mathA, setMathA] = useState(0);
  const [mathB, setMathB] = useState(0);

  useEffect(() => {
    setMathA(Math.floor(Math.random() * 10) + 1);
    setMathB(Math.floor(Math.random() * 10) + 1);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = Object.fromEntries(
      REQUIRED_FIELDS.map((key) => [key, String(data.get(key) || "").trim()]),
    ) as Record<(typeof REQUIRED_FIELDS)[number], string>;
    const consentConfirmed = data.get("consent_confirmed") === "on";

    if (REQUIRED_FIELDS.some((key) => !values[key])) {
      setErrorMessage("Please fill out all required fields before submitting.");
      setStatus("error");
      return;
    }
    if (!EMAIL_PATTERN.test(values.referrer_email)) {
      setErrorMessage("Please enter a valid email address for yourself.");
      setStatus("error");
      return;
    }
    const patientEmail = String(data.get("patient_email") || "").trim();
    if (patientEmail && !EMAIL_PATTERN.test(patientEmail)) {
      setErrorMessage("Please enter a valid email address for the patient.");
      setStatus("error");
      return;
    }
    if (!consentConfirmed) {
      setErrorMessage(
        "Please confirm you have the patient's consent before submitting.",
      );
      setStatus("error");
      return;
    }
    
    const answer = parseInt(String(data.get("math_answer")), 10);
    if (answer !== mathA + mathB) {
      setErrorMessage("Security check failed. Incorrect math answer.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/patient-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          referrer_role: data.get("referrer_role"),
          patient_email: patientEmail,
          additional_notes: data.get("additional_notes"),
          consent_confirmed: consentConfirmed,
          fax_number: data.get("fax_number"),
          math_a: mathA,
          math_b: mathB,
          math_answer: answer,
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
          Thank you for your referral.
        </h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-soft">
          Our team will reach out to the patient and follow up with you as
          needed.
        </p>
        <p className="mt-4 text-[1.05rem] text-soft">
          If this is urgent, please call{" "}
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

      <h3 className="font-heading text-xl font-semibold text-foreground">
        About You
      </h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your Name">
          <input type="text" name="referrer_name" required className={inputClasses} />
        </Field>
        <Field label="Your Organization / Practice">
          <input
            type="text"
            name="referrer_organization"
            required
            className={inputClasses}
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your Role / Title" optional>
          <input
            type="text"
            name="referrer_role"
            placeholder="e.g. Physician, Case Manager"
            className={inputClasses}
          />
        </Field>
        <Field label="Your Phone Number">
          <input type="tel" name="referrer_phone" required className={inputClasses} />
        </Field>
      </div>
      <Field label="Your Email Address">
        <input type="email" name="referrer_email" required className={inputClasses} />
      </Field>

      <h3 className="pt-2 font-heading text-xl font-semibold text-foreground">
        About the Patient
      </h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Patient's Name">
          <input type="text" name="patient_name" required className={inputClasses} />
        </Field>
        <Field label="Patient's Phone Number">
          <input type="tel" name="patient_phone" required className={inputClasses} />
        </Field>
      </div>
      <Field label="Patient's Email" optional>
        <input type="email" name="patient_email" className={inputClasses} />
      </Field>

      <Field label="Reason for Referral / Service Needed">
        <textarea
          name="reason_for_referral"
          required
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      </Field>
      <Field label="Any Additional Notes" optional>
        <textarea
          name="additional_notes"
          rows={3}
          className={`${inputClasses} resize-none`}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-primary-50/60 px-4 py-4 text-[1.05rem] leading-relaxed text-foreground">
        <input
          type="checkbox"
          name="consent_confirmed"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-secondary-dark"
        />
        I confirm that I have obtained the patient&apos;s consent to share
        their information with Proactive Medical and Wellness for the
        purpose of this referral.
      </label>

      <Field label={`Security Check: What is ${mathA} + ${mathB}?`}>
        <input 
          type="number" 
          name="math_answer" 
          required 
          className={inputClasses}
          placeholder="Enter the sum" 
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
            "Submit Referral"
          )}
        </Button>
      </div>
    </form>
  );
}
