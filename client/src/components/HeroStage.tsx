import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, ArrowRight, Sun, Moon, Sunrise, Eye, Compass, Layers } from 'lucide-react';
import { RoomStage, SiteSettings } from '../types';

interface HeroStageProps {
  settings?: SiteSettings;
  onOpenVideo: () => void;
  onExploreProducts: () => void;
  onOpenFiberInspector: () => void;
  onOpenVibeMatcher: () => void;
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

type FloorType = 'teak' | 'marble' | 'slate' | 'terracotta';
type LightingMood = 'golden' | 'daylight' | 'evening';
type RugScale = '3ft' | '4ft' | '5ft';

export const HeroStage: React.FC<HeroStageProps> = ({
  settings,
  onOpenVideo,
  onExploreProducts,
  onOpenFiberInspector,
  onOpenVibeMatcher,
}) => {
  const [activeStage, setActiveStage] = useState<RoomStage>(roomStages[0]);
  const [selectedFloor, setSelectedFloor] = useState<FloorType>('teak');
  const [selectedLighting, setSelectedLighting] = useState<LightingMood>('daylight');
  const [selectedScale, setSelectedScale] = useState<RugScale>('4ft');

  // Dynamic texts from Admin settings or fallbacks
  const headline = settings?.hero_headline || 'Handcrafted Jute Mats & Eco Living, Woven with Soul.';
  const subtitle = settings?.hero_subtitle || 'From the fertile delta of Bengal to modern sustainable homes. Hand-braided circular floor rugs, ribbed anti-slip entry mats, and artisan dining runners engineered for longevity and barefoot comfort.';
  const storeName = settings?.store_name || 'Dindayal Jute & Craft';
  const storeSubtitle = settings?.store_subtitle || 'Indian Jute House';
  const rope1 = settings?.rope_badge_1 || '🧶 Authentic Bengal Looms';
  const rope2 = settings?.rope_badge_2 || '✨ 100% Hand-Braided';
  const rope3 = settings?.rope_badge_3 || '🌿 Zero Microplastics';

  const badge1Val = settings?.trust_badge_1_val || '100%';
  const badge1Label = settings?.trust_badge_1_label || 'Golden Bengal Fiber';
  const badge2Val = settings?.trust_badge_2_val || '10+ Yrs';
  const badge2Label = settings?.trust_badge_2_label || 'Artisan Loom Heritage';
  const badge3Val = settings?.trust_badge_3_val || 'Zero';
  const badge3Label = settings?.trust_badge_3_label || 'Microplastic Residue';

  // Lighting overlay styles
  const lightingFilterClass = {
    golden: 'lighting-golden-hour',
    daylight: 'lighting-daylight',
    evening: 'lighting-evening',
  }[selectedLighting];

  // Scale dimension label
  const scaleDimensions = {
    '3ft': '3.0 Ft Diameter (90 cm)',
    '4ft': '4.0 Ft Diameter (120 cm)',
    '5ft': '5.0 Ft Diameter (150 cm)',
  }[selectedScale];

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] pt-14 pb-8 sm:py-12 md:py-20 border-b border-[#E7DFD1]">
      {/* Hanging artisan woven ropes (Visible on Mobile & PC - Customizable from Admin) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10 select-none overflow-hidden h-36 sm:h-44">
        {/* Rope 1: Left Bengal Looms */}
        <div className="absolute top-0 left-3 sm:left-8 lg:left-14 flex flex-col items-center">
          <div className="w-[2.5px] sm:w-[3px] h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-[#8B6B38] via-[#C89D56] to-[#D8A856] shadow-sm"></div>
          <div className="bg-[#1B3B2B] text-[#EAD7B5] border border-[#D8A856]/40 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5 transform -rotate-2 whitespace-nowrap">
            <span>{rope1}</span>
          </div>
        </div>

        {/* Rope 2: Middle Accent Jute Rope */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
          <div className="w-[2px] h-14 lg:h-20 bg-gradient-to-b from-[#8B6B38] via-[#C89D56] to-[#D8A856] shadow-sm"></div>
          <div className="bg-[#D8A856] text-[#1B3B2B] font-bold text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 transform rotate-1 whitespace-nowrap">
            <span>{rope2}</span>
          </div>
        </div>

        {/* Rope 3: Right Eco Fiber Rope */}
        <div className="absolute top-0 right-3 sm:right-8 lg:right-14 flex flex-col items-center">
          <div className="w-[2.5px] sm:w-[3px] h-14 sm:h-20 lg:h-28 bg-gradient-to-b from-[#8B6B38] via-[#C89D56] to-[#D8A856] shadow-sm"></div>
          <div className="bg-[#1B3B2B] text-[#EAD7B5] border border-[#D8A856]/40 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5 transform rotate-2 whitespace-nowrap">
            <span>{rope3}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#D8A856]/50 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-[#8B6B38] shadow-sm">
              <Sparkles size={13} className="text-[#D8A856]" />
              <span>{storeName} • {storeSubtitle}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1B3B2B] leading-[1.18]">
              {headline}
            </h1>

            <p className="text-sm sm:text-lg text-[#55524B] leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 border-t border-[#E7DFD1]/80 max-w-lg">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3B2B]">{badge1Val}</p>
                <p className="text-[10px] sm:text-xs text-[#7A756C]">{badge1Label}</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3B2B]">{badge2Val}</p>
                <p className="text-[10px] sm:text-xs text-[#7A756C]">{badge2Label}</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3B2B]">{badge3Val}</p>
                <p className="text-[10px] sm:text-xs text-[#7A756C]">{badge3Label}</p>
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

          {/* Right Column: Futuristic Interactive Virtual Room & Floor Studio */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-[#E7DFD1] shadow-organic">
              
              {/* Studio Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD1]/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#1B3B2B]">
                    Virtual Room & Floor Studio
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onOpenVibeMatcher}
                    className="flex items-center gap-1 bg-[#F4EFE6] hover:bg-[#D8A856] hover:text-[#1B3B2B] text-[#8B6B38] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D8A856]/40 transition-colors"
                  >
                    <Compass size={11} />
                    <span>AI Matcher</span>
                  </button>
                </div>
              </div>

              {/* Room Stager Switcher Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 py-2.5 border-b border-[#E7DFD1]/40 overflow-x-auto scrollbar-none">
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

              {/* Studio Floor & Lighting Controllers */}
              <div className="grid grid-cols-2 gap-2 pt-2.5 pb-2 text-[10px]">
                {/* Floor Surface Material */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E7DFD1] overflow-x-auto scrollbar-none">
                  <span className="text-[#7A756C] font-semibold whitespace-nowrap pl-1">Floor:</span>
                  {[
                    { id: 'teak', label: '🪵 Teak' },
                    { id: 'marble', label: '🏛️ Marble' },
                    { id: 'slate', label: '🪨 Slate' },
                    { id: 'terracotta', label: '🏺 Clay' },
                  ].map((fl) => (
                    <button
                      key={fl.id}
                      onClick={() => setSelectedFloor(fl.id as FloorType)}
                      className={`px-2 py-0.5 rounded-md font-bold whitespace-nowrap transition-all ${
                        selectedFloor === fl.id
                          ? 'bg-[#1B3B2B] text-white shadow-xs'
                          : 'text-[#555] hover:bg-white'
                      }`}
                    >
                      {fl.label}
                    </button>
                  ))}
                </div>

                {/* Lighting Mood Engine */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E7DFD1] justify-end">
                  <span className="text-[#7A756C] font-semibold whitespace-nowrap pl-1">Light:</span>
                  {[
                    { id: 'golden', label: '🌅 Golden' },
                    { id: 'daylight', label: '☀️ Natural' },
                    { id: 'evening', label: '🕯️ Warm' },
                  ].map((lt) => (
                    <button
                      key={lt.id}
                      onClick={() => setSelectedLighting(lt.id as LightingMood)}
                      className={`px-2 py-0.5 rounded-md font-bold whitespace-nowrap transition-all ${
                        selectedLighting === lt.id
                          ? 'bg-[#D8A856] text-[#1B3B2B] shadow-xs'
                          : 'text-[#555] hover:bg-white'
                      }`}
                    >
                      {lt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Stage Canvas with Simulated Floor Texture & Lighting */}
              <div className={`relative mt-1.5 rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] group shadow-inner border border-[#E7DFD1] floor-${selectedFloor}`}>
                
                {/* Product Rug Canvas Image with Lighting Filter */}
                <img
                  src={activeStage.image}
                  alt={activeStage.title}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${lightingFilterClass}`}
                />

                {/* Lighting Atmosphere Tint Gradient */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                    selectedLighting === 'golden'
                      ? 'bg-gradient-to-tr from-amber-700/25 via-amber-400/15 to-transparent mix-blend-color-burn opacity-70'
                      : selectedLighting === 'evening'
                      ? 'bg-gradient-to-t from-black/60 via-amber-900/20 to-black/30 mix-blend-multiply opacity-80'
                      : 'bg-transparent'
                  }`}
                ></div>

                {/* Bottom Card Meta Details */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3.5 sm:p-5 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-[#D8A856] text-[#1B3B2B] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      {activeStage.subtitle}
                    </span>
                    
                    {/* Scale Selector */}
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20 text-[9px]">
                      {(['3ft', '4ft', '5ft'] as RugScale[]).map((sc) => (
                        <button
                          key={sc}
                          onClick={() => setSelectedScale(sc)}
                          className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                            selectedScale === sc ? 'bg-[#D8A856] text-[#1B3B2B]' : 'text-white/80 hover:text-white'
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-xl font-serif font-bold leading-snug">
                    {activeStage.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-1 text-[11px] sm:text-xs">
                    <p className="text-[#EAD7B5] flex items-center gap-1.5">
                      <span>📏 Selected Scale:</span>
                      <strong className="text-white">{scaleDimensions}</strong>
                    </p>
                    
                    {/* Button to open Fiber Inspector */}
                    <button
                      onClick={onOpenFiberInspector}
                      className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 hover:bg-white text-white hover:text-[#1B3B2B] px-2.5 py-1 rounded-full backdrop-blur-sm transition-all"
                    >
                      <Eye size={12} />
                      <span>Inspect Weave (360°)</span>
                    </button>
                  </div>
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
