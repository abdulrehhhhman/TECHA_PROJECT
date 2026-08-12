import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Helper to authenticate requests
function isAuthorized(request: Request): boolean {
  const passcode = request.headers.get("x-admin-passcode");
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set.");
    return false;
  }
  
  return passcode === adminPassword;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseClient();

    // Fetch shipping rate settings
    const { data: settings, error: settingsError } = await supabase
      .from("shop_settings")
      .select("*");

    if (settingsError) throw settingsError;

    // Fetch inventory
    const { data: inventory, error: invError } = await supabase
      .from("shop_inventory")
      .select("*")
      .order("name");

    if (invError) throw invError;

    // Fetch orders (most recent first)
    const { data: orders, error: ordersError } = await supabase
      .from("shop_orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (ordersError) throw ordersError;

    return NextResponse.json({
      success: true,
      settings: settings || [],
      inventory: inventory || [],
      orders: orders || [],
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "An error occurred fetching dashboard logs.";
    console.error("Admin Settings GET Error:", err);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: { action: string; [key: string]: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const { action } = body;
  const supabase = getSupabaseClient();

  try {
    if (action === "update_shipping_rate") {
      const { value } = body;
      if (typeof value !== "string" || isNaN(parseFloat(value))) {
        return NextResponse.json({ success: false, error: "Invalid shipping rate value." }, { status: 400 });
      }

      const { error } = await supabase
        .from("shop_settings")
        .upsert({ key: "shipping_rate", value });

      if (error) throw error;
      return NextResponse.json({ success: true, message: "Shipping rate updated successfully." });
    }

    if (action === "update_inventory") {
      const { flavorId, isAvailable } = body;
      if (typeof flavorId !== "string" || typeof isAvailable !== "boolean") {
        return NextResponse.json({ success: false, error: "Invalid inventory toggle parameters." }, { status: 400 });
      }

      const { error } = await supabase
        .from("shop_inventory")
        .update({ is_available: isAvailable })
        .eq("flavor_id", flavorId);

      if (error) throw error;
      return NextResponse.json({ success: true, message: "Inventory updated successfully." });
    }

    if (action === "update_fulfillment") {
      const { orderId, status } = body;
      if (typeof orderId !== "string" || typeof status !== "string") {
        return NextResponse.json({ success: false, error: "Invalid fulfillment update parameters." }, { status: 400 });
      }

      const { error } = await supabase
        .from("shop_orders")
        .update({ fulfillment_status: status })
        .eq("id", orderId);

      if (error) throw error;
      return NextResponse.json({ success: true, message: "Fulfillment status updated successfully." });
    }

    if (action === "register_webhook") {
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ success: false, error: "Stripe key is missing." }, { status: 500 });
      }

      const origin = new URL(request.url).origin;
      const webhookUrl = `${origin}/api/stripe/webhook`;

      // 1. Check if we already have a registered webhook in Stripe to avoid duplicates
      const webhooks = await stripe.webhookEndpoints.list();
      const existing = webhooks.data.find((w) => w.url === webhookUrl && w.status === "enabled");

      let webhookSecret = "";

      if (existing) {
        try {
          await stripe.webhookEndpoints.del(existing.id);
        } catch (e) {
          console.warn("Could not delete existing webhook endpoint:", e);
        }
      }

      // 2. Create new webhook endpoint
      const webhook = await stripe.webhookEndpoints.create({
        url: webhookUrl,
        enabled_events: ["checkout.session.completed"],
      });

      webhookSecret = webhook.secret || "";

      // 3. Save to Supabase settings
      const { error } = await supabase
        .from("shop_settings")
        .upsert({ key: "stripe_webhook_secret", value: webhookSecret });

      if (error) throw error;

      return NextResponse.json({
        success: true,
        message: "Webhook registered successfully in Stripe and saved locally.",
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action." }, { status: 400 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("Admin Action POST Error:", err);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
