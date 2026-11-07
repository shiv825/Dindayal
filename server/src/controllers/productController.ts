import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { Product } from '../types';

// Fallback seed catalog in case Supabase is offline/not configured yet
let mockProducts: Product[] = [
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
    id: 'prod-6',
    title: 'Dindayal 3-Strand Hawser-Laid Jute Rope (50m)',
    slug: 'dindayal-3-strand-hawser-laid-jute-rope',
    category: 'ropes',
    price_inr: 899,
    mrp_inr: 1499,
    rating: 4.9,
    review_count: 87,
    dimensions: '12mm Diameter x 50 Meters Coil',
    braid_weave_type: 'High Breaking Strength Industrial Grade',
    image_url: '/assets/images/jute_twisted_rope.jpg',
    tag: 'Heavy Duty 100% Pure Jute',
    badge: 'Industrial Core',
    stock_qty: 50,
    is_featured: false,
    is_bestseller: false,
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

export const getProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return res.json({ success: true, count: data.length, data });
      }
    }

    // Fallback
    let filtered = mockProducts;
    if (category && category !== 'all') {
      filtered = mockProducts.filter((p) => p.category === category);
    }
    return res.json({ success: true, count: filtered.length, data: filtered, source: 'fallback' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (!error && data) {
        return res.json({ success: true, data });
      }
    }

    const item = mockProducts.find((p) => p.slug === slug);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, data: item });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`,
      slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: req.body.rating || 4.9,
      review_count: req.body.review_count || 10,
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('products').insert([newProduct]).select().single();
      if (!error && data) {
        return res.status(201).json({ success: true, data });
      }
      if (error) console.error('Supabase product insert error:', error);
    }

    mockProducts.unshift(newProduct);
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
      if (!error && data) {
        return res.json({ success: true, data });
      }
    }

    const index = mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...updates };
      return res.json({ success: true, data: mockProducts[index] });
    }

    return res.status(404).json({ success: false, message: 'Product not found' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isSupabaseConfigured && supabase) {
      await supabase.from('products').delete().eq('id', id);
    }

    mockProducts = mockProducts.filter((p) => p.id !== id);
    return res.json({ success: true, message: 'Product removed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

