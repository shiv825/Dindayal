import React from 'react';
import { Play, ArrowRight, Sparkles, Leaf, Recycle, Award, HeartHandshake } from 'lucide-react';

interface HeroStageProps {
  onOpenVideo: () => void;
  onExploreProducts: () => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({
  onOpenVideo,
  onExploreProducts,
}) => {
  return (
    <section id="hero-stage" className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-[#08140D] via-[#0B1E14] to-[#08140D] pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 border-b border-[#1A3828]">
      
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#65D886]/10 blur-[100px] pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-[#D4A373]/10 blur-[90px] pointer-events-none -z-0"></div>

      {/* Hanging artisan woven ropes (Visible across Mobile, Tablet & PC) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10 select-none overflow-hidden h-28 sm:h-36">
        {/* Rope 1: Left Bengal Looms */}
        <div className="absolute top-0 left-3 sm:left-8 lg:left-16 flex flex-col items-center scale-85 sm:scale-100 origin-top-left">
          <div className="w-[2.5px] sm:w-[3px] h-12 sm:h-20 lg:h-24 bg-gradient-to-b from-[#8F6335] via-[#C69255] to-[#D4A373] shadow-sm"></div>
          <div className="bg-[#0C2216] text-[#EAD7B5] border border-[#65D886]/40 text-[8px] sm:text-[9.5px] font-bold tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 transform -rotate-2 whitespace-nowrap">
            <span>🧶</span>
            <span>Bengal Heritage</span>
          </div>
        </div>

        {/* Rope 2: Middle Accent Jute Rope */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
          <div className="w-[2px] h-10 lg:h-16 bg-gradient-to-b from-[#8F6335] via-[#C69255] to-[#D4A373] shadow-sm"></div>
          <div className="bg-[#D4A373] text-[#08140D] font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 transform rotate-1 whitespace-nowrap">
            <span>✨</span>
            <span>100% Natural Fiber</span>
          </div>
        </div>

        {/* Rope 3: Right Eco Fiber Rope */}
        <div className="absolute top-0 right-3 sm:right-8 lg:right-16 flex flex-col items-center scale-85 sm:scale-100 origin-top-right">
          <div className="w-[2.5px] sm:w-[3px] h-10 sm:h-16 lg:h-20 bg-gradient-to-b from-[#8F6335] via-[#C69255] to-[#D4A373] shadow-sm"></div>
          <div className="bg-[#0C2216] text-[#65D886] border border-[#65D886]/40 text-[8px] sm:text-[9.5px] font-bold tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 transform rotate-2 whitespace-nowrap">
            <span>🌿</span>
            <span>Zero Plastic</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 sm:pt-6">
        
        {/* Main 2-Column Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Brand Narrative & CTAs */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Eco Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0F281B]/90 border border-[#65D886]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#65D886] shadow-md shadow-[#65D886]/10">
              <span className="w-2 h-2 rounded-full bg-[#65D886] animate-pulse"></span>
              <span>🌿 Go Green. Go Jute.</span>
            </div>

            {/* Headline matching mockup */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white leading-[1.12] tracking-tight">
              Jute Mates{' '}
              <span className="block font-serif font-normal text-white">
                Naturally{' '}
                <span className="font-script font-normal text-[#65D886] text-4xl sm:text-6xl md:text-7xl lg:text-[76px] inline-block transform -rotate-1 ml-1 text-glow">
                  Together
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-[#C8D7CE] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Sustainable jute products for a greener tomorrow. Stylish. Eco-friendly. Made with care from pure Bengal golden fiber.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#65D886] hover:bg-[#52C573] text-[#08140D] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-[#65D886]/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Our Collection</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm sm:text-base px-6 py-3.5 rounded-full backdrop-blur-md transition-all shadow-md group"
              >
                <div className="w-6 h-6 rounded-full bg-white text-[#08140D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={11} fill="#08140D" className="ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Quick Micro Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#86A393]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#65D886]">✓</span> 100% Biodegradable
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#65D886]">✓</span> Master Loom Weavers
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#65D886]">✓</span> Zero Harmful Synthetics
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Centerpiece with Neon Halo Ring */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            
            {/* Top right cursive handwritten tag: "Small Steps... Big Change..." */}
            <div className="absolute -top-4 sm:-top-6 right-2 sm:right-6 z-20 pointer-events-none">
              <div className="font-script text-2xl sm:text-3xl md:text-4xl text-[#EAD7B5] transform -rotate-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-tight text-right">
                Small Steps...<br />
                <span className="text-[#65D886] font-semibold">Big Change...</span>
              </div>
            </div>

            {/* Central Halo Stage */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] aspect-square flex items-center justify-center">
              
              {/* Luminous Glowing Neon Ring */}
              <div className="absolute w-[260px] sm:w-[340px] md:w-[390px] h-[260px] sm:h-[340px] md:h-[390px] rounded-full border-2 border-[#65D886] shadow-[0_0_50px_rgba(101,216,134,0.45),inset_0_0_30px_rgba(101,216,134,0.25)] animate-pulseGlow pointer-events-none"></div>

              {/* Floating composition container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-3 animate-float">
                
                {/* Hero Showcase Image */}
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2D5A3E]/40 shadow-2xl bg-gradient-to-t from-[#050D08] via-transparent to-transparent">
                  <img
                    src="/assets/images/hero_theme.jpg"
                    alt="Jute Mates Naturally Together"
                    className="w-full h-full object-cover object-top scale-105"
                  />
                  
                  {/* Subtle gradient vignette to blend edges seamlessly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08140D] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  
                  {/* Floating Tag on the bag */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#08140D]/90 backdrop-blur-md border border-[#65D886]/40 text-[#65D886] px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Sparkles size={12} className="text-[#D4A373]" />
                    <span>Pure Golden Jute Fiber</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Floating Glassmorphic Feature Strip */}
        <div className="mt-10 sm:mt-14 w-full">
          <div className="bg-[#0C1F15]/85 backdrop-blur-xl border border-[#2D5A3E]/60 rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1E432E]/60">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F2D1E] border border-[#65D886]/40 flex items-center justify-center text-[#65D886] flex-shrink-0 shadow-md">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Eco-Friendly</h4>
                  <p className="text-[10px] sm:text-xs text-[#86A393]">& Biodegradable</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F2D1E] border border-[#65D886]/40 flex items-center justify-center text-[#65D886] flex-shrink-0 shadow-md">
                  <Recycle size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Supports</h4>
                  <p className="text-[10px] sm:text-xs text-[#86A393]">Sustainable Living</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F2D1E] border border-[#65D886]/40 flex items-center justify-center text-[#65D886] flex-shrink-0 shadow-md">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Premium Quality</h4>
                  <p className="text-[10px] sm:text-xs text-[#86A393]">Export Grade Weave</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F2D1E] border border-[#65D886]/40 flex items-center justify-center text-[#65D886] flex-shrink-0 shadow-md">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Handmade</h4>
                  <p className="text-[10px] sm:text-xs text-[#86A393]">with Artisan Care</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
