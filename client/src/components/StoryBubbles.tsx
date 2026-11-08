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
      label: 'Circular Rugs',
      isReel: false,
      image: '/assets/images/jute_floor_mat.jpg',
      action: () => onSelectCategory('floor_mats'),
    },
    {
      label: 'Door Mats',
      isReel: false,
      image: '/assets/images/jute_door_mat.jpg',
      action: () => onSelectCategory('floor_mats'),
    },
    {
      label: 'Dining Runners',
      isReel: false,
      image: '/assets/images/jute_table_mat.jpg',
      action: () => onSelectCategory('dining'),
    },
    {
      label: 'Planter Pots',
      isReel: false,
      image: '/assets/images/jute_planter_basket.jpg',
      action: () => onSelectCategory('planters'),
    },
    {
      label: 'Tote Bags',
      isReel: false,
      image: '/assets/images/jute_tote_bag.jpg',
      action: () => onSelectCategory('bags'),
    },
    {
      label: 'Wall Hangings',
      isReel: false,
      image: '/assets/images/jute_wall_hanging.jpg',
      action: () => onSelectCategory('decor'),
    },
  ];

  return (
    <section className="w-full max-w-full py-3.5 border-b border-[#E7DFD1] bg-[#FAF7F2] overflow-x-auto scrollbar-none">
      <div className="w-max min-w-full px-4 flex items-center gap-4 sm:gap-6 justify-start sm:justify-center mx-auto">
        {stories.map((story, idx) => (
          <button
            key={idx}
            onClick={story.action}
            className="flex flex-col items-center gap-1.5 group flex-shrink-0 focus:outline-none"
          >
            <div
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] transition-transform duration-300 group-hover:scale-105 ${
                story.isReel
                  ? 'bg-gradient-to-tr from-[#D8A856] via-[#1B3B2B] to-[#D8A856] animate-pulse'
                  : 'bg-gradient-to-tr from-[#D8A856] to-[#E7DFD1]'
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                <img
                  src={story.image}
                  alt={story.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {story.isReel && (
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center text-white">
                  <Play size={14} fill="white" className="ml-0.5" />
                </div>
              )}

              {story.badge && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#D8A856] text-[#1B3B2B] text-[8px] font-bold px-1.5 py-0.2 rounded-full shadow">
                  {story.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-[#4A4740] group-hover:text-[#1B3B2B] transition-colors whitespace-nowrap">
              {story.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
