'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { Suspense } from 'react';

function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-10 text-sm tracking-wider uppercase font-normal text-[#1A1A1A]">
      <Link
        href="/collection"
        className={`transition-colors hover:text-[#C5A880] ${
          pathname === '/collection' ? 'text-[#C5A880] font-medium' : 'text-[#1A1A1A]'
        }`}
      >
        The Collection
      </Link>
      <Link
        href="/try-on"
        className={`flex items-center gap-1.5 transition-colors hover:text-[#C5A880] ${
          pathname === '/try-on' ? 'text-[#C5A880] font-medium' : 'text-[#1A1A1A]'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
        Virtual Try-On
      </Link>
      <Link
        href="/appointment"
        className={`transition-colors hover:text-[#C5A880] ${
          pathname === '/appointment' ? 'text-[#C5A880] font-medium' : 'text-[#1A1A1A]'
        }`}
      >
        Private Salon
      </Link>
    </nav>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C5A880]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" className="flex flex-col group">
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#1A1A1A] font-medium group-hover:text-[#C5A880] transition-colors">
            ÉTOILE &amp; CO.
          </span>
          <span className="text-[10px] tracking-[0.35em] text-[#8C827A] uppercase font-light -mt-0.5">
            Haute Joaillerie • Genève
          </span>
        </Link>

        {/* Navigation Links wrapped in Suspense for Next.js 16 SSG compatibility */}
        <Suspense
          fallback={
            <nav className="hidden md:flex items-center space-x-10 text-sm tracking-wider uppercase font-normal text-[#1A1A1A]">
              <Link href="/collection" className="hover:text-[#C5A880]">The Collection</Link>
              <Link href="/try-on" className="hover:text-[#C5A880]">Virtual Try-On</Link>
              <Link href="/appointment" className="hover:text-[#C5A880]">Private Salon</Link>
            </nav>
          }
        >
          <NavLinks />
        </Suspense>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/try-on"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm tracking-widest uppercase bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-all duration-300 rounded-none border border-[#1A1A1A] shadow-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Try Earrings</span>
            <span className="sm:hidden">Try-On</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
