import React from 'react';
import { ShoppingBag, Star, Ruler, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickInquiry: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickInquiry,
}) => {
  const discountPercent = Math.round(
    ((product.mrp_inr - product.price_inr) / product.mrp_inr) * 100
  );

  return (
    <div className="group bg-white rounded-2xl border border-[#E7DFD1] p-4 flex flex-col justify-between card-hover-calm relative overflow-hidden shadow-sm">
      {/* Top badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 items-start">
        {product.badge && (
          <span className="bg-[#1B3B2B] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-[#D8A856] text-[#1B3B2B] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image */}
      <div>
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F4EFE6] mb-4">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Tag & Rating */}
        <div className="flex items-center justify-between text-xs text-[#7A756C] mb-1.5">
          <span className="font-semibold text-[#8B6B38] text-[11px] uppercase tracking-wide">
            {product.tag || 'Handcrafted Jute'}
          </span>
          <div className="flex items-center gap-1 text-[#D8A856] font-semibold text-xs">
            <Star size={13} fill="#D8A856" />
            <span>{product.rating}</span>
            <span className="text-[#A29C91] text-[11px]">({product.review_count})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-base text-[#1B3B2B] leading-snug line-clamp-2 min-h-[2.6rem]">
          {product.title}
        </h3>

        {/* Dimensions & Weave Specs */}
        <div className="my-2.5 py-2 border-y border-[#F4EFE6] text-[11px] text-[#55524B] space-y-1">
          {product.dimensions && (
            <div className="flex items-center gap-1.5">
              <Ruler size={12} className="text-[#8B6B38] flex-shrink-0" />
              <span className="truncate">{product.dimensions}</span>
            </div>
          )}
          {product.braid_weave_type && (
            <div className="flex items-center gap-1.5">
              <Layers size={12} className="text-[#8B6B38] flex-shrink-0" />
              <span className="truncate">{product.braid_weave_type}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-2">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-serif font-bold text-xl text-[#1B3B2B]">
            ₹{product.price_inr.toLocaleString('en-IN')}
          </span>
          {product.mrp_inr > product.price_inr && (
            <span className="text-xs text-[#A29C91] line-through">
              ₹{product.mrp_inr.toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-[10px] text-[#28533E] font-medium ml-auto">
            Free Kolkata Delivery
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 bg-[#1B3B2B] text-white py-2.5 px-3 rounded-xl text-xs font-semibold hover:bg-[#12271D] transition-colors shadow-sm"
          >
            <ShoppingBag size={13} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => onQuickInquiry(product)}
            className="flex items-center justify-center gap-1 bg-[#F4EFE6] text-[#1B3B2B] border border-[#E7DFD1] py-2.5 px-2 rounded-xl text-xs font-semibold hover:bg-[#EAE2D5] transition-colors"
          >
            <span>Bulk Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};

