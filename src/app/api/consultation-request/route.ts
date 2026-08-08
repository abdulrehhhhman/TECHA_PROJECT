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

  const full_name = requiredString(body.full_name);
  const phone = requiredString(body.phone);
  const email = requiredString(body.email);
  const patient_type = requiredString(body.patient_type);
  const preferred_contact_method = requiredString(body.preferred_contact_method);
  const insurance_type = requiredString(body.insurance_type);
  const preferred_day_time = requiredString(body.preferred_day_time);
  const service_requested = requiredString(body.service_requested);
  const reason_for_visit = requiredString(body.reason_for_visit);

  if (
    !full_name ||
    !phone ||
    !email ||
    !patient_type ||
    !preferred_contact_method ||
    !insurance_type ||
    !preferred_day_time ||
    !service_requested ||
    !reason_for_visit
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "full_name, phone, email, patient_type, preferred_contact_method, insurance_type, preferred_day_time, service_requested, and reason_for_visit are required.",
      },
      { status: 400 },
    );
  }

  const submitted_at = new Date().toISOString();

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("consultation_requests").insert({
      full_name,
      phone,
      email,
      patient_type,
      preferred_contact_method,
      insurance_type,
      preferred_day_time,
      service_requested,
      reason_for_visit,
      submitted_at,
    });

    if (error) {
      console.error("Supabase insert error (consultation_requests):", error);
      return NextResponse.json(
        { success: false, error: "Failed to save appointment request." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Unexpected error saving appointment request:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save appointment request." },
      { status: 500 },
    );
  }

  const html = `
    <h2>New Appointment Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(full_name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Patient Type:</strong> ${escapeHtml(patient_type)}</p>
    <p><strong>Preferred Contact Method:</strong> ${escapeHtml(preferred_contact_method)}</p>
    <p><strong>Insurance:</strong> ${escapeHtml(insurance_type)}</p>
    <p><strong>Preferred Day/Time:</strong> ${escapeHtml(preferred_day_time)}</p>
    <p><strong>Service Requested:</strong> ${escapeHtml(service_requested)}</p>
    <p><strong>Reason for Visit:</strong> ${escapeHtml(reason_for_visit)}</p>
    <p><strong>Submitted At:</strong> ${escapeHtml(submitted_at)}</p>
  `;

  await sendNotificationEmail({
    to: [RECEPTION_EMAIL, TECHA_EMAIL],
    subject: `New Appointment Request — ${full_name}`,
    html,
  });

  return NextResponse.json({ success: true });
}
