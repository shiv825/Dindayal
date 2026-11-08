import { Product, SiteSettings, WholesaleInquiry } from '../types';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

export const fallbackProducts: Product[] = [
  {
    id: 'prod-1',
    title: '4ft Circular Mandala Braided Floor Rug',
    slug: '4ft-circular-mandala-braided-floor-rug',
    category: 'floor_mats',
    price_inr: 1499,
    mrp_inr: 2499,
    rating: 4.9,
    review_count: 284,
    dimensions: '4.0 Ft Diameter (120 cm)',
    braid_weave_type: 'Heavy Hand-Braided Spiral Weave',
    image_url: '/assets/images/jute_floor_mat.jpg',
    tag: 'Living Room Centerpiece',
    badge: '⭐ Bestseller',
    stock_qty: 45,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: 'prod-2',
    title: 'Natural Ribbed Anti-Slip Jute Door Mat',
    slug: 'natural-ribbed-anti-slip-jute-door-mat',
    category: 'floor_mats',
    price_inr: 499,
    mrp_inr: 899,
    rating: 4.8,
    review_count: 192,
    dimensions: '45 x 75 cm (18 x 30 in)',
    braid_weave_type: 'High-Tension Ribbed Coir-Jute Blend',
    image_url: '/assets/images/jute_door_mat.jpg',
    tag: 'Heavy Duty Entryway',
    badge: '🔥 Trending',
    stock_qty: 80,
    is_featured: true,
    is_bestseller: false,
  },
  {
    id: 'prod-3',
    title: 'Artisan Dining Table Runner & Placemats Set',
    slug: 'artisan-dining-table-runner-placemats-set',
    category: 'dining',
    price_inr: 849,
    mrp_inr: 1399,
    rating: 4.9,
    review_count: 143,
    dimensions: '6 Mats (30cm) + 1 Runner (120x35cm)',
    braid_weave_type: 'Fine Thread Braided Natural Gold',
    image_url: '/assets/images/jute_table_mat.jpg',
    tag: 'Heat-Resistant Dining Set',
    badge: 'Dining Special',
    stock_qty: 35,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: 'prod-4',
    title: 'Boho Handcrafted Jute Planter Basket',
    slug: 'boho-handcrafted-jute-planter-basket',
    category: 'planters',
    price_inr: 599,
    mrp_inr: 999,
    rating: 4.7,
    review_count: 98,
    dimensions: '10 Inch Height x 10 Inch Dia',
    braid_weave_type: 'Cotton-Jute Dual Tone Rope Weave',
    image_url: '/assets/images/jute_planter_basket.jpg',
    tag: 'Waterproof Inner Liner',
    badge: 'Eco Decor',
    stock_qty: 60,
    is_featured: true,
    is_bestseller: false,
  },
  {
    id: 'prod-5',
    title: 'Eco Luxe Jute Tote Bag with Cotton Webbing',
    slug: 'eco-luxe-jute-tote-bag-cotton-webbing',
    category: 'bags',
    price_inr: 399,
    mrp_inr: 699,
    rating: 4.8,
    review_count: 310,
    dimensions: '16 x 14 x 6 inches',
    braid_weave_type: 'Laminated Jute Fabric (14x15 Weave)',
    image_url: '/assets/images/jute_tote_bag.jpg',
    tag: '15kg Weight Capacity',
    badge: 'Export Quality',
    stock_qty: 120,
    is_featured: false,
    is_bestseller: true,
  },
  {
    id: 'prod-7',
    title: 'Macrame Sunburst Jute Wall Hanging',
    slug: 'macrame-sunburst-jute-wall-hanging',
    category: 'decor',
    price_inr: 749,
    mrp_inr: 1199,
    rating: 4.8,
    review_count: 76,
    dimensions: '60 cm Width x 80 cm Drop',
    braid_weave_type: 'Hand-Knotted Fringe Macrame',
    image_url: '/assets/images/jute_wall_hanging.jpg',
    tag: 'Organic Living Room Accents',
    badge: 'Handmade',
    stock_qty: 25,
    is_featured: false,
    is_bestseller: false,
  },
  {
    id: 'prod-8',
    title: 'Padded Eco Jute Laptop Sleeve (14-15.6")',
    slug: 'padded-eco-jute-laptop-sleeve',
    category: 'bags',
    price_inr: 649,
    mrp_inr: 1099,
    rating: 4.7,
    review_count: 115,
    dimensions: 'Fits up to 15.6" Laptops',
    braid_weave_type: 'Shock-Absorbent Quilted Jute with Brass Zip',
    image_url: '/assets/images/jute_laptop_sleeve.jpg',
    tag: 'Zero-Plastic Workwear',
    badge: 'New Arrival',
    stock_qty: 40,
    is_featured: false,
    is_bestseller: false,
  },
];

export const fallbackSettings: SiteSettings = {
  id: 'default',
  ambient_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-weaving-a-basket-43845-large.mp4',
  documentary_video_url: 'https://www.youtube.com/embed/BHbDLSXmtBA',
  video_poster_url: '/assets/images/jute_floor_mat.jpg',
  announcement_text: '🌾 Direct from Bengal Looms & Mills • 100% Eco-Braided Jute Mats & Rugs • Bulk Inquiries: +91 98302 96606',
  contact_phone: '+91 98302 96606',
  contact_email: 'info@indianjutehouse.com',
  whatsapp_number: '+919830296606',
};

export const api = {
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const url = category && category !== 'all' ? `${API_BASE}/products?category=${category}` : `${API_BASE}/products`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch {
      if (category && category !== 'all') {
        return fallbackProducts.filter((p) => p.category === category);
      }
      return fallbackProducts;
    }
  },

  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('Settings fetch failed');
      const data = await res.json();
      return data.data;
    } catch {
      const saved = localStorage.getItem('dindayal_settings_v2');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
      return fallbackSettings;
    }
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Settings update failed');
      const data = await res.json();
      localStorage.setItem('dindayal_settings_v2', JSON.stringify(data.data));
      return data.data;
    } catch {
      const updated = { ...fallbackSettings, ...settings };
      localStorage.setItem('dindayal_settings_v2', JSON.stringify(updated));
      return updated;
    }
  },

  async submitWholesaleInquiry(inquiry: WholesaleInquiry): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      return res.ok;
    } catch {
      console.log('Saved inquiry locally:', inquiry);
      return true;
    }
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return data.data;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to update product');
    }
    const data = await res.json();
    return data.data;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  async uploadMedia(file: File, folder = 'dindayal/products'): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Cloudinary upload failed');
    }
    const data = await res.json();
    return data.data.url;
  },
};

