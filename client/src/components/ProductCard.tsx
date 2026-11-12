import React from 'react';
import { ShoppingBag, Star, Ruler, Layers, MessageSquareQuote } from 'lucide-react';
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
    <div className="group bg-[#0C1E14]/90 rounded-2xl border border-[#234B32]/70 hover:border-[#65D886] p-4 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl hover:shadow-[0_12px_30px_rgba(101,216,134,0.18)] relative overflow-hidden">
      
      {/* Top Floating Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 items-start">
        {product.badge && (
          <span className="bg-[#08140D]/90 text-[#65D886] border border-[#2D5A3E] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-[#D4A373] text-[#08140D] text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image Stage */}
      <div>
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0F261A] mb-4 border border-[#1E432E]/60">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E14] via-transparent to-transparent opacity-40"></div>
        </div>

        {/* Tag & Star Rating */}
        <div className="flex items-center justify-between text-xs text-[#86A393] mb-1.5">
          <span className="font-semibold text-[#D4A373] text-[10.5px] uppercase tracking-wide truncate max-w-[65%]">
            {product.tag || 'Handcrafted Jute'}
          </span>
          <div className="flex items-center gap-1 text-[#D4A373] font-bold text-xs flex-shrink-0">
            <Star size={12} fill="#D4A373" />
            <span>{product.rating}</span>
            <span className="text-[#86A393] text-[10px]">({product.review_count})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-serif font-bold text-base text-white group-hover:text-[#65D886] transition-colors leading-snug line-clamp-2 min-h-[2.6rem]">
          {product.title}
        </h3>

        {/* Dimensions & Weave Specs */}
        <div className="my-2.5 py-2 border-y border-[#1E432E]/70 text-[11px] text-[#C8D7CE] space-y-1">
          {product.dimensions && (
            <div className="flex items-center gap-1.5">
              <Ruler size={12} className="text-[#65D886] flex-shrink-0" />
              <span className="truncate">{product.dimensions}</span>
            </div>
          )}
          {product.braid_weave_type && (
            <div className="flex items-center gap-1.5">
              <Layers size={12} className="text-[#D4A373] flex-shrink-0" />
              <span className="truncate">{product.braid_weave_type}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Call-to-Actions */}
      <div className="pt-2">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-serif font-bold text-xl text-white">
            ₹{product.price_inr.toLocaleString('en-IN')}
          </span>
          {product.mrp_inr > product.price_inr && (
            <span className="text-xs text-[#86A393] line-through">
              ₹{product.mrp_inr.toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-[10px] text-[#65D886] font-medium ml-auto">
            Free Delivery
          </span>
        </div>

        {/* 2-Column Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 bg-[#18462B] hover:bg-[#65D886] hover:text-[#08140D] text-white border border-[#2D5A3E] py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <ShoppingBag size={13} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => onQuickInquiry(product)}
            className="flex items-center justify-center gap-1 bg-[#D4A373]/15 hover:bg-[#D4A373] text-[#D4A373] hover:text-[#08140D] border border-[#D4A373]/40 py-2.5 px-2 rounded-xl text-xs font-bold transition-all"
            title="Request WhatsApp B2B Quotation"
          >
            <MessageSquareQuote size={13} />
            <span>Bulk Quote</span>
          </button>
        </div>
      </div>

    </div>
  );
};
