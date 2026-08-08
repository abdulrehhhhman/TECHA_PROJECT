import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import {
  RECEPTION_EMAIL,
  TECHA_EMAIL,
  escapeHtml,
  sendNotificationEmail,
} from "@/lib/email";

function requiredString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(value: unknown): string | null {
  const trimmed = requiredString(value);
  return trimmed || null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const referrer_name = requiredString(body.referrer_name);
  const referrer_organization = requiredString(body.referrer_organization);
  const referrer_role = optionalString(body.referrer_role);
  const referrer_phone = requiredString(body.referrer_phone);
  const referrer_email = requiredString(body.referrer_email);
  const patient_name = requiredString(body.patient_name);
  const patient_phone = requiredString(body.patient_phone);
  const patient_email = optionalString(body.patient_email);
  const reason_for_referral = requiredString(body.reason_for_referral);
  const additional_notes = optionalString(body.additional_notes);
  const consent_confirmed = body.consent_confirmed === true;

  if (
    !referrer_name ||
    !referrer_organization ||
    !referrer_phone ||
    !referrer_email ||
    !patient_name ||
    !patient_phone ||
    !reason_for_referral
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "referrer_name, referrer_organization, referrer_phone, referrer_email, patient_name, patient_phone, and reason_for_referral are required.",
      },
      { status: 400 },
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
