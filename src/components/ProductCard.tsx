'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatINR } from '@/data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col bg-[#FAF8F5] border border-[#C5A880]/20 hover:border-[#C5A880]/60 transition-all duration-300 luxury-card-hover overflow-hidden">
      {/* Product Image Frame */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full bg-[#FAF8F5] overflow-hidden flex items-center justify-center p-8">
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={product.catalogImage}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={product.featured}
          />
        </div>

        {/* Category tag */}
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] bg-[#1A1A1A]/80 text-[#FAF8F5] px-2.5 py-1">
          {product.category}
        </span>
      </Link>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white/40 border-t border-[#C5A880]/15">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <span className="text-[11px] uppercase tracking-widest text-[#8C827A]">
              {product.metal} • {product.karat}
            </span>
            <span className="text-xs font-medium text-[#1A1A1A]">
              {formatINR(product.price)}
            </span>
          </div>

          <h3 className="font-serif text-lg font-medium text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors mb-2 line-clamp-1">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-[#8C827A] line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-[#C5A880]/10 flex items-center justify-between gap-2">
          <Link
            href={`/try-on?product=${product.id}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#1A1A1A] hover:text-[#C5A880] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Virtual Try-On</span>
          </Link>

          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#8C827A] hover:text-[#1A1A1A] transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
