import { NextResponse } from "next/server";

// In-memory store for simple rate limiting (Note: In a distributed edge environment like Vercel, this is per-isolate. Upstash Redis is better for production edge, but this works for simple cases).
const rateLimitCache = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Validates a Cloudflare Turnstile token.
 */
export async function validateTurnstileToken(token: string | null): Promise<boolean> {
  if (!token) return false;

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("Missing TURNSTILE_SECRET_KEY in environment variables.");
    return false; // Fail secure
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });

    const data = await res.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

/**
 * Applies basic rate limiting and origin checking.
 * Returns a NextResponse with a 429 status if rate limited, or null if allowed.
 */
export function checkRateLimitAndOrigin(req: Request): NextResponse | null {
  // 1. Origin check (Basic CSRF protection)
  const origin = req.headers.get("origin") || req.headers.get("referer");
  const host = req.headers.get("host");

  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      // We allow requests from the same host
      if (originUrl.host !== host && originUrl.hostname !== 'localhost') {
        return NextResponse.json({ error: "Invalid Origin" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid Origin Header" }, { status: 403 });
    }
  }

  // 2. IP Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown-ip";
  const now = Date.now();

  let record = rateLimitCache.get(ip);
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    record = { count: 1, lastReset: now };
    rateLimitCache.set(ip, record);
  } else {
    record.count++;
    if (record.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Periodically clean up cache (naive approach)
  if (Math.random() < 0.1) {
    for (const [key, value] of rateLimitCache.entries()) {
      if (now - value.lastReset > RATE_LIMIT_WINDOW_MS) {
        rateLimitCache.delete(key);
      }
    }
  }

  return null;
}
