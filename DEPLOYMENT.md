# 🚀 Deployment Guide: Dindayal Jute & Craft

This guide provides step-by-step instructions to deploy:
- **Frontend (`client/`)** on **Vercel**
- **Backend (`server/`)** on **Render** or **Railway**
- **Database (`supabase/`)** on **Supabase** (Already Connected!)
- **Media Storage** on **Cloudinary** (Already Connected!)

---

## 🅰️ Backend Deployment (Render or Railway)

Deploy the backend first so you have your live API URL (e.g., `https://dindayal-backend.onrender.com`).

### Option 1: Render (Recommended & Free)
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Select your GitHub repository: `shiv825/Dindayal`.
4. Fill in the service settings:
   - **Name**: `dindayal-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Health Check Path**: `/api/health`
5. Click **Advanced** → **Add Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://postgres.ntidcbapvlvonkgeiylx:R%25n9Nz%24pW8De5b5@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres
   CLOUDINARY_CLOUD_NAME=fj2pbcqf
   CLOUDINARY_API_KEY=771673627721144
   CLOUDINARY_API_SECRET=wO2LRn1axVN8QUVmvG2ltyk4uQ0
   CLOUDINARY_URL=cloudinary://771673627721144:wO2LRn1axVN8QUVmvG2ltyk4uQ0@fj2pbcqf
   CLIENT_ORIGIN=https://your-vercel-app.vercel.app
   ```
6. Click **Create Web Service**.
7. Once deployed, copy your Render URL: e.g. `https://dindayal-backend.onrender.com`.

---

### Option 2: Railway
1. Log in to [Railway](https://railway.com).
2. Click **New Project** → **Deploy from GitHub repo** → `shiv825/Dindayal`.
3. In service **Settings**:
   - **Root Directory**: `/server` (or leave empty as root with workspaces)
   - **Build Command**: `npm install && npm run build --workspace=server`
   - **Start Command**: `npm run start --workspace=server`
4. In **Variables**, add the same environment variables as above (`DATABASE_URL`, `CLOUDINARY_...`).
5. In **Networking**, click **Generate Domain** to get your public backend URL.

---

## 🅱️ Frontend Deployment (Vercel)

1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository: `shiv825/Dindayal`.
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add:
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   VITE_SUPABASE_URL=https://ntidcbapvlvonkgeiylx.supabase.co
   ```
   *(Replace with your actual backend URL from Step A)*
6. Click **Deploy**!

---

## ✅ Post-Deployment Verification Checklist

1. **Visit Backend Health Check**:
   Open `https://your-backend.onrender.com/api/health` → Should return `{"status":"ok","service":"Dindayal Jute & Craft API"}`.
2. **Visit Storefront**:
   Open `https://your-app.vercel.app` → Products, room visualizer, and stories load live from Supabase.
3. **Test Admin Cloudinary Upload**:
   Click **Admin Portal** on your live site, go to Catalog Manager, choose an image file to upload. It will upload to Cloudinary and display with automatic optimization.
4. **Test B2B Calculator**:
   Drag the slider and test sending a WhatsApp quote.

