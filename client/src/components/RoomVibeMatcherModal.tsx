import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check, ShoppingBag, Compass } from 'lucide-react';
import { Product } from '../types';

interface RoomVibeMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onExploreProduct: (product: Product) => void;
}

const spaces = [
  { id: 'living', label: 'Living Room', icon: '🛋️' },
  { id: 'dining', label: 'Dining Area', icon: '🍽️' },
  { id: 'balcony', label: 'Balcony / Patio', icon: '🪴' },
  { id: 'entryway', label: 'Door Entryway', icon: '🚪' },
];

const floors = [
  { id: 'wood', label: 'Hardwood / Teak', color: '#B87333' },
  { id: 'marble', label: 'White Marble', color: '#ECEEF0' },
  { id: 'slate', label: 'Grey Slate Tile', color: '#3A4048' },
  { id: 'terracotta', label: 'Terracotta Clay', color: '#C85A32' },
];

const vibes = [
  { id: 'boho', label: 'Bohemian Sanctuary', desc: 'Warm spiral mandala braids & earth tones' },
  { id: 'minimal', label: 'Earthy Minimalist', desc: 'Clean lines, ribbed texture, zero clutter' },
  { id: 'heritage', label: 'Bengal Loom Classic', desc: 'Hand-braided heritage gold with high density' },
];

export const RoomVibeMatcherModal: React.FC<RoomVibeMatcherModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onExploreProduct,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSpace, setSelectedSpace] = useState('living');
  const [selectedFloor, setSelectedFloor] = useState('wood');
  const [selectedVibe, setSelectedVibe] = useState('boho');

  if (!isOpen) return null;

  // Determine recommendation
  let matchedProduct: Product | undefined;
  if (selectedSpace === 'living') {
    matchedProduct = products.find((p) => p.category === 'floor_mats') || products[0];
  } else if (selectedSpace === 'dining') {
    matchedProduct = products.find((p) => p.category === 'dining') || products[1];
  } else if (selectedSpace === 'balcony') {
    matchedProduct = products.find((p) => p.category === 'planters') || products[2];
  } else {
    matchedProduct = products.find((p) => p.title.toLowerCase().includes('door')) || products[0];
  }

  const handleReset = () => {
    setStep(1);
    setSelectedSpace('living');
    setSelectedFloor('wood');
    setSelectedVibe('boho');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full border border-[#D8A856]/40 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1B3B2B] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#D8A856]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D8A856] text-[#1B3B2B] flex items-center justify-center font-bold">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                AI Room & Vibe Matcher
              </h3>
              <p className="text-[11px] text-[#EAD7B5]">
                {step <= 3 ? `Step ${step} of 3 • Quick 10-Second Finder` : '✨ Your Perfect Handcrafted Match'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B]">
                  Which room space are you styling?
                </h4>
                <p className="text-xs text-[#7A756C] mt-1">
                  Select your primary living area to calculate the ideal dimensions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {spaces.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSpace(s.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedSpace === s.id
                        ? 'border-[#1B3B2B] bg-[#1B3B2B] text-white shadow-md'
                        : 'border-[#E7DFD1] bg-white text-[#24221E] hover:border-[#D8A856]'
                    }`}
                  >
                    <span className="text-2xl mb-2">{s.icon}</span>
                    <span className="font-serif font-bold text-sm">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B]">
                  What type of flooring do you have?
                </h4>
                <p className="text-xs text-[#7A756C] mt-1">
                  We balance fiber contrast & thermal insulation for your floor material.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {floors.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSelectedFloor(f.id);
                      setStep(3);
                    }}
                    className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      selectedFloor === f.id
                        ? 'border-[#1B3B2B] bg-[#1B3B2B] text-white shadow-md'
                        : 'border-[#E7DFD1] bg-white text-[#24221E] hover:border-[#D8A856]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border border-black/20"
                        style={{ backgroundColor: f.color }}
                      ></div>
                      <span className="font-serif font-bold text-sm">{f.label}</span>
                    </div>
                    <ArrowRight size={15} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B]">
                  What aesthetic vibe do you want?
                </h4>
                <p className="text-xs text-[#7A756C] mt-1">
                  Select how you want your living space to feel.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {vibes.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVibe(v.id);
                      setStep(4);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                      selectedVibe === v.id
                        ? 'border-[#1B3B2B] bg-[#1B3B2B] text-white shadow-md'
                        : 'border-[#E7DFD1] bg-white text-[#24221E] hover:border-[#D8A856]'
                    }`}
                  >
                    <div className="font-serif font-bold text-sm mb-0.5">{v.label}</div>
                    <div className={`text-[11px] ${selectedVibe === v.id ? 'text-[#EAD7B5]' : 'text-[#7A756C]'}`}>
                      {v.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && matchedProduct && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-[#D8A856]/40 shadow-organic">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] flex-shrink-0 border border-[#E7DFD1]">
                    <img
                      src={matchedProduct.image_url}
                      alt={matchedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="bg-[#D8A856] text-[#1B3B2B] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      98% Match Score
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#1B3B2B] truncate mt-1">
                      {matchedProduct.title}
                    </h5>
                    <p className="text-[11px] text-[#7A756C]">
                      {matchedProduct.dimensions || '4.0 Ft Diameter (120 cm)'}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif font-bold text-sm text-[#1B3B2B]">
                        ₹{matchedProduct.price_inr}
                      </span>
                      <span className="text-[10px] text-[#999] line-through">
                        ₹{matchedProduct.mrp_inr}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#E7DFD1] text-[11px] text-[#55524B] leading-relaxed">
                  💡 <strong>Why it matches:</strong> Styled for {selectedSpace} spaces with {selectedFloor} flooring. The high-tension {matchedProduct.braid_weave_type || 'braid'} reflects natural daylight while protecting floor surfaces.
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onAddToCart(matchedProduct!);
                    onClose();
                  }}
                  className="flex-1 bg-[#1B3B2B] text-white py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#12271D] transition-colors shadow-md"
                >
                  <ShoppingBag size={14} />
                  <span>Add Mat to Bag</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-white border border-[#E7DFD1] text-[#555] rounded-xl text-xs font-semibold hover:bg-[#F4EFE6] transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
