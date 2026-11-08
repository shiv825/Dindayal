import { Request, Response } from 'express';
import { pool } from '../config/db';
import { Product } from '../types';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    let query = 'SELECT * FROM public.products';
    const params: any[] = [];

    if (category && category !== 'all') {
      query += ' WHERE category = $1';
      params.push(category);
    }
    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error: any) {
    console.error('getProducts error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM public.products WHERE slug = $1 LIMIT 1', [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      category,
      price_inr,
      mrp_inr,
      rating = 4.9,
      review_count = 10,
      dimensions,
      braid_weave_type,
      image_url,
      secondary_image_url,
      tag,
      badge,
      stock_qty = 50,
      is_featured = true,
      is_bestseller = false,
    } = req.body;

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const result = await pool.query(
      `INSERT INTO public.products (
        title, slug, category, price_inr, mrp_inr, rating, review_count,
        dimensions, braid_weave_type, image_url, secondary_image_url, tag, badge,
        stock_qty, is_featured, is_bestseller
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        title,
        generatedSlug,
        category,
        price_inr,
        mrp_inr || price_inr,
        rating,
        review_count,
        dimensions || '',
        braid_weave_type || '',
        image_url,
        secondary_image_url || null,
        tag || '',
        badge || '',
        stock_qty,
        is_featured,
        is_bestseller,
      ]
    );

    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('createProduct error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      price_inr,
      mrp_inr,
      dimensions,
      braid_weave_type,
      image_url,
      stock_qty,
      tag,
      badge,
    } = req.body;

    const result = await pool.query(
      `UPDATE public.products SET
        title = COALESCE($1, title),
        category = COALESCE($2, category),
        price_inr = COALESCE($3, price_inr),
        mrp_inr = COALESCE($4, mrp_inr),
        dimensions = COALESCE($5, dimensions),
        braid_weave_type = COALESCE($6, braid_weave_type),
        image_url = COALESCE($7, image_url),
        stock_qty = COALESCE($8, stock_qty),
        tag = COALESCE($9, tag),
        badge = COALESCE($10, badge),
        updated_at = now()
      WHERE id = $11
      RETURNING *`,
      [title, category, price_inr, mrp_inr, dimensions, braid_weave_type, image_url, stock_qty, tag, badge, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM public.products WHERE id = $1', [id]);
    return res.json({ success: true, message: 'Product removed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
