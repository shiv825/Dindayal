import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price_inr * item.quantity,
    0
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      alert('Please fill in all mandatory delivery fields.');
      return;
    }
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setIsCheckingOut(false);
      setOrderComplete(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E7DFD1] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E7DFD1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧺</span>
              <h3 className="font-serif font-bold text-lg text-[#1B3B2B]">
                Your Artisan Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#1B3B2B] flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderComplete ? (
              <div className="py-16 text-center space-y-3">
                <CheckCircle2 size={48} className="text-[#1B3B2B] mx-auto animate-bounce" />
                <h4 className="font-serif text-2xl font-bold text-[#1B3B2B]">Order Placed!</h4>
                <p className="text-xs text-[#55524B] max-w-xs mx-auto">
                  Thank you, {name}! Your handcrafted jute order has been received. Our Bengal dispatch team will contact you for delivery confirmation.
                </p>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DFD1] flex items-center justify-between text-xs">
                  <span className="text-[#7A756C]">Order Payable:</span>
                  <strong className="text-[#1B3B2B] text-base font-serif">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House/Flat No., Street, Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kolkata"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 700091"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DFD1] text-[11px] text-[#55524B] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#1B3B2B]" />
                  <span>Payment Method: Cash on Delivery (COD) / Pay on Dispatch</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-white border border-[#E7DFD1] text-[#4A4740]"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#1B3B2B] text-white hover:bg-[#12271D]"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            ) : items.length > 0 ? (
              <div className="space-y-3">
                {/* Futuristic Live Eco-Impact Meter */}
                <div className="bg-gradient-to-r from-[#1B3B2B] to-[#244A37] text-white p-3.5 rounded-2xl shadow-xs border border-[#D8A856]/40 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5 text-[#D8A856]">
                      <Sparkles size={13} />
                      <span>Live Eco Impact</span>
                    </span>
                    <span className="text-[10px] bg-white/20 text-[#EAD7B5] px-2 py-0.5 rounded-full font-bold">
                      Zero Microplastics
                    </span>
                  </div>
                  <p className="text-[11px] text-[#EAD7B5] leading-relaxed">
                    By choosing Bengal jute, your order avoids <strong className="text-white">{(items.reduce((s, i) => s + i.quantity, 0) * 2.2).toFixed(1)} kg</strong> of synthetic microplastics & empowers <strong className="text-white">{items.reduce((s, i) => s + i.quantity, 0)}</strong> artisan workdays.
                  </p>
                </div>

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-2xl border border-[#E7DFD1] p-3 flex gap-3 items-center shadow-sm"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-xl bg-[#F4EFE6] flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-[#1B3B2B] truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-[#8B6B38] font-semibold">
                        ₹{item.product.price_inr} each
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-[#FAF7F2] hover:bg-[#EAE2D5] text-[#1B3B2B] flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold text-[#1B3B2B] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-[#FAF7F2] hover:bg-[#EAE2D5] text-[#1B3B2B] flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#A29C91] hover:text-red-600 p-1 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="text-4xl">🌾</span>
                <p className="font-serif font-bold text-[#1B3B2B] mt-2">Your cart is empty</p>
                <p className="text-xs text-[#7A756C] mt-1">
                  Explore our hand-braided jute rugs, placemats, and planters.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-[#1B3B2B] text-white hover:bg-[#12271D]"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {!isCheckingOut && !orderComplete && items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E7DFD1] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#7A756C]">Estimated Subtotal:</span>
                <span className="font-serif font-bold text-xl text-[#1B3B2B]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-[#28533E] font-medium">
                ✓ Free Doorstep Delivery across Kolkata & Howrah
              </p>
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#1B3B2B] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#12271D] transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

