import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { z } from "zod";
import { checkRateLimitAndOrigin } from "@/lib/security";
import {
  RECEPTION_EMAIL,
  TECHA_EMAIL,
  escapeHtml,
  sendNotificationEmail,
} from "@/lib/email";

const appointmentSchema = z.object({
  full_name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(1, "Phone is required").max(20),
  email: z.string().email("Invalid email address").max(254),
  patient_type: z.string().min(1, "Patient type is required").max(50),
  preferred_contact_method: z.string().min(1, "Contact method is required").max(50),
  insurance_type: z.string().min(1, "Insurance type is required").max(50),
  preferred_day_time: z.string().min(1, "Preferred day/time is required").max(200),
  service_requested: z.string().min(1, "Service requested is required").max(100),
  reason_for_visit: z.string().min(1, "Reason for visit is required").max(100),
  fax_number: z.string().optional().nullable(), // Honeypot
});

export async function POST(request: Request) {
  // 1. Rate Limit & Origin Check
  const rateLimitRes = checkRateLimitAndOrigin(request);
  if (rateLimitRes) return rateLimitRes;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // 2. Schema Validation
  const result = appointmentSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.issues[0].message },
      { status: 400 }
    );
  }

  const {
    full_name, phone, email, patient_type, preferred_contact_method,
    insurance_type, preferred_day_time, service_requested, reason_for_visit,
    fax_number
  } = result.data;

  // 3. Honeypot Check (Silently drop if filled)
  if (fax_number && fax_number.length > 0) {
    return NextResponse.json({ success: true });
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
