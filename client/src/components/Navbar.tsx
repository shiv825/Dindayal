import React from 'react';
import { ShoppingBag, Settings, Phone, ShieldCheck } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAdmin,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD1] transition-all">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#1B3B2B] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-center sm:text-left">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D8A856] animate-pulse flex-shrink-0"></span>
            <span className="font-medium tracking-wide">
              Direct from Bengal Looms & Mills • 100% Eco-Braided Jute Mats & Rugs
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#EAD7B5] justify-center text-[10px] sm:text-xs">
            <a
              href="tel:+919830296606"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone size={11} />
              <span>+91 98302 96606</span>
            </a>
            <span className="hidden sm:inline-block opacity-40">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck size={11} />
              <span>GSTIN: 19AACFD2094B1ZS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1B3B2B] flex items-center justify-center text-white shadow-md flex-shrink-0">
            <span className="text-base sm:text-xl">🌿</span>
          </div>
          <div className="min-w-0">
            <a href="#" className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#1B3B2B] truncate block">
              Dindayal <span className="text-[#D8A856] font-normal">& Craft</span>
            </a>
            <p className="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-[#8B6B38] truncate">
              Indian Jute House • Estd. Kolkata
            </p>
          </div>
        </div>

        {/* Category Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4EFE6] px-3 py-1.5 rounded-full border border-[#E7DFD1]">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'floor_mats', label: 'Floor Mats & Rugs' },
            { id: 'dining', label: 'Dining Sets' },
            { id: 'planters', label: 'Planters' },
            { id: 'bags', label: 'Totes & Bags' },
            { id: 'ropes', label: 'Ropes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id as ProductCategory)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#1B3B2B] text-white shadow-sm'
                  : 'text-[#4A4740] hover:text-[#1B3B2B] hover:bg-[#EAE2D5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Admin Switcher */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs font-semibold p-2 sm:px-3 sm:py-2 rounded-lg border border-[#D8A856]/60 bg-[#FBF8F1] text-[#8B6B38] hover:bg-[#D8A856] hover:text-white transition-all shadow-sm"
            title="Admin & Video Configurator"
          >
            <Settings size={15} />
            <span className="hidden sm:inline">Admin Portal</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1B3B2B] text-white hover:bg-[#12271D] transition-all shadow-md"
            aria-label="View Cart"
          >
            <ShoppingBag size={17} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D8A856] text-[#1B3B2B] font-bold text-[10px] w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
