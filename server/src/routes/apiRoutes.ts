import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { createInquiry, getInquiries } from '../controllers/inquiryController';
import { createOrder, getOrders } from '../controllers/orderController';
import { uploadMiddleware, uploadMedia } from '../controllers/uploadController';

const router = Router();

// Media Upload (Cloudinary)
router.post('/upload', uploadMiddleware.single('file'), uploadMedia);

// Products
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Site & Artisan Loom Settings (video URLs, posters)
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Wholesale Inquiries
router.post('/inquiries', createInquiry);
router.get('/inquiries', getInquiries);

// Orders
router.post('/orders', createOrder);
router.get('/orders', getOrders);

export default router;

