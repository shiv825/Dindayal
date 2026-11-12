import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { RoomStage } from '../types';

interface HeroStageProps {
  onOpenVideo: () => void;
  onExploreProducts: () => void;
}

const roomStages: RoomStage[] = [
  {
    id: 'living-room',
    title: '4ft Mandala Circular Floor Rug',
    subtitle: 'Living Room Centerpiece',
    badge: '🛋️ Living Room Rug',
    dimensions: '4.0 Ft Diameter (120 cm)',
    image: '/assets/images/jute_floor_mat.jpg',
    description: 'Thick spiral hand-braid with sunburst lace border. Naturally repels dust, insulates cold tiled floors, and creates a grounded bohemian sanctuary.',
  },
  {
    id: 'dining-room',
    title: 'Artisan Dining Runner & 6 Placemats',
    subtitle: 'Heat-Resistant Dining Set',
    badge: '🍽️ Dining Table',
    dimensions: '6 Mats (30cm) + 1 Runner (120x35cm)',
    image: '/assets/images/jute_table_mat.jpg',
    description: 'Protects dining surfaces against hot serveware. Woven with fine golden jute threads for effortless festive and daily luxury.',
  },
  {
    id: 'balcony-corner',
    title: 'Dual-Tone Handcrafted Planter Basket',
    subtitle: 'Indoor Greenery & Decor',
    badge: '🪴 Boho Balcony',
    dimensions: '10" Height x 10" Diameter',
    image: '/assets/images/jute_planter_basket.jpg',
    description: 'Cotton-jute woven dual tone with concealed waterproof inner liner. Perfect companion for Monstera, Fiddle Leaf, and Snake plants.',
  },
];

export const HeroStage: React.FC<HeroStageProps> = ({
  onOpenVideo,
  onExploreProducts,
}) => {
  const [activeStage, setActiveStage] = useState<RoomStage>(roomStages[0]);

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] pt-14 pb-8 sm:py-12 md:py-20 border-b border-[#E7DFD1]">
      {/* Hanging artisan woven ropes (Visible on Mobile & PC) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10 select-none overflow-hidden h-36 sm:h-44">
        {/* Rope 1: Left Bengal Looms */}
        <div className="absolute top-0 left-3 sm:left-8 lg:left-14 flex flex-col items-center">
          <div className="w-[2.5px] sm:w-[3px] h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-[#8B6B38] via-[#C89D56] to-[#D8A856] shadow-sm"></div>
          <div className="bg-[#1B3B2B] text-[#EAD7B5] border border-[#D8A856]/40 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5 transform -rotate-2 whitespace-nowrap">
            <span>🧶</span>
            <span>Authentic Bengal Looms</span>
          </div>
        </div>

        {/* Rope 2: Middle Accent Jute Rope */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
          <div className="w-[2px] h-14 lg:h-20 bg-gradient-to-b from-[#8B6B38] via-[#C89D56] to-[#D8A856] shadow-sm"></div>
          <div className="bg-[#D8A856] text-[#1B3B2B] font-bold text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 transform rotate-1 whitespace-nowrap">
            <span>✨</span>
            <span>100% Hand-Braided</span>
          </div>
        </div>

        {/* Rope 3: Right Eco Fiber Rope */}
        <div className="absolute top-0 right-3 sm:right-8 lg:right-14 flex flex-col items-center">
          <div className="w-[2.5px] sm:w-[3px] h-14 sm:h-20 lg:h-28 bg-gradient-to-b from-[#8B6B38] via-[#C89D56] to-[#D8A856] shadow-sm"></div>
          <div className="bg-[#1B3B2B] text-[#EAD7B5] border border-[#D8A856]/40 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5 transform rotate-2 whitespace-nowrap">
            <span>🌿</span>
            <span>Zero Microplastics</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#D8A856]/50 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-[#8B6B38] shadow-sm">
              <Sparkles size={13} className="text-[#D8A856]" />
              <span>Dindayal Jute & Craft • Indian Jute House</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1B3B2B] leading-[1.18]">
              Handcrafted Jute Mats & Eco Living,{' '}
              <span className="italic font-normal text-[#8B6B38] block sm:inline">
                Woven with Soul.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-[#55524B] leading-relaxed max-w-xl">
              From the fertile delta of Bengal to modern sustainable homes. Hand-braided circular floor rugs, ribbed anti-slip entry mats, and artisan dining runners engineered for longevity and barefoot comfort.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 border-t border-[#E7DFD1]/80 max-w-lg">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3B2B]">100%</p>
                <p className="text-[10px] sm:text-xs text-[#7A756C]">Golden Bengal Fiber</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3B2B]">10+ Yrs</p>
                <p className="text-[10px] sm:text-xs text-[#7A756C]">Artisan Loom Heritage</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3B2B]">Zero</p>
                <p className="text-[10px] sm:text-xs text-[#7A756C]">Microplastic Residue</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="flex items-center justify-center gap-2 bg-[#1B3B2B] text-white px-6 py-3.5 rounded-xl font-medium text-sm hover:bg-[#12271D] transition-all shadow-md group"
              >
                <span>Shop Mat Collections</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenVideo}
                className="flex items-center justify-center gap-2.5 bg-white border border-[#D8A856] text-[#1B3B2B] px-5 py-3.5 rounded-xl font-medium text-sm hover:bg-[#F9F4EB] transition-all shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center">
                  <Play size={11} fill="white" className="ml-0.5" />
                </div>
                <span>Watch Loom Artisans</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Room Staging Visualizer */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-[#E7DFD1] shadow-organic">
              
              {/* Room Stager Switcher Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 pb-3 border-b border-[#E7DFD1]/70 overflow-x-auto scrollbar-none">
                <span className="text-[10px] sm:text-xs font-semibold text-[#8B6B38] uppercase tracking-wider mr-1 whitespace-nowrap">
                  Room:
                </span>
                {roomStages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage)}
                    className={`text-[11px] sm:text-xs font-medium px-2.5 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                      activeStage.id === stage.id
                        ? 'bg-[#1B3B2B] text-white shadow-sm'
                        : 'bg-[#F4EFE6] text-[#4A4740] hover:bg-[#EAE2D5]'
                    }`}
                  >
                    {stage.badge}
                  </button>
                ))}
              </div>

              {/* Stage Image with Calm Depth */}
              <div className="relative mt-3 rounded-xl sm:rounded-2xl overflow-hidden bg-[#F4EFE6] aspect-[4/3] group">
                <img
                  src={activeStage.image}
                  alt={activeStage.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3.5 sm:p-5 text-white">
                  <span className="bg-[#D8A856] text-[#1B3B2B] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-max mb-1">
                    {activeStage.subtitle}
                  </span>
                  <h3 className="text-base sm:text-xl font-serif font-bold leading-snug">
                    {activeStage.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#EAD7B5] mt-0.5 flex items-center gap-1.5">
                    <span>📏 Dimensions:</span>
                    <strong className="text-white">{activeStage.dimensions}</strong>
                  </p>
                </div>
              </div>

              {/* Stage Description & Craft Details */}
              <div className="mt-3 bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E7DFD1] text-[11px] sm:text-xs text-[#55524B] leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#1B3B2B] flex-shrink-0 mt-0.5" />
                  <p>{activeStage.description}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
