import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface BentoCategoriesProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenWholesale: () => void;
}

export const BentoCategories: React.FC<BentoCategoriesProps> = ({
  onSelectCategory,
  onOpenWholesale,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#D8A856]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#8B6B38] mb-3">
          <Sparkles size={12} className="text-[#D8A856]" />
          <span>Curated Collections</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B3B2B] leading-tight">
          Explore Handwoven Jute Collections
        </h2>
        <p className="text-xs sm:text-sm text-[#666] mt-2">
          Thoughtfully crafted for modern sustainable homes, conscious daily dining, and barefoot living.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* Large Card: Jute Bags & Totes */}
        <div
          onClick={() => onSelectCategory('bags')}
          className="md:col-span-7 group relative h-72 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-organic card-hover-calm border border-[#E7DFD1]"
        >
          <img
            src="/assets/images/jute_tote_bag.jpg"
            alt="Handcrafted Jute Tote Bags"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end text-white">
            <span className="bg-[#D8A856] text-[#1B3B2B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded w-max mb-2">
              Daily Utility & Fashion
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-bold text-white mb-1.5">
              Jute Bags, Totes & Everyday Shoppers
            </h3>
            <p className="text-xs sm:text-sm text-[#EAD7B5] line-clamp-2 max-w-lg mb-3">
              Heavy-duty laminated grocery totes, botanical screen-printed shoppers, and reinforced cotton web handles.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white group-hover:text-[#D8A856] transition-colors">
              <span>Explore Bags Collection</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Medium Card: Floor Mats & Area Rugs */}
        <div
          onClick={() => onSelectCategory('floor_mats')}
          className="md:col-span-5 group relative h-72 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-organic card-hover-calm border border-[#E7DFD1]"
        >
          <img
            src="/assets/images/jute_floor_mat.jpg"
            alt="Braided Mandala Floor Rugs"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end text-white">
            <span className="bg-[#1B3B2B] text-[#D8A856] border border-[#D8A856]/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded w-max mb-2">
              Living Room & Bedroom
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5">
              Hand-Braided Mandala Rugs & Entry Mats
            </h3>
            <p className="text-xs sm:text-sm text-[#EAD7B5] line-clamp-2 mb-3">
              Circular 4ft spiral woven rugs and ribbed coir entry mats designed for barefoot luxury.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white group-hover:text-[#D8A856] transition-colors">
              <span>Explore Mats & Rugs</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Small Card: Planters & Decor */}
        <div
          onClick={() => onSelectCategory('planters')}
          className="md:col-span-6 group relative h-60 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-organic card-hover-calm border border-[#E7DFD1]"
        >
          <img
            src="/assets/images/jute_wall_hanging.jpg"
            alt="Woven Planters & Macrame Decor"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white">
            <span className="bg-[#D8A856] text-[#1B3B2B] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-max mb-1.5">
              Boho Decor
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
              Planter Baskets & Macramé
            </h3>
            <p className="text-xs text-[#EAD7B5] line-clamp-2 mb-2">
              Waterproof-lined pot covers and hand-knotted wall tapestries mounted on reclaimed teak.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#D8A856] transition-colors">
              <span>View Decor Pieces</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Small Card: Direct Mill Factory Wholesale B2B */}
        <div
          onClick={onOpenWholesale}
          className="md:col-span-6 group relative h-60 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-organic card-hover-calm bg-gradient-to-br from-[#1B3B2B] via-[#244A37] to-[#12271D] p-5 sm:p-8 flex flex-col justify-between border border-[#D8A856]/40 text-white"
        >
          <div>
            <span className="bg-[#D8A856] text-[#1B3B2B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded w-max inline-block mb-2">
              Direct Mill Factory
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mb-1.5">
              Custom Logo Printing & Wholesale Totes
            </h3>
            <p className="text-xs sm:text-sm text-[#EAD7B5] max-w-md">
              Supply your store, brand, or wedding event with custom screen-printed jute bags. Direct Howrah mill pricing starting from 100 pcs.
            </p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[#D8A856]/30">
            <span className="text-xs sm:text-sm font-semibold text-[#D8A856] group-hover:underline">
              Calculate Mill Pricing 💬
            </span>
            <span className="bg-[#FAF7F2] text-[#1B3B2B] text-xs font-bold px-3 py-1.5 rounded-xl">
              MOQ: 100 Pcs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
