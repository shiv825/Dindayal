import React from 'react';
import { ShoppingBag, Settings, Phone, ShieldCheck, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD1] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1B3B2B] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D8A856] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Direct from Bengal Looms & Mills • 100% Eco-Braided Jute Mats & Rugs
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#EAD7B5]">
            <a
              href="tel:+919830296606"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone size={12} />
              <span>+91 98302 96606</span>
            </a>
            <span className="hidden sm:inline-block">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck size={12} />
              <span>GSTIN: 19AACFD2094B1ZS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1B3B2B] flex items-center justify-center text-white shadow-md">
            <span className="text-xl">🌿</span>
          </div>
          <div>
            <a href="#" className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#1B3B2B]">
              Dindayal <span className="text-[#D8A856] font-normal">& Craft</span>
            </a>
            <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8B6B38]">
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
        <div className="flex items-center gap-3">
          {/* Admin Switcher */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-[#D8A856]/60 bg-[#FBF8F1] text-[#8B6B38] hover:bg-[#D8A856] hover:text-white transition-all shadow-sm"
            title="Admin & Video Configurator"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Admin Portal</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#1B3B2B] text-white hover:bg-[#12271D] transition-all shadow-md"
            aria-label="View Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D8A856] text-[#1B3B2B] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

