import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { z } from "zod";
import { validateTurnstileToken, checkRateLimitAndOrigin } from "@/lib/security";
import {
  RECEPTION_EMAIL,
  TECHA_EMAIL,
  escapeHtml,
  sendNotificationEmail,
} from "@/lib/email";

const referralSchema = z.object({
  referrer_name: z.string().min(1).max(100),
  referrer_organization: z.string().min(1).max(150),
  referrer_role: z.string().max(100).optional().nullable(),
  referrer_phone: z.string().min(1).max(20),
  referrer_email: z.string().email().max(254),
  patient_name: z.string().min(1).max(100),
  patient_phone: z.string().min(1).max(20),
  patient_email: z.string().max(254).optional().nullable(),
  reason_for_referral: z.string().min(1).max(2000),
  additional_notes: z.string().max(2000).optional().nullable(),
  consent_confirmed: z.boolean(),
  fax_number: z.string().optional().nullable(), // Honeypot
  turnstileToken: z.string().min(1, "Turnstile token required"),
});

export async function POST(request: Request) {
  // 1. Rate Limit & Origin Check
  const rateLimitRes = checkRateLimitAndOrigin(request);
  if (rateLimitRes) return rateLimitRes;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // 2. Schema Validation
  const result = referralSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.issues[0].message },
      { status: 400 },
    );
  }

  const {
    referrer_name,
    referrer_organization,
    referrer_role,
    referrer_phone,
    referrer_email,
    patient_name,
    patient_phone,
    patient_email,
    reason_for_referral,
    additional_notes,
    consent_confirmed,
    fax_number,
    turnstileToken,
  } = result.data;

  // 3. Honeypot Check
  if (fax_number && fax_number.length > 0) {
    return NextResponse.json({ success: true });
  }

  // 4. Turnstile Verification
  const isHuman = await validateTurnstileToken(turnstileToken);
  if (!isHuman) {
    return NextResponse.json(
      { success: false, error: "Security verification failed. Please try again." },
      { status: 403 },
    );
  }

  if (!consent_confirmed) {
    return NextResponse.json(
      {
        success: false,
        error: "Patient consent must be confirmed before submitting a referral.",
      },
      { status: 400 },
    );
  }

  const submitted_at = new Date().toISOString();

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("patient_referrals").insert({
      referrer_name,
      referrer_organization,
      referrer_role,
      referrer_phone,
      referrer_email,
      patient_name,
      patient_phone,
      patient_email,
      reason_for_referral,
      additional_notes,
      consent_confirmed,
    });

    if (error) {
      console.error("Supabase insert error (patient_referrals):", error);
      return NextResponse.json(
        { success: false, error: "Failed to save patient referral." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Unexpected error saving patient referral:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save patient referral." },
      { status: 500 },
    );
  }

  const html = `
    <h2>New Patient Referral</h2>
    <h3>Referring Contact</h3>
    <p><strong>Name:</strong> ${escapeHtml(referrer_name)}</p>
    <p><strong>Organization/Practice:</strong> ${escapeHtml(referrer_organization)}</p>
    <p><strong>Role/Title:</strong> ${escapeHtml(referrer_role || "Not specified")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(referrer_phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(referrer_email)}</p>
    <h3>Patient</h3>
    <p><strong>Name:</strong> ${escapeHtml(patient_name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(patient_phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(patient_email || "Not provided")}</p>
    <h3>Referral Details</h3>
    <p><strong>Reason for Referral/Service Needed:</strong> ${escapeHtml(reason_for_referral)}</p>
    <p><strong>Additional Notes:</strong> ${escapeHtml(additional_notes || "None")}</p>
    <p><strong>Patient Consent Confirmed:</strong> Yes</p>
    <p><strong>Submitted At:</strong> ${escapeHtml(submitted_at)}</p>
  `;

  await sendNotificationEmail({
    to: [RECEPTION_EMAIL, TECHA_EMAIL],
    subject: `New Patient Referral — from ${referrer_name} at ${referrer_organization}`,
    html,
  });

  return NextResponse.json({ success: true });
}
