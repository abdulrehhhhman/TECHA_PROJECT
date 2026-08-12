import { NextResponse } from "next/server";
import Stripe from "stripe";
import { processCompletedOrder } from "@/lib/shop";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "Session ID is required." },
      { status: 400 },
    );
  }

  try {
    const result = await processCompletedOrder(stripe, sessionId);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, order: result.order });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred during confirmation.";
    console.error("Order Confirmation Endpoint Error:", err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 },
    );
  }
}
