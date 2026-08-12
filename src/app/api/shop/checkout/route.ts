import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

interface CheckoutItem {
  type: "pack" | "box";
  flavorId?: string;
  flavors?: string[]; // array of 3 flavor IDs
  quantity: number;
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { success: false, error: "Stripe configuration is missing on the server." },
      { status: 500 },
    );
  }

  let body: { items: CheckoutItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const { items } = body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { success: false, error: "Cart is empty or invalid." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseClient();

    // 1. Fetch current inventory and verify all selected items are available
    const { data: inventory, error: invError } = await supabase
      .from("shop_inventory")
      .select("*");

    if (invError || !inventory) {
      console.error("Supabase inventory fetch error:", invError);
      return NextResponse.json(
        { success: false, error: "Could not verify inventory." },
        { status: 500 },
      );
    }

    const flavorMap = new Map(inventory.map((f) => [f.flavor_id, f]));

    for (const item of items) {
      if (item.type === "pack") {
        if (!item.flavorId) {
          return NextResponse.json(
            { success: false, error: "Pack flavor ID is required." },
            { status: 400 },
          );
        }
        const flavor = flavorMap.get(item.flavorId);
        if (!flavor || !flavor.is_available) {
          return NextResponse.json(
            { success: false, error: `Flavor "${flavor?.name || item.flavorId}" is currently sold out.` },
            { status: 400 },
          );
        }
      } else if (item.type === "box") {
        if (!item.flavors || !Array.isArray(item.flavors) || item.flavors.length !== 3) {
          return NextResponse.json(
            { success: false, error: "A Calm Box must contain exactly 3 flavor selections." },
            { status: 400 },
          );
        }
        for (const fId of item.flavors) {
          const flavor = flavorMap.get(fId);
          if (!flavor || !flavor.is_available) {
            return NextResponse.json(
              { success: false, error: `Flavor "${flavor?.name || fId}" in Calm Box is currently sold out.` },
              { status: 400 },
            );
          }
        }
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid item type in cart." },
          { status: 400 },
        );
      }
    }

    // 2. Fetch flat-rate shipping rate from settings
    const { data: settingsData, error: settingsError } = await supabase
      .from("shop_settings")
      .select("value")
      .eq("key", "shipping_rate")
      .single();

    let shippingRate = 9.99; // Fallback default
    if (!settingsError && settingsData) {
      shippingRate = parseFloat(settingsData.value);
    }

    // 3. Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      if (item.type === "pack") {
        const flavor = flavorMap.get(item.flavorId!);
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: `TRIP 4-Pack — ${flavor!.name}`,
              description: "Lightly sparkling wellness blend made with magnesium and plant-based ingredients.",
              images: flavor!.image_url ? [`${new URL(request.url).origin}${flavor!.image_url}`] : [],
            },
            unit_amount: 1499, // $14.99 in cents
          },
          quantity: item.quantity,
        });
      } else if (item.type === "box") {
        const selectedFlavors = item.flavors!.map((fId) => flavorMap.get(fId)!.name);
        const flavorCounts = selectedFlavors.reduce((acc, name) => {
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const flavorListStr = Object.entries(flavorCounts)
          .map(([name, count]) => `${count}x ${name}`)
          .join(", ");

        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Build Your Calm Box — Pick Your 3",
              description: `Personalized 12-can Calm Box bundle: ${flavorListStr}`,
            },
            unit_amount: 3999, // $39.99 in cents
          },
          quantity: item.quantity,
        });
      }
    }

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(shippingRate * 100), // convert to cents
              currency: "usd",
            },
            display_name: "Flat-rate shipping",
          },
        },
      ],
      success_url: `${new URL(request.url).origin}/wellness-shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(request.url).origin}/wellness-shop`,
      metadata: {
        source: "wellness_shop",
        items_json: JSON.stringify(items),
      },
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred during checkout initialization.";
    console.error("Stripe Checkout Session Creation Error:", err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 },
    );
  }
}
