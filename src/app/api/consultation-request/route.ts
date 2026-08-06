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

  const full_name = typeof body.full_name === "string" ? body.full_name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const preferred_date =
    typeof body.preferred_date === "string" && body.preferred_date.trim()
      ? body.preferred_date.trim()
      : null;
  const preferred_time =
    typeof body.preferred_time === "string" && body.preferred_time.trim()
      ? body.preferred_time.trim()
      : null;
  const reason_for_visit =
    typeof body.reason_for_visit === "string" ? body.reason_for_visit.trim() : null;
  const message = typeof body.message === "string" ? body.message.trim() : null;

  if (!full_name || !email || !phone) {
    return NextResponse.json(
      {
        success: false,
        error: "full_name, email, and phone are required.",
      },
      { status: 400 },
    );
  }

  const submitted_at = new Date().toISOString();

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("consultation_requests").insert({
      full_name,
      email,
      phone,
      preferred_date,
      preferred_time,
      reason_for_visit,
      message,
      submitted_at,
    });

    if (error) {
      console.error("Supabase insert error (consultation_requests):", error);
      return NextResponse.json(
        { success: false, error: "Failed to save consultation request." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Unexpected error saving consultation request:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save consultation request." },
      { status: 500 },
    );
  }

  const html = `
    <h2>New Consultation Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(full_name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Preferred Date:</strong> ${escapeHtml(preferred_date || "Not specified")}</p>
    <p><strong>Preferred Time:</strong> ${escapeHtml(preferred_time || "Not specified")}</p>
    <p><strong>Reason for Visit:</strong> ${escapeHtml(reason_for_visit || "Not specified")}</p>
    <p><strong>Additional Notes:</strong> ${escapeHtml(message || "None")}</p>
    <p><strong>Submitted At:</strong> ${escapeHtml(submitted_at)}</p>
  `;

  await sendNotificationEmail({
    to: [RECEPTION_EMAIL, TECHA_EMAIL],
    subject: `New Consultation Request — ${full_name}`,
    html,
  });

  return NextResponse.json({ success: true });
}
