import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-full overflow-hidden bg-[#050D08] text-[#C8D7CE] border-t border-[#12271A] pt-12 sm:pt-16 pb-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 border-b border-[#12271A]">
          
          {/* Brand & Heritage */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0F261A] border border-[#2D5A3E] flex items-center justify-center p-1.5 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
                  <path d="M10 26C10 26 7 17 15 10C15 10 20 19 14 25C12 27 10 26 10 26Z" fill="#D4A373" />
                  <path d="M19 28C19 28 17 15 27 8C27 8 31 18 24 25C21 28 19 28 19 28Z" fill="#65D886" />
                </svg>
              </div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                Jute Mates <span className="text-[#65D886] font-normal text-xs sm:text-sm font-sans">by Dindayal</span>
              </span>
            </div>
            <p className="text-xs text-[#86A393] leading-relaxed">
              In alliance with <strong>Indian Jute House</strong>. Preserving Bengal's generational handloom and hand-braiding heritage with zero-plastic mats, bags, and artisan home decor.
            </p>
            <div className="pt-1 text-[11px] text-[#D4A373] space-y-1">
              <p>• Managing Partner: <strong>Mr. Likhit Gupta</strong></p>
              <p className="flex items-center gap-1 text-[#86A393]">
                <ShieldCheck size={13} className="text-[#65D886] flex-shrink-0" />
                <span>GSTIN: <strong className="text-white">19AACFD2094B1ZS</strong></span>
              </p>
            </div>
          </div>

          {/* Kolkata Head Office & Works */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#65D886] uppercase tracking-wider">
              Kolkata Headquarters & Works
            </h4>
            <div className="text-xs text-[#86A393] space-y-2">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Registered Office:</strong><br />
                  Plot No. 2, Block DN, 13th Floor, Signet Tower, Sector V, Salt Lake, Kolkata - 700091, WB, India
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">City Office:</strong><br />
                  14 Strand Road, Kolkata - 700001, WB, India
                </p>
              </div>
              <p className="text-[11px] text-[#D4A373]">
                🏭 <strong>Manufacturing:</strong> Howrah Jute Mill Belt, West Bengal
              </p>
            </div>
          </div>

          {/* Mumbai & Export Desk */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#65D886] uppercase tracking-wider">
              Export & Trade Desk
            </h4>
            <div className="text-xs text-[#86A393] space-y-2">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Mumbai Trade Office:</strong><br />
                  402 Trade View, Lower Parel, Mumbai - 400013, Maharashtra
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#65D886] flex-shrink-0" />
                <a href="tel:+919830296606" className="text-white hover:text-[#65D886] transition-colors">
                  +91 98302 96606
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#65D886] flex-shrink-0" />
                <a href="mailto:info@indianjutehouse.com" className="text-white hover:text-[#65D886] transition-colors">
                  info@indianjutehouse.com
                </a>
              </div>
            </div>
          </div>

          {/* 3 Main Collections Quick Navigation */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#65D886] uppercase tracking-wider">
              Curated Collections
            </h4>
            <ul className="text-xs space-y-2 text-[#86A393]">
              <li>
                <a href="#products-catalog" className="hover:text-[#65D886] transition-colors flex items-center gap-1.5">
                  <span className="text-[#65D886]">▸</span>
                  <span>Jute Mats & Carpets</span>
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-[#65D886] transition-colors flex items-center gap-1.5">
                  <span className="text-[#65D886]">▸</span>
                  <span>Jute Bags & Totes</span>
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-[#65D886] transition-colors flex items-center gap-1.5">
                  <span className="text-[#65D886]">▸</span>
                  <span>Home Decor & Handicrafts</span>
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="#wholesale-calculator"
                className="inline-block text-xs font-bold px-4 py-2.5 rounded-full bg-[#65D886] text-[#08140D] hover:bg-[#52C573] transition-colors shadow-md shadow-[#65D886]/20"
              >
                Inquire Wholesale Orders →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86A393] gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Dindayal Jute & Craft (Indian Jute House). All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Handcrafted with</span>
            <Heart size={12} className="text-[#65D886] fill-[#65D886]" />
            <span>from Bengal's Golden Looms</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
