import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import {
  RECEPTION_EMAIL,
  TECHA_EMAIL,
  escapeHtml,
  sendNotificationEmail,
} from "@/lib/email";

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

  const patient_name =
    typeof body.patient_name === "string" ? body.patient_name.trim() : "";
  const patient_email =
    typeof body.patient_email === "string" ? body.patient_email.trim() : "";
  const patient_phone =
    typeof body.patient_phone === "string" ? body.patient_phone.trim() : "";
  const appointment_date =
    typeof body.appointment_date === "string" ? body.appointment_date.trim() : "";
  const appointment_time =
    typeof body.appointment_time === "string" ? body.appointment_time.trim() : "";
  const service_type =
    typeof body.service_type === "string" ? body.service_type.trim() : null;

  if (
    !patient_name ||
    !patient_email ||
    !patient_phone ||
    !appointment_date ||
    !appointment_time
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "patient_name, patient_email, patient_phone, appointment_date, and appointment_time are required.",
      },
      { status: 400 },
    );
  }

  const submitted_at = new Date().toISOString();

  // TODO: Jane App API integration.
  // Once we have Jane credentials, create the appointment in Jane here
  // (e.g. POST to Jane's booking API) and store the resulting booking id
  // in `jane_appointment_id` below instead of leaving it null. Until then,
  // bookings are recorded with status "pending" for manual confirmation.
  const jane_appointment_id: string | null = null;

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("appointment_bookings").insert({
      patient_name,
      patient_email,
      patient_phone,
      appointment_date,
      appointment_time,
      service_type,
      jane_appointment_id,
      status: "pending",
      submitted_at,
    });

    if (error) {
      console.error("Supabase insert error (appointment_bookings):", error);
      return NextResponse.json(
        { success: false, error: "Failed to save appointment booking." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Unexpected error saving appointment booking:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save appointment booking." },
      { status: 500 },
    );
  }

  const html = `
    <h2>New Appointment Booking</h2>
    <p><strong>Patient Name:</strong> ${escapeHtml(patient_name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(patient_email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(patient_phone)}</p>
    <p><strong>Appointment Date:</strong> ${escapeHtml(appointment_date)}</p>
    <p><strong>Appointment Time:</strong> ${escapeHtml(appointment_time)}</p>
    <p><strong>Service Type:</strong> ${escapeHtml(service_type || "Not specified")}</p>
    <p><strong>Submitted At:</strong> ${escapeHtml(submitted_at)}</p>
  `;

  await sendNotificationEmail({
    to: [RECEPTION_EMAIL, TECHA_EMAIL],
    subject: `New Appointment Booking — ${patient_name}`,
    html,
  });

  return NextResponse.json({ success: true });
}
