import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, ProductCategory, normalizeCategory } from '../types';
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
    { id: 'all' as ProductCategory, label: 'All Collections' },
    { id: 'mats_carpets' as ProductCategory, label: 'Jute Mats & Carpets' },
    { id: 'bags' as ProductCategory, label: 'Jute Bags' },
    { id: 'decor_crafts' as ProductCategory, label: 'Home Decor & Crafts' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const norm = normalizeCategory(p.category);
        const matchesCategory =
          selectedCategory === 'all' ||
          norm === selectedCategory ||
          p.category === selectedCategory;

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
    <section id="products-catalog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#65D886] mb-1.5">
            <Sparkles size={13} className="text-[#D4A373]" />
            <span>Master Artisan Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Pure Bengal Jute Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#86A393] mt-1 max-w-xl">
            100% Biodegradable • Hand-braided mats, export tote bags & artisan home decor.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86A393]" />
            <input
              type="text"
              placeholder="Search rugs, bags, baskets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#0C1E14] border border-[#234B32] text-[#F5F8F6] placeholder-[#86A393] focus:outline-none focus:border-[#65D886] shadow-inner"
            />
          </div>

          {/* Sort selector */}
          <div className="relative flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto text-xs py-2.5 px-3.5 pr-8 rounded-xl bg-[#0C1E14] border border-[#234B32] text-[#C8D7CE] focus:outline-none focus:border-[#65D886] appearance-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (4.8+)</option>
            </select>
            <SlidersHorizontal size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65D886] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills (horizontally scrollable without breaking page on mobile) */}
      <div className="w-full overflow-x-auto scrollbar-none pb-2 mb-8">
        <div className="flex items-center gap-2 w-max min-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#65D886] text-[#08140D] font-bold shadow-lg shadow-[#65D886]/25'
                    : 'bg-[#0C1E14] text-[#C8D7CE] border border-[#234B32] hover:border-[#65D886]/50 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
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
        <div className="text-center py-16 bg-[#0C1E14] rounded-3xl border border-[#234B32] p-6 sm:p-8">
          <span className="text-4xl">🌾</span>
          <h3 className="font-serif text-xl font-bold text-white mt-3">No products match your search</h3>
          <p className="text-xs text-[#86A393] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or select another collection from the filters above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
            }}
            className="mt-4 text-xs font-bold px-5 py-2.5 rounded-full bg-[#65D886] text-[#08140D] hover:bg-[#52C573] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
