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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : null;
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      {
        success: false,
        error: "name, email, subject, and message are required.",
      },
      { status: 400 },
    );
  }

  const submitted_at = new Date().toISOString();

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("contact_form_submissions").insert({
      name,
      email,
      phone,
      subject,
      message,
      submitted_at,
    });

    if (error) {
      console.error("Supabase insert error (contact_form_submissions):", error);
      return NextResponse.json(
        { success: false, error: "Failed to save contact form submission." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Unexpected error saving contact form submission:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save contact form submission." },
      { status: 500 },
    );
  }

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong> ${escapeHtml(message)}</p>
    <p><strong>Submitted At:</strong> ${escapeHtml(submitted_at)}</p>
  `;

  await sendNotificationEmail({
    to: [RECEPTION_EMAIL, TECHA_EMAIL],
    subject: `New Contact Form Submission — ${name}`,
    html,
  });

  return NextResponse.json({ success: true });
}
