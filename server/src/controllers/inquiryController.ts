import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { WholesaleInquiry } from '../types';

let mockInquiries: WholesaleInquiry[] = [
  {
    id: 'inq-1',
    business_name: 'FabIndia Regional Store',
    contact_name: 'Arunav Sengupta',
    phone_whatsapp: '+91 98765 43210',
    email: 'arunav@fabretail.in',
    category: 'floor_mats',
    approx_quantity: 250,
    custom_specifications: 'Custom 4ft mandala braided rugs with natural beige core.',
    status: 'contacted',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const inquiry: WholesaleInquiry = {
      ...req.body,
      id: req.body.id || `inq-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('wholesale_inquiries').insert([inquiry]).select().single();
      if (!error && data) {
        return res.status(201).json({ success: true, data });
      }
    }

    mockInquiries.unshift(inquiry);
    return res.status(201).json({ success: true, data: inquiry });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('wholesale_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return res.json({ success: true, count: data.length, data });
      }
    }
    return res.json({ success: true, count: mockInquiries.length, data: mockInquiries });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

