'use client';

import { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = ['All', 'Drop Earrings', 'Studs', 'Hoops', 'Chandelier Earrings'];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen py-16 px-6 sm:px-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            Haute Joaillerie
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-normal">
            The Earring Collection
          </h1>
          <p className="text-sm text-[#8C827A] font-light leading-relaxed">
            Every creation is sculpted from ethically sourced 18K gold and platinum, set with unheated gemstones and certified diamonds. Click any piece to view specifications or experience live try-on.
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#C5A880]/20">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#FAF8F5]'
                    : 'bg-white/60 text-[#1A1A1A] hover:bg-[#FAF8F5] border border-[#C5A880]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#8C827A]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/80 border border-[#C5A880]/30 text-xs px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 bg-white border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg text-[#1A1A1A]">Ready to see how they look on you?</h3>
            <p className="text-xs text-[#8C827A]">Try any pair on your portrait instantly with zero image uploads.</p>
          </div>
          <Link
            href="/try-on"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-xs uppercase tracking-widest font-medium transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Virtual Try-On</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
