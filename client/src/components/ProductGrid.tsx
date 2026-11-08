import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onAddToCart: (product: Product) => void;
  onQuickInquiry: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onQuickInquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'floor_mats', label: 'Floor Mats & Rugs' },
    { id: 'dining', label: 'Dining Sets' },
    { id: 'planters', label: 'Planters' },
    { id: 'bags', label: 'Totes & Bags' },
    { id: 'ropes', label: 'Ropes' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.braid_weave_type && p.braid_weave_type.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price_inr - b.price_inr;
        if (sortBy === 'price-desc') return b.price_inr - a.price_inr;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products-catalog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1.5">
            <Sparkles size={13} className="text-[#D8A856]" />
            <span>Curated Artisan Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1B3B2B]">
            Hand-Braided Mats & Eco Accents
          </h2>
          <p className="text-xs sm:text-sm text-[#7A756C] mt-1">
            Engineered with natural Bengal golden fiber • Biodegradable, durable & sustainably crafted.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A29C91]" />
            <input
              type="text"
              placeholder="Search mats, rugs, planters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#E7DFD1] text-[#24221E] placeholder-[#A29C91] focus:outline-none focus:border-[#D8A856] shadow-sm"
            />
          </div>

          {/* Sort selector */}
          <div className="relative flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto text-xs py-2.5 px-3.5 pr-8 rounded-xl bg-white border border-[#E7DFD1] text-[#4A4740] focus:outline-none focus:border-[#D8A856] shadow-sm appearance-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (4.8+)</option>
            </select>
            <SlidersHorizontal size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B6B38] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills (horizontally scrollable without breaking page) */}
      <div className="w-full overflow-x-auto scrollbar-none pb-2 mb-6">
        <div className="flex items-center gap-2 w-max min-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`text-xs font-semibold px-3.5 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1B3B2B] text-white shadow-sm'
                  : 'bg-white text-[#4A4740] border border-[#E7DFD1] hover:bg-[#F4EFE6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickInquiry={onQuickInquiry}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E7DFD1] p-6 sm:p-8">
          <span className="text-4xl">🌾</span>
          <h3 className="font-serif text-xl font-bold text-[#1B3B2B] mt-3">No products match your criteria</h3>
          <p className="text-xs text-[#7A756C] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or select another category from the filters above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
            }}
            className="mt-4 text-xs font-semibold px-4 py-2 rounded-xl bg-[#1B3B2B] text-white hover:bg-[#12271D]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
