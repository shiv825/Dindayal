# 🌿 Dindayal Jute & Craft | Indian Jute House
### Full-Stack Monorepo: React + TypeScript + Node.js (Express) + Supabase

A production-grade, responsive e-commerce web platform and B2B wholesale portal designed specifically for selling **hand-braided jute floor mats, circular mandala rugs, dining table placemats, planter baskets, and eco-decor products**.

---

## 🏛️ Monorepo Architecture

```text
dindayal/
├── client/                     # React 18 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/         # Navbar, HeroStage, StoryBubbles, ProductCard, ProductGrid,
│   │   │                       # VideoDocModal, WholesaleCalculator, CartDrawer, AdminPortal, Footer
│   │   ├── types/              # TypeScript types (Product, Category, Settings, Inquiry, Cart)
│   │   ├── lib/                # Supabase client & REST API client with offline fallback
│   │   ├── App.tsx             # Main storefront orchestrator
│   │   └── main.tsx
│   ├── public/assets/images/   # High-resolution jute product imagery
│   ├── tailwind.config.js      # Natural organic earth tones palette (Forest, Sand, Jute Gold)
│   └── vite.config.ts          # Vite build & proxy config
│
├── server/                     # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/        # productController, settingsController, inquiryController, orderController
│   │   ├── routes/             # apiRoutes (/api/products, /api/settings, /api/inquiries, /api/orders)
│   │   ├── config/             # Supabase Admin connection with graceful offline fallback
│   │   ├── types/              # Server-side TypeScript interfaces
│   │   └── index.ts            # Express app & CORS middleware
│   ├── tsconfig.json
│   └── package.json
│
├── supabase/                   # Supabase PostgreSQL Database
│   ├── schema.sql              # Database schema (products, site_settings, wholesale_inquiries, orders, RLS)
│   ├── seed.sql                # Verified seed catalog and artisan video configuration
│   └── README.md               # Supabase step-by-step setup guide
│
├── package.json                # Root monorepo workspace configuration
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Both `client` and `server` come with safe fallback data, so you can develop immediately even before linking a live Supabase instance!

To link your live Supabase project:
- Create `server/.env` based on `server/.env.example`
- Create `client/.env` based on `client/.env.example`

### 3. Run Development Servers
To start both client and server concurrently:
```bash
npm run dev
```

Or run them individually:
```bash
# Frontend (http://localhost:3000)
npm run dev:client

# Backend (http://localhost:5000)
npm run dev:server
```

---

## 🗄️ Supabase Database Setup
1. Go to your [Supabase Dashboard](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Run `supabase/schema.sql` to generate all tables, RLS security policies, and performance indexes.
4. Run `supabase/seed.sql` to populate initial products and artisan loom configuration.

---

## 📌 Verified Business Details Extracted from Reference Websites

Extracted from **[www.indianjutehouse.com](http://www.indianjutehouse.com)** and **[www.dindayalropes.com](https://www.dindayalropes.com)**:

| Information Field | Verified Business Detail |
| :--- | :--- |
| **Enterprise Names** | **Dindayal Jute & Craft** & **Indian Jute House** |
| **Managing Partner** | Mr. Likhit Gupta |
| **GSTIN Number** | `19AACFD2094B1ZS` |
| **Head Office Address** | Plot No. 2, Block DN, 13th Floor, Signet Tower, Sector V, Bidhannagar (Salt Lake), Kolkata - 700091, West Bengal, India |
| **Kolkata City Office** | 14 Strand Road, Kolkata - 700001, West Bengal, India |
| **Manufacturing Works** | Howrah Jute Mill Belt, West Bengal, India |
| **Mumbai Export Office** | 402 Trade View, Lower Parel, Mumbai - 400013, Maharashtra, India |
| **Official Contact** | Phone / WhatsApp: `+91 98302 96606` • Email: `info@indianjutehouse.com` |
