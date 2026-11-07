# 🗄️ Supabase Setup Guide for Dindayal Jute & Craft

## 1. Quick Setup (Web Dashboard)
1. Go to [https://supabase.com](https://supabase.com) and create or open your project.
2. In the Supabase Dashboard, click **SQL Editor** on the left navigation bar.
3. Open `schema.sql` from this folder, paste the contents into the SQL Editor, and click **Run**.
4. Next, open `seed.sql`, paste the contents, and click **Run** to load default products and artisan settings.

## 2. Environment Variables Configuration
In both `server/.env` and `client/.env`:

### `server/.env`
```env
PORT=5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_ANON_KEY=your-supabase-anon-key
CLIENT_ORIGIN=http://localhost:3000
```

### `client/.env`
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:5000/api
```

*(Note: The client also works in fallback offline/mock mode if Supabase keys are not set yet, so you can develop immediately!)*

