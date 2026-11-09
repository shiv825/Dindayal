import React from 'react';
import { Sparkles } from 'lucide-react';

const lookbookItems = [
  {
    image: '/assets/images/jute_floor_mat.jpg',
    title: 'Living Room Sanctuary',
    subtitle: '4ft Hand-Braided Mandala Area Rug',
    room: '🛋️ Living Room',
  },
  {
    image: '/assets/images/jute_table_mat.jpg',
    title: 'Warm Earthy Dining',
    subtitle: 'Heat-Resistant Placemats & Runner',
    room: '🍽️ Dining Table',
  },
  {
    image: '/assets/images/jute_planter_basket.jpg',
    title: 'Botanical Balcony Corner',
    subtitle: 'Dual-Tone Cotton-Jute Planter Cover',
    room: '🪴 Boho Balcony',
  },
  {
    image: '/assets/images/jute_wall_hanging.jpg',
    title: 'Boho Wall Statement',
    subtitle: 'Artisan Macramé Tapestry on Teak',
    room: '🌿 Wall Decor',
  },
];

export const Lookbook: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#D8A856]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#8B6B38] mb-3">
          <Sparkles size={12} className="text-[#D8A856]" />
          <span>Real Living Spaces</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B3B2B] leading-tight">
          Styled in Conscious Homes
        </h2>
        <p className="text-xs sm:text-sm text-[#666] mt-2">
          Discover how homeowners and architects integrate Bengal golden fiber into modern interiors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {lookbookItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F4EFE6] border border-[#E7DFD1] shadow-organic"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="bg-[#D8A856] text-[#1B3B2B] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-max mb-1">
                {item.room}
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#EAD7B5] mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
