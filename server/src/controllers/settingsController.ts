import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getSettings = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM public.site_settings WHERE id = $1 LIMIT 1', ['default']);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Settings not found' });
    }
    return res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('getSettings error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const {
      ambient_video_url,
      documentary_video_url,
      video_poster_url,
      announcement_text,
      contact_phone,
      contact_email,
      whatsapp_number,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO public.site_settings (
        id, ambient_video_url, documentary_video_url, video_poster_url,
        announcement_text, contact_phone, contact_email, whatsapp_number, updated_at
      ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, now())
      ON CONFLICT (id) DO UPDATE SET
        ambient_video_url = COALESCE(EXCLUDED.ambient_video_url, site_settings.ambient_video_url),
        documentary_video_url = COALESCE(EXCLUDED.documentary_video_url, site_settings.documentary_video_url),
        video_poster_url = COALESCE(EXCLUDED.video_poster_url, site_settings.video_poster_url),
        announcement_text = COALESCE(EXCLUDED.announcement_text, site_settings.announcement_text),
        contact_phone = COALESCE(EXCLUDED.contact_phone, site_settings.contact_phone),
        contact_email = COALESCE(EXCLUDED.contact_email, site_settings.contact_email),
        whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, site_settings.whatsapp_number),
        updated_at = now()
      RETURNING *`,
      [
        ambient_video_url,
        documentary_video_url,
        video_poster_url,
        announcement_text,
        contact_phone || '+91 98302 96606',
        contact_email || 'info@indianjutehouse.com',
        whatsapp_number || '+919830296606',
      ]
    );

    return res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('updateSettings error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
