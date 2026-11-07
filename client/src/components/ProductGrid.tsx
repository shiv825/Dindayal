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
    <section id="products-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-2">
            <Sparkles size={14} className="text-[#D8A856]" />
            <span>Curated Artisan Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3B2B]">
            Hand-Braided Mats & Eco Accents
          </h2>
          <p className="text-sm text-[#7A756C] mt-1">
            Engineered with natural Bengal golden fiber • Biodegradable, durable & sustainably crafted.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A29C91]" />
            <input
              type="text"
              placeholder="Search mats, rugs, planters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-[#E7DFD1] text-[#24221E] placeholder-[#A29C91] focus:outline-none focus:border-[#D8A856] w-52 sm:w-64 transition-all shadow-sm"
            />
          </div>

          {/* Sort selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs py-2 px-3 pr-8 rounded-xl bg-white border border-[#E7DFD1] text-[#4A4740] focus:outline-none focus:border-[#D8A856] shadow-sm appearance-none cursor-pointer"
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

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id as ProductCategory)}
            className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#1B3B2B] text-white shadow-sm'
                : 'bg-white text-[#4A4740] border border-[#E7DFD1] hover:bg-[#F4EFE6]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E7DFD1] p-8">
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

