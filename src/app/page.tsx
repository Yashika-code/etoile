import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Sparkles, Shield, Camera, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEB] to-[#FAF8F5] px-6 sm:px-12 py-20 border-b border-[#C5A880]/20">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5] border border-[#C5A880]/40 text-[11px] uppercase tracking-[0.25em] text-[#A7885F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Virtual Try-On Studio</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#1A1A1A]">
              Discover Fine Jewelry. <br />
              <span className="italic font-light text-[#A7885F]">Envisioned on You.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#8C827A] font-light max-w-xl leading-relaxed">
              Step into an intimate digital salon where emerald cascades, diamond solitaires, and royal sapphires are rendered in real time onto your portrait with client-side anatomical precision.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/try-on"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Experience Virtual Try-On</span>
              </Link>

              <Link
                href="/collection"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#1A1A1A]/30 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-black/5 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Privacy Trust Badge */}
            <div className="pt-4 flex items-center gap-3 text-xs text-[#8C827A]">
              <Shield className="w-4 h-4 text-[#C5A880]" />
              <span>Your portrait stays on your device. Zero server storage or third-party transmission.</span>
            </div>
          </div>

          {/* Hero Visual Spotlight */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] bg-white p-6 shadow-2xl border border-[#C5A880]/30 luxury-card-hover">
              <div className="relative w-full h-full bg-[#FAF8F5] overflow-hidden">
                <Image
                  src="/jewelry/emerald-celeste-drops.svg"
                  alt="Emerald Celeste Drop Earrings Hero"
                  fill
                  className="object-contain p-6"
                  priority
                />

                {/* Floating luxury tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-sm p-4 border border-[#C5A880]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C827A] block">Signature Creation</span>
                    <span className="font-serif text-sm font-medium text-[#1A1A1A]">Emerald Celeste Drops</span>
                  </div>
                  <Link
                    href="/try-on?product=emerald-celeste-drops"
                    className="px-3 py-1.5 bg-[#C5A880] text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#1A1A1A] hover:text-[#FAF8F5] transition-colors"
                  >
                    Try On Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Experience Flow */}
      <section className="py-24 px-6 sm:px-12 bg-[#FAF8F5] border-b border-[#C5A880]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">Boutique Technology</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
              An Elevated Virtual Fitting Room
            </h2>
            <p className="text-sm text-[#8C827A] font-light leading-relaxed">
              Designed with computer vision to replicate the grace of an in-person high jewelry consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#C5A880]/20 space-y-4">
              <div className="w-12 h-12 bg-[#FAF8F5] border border-[#C5A880]/30 flex items-center justify-center text-[#1A1A1A]">
                <Camera className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">1. Portrait or Live Camera</h3>
              <p className="text-xs text-[#8C827A] leading-relaxed">
                Provide a front-facing photo or use your webcam. Our system prompts for clear hair styling so earlobes can be framed cleanly.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#C5A880]/20 space-y-4">
              <div className="w-12 h-12 bg-[#FAF8F5] border border-[#C5A880]/30 flex items-center justify-center text-[#1A1A1A]">
                <Sparkles className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">2. AI Landmark Detection</h3>
              <p className="text-xs text-[#8C827A] leading-relaxed">
                Google MediaPipe extracts facial geometry directly in your browser, dynamically scaling and positioning earrings to your ear lobes.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#C5A880]/20 space-y-4">
              <div className="w-12 h-12 bg-[#FAF8F5] border border-[#C5A880]/30 flex items-center justify-center text-[#1A1A1A]">
                <Sliders className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">3. Instant Switch &amp; Compare</h3>
              <p className="text-xs text-[#8C827A] leading-relaxed">
                Switch earrings seamlessly without re-uploading, inspect interactive side-by-side comparisons, export your look, or request a salon appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Preview */}
      <section className="py-24 px-6 sm:px-12 bg-[#F4EFEB] border-b border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">Curated Selection</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal mt-1">
                The High Jewelry Earring Portfolio
              </h2>
            </div>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] hover:text-[#C5A880] transition-colors"
            >
              <span>View All 6 Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Privacy and Trust Banner */}
      <section className="py-20 px-6 sm:px-12 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center border border-[#C5A880]/40 p-10 sm:p-14 bg-white/60 space-y-6">
          <div className="w-12 h-12 bg-[#FAF8F5] border border-[#C5A880]/30 mx-auto flex items-center justify-center text-[#C5A880]">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A]">
            Ethical, Private Computer Vision
          </h2>
          <p className="text-xs sm:text-sm text-[#8C827A] max-w-xl mx-auto leading-relaxed">
            Your portrait is processed strictly within your browser memory for this visualization. It is never uploaded to external servers, trained upon, or stored by this demonstration.
          </p>
          <div className="pt-2">
            <Link
              href="/try-on"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-xs uppercase tracking-widest transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Studio Experience</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
