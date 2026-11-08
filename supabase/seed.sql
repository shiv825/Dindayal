-- Seed Default Site Settings
INSERT INTO public.site_settings (
  id,
  ambient_video_url,
  documentary_video_url,
  video_poster_url,
  announcement_text,
  contact_phone,
  contact_email,
  whatsapp_number
) VALUES (
  'default',
  'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-weaving-a-basket-43845-large.mp4',
  'https://www.youtube.com/embed/BHbDLSXmtBA',
  '/assets/images/jute_floor_mat.jpg',
  '🌾 Direct from Bengal Looms & Mills • 100% Eco-Braided Jute Mats & Rugs • Bulk Inquiries: +91 98302 96606',
  '+91 98302 96606',
  'info@indianjutehouse.com',
  '+919830296606'
) ON CONFLICT (id) DO UPDATE SET
  documentary_video_url = EXCLUDED.documentary_video_url,
  ambient_video_url = EXCLUDED.ambient_video_url;

-- Seed Products
INSERT INTO public.products (
  title, slug, category, price_inr, mrp_inr, rating, review_count, dimensions, braid_weave_type, image_url, tag, badge, stock_qty, is_featured, is_bestseller
) VALUES
(
  '4ft Circular Mandala Braided Floor Rug',
  '4ft-circular-mandala-braided-floor-rug',
  'floor_mats',
  1499,
  2499,
  4.9,
  284,
  '4.0 Ft Diameter (120 cm)',
  'Heavy Hand-Braided Spiral Weave',
  '/assets/images/jute_floor_mat.jpg',
  'Living Room Centerpiece',
  '⭐ Bestseller',
  45,
  true,
  true
),
(
  'Natural Ribbed Anti-Slip Jute Door Mat',
  'natural-ribbed-anti-slip-jute-door-mat',
  'floor_mats',
  499,
  899,
  4.8,
  192,
  '45 x 75 cm (18 x 30 in)',
  'High-Tension Ribbed Coir-Jute Blend',
  '/assets/images/jute_door_mat.jpg',
  'Heavy Duty Entryway',
  '🔥 Trending',
  80,
  true,
  false
),
(
  'Artisan Dining Table Runner & Placemats Set',
  'artisan-dining-table-runner-placemats-set',
  'dining',
  849,
  1399,
  4.9,
  143,
  '6 Mats (30cm) + 1 Runner (120x35cm)',
  'Fine Thread Braided Natural Gold',
  '/assets/images/jute_table_mat.jpg',
  'Heat-Resistant Dining Set',
  'Dining Special',
  35,
  true,
  true
),
(
  'Boho Handcrafted Jute Planter Basket',
  'boho-handcrafted-jute-planter-basket',
  'planters',
  599,
  999,
  4.7,
  98,
  '10 Inch Height x 10 Inch Dia',
  'Cotton-Jute Dual Tone Rope Weave',
  '/assets/images/jute_planter_basket.jpg',
  'Waterproof Inner Liner',
  'Eco Decor',
  60,
  true,
  false
),
(
  'Eco Luxe Jute Tote Bag with Cotton Webbing',
  'eco-luxe-jute-tote-bag-cotton-webbing',
  'bags',
  399,
  699,
  4.8,
  310,
  '16 x 14 x 6 inches',
  'Laminated Jute Fabric (14x15 Weave)',
  '/assets/images/jute_tote_bag.jpg',
  '15kg Weight Capacity',
  'Export Quality',
  120,
  false,
  true
),
(
  'Macrame Sunburst Jute Wall Hanging',
  'macrame-sunburst-jute-wall-hanging',
  'decor',
  749,
  1199,
  4.8,
  76,
  '60 cm Width x 80 cm Drop',
  'Hand-Knotted Fringe Macrame',
  '/assets/images/jute_wall_hanging.jpg',
  'Organic Living Room Accents',
  'Handmade',
  25,
  false,
  false
),
(
  'Padded Eco Jute Laptop Sleeve (14-15.6")',
  'padded-eco-jute-laptop-sleeve',
  'bags',
  649,
  1099,
  4.7,
  115,
  'Fits up to 15.6" Laptops',
  'Shock-Absorbent Quilted Jute with Brass Zip',
  '/assets/images/jute_laptop_sleeve.jpg',
  'Zero-Plastic Workwear',
  'New Arrival',
  40,
  false,
  false
)
ON CONFLICT (slug) DO NOTHING;

