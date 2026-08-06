import { Resend } from "resend";

export const RECEPTION_EMAIL = "reception@proactivemedicalandwellness.com";
export const TECHA_EMAIL = "techab@proactivemedicalandwellness.com";
export const FROM_EMAIL = "notifications@proactivemedicalandwellness.com";

let client: Resend | null = null;

function getResendClient(): Resend {
  if (client) return client;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing Resend environment variable. Set RESEND_API_KEY in .env.local.",
    );
  }

  client = new Resend(apiKey);
  return client;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface SendNotificationEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

/**
 * Best-effort send: errors are logged, never thrown, so a notification
 * failure can't block the caller's database write from succeeding.
 */
export async function sendNotificationEmail({
  to,
  subject,
  html,
}: SendNotificationEmailParams): Promise<void> {
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    if (error) {
      console.error("Resend email error:", error);
    }
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }
}
