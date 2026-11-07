import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { CreateOrderPayload } from '../types';

let mockOrders: any[] = [];

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload: CreateOrderPayload = req.body;
    const orderId = `ord-${Date.now()}`;

    if (isSupabaseConfigured && supabase) {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: payload.customer_name,
            customer_phone: payload.customer_phone,
            customer_email: payload.customer_email,
            shipping_address: payload.shipping_address,
            city: payload.city,
            pincode: payload.pincode,
            total_amount_inr: payload.total_amount_inr,
            payment_method: payload.payment_method || 'COD',
            payment_status: 'pending',
            order_status: 'received',
          },
        ])
        .select()
        .single();

      if (!orderError && orderData && payload.items?.length) {
        const orderItems = payload.items.map((item) => ({
          order_id: orderData.id,
          product_id: item.product_id,
          product_title: item.product_title,
          quantity: item.quantity,
          unit_price_inr: item.unit_price_inr,
        }));
        await supabase.from('order_items').insert(orderItems);
        return res.status(201).json({ success: true, data: orderData });
      }
    }

    const order = {
      id: orderId,
      ...payload,
      payment_status: 'pending',
      order_status: 'received',
      created_at: new Date().toISOString(),
    };
    mockOrders.unshift(order);
    return res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return res.json({ success: true, count: data.length, data });
      }
    }
    return res.json({ success: true, count: mockOrders.length, data: mockOrders });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

