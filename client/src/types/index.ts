export type ProductCategory = 
  | 'all'
  | 'mats_carpets'
  | 'bags'
  | 'decor_crafts'
  | 'floor_mats' 
  | 'dining' 
  | 'planters' 
  | 'ropes' 
  | 'decor';

export const normalizeCategory = (cat: string): 'mats_carpets' | 'bags' | 'decor_crafts' => {
  if (cat === 'mats_carpets' || cat === 'floor_mats' || cat === 'dining' || cat === 'ropes') {
    return 'mats_carpets';
  }
  if (cat === 'bags') {
    return 'bags';
  }
  return 'decor_crafts';
};

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: 'mats_carpets' | 'bags' | 'decor_crafts' | 'floor_mats' | 'dining' | 'planters' | 'ropes' | 'decor' | string;
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

export interface SiteSettings {
  id: string;
  ambient_video_url: string;
  documentary_video_url: string;
  video_poster_url: string;
  announcement_text: string;
  contact_phone: string;
  contact_email: string;
  whatsapp_number: string;
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

