import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, getProductBySlug, formatINR } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Sparkles, Calendar, Mail, ShieldCheck, Check, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products at build time
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen py-12 px-6 sm:px-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C827A] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collection</span>
          </Link>
        </div>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery View */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full bg-white border border-[#C5A880]/30 p-10 flex items-center justify-center luxury-card-hover overflow-hidden">
              <Image
                src={product.catalogImage}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
              <span className="absolute top-6 left-6 text-xs uppercase tracking-widest bg-[#1A1A1A] text-[#FAF8F5] px-3 py-1">
                {product.availability}
              </span>
            </div>

            <p className="text-[11px] text-[#8C827A] text-center italic">
              Actual precious metal tones and natural gemstone inclusions may vary subtly under direct studio lighting.
            </p>
          </div>

          {/* Product Specifications & CTAs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3 border-b border-[#C5A880]/20 pb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium leading-tight">
                {product.name}
              </h1>
              <div className="text-2xl font-light text-[#1A1A1A] pt-1">
                {formatINR(product.price)}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8C827A] leading-relaxed">
              {product.description}
            </p>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 bg-white/70 border border-[#C5A880]/20 p-5 text-xs">
              <div>
                <span className="text-[#8C827A] uppercase tracking-wider text-[10px] block">Precious Metal</span>
                <span className="font-medium text-[#1A1A1A]">{product.metal} ({product.karat})</span>
              </div>
              <div>
                <span className="text-[#8C827A] uppercase tracking-wider text-[10px] block">Stone Details</span>
                <span className="font-medium text-[#1A1A1A]">{product.stone}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#C5A880]/15">
                <span className="text-[#8C827A] uppercase tracking-wider text-[10px] block">Dimensions</span>
                <span className="font-medium text-[#1A1A1A]">{product.dimensions}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/try-on?product=${product.id}`}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>Experience Virtual Try-On</span>
              </Link>

              <Link
                href={`/appointment?product=${product.id}&intent=appointment`}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-white border border-[#C5A880]/40 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-black/5 text-xs uppercase tracking-[0.2em] font-medium transition-all"
              >
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>Book Showroom Appointment</span>
              </Link>

              <Link
                href={`/appointment?product=${product.id}&intent=concierge`}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-transparent text-[#8C827A] hover:text-[#1A1A1A] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Inquire With Concierge</span>
              </Link>
            </div>

            {/* Boutique Guarantees */}
            <div className="pt-4 border-t border-[#C5A880]/20 space-y-2 text-xs text-[#8C827A]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>GIA / IGI Certification included for all center gemstones</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Bespoke presentation packaging and insured global delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        <div className="pt-16 border-t border-[#C5A880]/20 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">Complementary Creations</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A]">You May Also Appreciate</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
