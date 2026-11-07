-- ==========================================================
-- Dindayal Jute & Craft (Indian Jute House) Supabase Schema
-- ==========================================================

-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('floor_mats', 'dining', 'planters', 'bags', 'ropes', 'decor')),
  price_inr NUMERIC NOT NULL CHECK (price_inr >= 0),
  mrp_inr NUMERIC NOT NULL CHECK (mrp_inr >= price_inr),
  rating NUMERIC DEFAULT 4.9,
  review_count INTEGER DEFAULT 120,
  dimensions TEXT,
  braid_weave_type TEXT,
  image_url TEXT NOT NULL,
  secondary_image_url TEXT,
  tag TEXT,
  badge TEXT,
  stock_qty INTEGER DEFAULT 50,
  is_featured BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  ambient_video_url TEXT NOT NULL,
  documentary_video_url TEXT NOT NULL,
  video_poster_url TEXT NOT NULL,
  announcement_text TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. WHOLESALE & BULK INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.wholesale_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone_whatsapp TEXT NOT NULL,
  email TEXT,
  category TEXT,
  approx_quantity INTEGER NOT NULL CHECK (approx_quantity > 0),
  custom_specifications TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'quoted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  total_amount_inr NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'COD' CHECK (payment_method IN ('COD', 'ONLINE', 'UPI')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  order_status TEXT DEFAULT 'received' CHECK (order_status IN ('received', 'processing', 'dispatched', 'delivered')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  product_title TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_inr NUMERIC NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wholesale_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public products viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public settings viewable by everyone" ON public.site_settings FOR SELECT USING (true);

-- Public Insert Policies (for inquiries & checkouts)
CREATE POLICY "Anyone can submit wholesale inquiry" ON public.wholesale_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON public.wholesale_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);

