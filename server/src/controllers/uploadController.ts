import { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';

// Multer memory storage configuration
const storage = multer.memoryStorage();
export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 MB limit (allows short artisan video clips & high-res images)
  },
});

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided for upload.' });
    }

    const folder = (req.body.folder as string) || 'dindayal/products';
    const isVideo = req.file.mimetype.startsWith('video/');

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isVideo ? 'video' : 'auto',
        transformation: isVideo
          ? [{ quality: 'auto' }]
          : [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error || !result) {
          console.error('Cloudinary upload stream error:', error);
          return res.status(500).json({
            success: false,
            message: 'Failed to upload media to Cloudinary.',
            error: error?.message,
          });
        }

        return res.status(200).json({
          success: true,
          data: {
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
            resource_type: result.resource_type,
          },
        });
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(req.file.buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  } catch (error: any) {
    console.error('uploadMedia error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

