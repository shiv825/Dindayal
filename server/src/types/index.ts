export type ProductCategory = 
  | 'floor_mats' 
  | 'dining' 
  | 'planters' 
  | 'bags' 
  | 'ropes' 
  | 'decor';

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  price_inr: number;
  mrp_inr: number;
  rating: number;
  review_count: number;
  dimensions?: string;
  braid_weave_type?: string;
  image_url: string;
  secondary_image_url?: string;
  tag?: string;
  badge?: string;
  stock_qty: number;
  is_featured: boolean;
  is_bestseller: boolean;
  created_at?: string;
}

export interface SiteSettings {
  id: string;
  ambient_video_url: string;
  documentary_video_url: string;
  video_poster_url: string;
  announcement_text: string;
  contact_phone: string;
  contact_email: string;
  whatsapp_number: string;
  updated_at?: string;
}

export interface WholesaleInquiry {
  id?: string;
  business_name: string;
  contact_name: string;
  phone_whatsapp: string;
  email?: string;
  category?: string;
  approx_quantity: number;
  custom_specifications?: string;
  status?: 'pending' | 'contacted' | 'quoted' | 'closed';
  created_at?: string;
}

export interface OrderItem {
  product_id: string;
  product_title: string;
  quantity: number;
  unit_price_inr: number;
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_address: string;
  city: string;
  pincode: string;
  total_amount_inr: number;
  payment_method?: 'COD' | 'ONLINE' | 'UPI';
  items: OrderItem[];
}

