import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { SiteSettings } from '../types';

let mockSettings: SiteSettings = {
  id: 'default',
  ambient_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-weaving-a-basket-43845-large.mp4',
  documentary_video_url: 'https://www.youtube.com/embed/BHbDLSXmtBA',
  video_poster_url: '/assets/images/jute_floor_mat.jpg',
  announcement_text: '🌾 Direct from Bengal Looms & Mills • 100% Eco-Braided Jute Mats & Rugs • Bulk Inquiries: +91 98302 96606',
  contact_phone: '+91 98302 96606',
  contact_email: 'info@indianjutehouse.com',
  whatsapp_number: '+919830296606',
};

export const getSettings = async (req: Request, res: Response) => {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('site_settings').select('*').eq('id', 'default').single();
      if (!error && data) {
        return res.json({ success: true, data });
      }
    }
    return res.json({ success: true, data: mockSettings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    updates.updated_at = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ id: 'default', ...updates })
        .select()
        .single();
      if (!error && data) {
        return res.json({ success: true, data });
      }
    }

    mockSettings = { ...mockSettings, ...updates };
    return res.json({ success: true, data: mockSettings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

