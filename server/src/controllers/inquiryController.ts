import { Request, Response } from 'express';
import { pool } from '../config/db';

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const {
      business_name,
      contact_name,
      phone_whatsapp,
      email,
      category,
      approx_quantity,
      custom_specifications,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO public.wholesale_inquiries (
        business_name, contact_name, phone_whatsapp, email, category, approx_quantity, custom_specifications
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        business_name,
        contact_name || business_name,
        phone_whatsapp,
        email || null,
        category || 'floor_mats',
        approx_quantity || 100,
        custom_specifications || '',
      ]
    );

    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('createInquiry error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getInquiries = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public.wholesale_inquiries ORDER BY created_at DESC'
    );
    return res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error: any) {
    console.error('getInquiries error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
