import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#08140D] border-l border-[#1A3828] shadow-2xl flex flex-col text-[#F5F8F6]">
          
          {/* Header */}
          <div className="p-5 bg-[#0C1E14] border-b border-[#1A3828] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🧺</span>
              <h3 className="font-serif font-bold text-lg text-white">
                Your Artisan Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#08140D] hover:bg-[#153423] text-[#C8D7CE] hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderComplete ? (
              <div className="py-16 text-center space-y-3">
                <CheckCircle2 size={48} className="text-[#65D886] mx-auto animate-bounce" />
                <h4 className="font-serif text-2xl font-bold text-white">Order Placed!</h4>
                <p className="text-xs text-[#86A393] max-w-xs mx-auto">
                  Thank you, {name}! Your handcrafted jute order has been received. Our Bengal dispatch team will contact you for delivery confirmation.
                </p>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="bg-[#0C1E14] p-3.5 rounded-xl border border-[#234B32] flex items-center justify-between text-xs">
                  <span className="text-[#86A393]">Order Payable:</span>
                  <strong className="text-[#65D886] text-lg font-serif">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#65D886] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white focus:outline-none focus:border-[#65D886]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#65D886] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white focus:outline-none focus:border-[#65D886]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#65D886] mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House/Flat No., Street, Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white focus:outline-none focus:border-[#65D886]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#65D886] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kolkata"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white focus:outline-none focus:border-[#65D886]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#65D886] mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 700091"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-white focus:outline-none focus:border-[#65D886]"
                    />
                  </div>
                </div>

                <div className="bg-[#0C1E14] p-3 rounded-xl border border-[#234B32] text-[11px] text-[#C8D7CE] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#65D886]" />
                  <span>Payment Method: Cash on Delivery (COD) / Pay on Dispatch</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-[#0C1E14] border border-[#234B32] text-[#C8D7CE]"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#65D886] text-[#08140D] hover:bg-[#52C573]"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            ) : items.length > 0 ? (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-[#0C1E14] rounded-2xl border border-[#234B32] p-3 flex gap-3 items-center shadow-sm"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-xl bg-[#0F261A] border border-[#1E432E] flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-white truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-[#65D886] font-semibold mt-0.5">
                        ₹{item.product.price_inr}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-[#1E432E] rounded-lg bg-[#08140D]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#153423] text-[#C8D7CE] rounded-l-lg"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#153423] text-[#C8D7CE] rounded-r-lg"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#86A393] hover:text-red-400 p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <span className="text-4xl">🌾</span>
                <h4 className="font-serif text-lg font-bold text-white">Your Cart is Empty</h4>
                <p className="text-xs text-[#86A393] max-w-xs mx-auto">
                  Explore our handcrafted Bengal jute mats, rugs, bags, and eco living decor to add pieces to your cart.
                </p>
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {!orderComplete && items.length > 0 && !isCheckingOut && (
            <div className="p-5 bg-[#0C1E14] border-t border-[#1A3828] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#86A393]">Subtotal:</span>
                <span className="font-serif font-bold text-lg text-white">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-[#65D886]">
                ✓ Free Kolkata & Domestic Shipping on all artisan orders
              </p>
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#65D886] text-[#08140D] py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#52C573] transition-all shadow-md shadow-[#65D886]/20"
              >
                <span>Proceed to Delivery Details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
