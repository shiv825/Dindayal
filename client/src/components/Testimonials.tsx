import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ananya Dasgupta',
    role: 'Interior Designer, Bangalore',
    quote:
      'The 4-Foot Braided Mandala Rug completely transformed our living room. It feels warm, earthy, and luxurious underfoot. The density of the braided weave is remarkable!',
    badge: 'Verified Buyer',
    initials: 'AD',
  },
  {
    name: 'Rohit Mehta',
    role: 'Brand Director, Mumbai',
    quote:
      'We ordered 250 custom screen-printed jute bags for our corporate retreat. The logo printing was sharp, the handles are reinforced, and delivery arrived 2 days ahead of schedule!',
    badge: 'B2B Client',
    initials: 'RM',
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Architect, Pune',
    quote:
      'The dining table placemats with matching coasters look stunning on our teak wood table. Heat resistant, wipe-clean, and completely plastic-free. Highly recommended!',
    badge: 'Verified Buyer',
    initials: 'SK',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#FAF7F2] to-[#F4EFE6] py-12 sm:py-20 border-y border-[#E7DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 bg-white border border-[#D8A856]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#8B6B38] mb-3 shadow-xs">
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B3B2B] leading-tight">
            Loved in Homes Across India
          </h2>
          <p className="text-xs sm:text-sm text-[#666] mt-2">
            Over 12,000 satisfied homeowners and architects trust our direct Bengal loom quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7DFD1] shadow-organic flex flex-col justify-between relative"
            >
              <Quote className="absolute top-5 right-5 text-[#E7DFD1] w-8 h-8 opacity-60" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[#D8A856]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#D8A856" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1B3B2B] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#D8A856]/30">
                    <CheckCircle size={10} className="text-[#1B3B2B]" />
                    {t.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#444] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#E7DFD1]/80">
                <div className="w-9 h-9 rounded-full bg-[#1B3B2B] text-[#D8A856] font-bold text-xs flex items-center justify-center">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1B3B2B]">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#7A756C]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
