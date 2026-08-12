import { getSupabaseClient } from "@/lib/supabase";
import Stripe from "stripe";
import {
  RECEPTION_EMAIL,
  TECHA_EMAIL,
  escapeHtml,
  sendNotificationEmail,
} from "@/lib/email";

interface DbOrderItem {
  type: "pack" | "box";
  flavorId?: string;
  flavorName?: string;
  flavors?: string[];
  flavorNames?: string[];
  quantity: number;
  price: number;
}

export async function processCompletedOrder(
  stripe: Stripe,
  sessionId: string,
): Promise<{ success: boolean; order?: unknown; error?: string }> {
  try {
    const supabase = getSupabaseClient();

    // 1. Check if the order is already in the database to prevent duplicate processing
    const { data: existingOrder } = await supabase
      .from("shop_orders")
      .select("*")
      .eq("id", sessionId)
      .maybeSingle();

    if (existingOrder) {
      return { success: true, order: existingOrder };
    }

    // 2. Fetch the session details from Stripe
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = (await stripe.checkout.sessions.retrieve(sessionId)) as any;

    // Validate that this session belongs to the wellness shop
    if (session.metadata?.source !== "wellness_shop") {
      return { success: false, error: "Invalid transaction source." };
    }

    // Validate payment status
    if (session.payment_status !== "paid") {
      return { success: false, error: "Transaction has not been completed/paid." };
    }

    const items = JSON.parse(session.metadata.items_json || "[]");
    const customerName = session.shipping_details?.name || session.customer_details?.name || "Customer";
    const customerEmail = session.customer_details?.email || "";
    const shippingAddress = session.shipping_details?.address || {};

    const subtotal = (session.amount_subtotal || 0) / 100;
    const shippingCost = (session.shipping_cost?.amount_total || 0) / 100;
    const total = (session.amount_total || 0) / 100;

    // 3. Get inventory flavors to map flavor IDs to names for formatting
    const { data: inventory } = await supabase.from("shop_inventory").select("*");
    const flavorMap = new Map(inventory?.map((f) => [f.flavor_id, f.name]) || []);

    const formattedItems: DbOrderItem[] = items.map((item: { type: "pack" | "box"; flavorId?: string; flavors?: string[]; quantity: number }) => {
      if (item.type === "pack") {
        return {
          type: "pack" as const,
          flavorId: item.flavorId,
          flavorName: flavorMap.get(item.flavorId || "") || item.flavorId,
          quantity: item.quantity,
          price: 14.99,
        };
      } else {
        const itemFlavors = (item.flavors || []).map((fId: string) => flavorMap.get(fId) || fId);
        return {
          type: "box" as const,
          flavors: item.flavors,
          flavorNames: itemFlavors,
          quantity: item.quantity,
          price: 39.99,
        };
      }
    });

    const newOrder = {
      id: sessionId,
      customer_name: customerName,
      customer_email: customerEmail,
      shipping_address: shippingAddress,
      items: formattedItems,
      subtotal,
      shipping_cost: shippingCost,
      total,
      payment_status: "paid",
      fulfillment_status: "pending",
    };

    // 4. Save order to Supabase
    const { error: insertError } = await supabase.from("shop_orders").insert(newOrder);

    if (insertError) {
      console.error("Supabase order insert error inside helper:", insertError);
      return { success: false, error: "Failed to write order to database." };
    }

    // 5. Send order notification emails
    const itemsHtmlList = formattedItems.map((item) => {
      if (item.type === "pack") {
        return `<li><strong>TRIP 4-Pack — ${escapeHtml(item.flavorName || "")}</strong> x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})</li>`;
      } else {
        const counts = (item.flavorNames || []).reduce((acc: Record<string, number>, val: string) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {});
        const flavorStr = Object.entries(counts).map(([name, count]) => `${count}x ${name}`).join(", ");
        return `<li><strong>Build Your Calm Box (Pick Your 3)</strong> x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})<br/>
                <small style="color: #666;">Flavors: ${escapeHtml(flavorStr)}</small></li>`;
      }
    }).join("");

    const address = session.shipping_details?.address;
    const addressHtml = address
      ? `<p>
          ${escapeHtml(session.shipping_details?.name || "")}<br/>
          ${escapeHtml(address.line1 || "")} ${escapeHtml(address.line2 || "")}<br/>
          ${escapeHtml(address.city || "")}, ${escapeHtml(address.state || "")} ${escapeHtml(address.postal_code || "")}<br/>
          ${escapeHtml(address.country || "")}
         </p>`
      : "<p>No shipping address provided.</p>";

    // Email to Staff & Techa
    const adminEmailHtml = `
      <div style="font-family: sans-serif; color: #292521; max-width: 600px; margin: 0 auto; border: 1px solid #e5e0d6; padding: 24px; border-radius: 12px; background: #faf8f4;">
        <h2 style="font-family: Georgia, serif; color: #274d4d; border-bottom: 1px solid #e5e0d6; padding-bottom: 12px;">New TRIP Wellness Shop Order!</h2>
        <p>A new purchase has been completed on the Wellness Shop website.</p>
        
        <h3 style="color: #274d4d; margin-top: 24px;">Customer Info</h3>
        <p><strong>Name:</strong> ${escapeHtml(customerName)}</p>
        <p><strong>Email:</strong> <a href="mailto:${customerEmail}" style="color: #5a8d71;">${escapeHtml(customerEmail)}</a></p>
        
        <h3 style="color: #274d4d;">Shipping Address</h3>
        ${addressHtml}
        
        <h3 style="color: #274d4d;">Order Items</h3>
        <ul style="padding-left: 20px; line-height: 1.6;">
          ${itemsHtmlList}
        </ul>
        
        <h3 style="color: #274d4d; border-top: 1px solid #e5e0d6; padding-top: 12px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; line-height: 1.5;">
          <tr>
            <td style="padding: 4px 0;">Subtotal:</td>
            <td style="text-align: right; padding: 4px 0;">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">Flat Shipping Rate:</td>
            <td style="text-align: right; padding: 4px 0;">$${shippingCost.toFixed(2)}</td>
          </tr>
          <tr style="font-weight: bold; font-size: 1.1em; border-top: 1px solid #e5e0d6;">
            <td style="padding: 8px 0;">Total Paid:</td>
            <td style="text-align: right; padding: 8px 0; color: #274d4d;">$${total.toFixed(2)}</td>
          </tr>
        </table>
      </div>
    `;

    await sendNotificationEmail({
      to: [RECEPTION_EMAIL, TECHA_EMAIL],
      subject: `New Wellness Shop Purchase — ${customerName}`,
      html: adminEmailHtml,
    });

    // Confirmation Email to Customer
    if (customerEmail) {
      const customerEmailHtml = `
        <div style="font-family: sans-serif; color: #292521; max-width: 600px; margin: 0 auto; border: 1px solid #e5e0d6; padding: 24px; border-radius: 12px; background: #faf8f4;">
          <h2 style="font-family: Georgia, serif; color: #274d4d; border-bottom: 1px solid #e5e0d6; padding-bottom: 12px;">Your TRIP Order Confirmation</h2>
          <p>Hi ${escapeHtml(customerName)},</p>
          <p>Thank you for shopping at the Proactive Medical and Wellness Shop! We have received your order and will ship it out to you shortly. You will find your order details below:</p>
          
          <h3 style="color: #274d4d; margin-top: 24px;">Shipping Address</h3>
          ${addressHtml}
          
          <h3 style="color: #274d4d;">Your Items</h3>
          <ul style="padding-left: 20px; line-height: 1.6;">
            ${itemsHtmlList}
          </ul>
          
          <h3 style="color: #274d4d; border-top: 1px solid #e5e0d6; padding-top: 12px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; line-height: 1.5;">
            <tr>
              <td style="padding: 4px 0;">Subtotal:</td>
              <td style="text-align: right; padding: 4px 0;">$${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">Shipping:</td>
              <td style="text-align: right; padding: 4px 0;">$${shippingCost.toFixed(2)}</td>
            </tr>
            <tr style="font-weight: bold; font-size: 1.1em; border-top: 1px solid #e5e0d6;">
              <td style="padding: 8px 0;">Total:</td>
              <td style="text-align: right; padding: 8px 0; color: #274d4d;">$${total.toFixed(2)}</td>
            </tr>
          </table>

          <p style="margin-top: 24px; font-size: 0.9em; color: #6b6459; text-align: center;">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          
          <p style="margin-top: 16px; font-size: 0.95em; color: #6b6459; text-align: center; border-top: 1px solid #e5e0d6; padding-top: 16px;">
            If you have any questions, please reply to this email or contact us at <a href="mailto:${RECEPTION_EMAIL}" style="color: #5a8d71;">${RECEPTION_EMAIL}</a>.
          </p>
        </div>
      `;

      await sendNotificationEmail({
        to: customerEmail,
        subject: `Your TRIP Order Confirmation — Proactive Medical and Wellness`,
        html: customerEmailHtml,
      });
    }

    return { success: true, order: newOrder };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unexpected helper error.";
    console.error("Error in processCompletedOrder helper:", err);
    return { success: false, error: errorMsg };
  }
}
