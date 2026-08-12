import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import Stripe from "stripe";
import { processCompletedOrder } from "@/lib/shop";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  try {
    const rawBody = await request.text();
    const supabase = getSupabaseClient();

    // Fetch the webhook signing secret from settings
    const { data: settingsData } = await supabase
      .from("shop_settings")
      .select("value")
      .eq("key", "stripe_webhook_secret")
      .single();

    const webhookSecret = settingsData?.value;

    if (!webhookSecret) {
      console.warn("Stripe webhook received but stripe_webhook_secret is not registered in shop_settings.");
      return NextResponse.json({ error: "Webhook signing secret is not configured." }, { status: 400 });
    }

    // Verify the event signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Signature verification failed";
      console.error(`Webhook signature verification failed: ${errorMsg}`);
      return NextResponse.json({ error: `Signature verification failed: ${errorMsg}` }, { status: 400 });
    }

    // Process checkout session completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log(`Processing webhook checkout.session.completed for session: ${session.id}`);
      const result = await processCompletedOrder(stripe, session.id);
      
      if (!result.success) {
        console.error(`Webhook order processing failed for ${session.id}: ${result.error}`);
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      
      console.log(`Webhook order processed successfully for session: ${session.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    console.error("Unexpected error in Stripe Webhook Route:", err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
