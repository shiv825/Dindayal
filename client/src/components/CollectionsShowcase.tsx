import React from 'react';
import { ArrowRight, Sparkles, Globe, Heart, Shield, CheckCircle } from 'lucide-react';
import { ProductCategory } from '../types';

interface CollectionsShowcaseProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CollectionsShowcase: React.FC<CollectionsShowcaseProps> = ({
  onSelectCategory,
}) => {
  const collections = [
    {
      id: 'mats_carpets' as ProductCategory,
      num: '01',
      title: 'Jute Mats & Carpets',
      subtitle: 'Premium rugs, floor mats and handmade carpets',
      image: '/assets/images/jute_floor_mat.jpg',
      itemCount: '15+ Designs',
      badge: 'Living & Entry',
    },
    {
      id: 'bags' as ProductCategory,
      num: '02',
      title: 'Jute Bags',
      subtitle: 'Shopping bags, tote bags and reusable pouches',
      image: '/assets/images/jute_tote_bag.jpg',
      itemCount: '25+ Styles',
      badge: 'Zero Plastic',
    },
    {
      id: 'decor_crafts' as ProductCategory,
      num: '03',
      title: 'Home Decor & Crafts',
      subtitle: 'Baskets, wall decor, handmade crafts & planters',
      image: '/assets/images/jute_planter_basket.jpg',
      itemCount: '30+ Creations',
      badge: 'Artisan Crafted',
    },
  ];

  const handleCardClick = (catId: ProductCategory) => {
    onSelectCategory(catId);
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-[#08140D] py-12 sm:py-16 md:py-20 border-b border-[#1A3828]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#65D886]/10 blur-[120px] pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#D4A373]/10 blur-[130px] pointer-events-none -z-0"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Top Grid: Left Title + Right Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-[#65D886] text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-4 h-[2px] bg-[#65D886]"></span>
              Our Curated Collections
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white font-serif tracking-tight">
              Crafted by <span className="text-[#65D886] font-normal italic">Nature</span>
            </h2>
          </div>
          <div className="max-w-md space-y-3">
            <p className="text-xs sm:text-sm text-[#C8D7CE] leading-relaxed">
              Discover our signature range of premium jute creations — where time-honored Bengal loom traditions meet refined modern living.
            </p>
            <button
              onClick={() => handleCardClick('all')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#65D886] hover:text-white transition-colors group"
            >
              <span>View All 3 Collections</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3 Arched Collection Cards + Impact Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          
          {/* Card 1, 2, 3: The Three Signature Collections with Arch Silhouette */}
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => handleCardClick(col.id)}
              className="group relative rounded-t-[70px] sm:rounded-t-[80px] rounded-b-2xl overflow-hidden bg-[#0C1E14] border border-[#234B32]/70 hover:border-[#65D886] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer shadow-xl flex flex-col justify-between"
            >
              {/* Collection Number & Badge */}
              <div className="absolute top-4 left-4 z-20 bg-[#08140D]/85 backdrop-blur-md border border-[#2D5A3E] px-2.5 py-1 rounded-full text-[10px] font-bold text-[#65D886] flex items-center gap-1">
                <span>{col.num}</span>
                <span className="opacity-40">•</span>
                <span>{col.badge}</span>
              </div>

              {/* Image with Arched Top */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0F261A]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E14] via-black/20 to-transparent"></div>
              </div>

              {/* Content Panel */}
              <div className="p-4 sm:p-5 bg-[#0C1E14] relative z-10 space-y-2 border-t border-[#1E432E]/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#65D886] transition-colors font-serif">
                    {col.title}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-[#143B25] group-hover:bg-[#65D886] group-hover:text-[#08140D] text-[#65D886] flex items-center justify-center transition-all">
                    <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-[#86A393] line-clamp-2">
                  {col.subtitle}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-semibold text-[#D4A373]">
                  <span>{col.itemCount}</span>
                  <span className="group-hover:underline">Explore Products →</span>
                </div>
              </div>
            </div>
          ))}

          {/* Card 4: Our Impact Showcase */}
          <div
            id="our-impact-section"
            className="rounded-3xl bg-gradient-to-br from-[#0C2216] via-[#091A10] to-[#06120B] border border-[#2D5A3E] p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#65D886]/70 transition-all duration-300"
          >
            {/* Ambient background globe glow */}
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#65D886]/15 blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#65D886] flex items-center gap-1.5">
                  <Globe size={13} />
                  <span>Our Impact</span>
                </span>
                <span className="bg-[#65D886]/20 border border-[#65D886]/40 text-[#65D886] text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Planet First
                </span>
              </div>

              {/* Impact Metrics */}
              <div className="space-y-3 pt-1">
                <div className="bg-[#08140D]/70 border border-[#1E432E] p-3 rounded-xl">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#65D886] leading-none">
                    100%
                  </p>
                  <p className="text-[11px] text-[#C8D7CE] font-medium mt-1">
                    Natural Golden Bengal Fiber
                  </p>
                </div>

                <div className="bg-[#08140D]/70 border border-[#1E432E] p-3 rounded-xl">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#D4A373] leading-none">
                    1M+
                  </p>
                  <p className="text-[11px] text-[#C8D7CE] font-medium mt-1">
                    Plastic Carry Bags Replaced
                  </p>
                </div>
              </div>
            </div>

            {/* Earth & Green Planet Artwork */}
            <div className="mt-4 pt-3 border-t border-[#1E432E]/80 relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#102B1D] border-2 border-[#65D886] shadow-[0_0_15px_rgba(101,216,134,0.4)] flex items-center justify-center text-xl flex-shrink-0 animate-pulseGlow">
                🌍
              </div>
              <div>
                <p className="text-xs font-bold text-white">A Greener Planet</p>
                <p className="text-[10px] text-[#86A393] leading-snug">
                  Zero toxic dyes. 100% compostable fiber.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Why Choose Jute Mates / Dindayal? Section with Cursive Script Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-[#0B1E14] border border-[#234B32] p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Why Choose Title + 3 Perks */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                Why Choose <span className="text-[#65D886]">Dindayal Jute Mates?</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                {/* Perk 1 */}
                <div className="flex items-center gap-2.5 bg-[#08140D]/60 p-2.5 rounded-xl border border-[#1E432E]">
                  <div className="w-8 h-8 rounded-lg bg-[#0F2D1E] text-[#65D886] flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Eco-Conscious</p>
                    <p className="text-[10px] text-[#86A393]">Natural & Sustainable</p>
                  </div>
                </div>

                {/* Perk 2 */}
                <div className="flex items-center gap-2.5 bg-[#08140D]/60 p-2.5 rounded-xl border border-[#1E432E]">
                  <div className="w-8 h-8 rounded-lg bg-[#0F2D1E] text-[#D4A373] flex items-center justify-center flex-shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Durable & Long-Lasting</p>
                    <p className="text-[10px] text-[#86A393]">Heavy-Duty Weave</p>
                  </div>
                </div>

                {/* Perk 3 */}
                <div className="flex items-center gap-2.5 bg-[#08140D]/60 p-2.5 rounded-xl border border-[#1E432E]">
                  <div className="w-8 h-8 rounded-lg bg-[#0F2D1E] text-[#65D886] flex items-center justify-center flex-shrink-0">
                    <Heart size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Support Local</p>
                    <p className="text-[10px] text-[#86A393]">Artisan Community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Cursive Script Banner matching the mockup */}
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end border-t lg:border-t-0 lg:border-l border-[#1E432E] pt-4 lg:pt-0 lg:pl-6 text-center lg:text-right">
              <div className="space-y-1">
                <span className="font-script text-3xl sm:text-4xl text-[#EAD7B5] transform -rotate-3 block leading-tight drop-shadow-md">
                  Together for a<br />
                  <span className="text-[#65D886] font-semibold">Greener Tomorrow</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#86A393] block font-sans font-medium">
                  Direct from Bengal Looms
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
