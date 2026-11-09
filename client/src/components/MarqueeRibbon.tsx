import React from 'react';

const marqueeItems = [
  '🌿 100% PURE GOLDEN BENGAL JUTE',
  '👜 HANDCRAFTED TOTE BAGS',
  '🧶 HAND-BRAIDED MANDALA RUGS',
  '🪴 ORGANIC WOVEN PLANTERS',
  '🏭 DIRECT FACTORY MILL PRICING',
  '🚚 FREE PAN-INDIA EXPRESS SHIPPING',
  '🇮🇳 PROUDLY CRAFTED IN BENGAL',
  '✨ ZERO MICROPLASTICS',
];

export const MarqueeRibbon: React.FC = () => {
  return (
    <div className="w-full bg-[#1B3B2B] text-[#EAD7B5] py-2.5 sm:py-3 overflow-hidden border-y border-[#D8A856]/40 select-none shadow-inner">
      <div className="animate-marquee-track flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold tracking-wider uppercase">
        {/* Track 1 */}
        {marqueeItems.map((item, idx) => (
          <React.Fragment key={`t1-${idx}`}>
            <span className="whitespace-nowrap flex items-center gap-2">
              <span>{item}</span>
            </span>
            <span className="text-[#D8A856] text-xs opacity-75">•</span>
          </React.Fragment>
        ))}
        {/* Track 2 (duplicate for infinite seamless loop) */}
        {marqueeItems.map((item, idx) => (
          <React.Fragment key={`t2-${idx}`}>
            <span className="whitespace-nowrap flex items-center gap-2">
              <span>{item}</span>
            </span>
            <span className="text-[#D8A856] text-xs opacity-75">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
