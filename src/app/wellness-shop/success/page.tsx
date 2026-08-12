"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Loader2, AlertCircle, ShoppingBag, Home } from "lucide-react";

interface OrderDetails {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  items: Array<{
    type: "pack" | "box";
    flavorName?: string;
    flavorNames?: string[];
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping_cost: number;
  total: number;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setError("No session ID found. We couldn't locate your transaction details.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/shop/confirm?session_id=${sessionId}`);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to confirm payment.");
        }

        setOrder(data.order);
        
        // Clear cart from local storage since the order succeeded
        localStorage.removeItem("pmw_wellness_cart");
        
        setLoading(false);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "An error occurred while confirming your order.";
        console.error("Payment Confirmation Error on Success Page:", err);
        setError(errorMsg);
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-6 text-xl font-semibold text-foreground">Verifying Your Payment...</h2>
        <p className="text-sm text-soft mt-2">Please do not close this window or refresh the page.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-soft">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground">Order Inquiry Error</h2>
        <p className="mt-3 text-sm text-soft leading-relaxed">{error}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/wellness-shop"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary-dark transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Back to Wellness Shop
          </Link>
          <a
            href="mailto:reception@proactivemedicalandwellness.com"
            className="text-xs font-semibold text-accent hover:underline"
          >
            Need Help? Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-10">
      <div className="text-center pb-8 border-b border-border/80">
        <CheckCircle className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Thank You for Your Order!
        </h1>
        <p className="mt-2 text-sm text-soft">
          Your order has been placed. We have sent a confirmation email to{" "}
          <span className="font-semibold text-foreground">{order?.customer_email}</span>.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {/* Order Details */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-soft border-b border-border/60 pb-2">
            Order Reference
          </h2>
          <div className="mt-3 text-sm flex flex-col sm:flex-row sm:justify-between gap-1 text-foreground">
            <div>
              <span className="text-soft">Transaction ID:</span>{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono text-foreground/80 break-all select-all">
                {order?.id}
              </code>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        {order?.shipping_address && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-soft border-b border-border/60 pb-2">
              Shipping Address
            </h2>
            <div className="mt-3 text-sm text-foreground leading-relaxed">
              <p className="font-semibold">{order.customer_name}</p>
              <p>{order.shipping_address.line1} {order.shipping_address.line2}</p>
              <p>
                {order.shipping_address.city}, {order.shipping_address.state}{" "}
                {order.shipping_address.postal_code}
              </p>
              <p className="text-xs text-soft mt-1">{order.shipping_address.country}</p>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-soft border-b border-border/60 pb-2">
            Items Ordered
          </h2>
          <div className="mt-4 divide-y divide-border/40">
            {order?.items.map((item, index) => (
              <div key={index} className="flex justify-between py-3 text-sm first:pt-0">
                <div>
                  <p className="font-bold text-foreground">
                    {item.type === "pack"
                      ? `TRIP 4-Pack — ${item.flavorName}`
                      : "Build Your Calm Box (Pick Your 3)"}
                    <span className="text-soft font-normal ml-1.5">x{item.quantity}</span>
                  </p>
                  {item.type === "box" && item.flavorNames && (
                    <p className="text-xs text-soft mt-1 leading-normal">
                      Flavors: {item.flavorNames.join(", ")}
                    </p>
                  )}
                </div>
                <span className="font-bold text-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Receipt Totals */}
        <div className="rounded-xl bg-background p-5 border border-border/40 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between text-soft">
              <span>Subtotal</span>
              <span>${order?.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-soft">
              <span>Flat Shipping</span>
              <span>${order?.shipping_cost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-foreground text-base border-t border-border/40 pt-3">
              <span>Total Paid</span>
              <span className="text-primary-dark">${order?.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center border-t border-border/65 pt-8">
        <Link
          href="/wellness-shop"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary-dark transition-all duration-300"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-bold text-foreground hover:bg-background transition-all duration-300"
        >
          <Home className="h-4 w-4 text-soft" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="mt-6 text-xl font-semibold text-foreground">Loading Page...</h2>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
