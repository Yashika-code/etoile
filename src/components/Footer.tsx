import Link from 'next/link';
import { ShieldCheck, Lock, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FAF8F5] pt-16 pb-12 border-t border-[#C5A880]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-[#FAF8F5]/10">
          {/* Brand Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-2xl tracking-[0.2em] text-[#FAF8F5]">ÉTOILE &amp; CO.</h3>
            <p className="text-xs text-[#8C827A] leading-relaxed">
              Pioneering the intersection of classical high jewelry craftsmanship and private, client-side digital visualization.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#C5A880]">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Storage Client-Side Processing</span>
            </div>
          </div>

          {/* Curated Portals */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4 font-medium">Boutique</h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/70">
              <li>
                <Link href="/collection" className="hover:text-[#C5A880] transition-colors">
                  All Earring Creations
                </Link>
              </li>
              <li>
                <Link href="/try-on" className="hover:text-[#C5A880] transition-colors">
                  Virtual Try-On Studio
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-[#C5A880] transition-colors">
                  Private Salon Booking
                </Link>
              </li>
              <li>
                <span className="text-[#8C827A]">Bespoke Commission</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Guarantees */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4 font-medium">Privacy &amp; Trust</h4>
            <div className="space-y-3 text-xs text-[#FAF8F5]/70">
              <p className="leading-relaxed">
                Your camera feed and portraits are processed strictly in your device memory through browser WebAssembly.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#FAF8F5]/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>No portraits uploaded or stored</span>
              </div>
            </div>
          </div>

          {/* Showroom Salons */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4 font-medium">Salons</h4>
            <div className="space-y-3 text-xs text-[#FAF8F5]/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Rue du Rhône 42, 1204 Genève &amp; Oberoi Trident, Nariman Point, Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>concierge@etoile-hautejoaillerie.ch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C827A] gap-4">
          <p>© 2026 ÉTOILE &amp; CO. All rights reserved. DevX Interview Case Study Prototype.</p>
          <div className="flex items-center gap-6">
            <span>Client-Side Computer Vision Engine</span>
            <span>MediaPipe Tasks Vision</span>
            <span>HTML Canvas Compositing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
