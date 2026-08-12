"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Lock, 
  Settings, 
  ShoppingBag, 
  Truck, 
  AlertCircle, 
  Check, 
  RefreshCw, 
  ToggleLeft, 
  ToggleRight 
} from "lucide-react";

interface Setting {
  key: string;
  value: string;
}

interface Flavor {
  flavor_id: string;
  name: string;
  is_available: boolean;
  image_url: string;
}

interface OrderItem {
  type: "pack" | "box";
  flavorName?: string;
  flavorNames?: string[];
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
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
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_status: string;
  fulfillment_status: "pending" | "shipped";
}

export default function ShopAdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Dashboard Data State
  const [inventory, setInventory] = useState<Flavor[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  const [activeTab, setActiveTab] = useState<"orders" | "settings">("orders");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // tracks IDs of buttons running actions
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  // Settings Inputs
  const [shippingRateInput, setShippingRateInput] = useState("9.99");

  const verifyAndLoad = async (codeToVerify: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/shop/settings", {
        method: "GET",
        headers: {
          "x-admin-passcode": codeToVerify,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid passcode.");
      }

      // Success
      setInventory(data.inventory);
      setOrders(data.orders);
      
      const rateSetting = data.settings.find((s: Setting) => s.key === "shipping_rate");
      if (rateSetting) {
        setShippingRateInput(rateSetting.value);
      }

      setPasscode(codeToVerify);
      sessionStorage.setItem("pmw_admin_passcode", codeToVerify);
      setIsAuthorized(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to authorize passcode.";
      console.error(err);
      setAuthError(errorMsg);
      sessionStorage.removeItem("pmw_admin_passcode");
    } finally {
      setLoading(false);
    }
  };

  // Check session storage on load
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem("pmw_admin_passcode");
    if (savedPasscode) {
      Promise.resolve().then(() => {
        verifyAndLoad(savedPasscode);
      });
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    verifyAndLoad(passcode.trim());
  };

  const runAdminAction = async (action: string, payload: Record<string, unknown>, loadingKey: string) => {
    setActionLoading(loadingKey);
    setMessage(null);

    try {
      const res = await fetch("/api/shop/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({ action, ...payload }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Action failed.");
      }

      setMessage({ text: data.message || "Operation successful!", type: "success" });
      
      // Reload fresh data
      await verifyAndLoad(passcode);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Admin Action Error:", err);
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  // Admin action triggers
  const handleUpdateShippingRate = () => {
    runAdminAction("update_shipping_rate", { value: shippingRateInput }, "shipping_rate");
  };

  const handleToggleInventory = (flavorId: string, currentAvailable: boolean) => {
    runAdminAction("update_inventory", { flavorId, isAvailable: !currentAvailable }, `inv-${flavorId}`);
  };

  const handleMarkOrderShipped = (orderId: string) => {
    runAdminAction("update_fulfillment", { orderId, status: "shipped" }, `fulfill-${orderId}`);
  };

  const handleMarkOrderPending = (orderId: string) => {
    runAdminAction("update_fulfillment", { orderId, status: "pending" }, `fulfill-${orderId}`);
  };

  const handleRegisterWebhook = () => {
    runAdminAction("register_webhook", {}, "webhook_reg");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pmw_admin_passcode");
    setIsAuthorized(false);
    setPasscode("");
  };

  // Count pending orders
  const pendingOrdersCount = orders.filter((o) => o.fulfillment_status === "pending").length;

  // Render Login Panel
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-border rounded-2xl shadow-soft p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary-dark">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-heading text-2xl font-semibold text-foreground">
              Wellness Shop Admin
            </h1>
            <p className="mt-1 text-sm text-soft">
              Enter your passcode to manage shipping, inventory, and orders.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="passcode" className="sr-only">Passcode</label>
              <input
                id="passcode"
                type="password"
                required
                placeholder="Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            {authError && (
              <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 flex items-center gap-1.5 border border-red-200">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-soft hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Admin Header */}
      <header className="bg-white border-b border-border py-6 shadow-soft">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-soft">
                Authorized Session
              </span>
            </div>
            <h1 className="font-heading text-2xl font-semibold text-foreground mt-1">
              Shop Management Panel
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 border border-border text-soft rounded-lg text-xs font-semibold hover:bg-background transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <main className="mx-auto max-w-7xl px-4 mt-8 sm:px-6 lg:px-8">
        
        {/* Alerts and Action Messages */}
        {message && (
          <div 
            className={`mb-6 rounded-xl p-4 text-sm flex items-start gap-2 border ${
              message.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <Check className="h-4 w-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-border/80 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`pb-4 text-sm font-bold flex items-center gap-2 relative transition-colors ${
              activeTab === "orders" ? "text-primary-dark" : "text-soft hover:text-foreground"
            }`}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            Orders History
            {pendingOrdersCount > 0 && (
              <span className="ml-1 rounded-full bg-secondary-light px-2 py-0.5 text-[10px] font-bold text-secondary-deep">
                {pendingOrdersCount} pending
              </span>
            )}
            {activeTab === "orders" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-secondary" />
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`pb-4 text-sm font-bold flex items-center gap-2 relative transition-colors ${
              activeTab === "settings" ? "text-primary-dark" : "text-soft hover:text-foreground"
            }`}
          >
            <Settings className="h-4.5 w-4.5" />
            Shop settings &amp; Inventory
            {activeTab === "settings" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-secondary" />
            )}
          </button>
        </div>

        {/* TAB CONTENT: ORDERS */}
        {activeTab === "orders" && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Customer Orders ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <div className="rounded-xl border border-border bg-white p-12 text-center text-soft shadow-soft">
                <ShoppingBag className="mx-auto h-12 w-12 text-border" />
                <p className="mt-4">No completed orders found.</p>
                <p className="text-xs mt-1">Orders will appear here once customers pay via Stripe.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div 
                      key={order.id} 
                      className="rounded-xl border border-border bg-white shadow-soft overflow-hidden"
                    >
                      {/* Top Header Card */}
                      <div className="bg-background px-6 py-4 border-b border-border/80 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-soft">Order Date</p>
                          <p className="text-sm font-bold text-foreground">{dateStr}</p>
                        </div>
                        <div>
                          <p className="text-xs text-soft text-right">Reference ID</p>
                          <code className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-border/60 text-foreground/80 break-all select-all">
                            {order.id}
                          </code>
                        </div>
                        <div>
                          {order.fulfillment_status === "shipped" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                              <Check className="h-3.5 w-3.5" /> Shipped
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-200">
                              <Truck className="h-3.5 w-3.5 animate-bounce" /> Pending Shipping
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Customer & Shipping (5 Cols) */}
                        <div className="md:col-span-5 space-y-4">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-soft">
                              Customer Info
                            </h3>
                            <p className="text-sm font-bold mt-1 text-foreground">
                              {order.customer_name}
                            </p>
                            <p className="text-sm">
                              <a href={`mailto:${order.customer_email}`} className="text-accent hover:underline">
                                {order.customer_email}
                              </a>
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-soft">
                              Shipping Address
                            </h3>
                            <div className="text-sm mt-1 text-foreground leading-relaxed">
                              <p>{order.shipping_address?.line1}</p>
                              {order.shipping_address?.line2 && <p>{order.shipping_address.line2}</p>}
                              <p>
                                {order.shipping_address?.city}, {order.shipping_address?.state}{" "}
                                {order.shipping_address?.postal_code}
                              </p>
                              <p className="text-xs text-soft">{order.shipping_address?.country}</p>
                            </div>
                          </div>
                        </div>

                        {/* Items Purchased (4 Cols) */}
                        <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0 md:pl-6">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-soft mb-2">
                            Items Ordered
                          </h3>
                          <ul className="space-y-3 divide-y divide-border/30">
                            {order.items?.map((item, idx) => (
                              <li key={idx} className="text-xs pt-2 first:pt-0">
                                <p className="font-bold text-foreground">
                                  {item.type === "pack" 
                                    ? `TRIP 4-Pack — ${item.flavorName}` 
                                    : "Build Your Calm Box (Pick 3)"}
                                  <span className="text-soft font-normal ml-1.5">x{item.quantity}</span>
                                </p>
                                {item.type === "box" && item.flavorNames && (
                                  <p className="text-[10px] text-soft mt-0.5 leading-normal">
                                    Flavors: {item.flavorNames.join(", ")}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Totals & Actions (3 Cols) */}
                        <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-soft">
                              Cost Summary
                            </h3>
                            <table className="w-full text-xs mt-2 text-foreground/90">
                              <tbody>
                                <tr>
                                  <td className="text-soft py-0.5">Subtotal:</td>
                                  <td className="text-right">${order.subtotal?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                  <td className="text-soft py-0.5">Shipping:</td>
                                  <td className="text-right">${order.shipping_cost?.toFixed(2)}</td>
                                </tr>
                                <tr className="font-bold border-t border-border/30 pt-1.5">
                                  <td className="py-1">Total:</td>
                                  <td className="text-right text-primary-dark">${order.total?.toFixed(2)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-6">
                            {order.fulfillment_status === "pending" ? (
                              <button
                                type="button"
                                disabled={actionLoading === `fulfill-${order.id}`}
                                onClick={() => handleMarkOrderShipped(order.id)}
                                className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold shadow-soft transition-colors flex items-center justify-center gap-1.5"
                              >
                                {actionLoading === `fulfill-${order.id}` ? (
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Truck className="h-3.5 w-3.5" />
                                )}
                                Mark as Shipped
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={actionLoading === `fulfill-${order.id}`}
                                onClick={() => handleMarkOrderPending(order.id)}
                                className="w-full py-2 border border-border text-soft hover:bg-background rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                              >
                                {actionLoading === `fulfill-${order.id}` ? (
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                                ) : (
                                  "Revert to Pending"
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: SETTINGS */}
        {activeTab === "settings" && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* INVENTORY ADJUSTMENTS (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
                  Product Inventory
                </h2>
                <p className="text-xs text-soft mb-6">
                  Toggle flavor availability. When marked &quot;Sold Out&quot;, it will automatically disable purchase in the Visual Box Builder and individual 4-packs list.
                </p>

                <div className="divide-y divide-border/60">
                  {inventory.map((flavor) => (
                    <div 
                      key={flavor.flavor_id} 
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-8 shrink-0 bg-background rounded p-1 flex items-center justify-center">
                          <Image
                            src={flavor.image_url}
                            alt={flavor.name}
                            fill
                            sizes="40px"
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{flavor.name}</p>
                          <p className="text-xs text-soft">
                            {flavor.is_available ? "In Stock & available" : "Sold out (hidden)"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={actionLoading === `inv-${flavor.flavor_id}`}
                        onClick={() => handleToggleInventory(flavor.flavor_id, flavor.is_available)}
                        className="text-soft transition-colors focus:outline-none"
                        aria-label={`Toggle availability for ${flavor.name}`}
                      >
                        {actionLoading === `inv-${flavor.flavor_id}` ? (
                          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                        ) : flavor.is_available ? (
                          <ToggleRight className="h-8 w-8 text-primary" />
                        ) : (
                          <ToggleLeft className="h-8 w-8 text-soft" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SHIPPING & WEBHOOK CONFIGS (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Shipping settings card */}
              <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
                  Shipping Fee
                </h2>
                <p className="text-xs text-soft mb-4">
                  Adjust the flat rate shipping cost applied at Stripe Checkout.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="shipping-rate" className="sr-only">Flat Shipping Rate</label>
                    <div className="relative rounded-lg shadow-soft-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-soft text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        id="shipping-rate"
                        value={shippingRateInput}
                        onChange={(e) => setShippingRateInput(e.target.value)}
                        placeholder="9.99"
                        className="w-full rounded-lg border border-border bg-background py-2.5 pl-7 pr-3 text-sm font-bold text-foreground focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={actionLoading === "shipping_rate"}
                    onClick={handleUpdateShippingRate}
                    className="w-full py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5 shadow-soft"
                  >
                    {actionLoading === "shipping_rate" ? (
                      <RefreshCw className="h-3 w-3 animate-spin" />
                    ) : (
                      "Save Shipping Rate"
                    )}
                  </button>
                </div>
              </div>

              {/* Stripe Webhook Integration Card */}
              <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
                  Stripe Webhook
                </h2>
                <p className="text-xs text-soft mb-4">
                  Automatically register the webhook endpoint in your Stripe Dashboard to handle orders if customers close their window.
                </p>

                <button
                  type="button"
                  disabled={actionLoading === "webhook_reg"}
                  onClick={handleRegisterWebhook}
                  className="w-full py-2 border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-background transition-colors flex items-center justify-center gap-1.5"
                >
                  {actionLoading === "webhook_reg" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    "Register/Initialize Webhook"
                  )}
                </button>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
