export type ProductCategory = 
  | 'all'
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
  category: 'floor_mats' | 'dining' | 'planters' | 'bags' | 'ropes' | 'decor';
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
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ThemePalette = 'emerald' | 'gold' | 'terracotta' | 'midnight';

export interface SiteSettings {
  id: string;
  store_name?: string;
  store_subtitle?: string;
  gstin_number?: string;
  announcement_text: string;
  contact_phone: string;
  contact_email: string;
  whatsapp_number: string;
  hero_headline?: string;
  hero_subtitle?: string;
  trust_badge_1_val?: string;
  trust_badge_1_label?: string;
  trust_badge_2_val?: string;
  trust_badge_2_label?: string;
  trust_badge_3_val?: string;
  trust_badge_3_label?: string;
  rope_badge_1?: string;
  rope_badge_2?: string;
  rope_badge_3?: string;
  theme_palette?: ThemePalette;
  ambient_video_url: string;
  documentary_video_url: string;
  video_poster_url: string;
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
  status?: string;
  created_at?: string;
}

export interface RoomStage {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  dimensions: string;
  image: string;
  description: string;
}

