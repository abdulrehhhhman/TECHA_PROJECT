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

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(254),
  phone: z.string().max(20).optional().nullable(),
  subject: z.string().min(1, "Subject is required").max(150),
  message: z.string().min(1, "Message is required").max(5000),
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
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // 2. Schema Validation
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.issues[0].message },
      { status: 400 }
    );
  }

  const { name, email, phone, subject, message, fax_number, turnstileToken } = result.data;

  // 3. Honeypot Check (Silently drop if filled)
  if (fax_number && fax_number.length > 0) {
    return NextResponse.json({ success: true });
  }

  // 4. Turnstile Verification
  const isHuman = await validateTurnstileToken(turnstileToken);
  if (!isHuman) {
    return NextResponse.json(
      { success: false, error: "Security verification failed. Please try again." },
      { status: 403 }
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
