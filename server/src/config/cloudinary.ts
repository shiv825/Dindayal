import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fj2pbcqf',
  api_key: process.env.CLOUDINARY_API_KEY || '771673627721144',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'wO2LRn1axVN8QUVmvG2ltyk4uQ0',
  secure: true,
});

export default cloudinary;

