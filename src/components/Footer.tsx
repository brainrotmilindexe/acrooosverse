import { ArrowUp, Compass } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050010]/90 border-t border-white/[0.08] py-16 text-[#7ea0b8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
              <span className="text-xl font-bold tracking-[0.25em] text-[#f4f1eb] font-['Cinzel']">
                ACROOOSVERSE
              </span>
            </div>
            <p className="font-['Cormorant_Garamond'] text-xl text-[#00f0ff] italic">
              Explore Beyond. Discover Everything.
            </p>
            <p className="text-xs text-[#8ae3f5] leading-relaxed max-w-sm font-light">
              An independent observatory field journal indexing the celestial photography
              and scientific imaging legacy of NASA, ESA, CSA, and international space
              exploration programs.
            </p>
          </div>

          {/* Source Attribution & Data Notes */}
          <div className="md:col-span-4 space-y-3 text-xs font-mono">
            <div className="text-[#00f0ff] uppercase tracking-wider font-semibold">
              Data &amp; Imagery Attribution
            </div>
            <p className="leading-relaxed text-[#7ea0b8]">
              Public domain imagery provided courtesy of the{' '}
              <a
                href="https://images.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f4f1eb] underline hover:text-[#00f0ff] transition-colors"
              >
                NASA Image and Video Library
              </a>{' '}
              and the{' '}
              <a
                href="https://apod.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f4f1eb] underline hover:text-[#00f0ff] transition-colors"
              >
                Astronomy Picture of the Day (APOD)
              </a>{' '}
              archive.
            </p>
            <p className="text-[#7ea0b8]/80 text-[11px]">
              No commercial affiliation with or endorsement by NASA is implied. All
              observations are open for educational, scientific, and public inspection.
            </p>
          </div>

          {/* Quick Sectors & Scroll To Top */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-4 text-xs font-mono">
            <div>
              <div className="text-[#ff5d00] uppercase tracking-wider mb-2 font-semibold">
                Observatory Sectors
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#archive" className="hover:text-[#00f0ff] transition-colors">
                    → Deep Space Archive
                  </a>
                </li>
                <li>
                  <a href="#collections" className="hover:text-[#00f0ff] transition-colors">
                    → Curated Sectors
                  </a>
                </li>
                <li>
                  <a href="#missions" className="hover:text-[#ff5d00] transition-colors">
                    → Mission Dossiers
                  </a>
                </li>
                <li>
                  <a href="#field-notes" className="hover:text-[#ff00a0] transition-colors">
                    → Observatory Journal
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8ae3f5] hover:text-[#00f0ff] transition-colors cursor-pointer"
              >
                <span>Return to Zenith</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#00f0ff]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#7ea0b8]">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>ACROOOSVERSE ARCHIVE · OBSERVATORY FIELD JOURNAL</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#8ae3f5]">RA 00h 42m 44s · Dec +41° 16′ 09″</span>
            <span className="text-white/20">|</span>
            <span className="text-[#ff00a0]">SIDEREAL REFERENCE: 2026.11</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
