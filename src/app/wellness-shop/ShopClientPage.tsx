"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Sparkles, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

interface Flavor {
  flavor_id: string;
  name: string;
  is_available: boolean;
  image_url: string;
}

interface CartItem {
  id: string;
  type: "pack" | "box";
  flavorId?: string;
  flavorName?: string;
  flavors?: string[]; // Array of 3 flavor IDs
  flavorNames?: string[]; // Array of 3 flavor names
  quantity: number;
  price: number;
}

interface ShopClientPageProps {
  initialInventory: Flavor[];
  shippingRate: number;
}

export default function ShopClientPage({ initialInventory, shippingRate }: ShopClientPageProps) {
  const [inventory] = useState<Flavor[]>(initialInventory);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Box Builder State
  const [selectedBoxFlavors, setSelectedBoxFlavors] = useState<string[]>([]); // holds up to 3 flavor IDs

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("pmw_wellness_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        Promise.resolve().then(() => {
          setCart(parsed);
        });
      } catch (e) {
        console.error("Error parsing cart data:", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("pmw_wellness_cart", JSON.stringify(newCart));
  };

  // Add individual 4-pack to cart
  const addPackToCart = (flavorId: string) => {
    const flavor = inventory.find((f) => f.flavor_id === flavorId);
    if (!flavor || !flavor.is_available) return;

    const itemId = `pack-${flavorId}`;
    const existingIndex = cart.findIndex((item) => item.id === itemId);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: itemId,
        type: "pack",
        flavorId,
        flavorName: flavor.name,
        quantity: 1,
        price: 14.99,
      };
      saveCart([...cart, newItem]);
    }
    
    // Open cart drawer automatically
    setIsCartOpen(true);
  };

  // Box Builder actions
  const selectFlavorForBox = (flavorId: string) => {
    if (selectedBoxFlavors.length >= 3) return;
    setSelectedBoxFlavors([...selectedBoxFlavors, flavorId]);
  };

  const removeFlavorFromBox = (index: number) => {
    const updated = [...selectedBoxFlavors];
    updated.splice(index, 1);
    setSelectedBoxFlavors(updated);
  };

  const addBoxToCart = () => {
    if (selectedBoxFlavors.length !== 3) return;

    // Create unique key based on sorted flavor IDs
    const sortedFlavors = [...selectedBoxFlavors].sort();
    const itemId = `box-${sortedFlavors.join("-")}`;
    const existingIndex = cart.findIndex((item) => item.id === itemId);

    const flavorNames = selectedBoxFlavors.map(
      (fId) => inventory.find((f) => f.flavor_id === fId)?.name || fId
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: itemId,
        type: "box",
        flavors: selectedBoxFlavors,
        flavorNames,
        quantity: 1,
        price: 39.99,
      };
      saveCart([...cart, newItem]);
    }

    // Reset Box Builder & open cart
    setSelectedBoxFlavors([]);
    setIsCartOpen(true);
  };

  // Adjust cart items
  const updateQuantity = (itemId: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const removeItem = (itemId: string) => {
    const updated = cart.filter((item) => item.id !== itemId);
    saveCart(updated);
  };

  // Calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal > 0 ? subtotal + shippingRate : 0;

  // Checkout process
  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            type: item.type,
            flavorId: item.flavorId,
            flavors: item.flavors,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Redirect to Stripe Checkout Page
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned from Stripe.");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Could not complete checkout. Please try again.";
      console.error("Checkout Error:", err);
      setCheckoutError(errorMsg);
      setIsCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Visual Shop Hero Banner */}
      <section className="relative bg-texture-dots bg-primary-50 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-dark shadow-soft">
            <Sparkles className="h-3 w-3 text-secondary" /> Wellness Shop
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Find Your Calm
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-soft">
            Discover TRIP Mindful Blend — lightly sparkling, alcohol-free wellness beverages made with magnesium and plant-based ingredients. A refreshing option for mindful moments, unwinding, or simply enjoying something different.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 mt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* LEFT/MAIN COLUMN: Products & Visual Box Builder (8 Cols) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* FEATURED: Build Your Calm Box */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/80 pb-6">
                <div>
                  <span className="inline-block rounded-full bg-secondary-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-deep">
                    Featured Choice
                  </span>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                    Build Your Calm Box — Pick Your 3
                  </h2>
                  <p className="mt-1 text-sm text-soft">
                    Choose any three TRIP 4-packs to create a custom 12-can box.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary-dark">$39.99</span>
                  <p className="text-xs text-soft">12 Cans total • Mix &amp; Match</p>
                </div>
              </div>

              {/* 3 Box Selector Slots */}
              <div className="mt-8">
                <p className="text-center text-sm font-medium text-foreground/80 mb-4">
                  {selectedBoxFlavors.length === 0
                    ? "Select 3 packs from the flavors below to build your box"
                    : `Selected: ${selectedBoxFlavors.length} of 3 4-packs`}
                </p>
                
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto sm:gap-6">
                  {[0, 1, 2].map((idx) => {
                    const flavorId = selectedBoxFlavors[idx];
                    const selectedFlavor = flavorId 
                      ? inventory.find((f) => f.flavor_id === flavorId) 
                      : null;

                    return (
                      <div 
                        key={idx} 
                        className={`group relative aspect-[3/4] flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                          selectedFlavor 
                            ? "border-primary/30 bg-primary-50/20" 
                            : "border-dashed border-border bg-background hover:border-soft"
                        }`}
                      >
                        {selectedFlavor ? (
                          <div className="relative w-full h-full p-2 flex flex-col items-center justify-between">
                            <div className="relative w-full flex-1 max-h-[80%]">
                              <Image
                                src={selectedFlavor.image_url}
                                alt={selectedFlavor.name}
                                fill
                                sizes="100px"
                                className="object-contain p-1"
                              />
                            </div>
                            <span className="text-[10px] sm:text-xs font-semibold text-center text-foreground truncate w-full max-w-[90%] px-1">
                              {selectedFlavor.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFlavorFromBox(idx)}
                              aria-label={`Remove ${selectedFlavor.name} from slot ${idx + 1}`}
                              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-white hover:bg-secondary transition-colors shadow-soft"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-center p-3 text-border group-hover:text-soft transition-colors pointer-events-none">
                            <Plus className="h-6 w-6" />
                            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider">
                              Empty
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    disabled={selectedBoxFlavors.length !== 3}
                    onClick={addBoxToCart}
                    className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold shadow-soft transition-all duration-300 ${
                      selectedBoxFlavors.length === 3
                        ? "bg-secondary text-white hover:bg-secondary-dark hover:-translate-y-0.5"
                        : "bg-border text-soft cursor-not-allowed"
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add Calm Box to Cart
                  </button>
                </div>
              </div>

              {/* Flavor Selection Grid for Box Builder */}
              <div className="mt-10 border-t border-border/60 pt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-soft mb-6 text-center">
                  Available Flavors (Select Three)
                </h3>
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {inventory.map((flavor) => {
                    const countInBox = selectedBoxFlavors.filter((fId) => fId === flavor.flavor_id).length;
                    const isBoxFull = selectedBoxFlavors.length >= 3;

                    return (
                      <div 
                        key={flavor.flavor_id} 
                        className={`relative rounded-xl border p-3 flex flex-col items-center text-center transition-all ${
                          !flavor.is_available 
                            ? "bg-border/20 border-border/50 opacity-60" 
                            : isBoxFull 
                              ? "border-border bg-white"
                              : "border-border hover:border-primary/50 bg-white hover:shadow-soft cursor-pointer"
                        }`}
                        onClick={() => flavor.is_available && !isBoxFull && selectFlavorForBox(flavor.flavor_id)}
                      >
                        <div className="relative w-16 h-28">
                          <Image
                            src={flavor.image_url}
                            alt={flavor.name}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        </div>
                        <span className="mt-2 text-xs font-bold text-foreground">
                          {flavor.name}
                        </span>
                        
                        {!flavor.is_available ? (
                          <span className="mt-1.5 inline-block rounded bg-red-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-600">
                            Sold Out
                          </span>
                        ) : countInBox > 0 ? (
                          <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-soft">
                            {countInBox}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* OPTION 2: Individual 4-Packs */}
            <div>
              <div className="border-b border-border/80 pb-4 mb-8">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Shop Individual 4-Packs
                </h2>
                <p className="text-sm text-soft mt-1">
                  Prefer a single flavor? Purchase individual 4-packs ($14.99 each).
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inventory.map((flavor) => (
                  <div 
                    key={flavor.flavor_id} 
                    className={`rounded-xl border border-border bg-white p-5 flex flex-col justify-between shadow-soft hover:shadow-soft-lg transition-shadow relative ${
                      !flavor.is_available ? "opacity-75" : ""
                    }`}
                  >
                    <div>
                      <div className="relative w-full aspect-square max-h-40 mx-auto flex items-center justify-center">
                        <div className="relative w-24 h-36">
                          <Image
                            src={flavor.image_url}
                            alt={flavor.name}
                            fill
                            sizes="120px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground text-center">
                        TRIP 4-Pack — {flavor.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-soft text-center line-clamp-2">
                        Lightly sparkling wellness blend made with magnesium and plant-based ingredients.
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-2 border-t border-border/50 pt-4">
                      <span className="text-lg font-bold text-foreground">$14.99</span>
                      
                      {flavor.is_available ? (
                        <button
                          type="button"
                          onClick={() => addPackToCart(flavor.flavor_id)}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-colors shadow-soft"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 bg-border text-soft rounded-lg text-xs font-bold">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DISCLAIMERS */}
            <div className="border-t border-border/80 pt-8">
              <p className="text-center text-xs italic leading-relaxed text-soft max-w-xl mx-auto">
                “These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.”
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Static Cart Widget/Summary for Desktop (4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2 mb-6 pb-4 border-b border-border/80">
                <ShoppingBag className="h-5 w-5 text-primary" /> Shopping Cart
              </h3>

              {cart.length === 0 ? (
                <div className="py-8 text-center text-soft">
                  <p>Your cart is empty.</p>
                  <p className="text-xs mt-2">Add individual 4-packs or build your own custom Calm Box to begin.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cart items list */}
                  <div className="max-h-[350px] overflow-y-auto space-y-4 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 pb-4 border-b border-border/40">
                        {item.type === "pack" ? (
                          <div className="relative h-14 w-8 shrink-0 bg-background rounded p-1 flex items-center justify-center">
                            <Image
                              src={inventory.find((f) => f.flavor_id === item.flavorId)?.image_url || ""}
                              alt={item.flavorName || ""}
                              fill
                              sizes="30px"
                              className="object-contain p-0.5"
                            />
                          </div>
                        ) : (
                          <div className="h-14 w-8 shrink-0 bg-primary-50/30 border border-primary/10 rounded flex items-center justify-center text-primary font-bold text-xs uppercase">
                            Box
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {item.type === "pack" 
                              ? `TRIP 4-Pack — ${item.flavorName}` 
                              : "Build Your Calm Box (Pick 3)"}
                          </p>
                          {item.type === "box" && item.flavorNames && (
                            <p className="text-[10px] text-soft truncate">
                              {item.flavorNames.join(", ")}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-border rounded bg-background">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-border/40 text-soft hover:text-foreground transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-xs font-semibold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-border/40 text-soft hover:text-foreground transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-xs font-bold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-soft hover:text-red-500 self-start p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="space-y-2 border-t border-border/80 pt-4 text-sm">
                    <div className="flex justify-between text-soft">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-soft">
                      <span>Flat Shipping</span>
                      <span>${shippingRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-foreground text-base border-t border-border/40 pt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 flex items-start gap-1.5 border border-red-200">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{checkoutError}</span>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <button
                    type="button"
                    disabled={isCheckoutLoading}
                    onClick={handleCheckout}
                    className="w-full py-3 bg-secondary text-white font-bold rounded-xl shadow-soft hover:bg-secondary-dark hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    {isCheckoutLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirecting to Stripe...
                      </>
                    ) : (
                      <>
                        Pay Online with Stripe
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Shopping Bag Trigger for Mobile/Tablet */}
      {cartItemCount > 0 && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-soft-xl hover:bg-secondary-dark transition-all duration-300 lg:hidden"
        >
          <div className="relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-3.5 -right-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold shadow-soft">
              {cartItemCount}
            </span>
          </div>
        </button>
      )}

      {/* Slide-out Cart Drawer Overlay (Mobile/Tablet drawer view) */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-charcoal/40 backdrop-blur-xs" 
          onClick={() => setIsCartOpen(false)}
        />
        <div 
          className={`absolute inset-y-0 right-0 max-w-md w-full bg-white h-full shadow-soft-xl flex flex-col justify-between p-6 transition-transform duration-300 transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
              </h3>
              <button 
                type="button" 
                onClick={() => setIsCartOpen(false)}
                className="text-soft hover:text-foreground transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-16 text-center text-soft">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-border/40">
                    {item.type === "pack" ? (
                      <div className="relative h-14 w-8 shrink-0 bg-background rounded p-1 flex items-center justify-center">
                        <Image
                          src={inventory.find((f) => f.flavor_id === item.flavorId)?.image_url || ""}
                          alt={item.flavorName || ""}
                          fill
                          sizes="30px"
                          className="object-contain p-0.5"
                        />
                      </div>
                    ) : (
                      <div className="h-14 w-8 shrink-0 bg-primary-50/30 border border-primary/10 rounded flex items-center justify-center text-primary font-bold text-xs">
                        Box
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">
                        {item.type === "pack" ? `TRIP 4-Pack — ${item.flavorName}` : "Build Your Calm Box"}
                      </p>
                      {item.type === "box" && item.flavorNames && (
                        <p className="text-[10px] text-soft truncate">
                          {item.flavorNames.join(", ")}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded bg-background">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-border/40 text-soft"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-foreground">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-border/40 text-soft"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-soft hover:text-red-500 self-start p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-border pt-4 mt-auto">
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between text-soft">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-soft">
                  <span>Flat Shipping</span>
                  <span>${shippingRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground text-base border-t border-border/40 pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {checkoutError && (
                <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 flex items-start gap-1.5 border border-red-200 mb-4">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>{checkoutError}</span>
                </div>
              )}

              <button
                type="button"
                disabled={isCheckoutLoading}
                onClick={handleCheckout}
                className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl shadow-soft hover:bg-secondary-dark flex items-center justify-center gap-2"
              >
                {isCheckoutLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    Pay Online with Stripe
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
