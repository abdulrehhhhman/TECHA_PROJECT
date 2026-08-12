-- ==========================================
-- TRIP Wellness Shop - Supabase Schema
-- ==========================================
-- Run this script in your Supabase SQL Editor.

-- 1. Create shop_settings table
CREATE TABLE IF NOT EXISTS shop_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Seed initial shipping rate
INSERT INTO shop_settings (key, value)
VALUES ('shipping_rate', '9.99')
ON CONFLICT (key) DO NOTHING;

-- 2. Create shop_inventory table
CREATE TABLE IF NOT EXISTS shop_inventory (
  flavor_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_available BOOLEAN DEFAULT TRUE NOT NULL,
  image_url TEXT NOT NULL
);

-- Seed initial launch flavors (the 5 flavors with extracted images)
INSERT INTO shop_inventory (flavor_id, name, is_available, image_url)
VALUES 
  ('wild_strawberry', 'Wild Strawberry', TRUE, '/images/wild_strawberry.png'),
  ('tropical_mango', 'Tropical Mango', TRUE, '/images/tropical_mango.png'),
  ('peach_ginger', 'Peach Ginger', TRUE, '/images/peach_ginger.png'),
  ('blood_orange', 'Blood Orange', TRUE, '/images/blood_orange.png'),
  ('elderflower_mint', 'Elderflower Mint', TRUE, '/images/elderflower_mint.png')
ON CONFLICT (flavor_id) 
DO UPDATE SET 
  name = EXCLUDED.name, 
  image_url = EXCLUDED.image_url;

-- 3. Create shop_orders table
CREATE TABLE IF NOT EXISTS shop_orders (
  id TEXT PRIMARY KEY, -- Stripe Session ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_cost NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  payment_status TEXT NOT NULL,
  fulfillment_status TEXT DEFAULT 'pending' NOT NULL
);

-- Disable Row Level Security (RLS) on these tables for simplicity,
-- allowing direct queries from our backend API routes.
ALTER TABLE shop_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE shop_inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE shop_orders DISABLE ROW LEVEL SECURITY;
