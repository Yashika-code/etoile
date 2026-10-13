import { Suspense } from 'react';
import TryOnStudio from './studio';
import { RefreshCw } from 'lucide-react';

export default function TryOnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#C5A880] animate-spin" />
            <span className="font-serif text-lg text-[#1A1A1A]">Loading Virtual Studio...</span>
          </div>
        </div>
      }
    >
      <TryOnStudio />
    </Suspense>
  );
}
