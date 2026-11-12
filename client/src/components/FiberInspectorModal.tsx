import React, { useState } from 'react';
import { X, ZoomIn, ShieldCheck, Sparkles, CheckCircle2, Layers } from 'lucide-react';

interface FiberInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

const levels = [
  {
    id: 'bast_fiber',
    title: 'Level 1: Golden Bast Fiber (100x Macro)',
    badge: '100% Natural Plant Bast',
    image: '/assets/images/jute_floor_mat.jpg',
    specs: [
      'Raw Corchorus Olitorius bast harvested from the Hooghly delta',
      'Microplastic Free: 0.00% synthetic compounds or chemical sizing',
      'High natural lignin content providing dust & stain resistance',
    ],
    zoomStyle: 'scale-150 origin-center',
    detailLabel: 'Ultra-Fine Golden Sheen Strands',
  },
  {
    id: 'spiral_braid',
    title: 'Level 2: High-Tension Hand-Braid Seam',
    badge: 'Artisan Curved-Needle Stitch',
    image: '/assets/images/jute_floor_mat.jpg',
    specs: [
      'Each concentric ring is hand-sewn with unbleached heavy jute twine',
      'Tensile Breaking Strength: Over 85 kg/force per braid junction',
      'Concealed stitching ensures reversible longevity for 10+ years',
    ],
    zoomStyle: 'scale-125 origin-top-left',
    detailLabel: 'Concentric Spiral Weave Interlock',
  },
  {
    id: 'finished_mat',
    title: 'Level 3: Full Mat Density & Anti-Slip Base',
    badge: 'Heavy Barefoot Comfort',
    image: '/assets/images/jute_floor_mat.jpg',
    specs: [
      'Thick 12mm thermal cushion naturally insulates cold stone & tile floors',
      'Organic ribbed ribbing traps loose hallway dust effortlessly',
      'Completely compostable in soil within 90-120 days at end of life',
    ],
    zoomStyle: 'scale-100 origin-center',
    detailLabel: 'Living Room Centerpiece Finish',
  },
];

export const FiberInspectorModal: React.FC<FiberInspectorModalProps> = ({
  isOpen,
  onClose,
  productTitle = '4ft Mandala Circular Floor Rug',
}) => {
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const activeLevel = levels[activeLevelIndex];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#D8A856]/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#1B3B2B] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#D8A856]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D8A856] text-[#1B3B2B] flex items-center justify-center font-bold">
              <ZoomIn size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                  Fiber-to-Craft™ Macro Inspector
                </h3>
                <span className="text-[10px] bg-[#D8A856] text-[#1B3B2B] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Interactive
                </span>
              </div>
              <p className="text-[11px] text-[#EAD7B5]">{productTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Level Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5 bg-[#F4EFE6] p-1.5 rounded-2xl border border-[#E7DFD1]">
            {levels.map((lvl, idx) => (
              <button
                key={lvl.id}
                onClick={() => setActiveLevelIndex(idx)}
                className={`py-2 px-2 text-center rounded-xl text-[10px] sm:text-xs font-bold transition-all ${
                  activeLevelIndex === idx
                    ? 'bg-[#1B3B2B] text-[#EAD7B5] shadow-md'
                    : 'text-[#55524B] hover:text-[#1B3B2B] hover:bg-white/50'
                }`}
              >
                <div className="truncate">Level {idx + 1}</div>
                <div className="text-[9px] opacity-75 hidden sm:block truncate">
                  {idx === 0 ? 'Raw Fiber' : idx === 1 ? 'Braid Seam' : 'Final Mat'}
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Inspection Canvas */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black border-2 border-[#D8A856]/40 shadow-inner group">
            <img
              src={activeLevel.image}
              alt={activeLevel.title}
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${activeLevel.zoomStyle}`}
            />
            
            {/* Viewfinder Overlay with Cyber-Organic Grid */}
            <div className="absolute inset-0 pointer-events-none border border-white/20 flex flex-col justify-between p-3.5">
              <div className="flex items-center justify-between text-[10px] text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm w-max">
                <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse mr-1.5"></span>
                <span>{activeLevel.detailLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-[#D8A856] text-[#1B3B2B] font-bold text-[9px] uppercase px-2 py-0.5 rounded shadow">
                  {activeLevel.badge}
                </span>
                <span className="text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  100% Bengal Bast
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specs & Lab Verification */}
          <div className="bg-white rounded-2xl p-4 border border-[#E7DFD1] space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7DFD1]">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1B3B2B]">
                {activeLevel.title}
              </h4>
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#1B3B2B] bg-[#FAF7F2] border border-[#D8A856]/40 px-2 py-0.5 rounded-full">
                <ShieldCheck size={11} className="text-[#D8A856]" />
                Lab Certified Organic
              </span>
            </div>

            <div className="space-y-1.5">
              {activeLevel.specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-[#55524B]">
                  <CheckCircle2 size={13} className="text-[#1B3B2B] flex-shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F2] px-5 py-3 border-t border-[#E7DFD1] flex items-center justify-between">
          <span className="text-[11px] text-[#7A756C]">
            🔬 Authentic Bengal Loom Microscopy
          </span>
          <button
            onClick={onClose}
            className="bg-[#1B3B2B] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#12271D] transition-colors"
          >
            Done Inspecting
          </button>
        </div>

      </div>
    </div>
  );
};
