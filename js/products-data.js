/**
 * Initial Default Data for Dindayal Jute & Craft / Indian Jute House
 * Exclusively focused on consumer Jute Bags, Mats, Planters, and Home Decor (Ropes removed)
 */

const DEFAULT_STORE_SETTINGS = {
  storeName: "Dindayal Jute & Craft",
  brandSubtitle: "An Indian Jute House Enterprise",
  tagline: "100% Eco-Friendly, Handcrafted Natural Jute Bags, Mats, Planters & Home Decor",
  phone: "+91 98366 77089",
  altPhone: "+91 98746 16929",
  landline: "08045813655",
  whatsappNumber: "919836677089",
  email: "sales@dindayalropes.com",
  altEmail: "indiajutehouse@gmail.com",
  address: "Plot No. 2, Block DN, 13th Floor, Signet Tower, Sector V, Bidhannagar, Kolkata - 700091, West Bengal, India",
  worksAddress: "Howrah Jute Mill Belt, West Bengal, India",
  mumbaiOffice: "402 Trade View, Lower Parel, Mumbai - 400013, Maharashtra, India",
  gstin: "19AACFD2094B1ZS",
  managingPartner: "Mr. Likhit Gupta",
  upiId: "dindayalropes@okhdfcbank",
  upiName: "Dindayal Jute India",
  announcementText: "🌿 Go Green with Golden Jute! Free Shipping on orders over ₹999. Use coupon ECO10 for 10% OFF.",
  freeShippingThreshold: 999,
  shippingFee: 79,
  currencySymbol: "₹",
  adminPin: "admin123",
  ambientVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  documentaryVideoUrl: "https://www.youtube.com/watch?v=BHbDLSXmtBA",
  videoPosterUrl: "assets/images/jute_floor_mat.jpg"
};

const DEFAULT_PRODUCTS = [
  {
    id: "jute-bag-01",
    name: "Luxury Handcrafted Jute Tote Bag",
    category: "bags",
    price: 499,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 142,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    stockCount: 85,
    image: "assets/images/jute_tote_bag.jpg",
    shortDesc: "Premium unbleached golden jute tote with soft cotton webbed handles and inner waterproof coating.",
    specs: {
      "Material": "100% Natural Golden Jute with Cotton Handles",
      "Dimensions": "15\" H x 14\" W x 5\" Gusset",
      "Weight Capacity": "Up to 15 kg",
      "Lining": "Biodegradable water-resistant inner lamination",
      "Eco Rating": "100% Biodegradable & Compostable"
    },
    featured: true
  },
  {
    id: "jute-bag-02",
    name: "Botanical Leaf Printed Jute Handbag",
    category: "bags",
    price: 649,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 98,
    badge: "Trending",
    badgeType: "trending",
    inStock: true,
    stockCount: 42,
    image: "assets/images/jute_printed_bag.jpg",
    shortDesc: "Designer eco-tote printed with organic azo-free dyes, durable brass zipper and vegan leather badge.",
    specs: {
      "Material": "Fine Woven Jute with Organic Pigment Print",
      "Dimensions": "16\" H x 15\" W x 4.5\" D",
      "Closure": "Heavy-duty brass zipper",
      "Pockets": "1 Inner zippered security pocket",
      "Eco Rating": "Plastic-free packaging"
    },
    featured: true
  },
  {
    id: "jute-bag-03",
    name: "Padded Eco-Jute Laptop Sleeve & Folio (14-15 Inch)",
    category: "bags",
    price: 849,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 57,
    badge: "New Arrival",
    badgeType: "artisan",
    inStock: true,
    stockCount: 35,
    image: "assets/images/jute_laptop_sleeve.jpg",
    shortDesc: "Sleek protective laptop and document case crafted from tight-woven jute with organic cotton inner padding and handcrafted wooden toggle.",
    specs: {
      "Compatibility": "13.3\" to 15.6\" Laptops & MacBooks",
      "Material": "Tight woven golden jute with cotton shock-absorbing felt",
      "Closure": "Natural teak wood button toggle",
      "Weight": "Lightweight 280g"
    },
    featured: true
  },
  {
    id: "jute-mat-01",
    name: "Hand-Braided Round Jute Floor Rug (4 Ft)",
    category: "mats",
    price: 1899,
    originalPrice: 2799,
    rating: 5.0,
    reviewCount: 76,
    badge: "Artisan Choice",
    badgeType: "artisan",
    inStock: true,
    stockCount: 28,
    image: "assets/images/jute_floor_mat.jpg",
    shortDesc: "Exquisitely hand-braided circular floor rug featuring traditional mandala motifs in rich natural tan tones.",
    specs: {
      "Material": "Hand-spun natural Indian jute fiber",
      "Diameter": "120 cm (4.0 Feet)",
      "Thickness": "10 mm high-cushion weave",
      "Care": "Spot clean with damp cloth or vacuum regularly",
      "Usage": "Living room, bedroom, reading nook, balcony"
    },
    featured: true
  },
  {
    id: "jute-mat-02",
    name: "Artisan Dining Table Mats & Coasters (Set of 6)",
    category: "mats",
    price: 799,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 114,
    badge: "Top Value",
    badgeType: "value",
    inStock: true,
    stockCount: 65,
    image: "assets/images/jute_table_mat.jpg",
    shortDesc: "Circular braided heat-resistant dining table placemats accompanied by matching drink coasters.",
    specs: {
      "Package Contains": "6 Placemats (38cm dia) + 6 Coasters (10cm dia)",
      "Material": "Natural braided jute braid",
      "Heat Resistance": "Up to 110°C, protects wood and glass tables",
      "Origin": "Kolkata Craft Cluster"
    },
    featured: true
  },
  {
    id: "jute-mat-03",
    name: "Heavy-Duty 'Welcome' Border Jute Door Mat",
    category: "mats",
    price: 449,
    originalPrice: 699,
    rating: 4.7,
    reviewCount: 88,
    badge: "Popular",
    badgeType: "popular",
    inStock: true,
    stockCount: 120,
    image: "assets/images/jute_door_mat.jpg",
    shortDesc: "High-density natural fiber door mat with classic black border and durable dirt-scraping bristles.",
    specs: {
      "Material": "Coarse natural jute and coconut coir blend",
      "Dimensions": "40 cm x 60 cm (16\" x 24\")",
      "Backing": "Natural anti-skid latex base",
      "Weather": "Suitable for indoor & sheltered outdoor entrances"
    },
    featured: false
  },
  {
    id: "jute-home-01",
    name: "Handwoven Jute Planter Basket & Organizer",
    category: "home",
    price: 549,
    originalPrice: 850,
    rating: 4.9,
    reviewCount: 91,
    badge: "Eco Living",
    badgeType: "eco",
    inStock: true,
    stockCount: 38,
    image: "assets/images/jute_planter_basket.jpg",
    shortDesc: "Charming braided plant pot cover and multi-purpose organizer basket with reinforced side handles.",
    specs: {
      "Material": "Organic coiled jute rope with braided handles",
      "Dimensions": "25 cm Diameter x 25 cm Height",
      "Use Cases": "Indoor Plant Pot, Nursery Storage, Laundry, Wardrobe Bin",
      "Foldable": "Yes, easy to store when not in use"
    },
    featured: true
  },
  {
    id: "jute-home-02",
    name: "Bohemian Handcrafted Jute Macramé Wall Hanging",
    category: "home",
    price: 1199,
    originalPrice: 1799,
    rating: 5.0,
    reviewCount: 44,
    badge: "Artisan Made",
    badgeType: "artisan",
    inStock: true,
    stockCount: 22,
    image: "assets/images/jute_wall_hanging.jpg",
    shortDesc: "Stunning hand-knotted natural jute fiber macrame wall tapestry mounted on treated driftwood teak rod.",
    specs: {
      "Dimensions": "75 cm Width x 85 cm Length",
      "Material": "100% Hand-knotted unbleached golden jute",
      "Rod": "Natural solid wood hanging dowel included",
      "Style": "Bohemian rustic living room decor"
    },
    featured: true
  },
  {
    id: "jute-mat-04",
    name: "Geotextile Soil Saver Erosion Mat (1m x 10m Roll)",
    category: "mats",
    price: 1450,
    originalPrice: 2100,
    rating: 4.9,
    reviewCount: 32,
    badge: "B2B Certified",
    badgeType: "b2b",
    inStock: true,
    stockCount: 40,
    image: "assets/images/jute_floor_mat.jpg",
    shortDesc: "Heavy 500 GSM open mesh geotextile matting for slope erosion control, landscaping, and horticulture.",
    specs: {
      "Roll Size": "1 Meter Width x 10 Meters Length",
      "Weight": "500 GSM",
      "Life Span": "Degrades naturally in 2 seasons while fostering root growth",
      "Testing Standard": "Bureau of Indian Standards IS 14715 Compliant"
    },
    featured: false
  }
];
