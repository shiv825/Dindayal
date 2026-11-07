import { Request, Response } from 'express';
import { pool } from '../config/db';

export const createOrder = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const {
      customer_name,
      customer_phone,
      customer_email,
      shipping_address,
      city,
      pincode,
      total_amount_inr,
      payment_method = 'COD',
      items = [],
    } = req.body;

    await client.query('BEGIN');

    const orderRes = await client.query(
      `INSERT INTO public.orders (
        customer_name, customer_phone, customer_email, shipping_address, city, pincode,
        total_amount_inr, payment_method, payment_status, order_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', 'received')
      RETURNING *`,
      [
        customer_name,
        customer_phone,
        customer_email || null,
        shipping_address,
        city,
        pincode,
        total_amount_inr,
        payment_method,
      ]
    );

    const order = orderRes.rows[0];

    for (const item of items) {
      await client.query(
        `INSERT INTO public.order_items (
          order_id, product_title, quantity, unit_price_inr
        ) VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_title, item.quantity, item.unit_price_inr]
      );
    }

    await client.query('COMMIT');
    return res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('createOrder error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT o.*, json_agg(i.*) AS items
      FROM public.orders o
      LEFT JOIN public.order_items i ON o.id = i.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);
    return res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
