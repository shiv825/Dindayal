import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How do I clean and care for my handcrafted jute floor rug or mats?',
    a: 'Natural jute is naturally stain-repellent and low-maintenance. Shake gently outside or vacuum with the beater brush disengaged to remove surface dust. For liquid spills, blot immediately with a clean, dry absorbent towel or damp cloth without harsh scrubbing. Avoid soaking in water or machine washing to preserve the organic braided structure.',
  },
  {
    q: 'Are jute mats and rugs suitable for high-traffic entryways and living rooms?',
    a: 'Yes, absolutely. Bengal golden jute fibers are renowned worldwide for their exceptional tensile strength and resilience. Our circular mandala rugs and ribbed entry mats feature tight concentric spiral stitching specifically engineered to handle heavy daily barefoot and shoe traffic without fraying.',
  },
  {
    q: 'Do you offer direct mill wholesale pricing and custom logo printing for B2B?',
    a: 'Yes. In alliance with Indian Jute House and our Howrah & Hooghly mill belt, we supply supermarkets, organic brands, export merchants, and corporate events with custom-sized bags, totes, and placemats with silk-screen logo printing. Minimum order quantity (MOQ) starts from 100 pieces with tiered volume discounts.',
  },
  {
    q: 'How long does shipping take across India, and how are items packed?',
    a: 'All orders are dispatched within 24 to 48 hours directly from our Bengal facilities. Delivery typically takes 3 to 5 business days across metros and 5 to 7 days nationwide. We ship using 100% recyclable, plastic-free biodegradable kraft paper and unbleached cotton cord wrapping.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#D8A856]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#8B6B38] mb-3">
          <HelpCircle size={12} className="text-[#D8A856]" />
          <span>Got Questions?</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B3B2B] leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#666] mt-2">
          Clear guidance on caring for natural jute fibers, delivery timelines, and mill wholesale orders.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E7DFD1] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-[#1B3B2B] hover:text-[#8B6B38] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#D8A856] flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#555] leading-relaxed border-t border-[#E7DFD1]/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
