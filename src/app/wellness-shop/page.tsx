import type { Metadata } from "next";
import { getSupabaseClient } from "@/lib/supabase";
import ShopClientPage from "./ShopClientPage";

export const revalidate = 0; // Fetch fresh data on every request

export const metadata: Metadata = {
  title: "Wellness Shop | Proactive Medical and Wellness",
  description:
    "Discover TRIP Mindful Blend — lightly sparkling, alcohol-free wellness beverages made with magnesium and plant-based ingredients.",
};

export default async function WellnessShopPage() {
  let initialInventory = [
    { flavor_id: "wild_strawberry", name: "Wild Strawberry", is_available: true, image_url: "/images/wild_strawberry.png" },
    { flavor_id: "tropical_mango", name: "Tropical Mango", is_available: true, image_url: "/images/tropical_mango.png" },
    { flavor_id: "peach_ginger", name: "Peach Ginger", is_available: true, image_url: "/images/peach_ginger.png" },
    { flavor_id: "blood_orange", name: "Blood Orange", is_available: true, image_url: "/images/blood_orange.png" },
    { flavor_id: "elderflower_mint", name: "Elderflower Mint", is_available: true, image_url: "/images/elderflower_mint.png" },
  ];
  
  let shippingRate = 9.99;

  try {
    const supabase = getSupabaseClient();
    
    // Fetch inventory
    const { data: invData, error: invError } = await supabase
      .from("shop_inventory")
      .select("*")
      .order("name");

    if (!invError && invData && invData.length > 0) {
      initialInventory = invData;
    }

    // Fetch shipping rate
    const { data: settingsData, error: settingsError } = await supabase
      .from("shop_settings")
      .select("value")
      .eq("key", "shipping_rate")
      .single();

    if (!settingsError && settingsData) {
      shippingRate = parseFloat(settingsData.value);
    }
  } catch (err) {
    console.error("Failed to load shop data from database on server:", err);
  }

  return (
    <ShopClientPage 
      initialInventory={initialInventory} 
      shippingRate={shippingRate} 
    />
  );
}
