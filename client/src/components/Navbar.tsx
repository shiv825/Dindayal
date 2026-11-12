import React, { useState } from 'react';
import { ShoppingBag, Settings, Phone, ShieldCheck, Search, ArrowRight, X, Sparkles, Menu } from 'lucide-react';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCollections: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'Home' },
    { id: 'mats_carpets', label: 'Mats & Carpets' },
    { id: 'bags', label: 'Jute Bags' },
    { id: 'decor_crafts', label: 'Home Decor' },
  ];

  const handleNavClick = (id: ProductCategory) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id === 'all' ? 'hero-stage' : 'products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToImpact = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('our-impact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWholesale = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('wholesale-calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08140D]/95 backdrop-blur-xl border-b border-[#1A3828] transition-all">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#050D08] text-[#86A393] text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 border-b border-[#12271A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="inline-block w-2 h-2 rounded-full bg-[#65D886] animate-pulse flex-shrink-0 shadow-[0_0_8px_#65D886]"></span>
            <span className="font-medium tracking-wide text-[#C8D7CE]">
              🌿 Bengal Looms Heritage • 100% Eco-Braided Jute Mats, Bags & Handicrafts
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#A2B6AA] justify-center text-[10px] sm:text-xs">
            <a
              href="tel:+919830296606"
              className="flex items-center gap-1 hover:text-[#65D886] transition-colors"
            >
              <Phone size={11} className="text-[#65D886]" />
              <span>+91 98302 96606</span>
            </a>
            <span className="hidden sm:inline-block opacity-40 text-[#2D5A3E]">|</span>
            <span className="hidden sm:flex items-center gap-1 text-[#86A393]">
              <ShieldCheck size={11} className="text-[#D4A373]" />
              <span>GSTIN: 19AACFD2094B1ZS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Dual Leaf Logo Icon: 1 Jute Tan Leaf + 1 Neon Mint Leaf */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0F261A] to-[#0A1D13] border border-[#2D5A3E]/60 flex items-center justify-center p-1.5 shadow-md shadow-[#65D886]/10 group-hover:border-[#65D886]/60 transition-all flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
                {/* Jute Tan Leaf */}
                <path d="M10 26C10 26 7 17 15 10C15 10 20 19 14 25C12 27 10 26 10 26Z" fill="#D4A373" />
                <path d="M11 24C13 20 15 14 15 12" stroke="#8F6335" strokeWidth="1" strokeLinecap="round" />
                {/* Neon Mint Leaf */}
                <path d="M19 28C19 28 17 15 27 8C27 8 31 18 24 25C21 28 19 28 19 28Z" fill="#65D886" />
                <path d="M21 25C23 20 25 13 26 10" stroke="#1B5E32" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-bold tracking-tight text-white block leading-tight font-serif">
                Jute Mates <span className="text-[#65D886] font-normal text-xs sm:text-sm font-sans">by Dindayal</span>
              </span>
              <p className="text-[8.5px] sm:text-[9.5px] tracking-wider uppercase font-semibold text-[#86A393] truncate">
                Eco-Friendly • Sustainable • Together
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#0C1E14]/80 px-3 py-1.5 rounded-full border border-[#234B32]/70 backdrop-blur-md">
          {navCollections.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#65D886] text-[#08140D] font-bold shadow-md shadow-[#65D886]/25'
                    : 'text-[#C8D7CE] hover:text-[#65D886] hover:bg-[#153423]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <button
            onClick={scrollToImpact}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full text-[#C8D7CE] hover:text-[#65D886] hover:bg-[#153423] transition-all"
          >
            Our Impact
          </button>
          <button
            onClick={scrollToWholesale}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full text-[#D4A373] hover:text-white hover:bg-[#D4A373]/20 transition-all"
          >
            Bulk Orders
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          
          {/* Admin Switcher */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-[#D4A373]/40 bg-[#0C1E14] text-[#D4A373] hover:bg-[#D4A373] hover:text-[#08140D] transition-all shadow-sm"
            title="Admin & Media Portal"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0F261A] text-white hover:bg-[#183E28] border border-[#2D5A3E] transition-all shadow-md group"
            aria-label="View Cart"
          >
            <ShoppingBag size={17} className="group-hover:scale-110 transition-transform text-[#65D886]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#65D886] text-[#08140D] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-[#65D886]/40">
                {cartCount}
              </span>
            )}
          </button>

          {/* Shop Now CTA Pill */}
          <button
            onClick={() => {
              const el = document.getElementById('products-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:flex items-center gap-1.5 bg-[#65D886] hover:bg-[#52C573] text-[#08140D] font-bold text-xs px-4 py-2 rounded-full transition-all shadow-md shadow-[#65D886]/20 transform hover:-translate-y-0.5"
          >
            <span>Shop Now</span>
            <ArrowRight size={13} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0C1E14] border border-[#234B32] text-[#C8D7CE] hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#0B1A12] border-b border-[#1A3828] px-4 py-3 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#1A3828]">
            {navCollections.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg text-left transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#65D886] text-[#08140D]'
                    : 'bg-[#0F261A] text-[#C8D7CE] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={scrollToImpact}
              className="text-xs text-[#65D886] font-medium py-1"
            >
              🌱 Our Impact
            </button>
            <button
              onClick={scrollToWholesale}
              className="text-xs text-[#D4A373] font-medium py-1"
            >
              📦 B2B Wholesale Pricing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
