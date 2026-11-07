import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12271D] text-[#FAF7F2] border-t border-[#1B3B2B] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌿</span>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Dindayal <span className="text-[#D8A856] font-normal">& Craft</span>
              </span>
            </div>
            <p className="text-xs text-[#C5BDB0] leading-relaxed">
              In alliance with <strong>Indian Jute House</strong>. Preserving Bengal's generational handloom and hand-braiding heritage with zero-plastic home accessories.
            </p>
            <div className="pt-2 text-[11px] text-[#EAD7B5] space-y-1">
              <p>• Managing Partner: <strong>Mr. Likhit Gupta</strong></p>
              <p className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#D8A856]" />
                <span>GSTIN: <strong>19AACFD2094B1ZS</strong></span>
              </p>
            </div>
          </div>

          {/* Kolkata Head Office & Works */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D8A856] uppercase tracking-wider">
              Kolkata Headquarters & Works
            </h4>
            <div className="text-xs text-[#C5BDB0] space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D8A856] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Registered Office:</strong><br />
                  Plot No. 2, Block DN, 13th Floor, Signet Tower, Sector V, Salt Lake, Kolkata - 700091, WB, India
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D8A856] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>City Office:</strong><br />
                  14 Strand Road, Kolkata - 700001, WB, India
                </p>
              </div>
              <p className="text-[11px] text-[#8B6B38]">
                🏭 <strong>Manufacturing:</strong> Howrah Jute Mill Belt, West Bengal
              </p>
            </div>
          </div>

          {/* Mumbai & Export Desk */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D8A856] uppercase tracking-wider">
              Export & Regional Desk
            </h4>
            <div className="text-xs text-[#C5BDB0] space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D8A856] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Mumbai Trade Office:</strong><br />
                  402 Trade View, Lower Parel, Mumbai - 400013, Maharashtra
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D8A856] flex-shrink-0" />
                <a href="tel:+919830296606" className="hover:text-white transition-colors">
                  +91 98302 96606
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D8A856] flex-shrink-0" />
                <a href="mailto:info@indianjutehouse.com" className="hover:text-white transition-colors">
                  info@indianjutehouse.com
                </a>
              </div>
            </div>
          </div>

          {/* Sustainable Promise */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D8A856] uppercase tracking-wider">
              Natural Living Pledge
            </h4>
            <p className="text-xs text-[#C5BDB0] leading-relaxed">
              Every rug and dining mat in our collection is 100% biodegradable and compostable. We work directly with artisan families in Bengal villages to sustain fair-trade living.
            </p>
            <div className="pt-2">
              <a
                href="#bulk-calculator"
                className="inline-block text-xs font-bold px-4 py-2 rounded-xl bg-[#D8A856] text-[#1B3B2B] hover:bg-[#C89D56] transition-colors"
              >
                Inquire Wholesale Orders →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B857B] gap-4">
          <p>© {new Date().getFullYear()} Dindayal Jute & Craft (Indian Jute House). All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
            <span>for natural, conscious spaces</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

