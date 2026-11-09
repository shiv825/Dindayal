import React from 'react';
import { Sparkles } from 'lucide-react';

const journeySteps = [
  {
    num: '01',
    icon: '🌱',
    title: 'Gangetic Monsoon Sowing',
    desc: 'Jute seeds are naturally sown in the rich delta silt along the Hooghly river. The crop is rain-fed, requiring zero chemical pesticides.',
  },
  {
    num: '02',
    icon: '💧',
    title: 'Natural Fiber Retting',
    desc: 'Harvested stems are submerged in slow-moving fresh river streams, naturally loosening the golden-sheened bast fibers without toxins.',
  },
  {
    num: '03',
    icon: '🧶',
    title: 'Hand-Braiding & Loom Weaving',
    desc: 'Master artisan clusters in Howrah spin and hand-braid fibers into high-tensile cords, crafting intricate mandala floor rugs and handles.',
  },
  {
    num: '04',
    icon: '🏡',
    title: 'Sustainable Modern Homes',
    desc: 'Delivered plastic-free. Enduring for years of daily barefoot use, and returning harmlessly to the earth as natural soil compost.',
  },
];

const counters = [
  { number: '50,000+', label: 'Plastic Bags Avoided' },
  { number: '100+', label: 'Artisan Families Empowered' },
  { number: '45+ Yrs', label: 'Fiber & Loom Lineage' },
  { number: '100%', label: 'Soil Biodegradable' },
];

export const CraftJourney: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF7F2] py-12 sm:py-20 border-t border-[#E7DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-white border border-[#D8A856]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#8B6B38] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#D8A856]" />
            <span>Authentic Craft Heritage</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B3B2B] leading-tight">
            From Bengal Soil to Your Living Space
          </h2>
          <p className="text-xs sm:text-sm text-[#666] mt-2">
            How our generational artisans spin natural golden plant bast into durable, plastic-free living essentials.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {journeySteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E7DFD1] shadow-xs hover:border-[#D8A856] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-xs font-bold text-[#D8A856] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#D8A856]/30">
                  Step {step.num}
                </span>
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {step.icon}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B3B2B] mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Environmental Counters Bar */}
        <div className="mt-10 sm:mt-14 bg-gradient-to-r from-[#1B3B2B] via-[#244A37] to-[#1B3B2B] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white border border-[#D8A856]/40 shadow-organic">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {counters.map((c, idx) => (
              <div
                key={idx}
                className={idx < 3 ? 'border-r-0 lg:border-r border-[#D8A856]/20' : ''}
              >
                <p className="font-serif text-2xl sm:text-4xl font-bold text-[#D8A856]">
                  {c.number}
                </p>
                <p className="text-[11px] sm:text-xs text-[#EAD7B5] mt-1 font-medium">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
