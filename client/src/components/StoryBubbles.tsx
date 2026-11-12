import React from 'react';
import { Play } from 'lucide-react';
import { ProductCategory } from '../types';

interface StoryBubblesProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenVideo: () => void;
}

export const StoryBubbles: React.FC<StoryBubblesProps> = ({
  onSelectCategory,
  onOpenVideo,
}) => {
  const stories = [
    {
      label: 'Artisan Reel',
      isReel: true,
      image: '/assets/images/jute_floor_mat.jpg',
      action: onOpenVideo,
      badge: 'LIVE',
    },
    {
      label: 'Mats & Carpets',
      isReel: false,
      image: '/assets/images/jute_floor_mat.jpg',
      action: () => onSelectCategory('mats_carpets'),
    },
    {
      label: 'Floor Rugs',
      isReel: false,
      image: '/assets/images/jute_door_mat.jpg',
      action: () => onSelectCategory('mats_carpets'),
    },
    {
      label: 'Dining Runners',
      isReel: false,
      image: '/assets/images/jute_table_mat.jpg',
      action: () => onSelectCategory('mats_carpets'),
    },
    {
      label: 'Jute Bags',
      isReel: false,
      image: '/assets/images/jute_tote_bag.jpg',
      action: () => onSelectCategory('bags'),
    },
    {
      label: 'Laptop Sleeves',
      isReel: false,
      image: '/assets/images/jute_laptop_sleeve.jpg',
      action: () => onSelectCategory('bags'),
    },
    {
      label: 'Home Decor',
      isReel: false,
      image: '/assets/images/jute_planter_basket.jpg',
      action: () => onSelectCategory('decor_crafts'),
    },
    {
      label: 'Wall Macrame',
      isReel: false,
      image: '/assets/images/jute_wall_hanging.jpg',
      action: () => onSelectCategory('decor_crafts'),
    },
  ];

  return (
    <section className="w-full max-w-full py-3.5 border-b border-[#1A3828] bg-[#07130C] overflow-x-auto scrollbar-none">
      <div className="w-max min-w-full px-4 flex items-center gap-4 sm:gap-6 justify-start sm:justify-center mx-auto">
        {stories.map((story, idx) => (
          <button
            key={idx}
            onClick={story.action}
            className="flex flex-col items-center gap-1.5 group flex-shrink-0 focus:outline-none"
          >
            <div
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] transition-transform duration-300 group-hover:scale-108 ${
                story.isReel
                  ? 'bg-gradient-to-tr from-[#65D886] via-[#D4A373] to-[#65D886] animate-pulse shadow-[0_0_12px_rgba(101,216,134,0.4)]'
                  : 'bg-gradient-to-tr from-[#65D886]/60 via-[#1E432E] to-[#D4A373]/80 group-hover:from-[#65D886] group-hover:to-[#D4A373]'
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0C1E14] border border-[#1E432E]">
                <img
                  src={story.image}
                  alt={story.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {story.isReel && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white">
                  <Play size={14} fill="white" className="ml-0.5" />
                </div>
              )}

              {story.badge && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#65D886] text-[#08140D] text-[8px] font-extrabold px-1.5 py-0.2 rounded-full shadow">
                  {story.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-[#86A393] group-hover:text-[#65D886] transition-colors whitespace-nowrap">
              {story.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
