import React, { useState } from 'react';
import { Send, MessageSquare, Building2, User, Phone, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { api } from '../lib/api';

export const WholesaleCalculator: React.FC = () => {
  const [productType, setProductType] = useState('floor_mat');
  const [quantity, setQuantity] = useState(150);
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing matrix
  const productPrices: Record<string, { name: string; basePrice: number; unit: string }> = {
    floor_mat: { name: '4ft Circular Mandala Floor Rug', basePrice: 1499, unit: 'Rug' },
    door_mat: { name: 'Ribbed Anti-Slip Door Mat', basePrice: 499, unit: 'Mat' },
    table_mat: { name: 'Artisan Dining Runner & Placemats Set', basePrice: 849, unit: 'Set' },
    planter: { name: 'Dual-Tone Jute Planter Basket', basePrice: 599, unit: 'Basket' },
    tote_bag: { name: 'Eco Luxe Jute Tote Bag', basePrice: 399, unit: 'Bag' },
  };

  const selectedProduct = productPrices[productType] || productPrices.floor_mat;

  // Determine discount tier
  let discountTier = 0.15; // 50-199 pcs: 15%
  let tierLabel = 'Tier 1: 15% Bulk Discount';
  if (quantity >= 500) {
    discountTier = 0.35; // 500+ pcs: 35%
    tierLabel = 'Tier 3: 35% Factory Direct Mega Discount';
  } else if (quantity >= 200) {
    discountTier = 0.25; // 200-499 pcs: 25%
    tierLabel = 'Tier 2: 25% Wholesale Volume Discount';
  }

  const wholesaleUnitPrice = Math.round(selectedProduct.basePrice * (1 - discountTier));
  const estimatedTotal = wholesaleUnitPrice * quantity;

  // Instant WhatsApp quote
  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `Hello Dindayal Jute & Craft / Indian Jute House team,\n\nI would like an official B2B wholesale quotation:\n\n• Product: ${selectedProduct.name}\n• Quantity: ${quantity} units\n• Estimated Wholesale Unit Price: ₹${wholesaleUnitPrice}\n• Total Est. Order: ₹${estimatedTotal.toLocaleString('en-IN')}\n• Business: ${businessName || 'B2B Client'}\n• Contact: ${contactName || 'Buyer'}\n\nPlease share GST invoice & lead time details.`
    );
    window.open(`https://wa.me/919830296606?text=${message}`, '_blank');
  };

  // Submit to Supabase / Backend API
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone) {
      alert('Please fill in your Business Name and Phone/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    await api.submitWholesaleInquiry({
      business_name: businessName,
      contact_name: contactName || businessName,
      phone_whatsapp: phone,
      email: email || undefined,
      category: productType,
      approx_quantity: quantity,
      custom_specifications: `Product: ${selectedProduct.name} | Unit Est: ₹${wholesaleUnitPrice} | Est Total: ₹${estimatedTotal}`,
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="wholesale-calculator" className="w-full max-w-full overflow-hidden py-12 sm:py-16 md:py-20 bg-[#08140D] border-t border-[#1A3828]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#0C1E14] rounded-2xl sm:rounded-3xl border border-[#234B32] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Dynamic Live Calculator */}
            <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
              
              <div className="inline-flex items-center gap-1.5 bg-[#0F281B] border border-[#65D886]/40 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-[#65D886]">
                <Sparkles size={12} className="text-[#D4A373]" />
                <span>Direct Mill & Bengal Loom Wholesale Pricing</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                B2B Bulk & Custom Order Calculator
              </h2>
              <p className="text-xs sm:text-sm text-[#86A393]">
                Ideal for interior designers, boutique eco-resorts, corporate gifting, and retail stockists. Transparent volume discounts direct from Bengal.
              </p>

              {/* Product Selection */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase text-[#65D886] mb-2">
                  Select Product Line:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(productPrices).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setProductType(key)}
                      className={`text-xs font-medium p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                        productType === key
                          ? 'bg-[#65D886] text-[#08140D] font-bold border-[#65D886] shadow-md shadow-[#65D886]/25'
                          : 'bg-[#08140D] text-[#C8D7CE] border-[#1E432E] hover:border-[#65D886]/50 hover:bg-[#0D2218]'
                      }`}
                    >
                      <span className="block font-semibold truncate">{val.name}</span>
                      <span className="text-[10px] sm:text-[11px] opacity-80">Retail MRP: ₹{val.basePrice}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Quantity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] sm:text-xs font-bold uppercase text-[#65D886]">
                    Order Quantity:
                  </label>
                  <span className="font-serif font-bold text-lg sm:text-xl text-white">
                    {quantity} <span className="text-xs font-normal text-[#86A393]">{selectedProduct.unit}s</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-[#1A3B29] rounded-lg appearance-none cursor-pointer accent-[#65D886]"
                />

                <div className="flex justify-between text-[10px] sm:text-[11px] text-[#86A393] mt-2">
                  <span>50 pcs (15% off)</span>
                  <span>200 pcs (25% off)</span>
                  <span>500+ pcs (35% off)</span>
                </div>
              </div>

              {/* Price Calculation Output Box */}
              <div className="bg-[#08140D] border border-[#1E432E] rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E432E] pb-3 mb-3 gap-2">
                  <div>
                    <span className="text-[11px] text-[#86A393]">Active Volume Tier:</span>
                    <p className="text-xs font-bold text-[#65D886]">{tierLabel}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[11px] text-[#86A393]">Wholesale Rate / Unit:</span>
                    <p className="font-serif font-bold text-lg sm:text-xl text-white">
                      ₹{wholesaleUnitPrice}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-[#86A393]">Estimated Order Value:</span>
                    <p className="font-serif font-bold text-xl sm:text-2xl text-[#65D886]">
                      ₹{estimatedTotal.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button
                    onClick={handleWhatsAppQuote}
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 sm:py-2.5 rounded-xl text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-sm w-full sm:w-auto"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Quote</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Direct Lead Capture Form */}
            <div className="lg:col-span-5 bg-[#06120B] border-t lg:border-t-0 lg:border-l border-[#1A3828] text-white p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="bg-[#D4A373] text-[#08140D] text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">
                  Official Mill Quote
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mt-2">
                  Request Pro-Forma Invoice & Samples
                </h3>
                <p className="text-xs text-[#86A393] mt-1">
                  Our Kolkata sales desk will reach out within 2 business hours with freight estimates, GST breakdown, and sample dispatch details.
                </p>

                {isSubmitted ? (
                  <div className="mt-6 bg-[#0E2A1B] border border-[#65D886] rounded-2xl p-5 text-center space-y-2">
                    <CheckCircle2 size={32} className="text-[#65D886] mx-auto" />
                    <h4 className="font-serif font-bold text-base sm:text-lg text-white">Inquiry Received!</h4>
                    <p className="text-xs text-[#C8D7CE]">
                      Thank you, {contactName || businessName}. Our wholesale desk has logged your requirement for {quantity} {selectedProduct.name}s.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitInquiry} className="mt-5 space-y-3.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86A393] mb-1">
                        Business / Store Name *
                      </label>
                      <div className="relative">
                        <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A373]" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. FabLifestyle Studio"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white placeholder-[#86A393] focus:outline-none focus:border-[#65D886]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86A393] mb-1">
                        Contact Person Name
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A373]" />
                        <input
                          type="text"
                          placeholder="e.g. Rajesh Kumar"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white placeholder-[#86A393] focus:outline-none focus:border-[#65D886]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86A393] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A373]" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98300 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white placeholder-[#86A393] focus:outline-none focus:border-[#65D886]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#86A393] mb-1">
                        Business Email (Optional)
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A373]" />
                        <input
                          type="email"
                          placeholder="procurement@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white placeholder-[#86A393] focus:outline-none focus:border-[#65D886]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#65D886] text-[#08140D] py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#52C573] transition-colors shadow-md mt-2"
                    >
                      <Send size={14} />
                      <span>{isSubmitting ? 'Submitting...' : 'Send Mill Inquiry'}</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-5 border-t border-[#1E432E] text-[10px] sm:text-[11px] text-[#86A393] space-y-1 mt-5">
                <p>📍 Works: Howrah Jute Mill Belt, West Bengal</p>
                <p>📞 Phone: +91 98302 96606 | GSTIN: 19AACFD2094B1ZS</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
