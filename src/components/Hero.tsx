import React, { useState } from 'react';
import { Search, ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/curatedData';

interface HeroProps {
  onSearch: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onExploreClick: () => void;
  onTodayImageClick: () => void;
}

export function Hero({
  onSearch,
  searchInputRef,
  onExploreClick,
  onTodayImageClick,
}: HeroProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestion = (keyword: string) => {
    setQuery(keyword);
    onSearch(keyword);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-white/[0.08]">
      {/* Background Hero Layer with Nebular Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_IMAGE || 'https://images-assets.nasa.gov/image/PIA25438/PIA25438~orig.jpg'}
          alt="Deep space nebula pillars captured by James Webb Space Telescope"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images-assets.nasa.gov/image/PIA25438/PIA25438~orig.jpg';
          }}
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.12] scale-105 motion-safe:transition-transform motion-safe:duration-1000"
        />

        {/* Subtle Dark Radial Scrim specifically centered behind the headline for superior legibility */}
        <div className="absolute inset-0 bg-radial-[circle_at_50%_45%] from-black/85 via-[#050010]/80 to-[#120024]/90" />
        
        {/* Colorful Nebular Atmosphere accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff00a0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#ff5d00]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 flex-1 flex flex-col justify-center text-center">
        {/* Eyebrow with Electric Cyan & Neon Magenta markers */}
        <div className="inline-flex items-center justify-center gap-2 mb-6">
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-[#00f0ff] to-[#ff00a0]" />
          <span className="font-mono text-xs tracking-[0.32em] uppercase text-[#00f0ff] font-bold drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
            THE UNIVERSE, INDEXED
          </span>
          <span className="h-px w-8 bg-gradient-to-r from-[#ff00a0] via-[#00f0ff] to-transparent" />
        </div>

        {/* Huge Editorial Serif Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f4f1eb] font-['Cormorant_Garamond'] leading-[1.05] max-w-4xl mx-auto text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          A wider view of everything.
        </h1>

        {/* Concise Subcopy */}
        <p className="mt-6 text-base sm:text-lg text-[#8ae3f5] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          An observatory field archive cataloging raw, processed, and historical
          astrophotography from the NASA Image and Video Library, James Webb,
          Hubble, and deep-space orbital missions.
        </p>

        {/* Search Input Box with Glassmorphism & Electric Cyan Focus Glow */}
        <div className="mt-10 max-w-2xl mx-auto w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2 p-2 bg-[#0c0018]/80 backdrop-blur-2xl border border-white/15 rounded-2xl focus-within:border-[#00f0ff] focus-within:shadow-[0_0_30px_rgba(0,240,255,0.35)] shadow-2xl transition-all"
          >
            <div className="flex-1 flex items-center px-4 gap-3">
              <Search className="w-5 h-5 text-[#00f0ff] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search galaxies, missions, planets, nebulae…"
                className="w-full py-2.5 bg-transparent text-sm sm:text-base text-[#f4f1eb] placeholder-[#7ea0b8]/70 focus:outline-none font-sans"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 bg-gradient-to-r from-[#00f0ff] to-[#8ae3f5] hover:from-[#8ae3f5] hover:to-[#00f0ff] text-[#050010] text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Search Archive
            </button>
          </form>

          {/* Search Suggestions with Solar Orange & Cyan Accents */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xs text-[#7ea0b8]">
            <span className="font-mono text-[11px] text-[#00f0ff] uppercase tracking-wider font-semibold">
              Explore:
            </span>
            {['James Webb', 'Perseverance', 'Eagle Nebula', 'Andromeda', 'Apollo 11'].map(
              (term, idx, arr) => (
                <React.Fragment key={term}>
                  <button
                    type="button"
                    onClick={() => handleSuggestion(term)}
                    className="hover:text-[#ff5d00] hover:underline underline-offset-4 transition-colors font-mono cursor-pointer"
                  >
                    {term}
                  </button>
                  {idx < arr.length - 1 && <span className="text-white/20">·</span>}
                </React.Fragment>
              )
            )}
          </div>
        </div>

        {/* Hero Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#f4f1eb] bg-white/[0.05] hover:bg-[#00f0ff]/15 border border-white/15 hover:border-[#00f0ff]/60 rounded-xl transition-all shadow-md group cursor-pointer"
          >
            <span>Explore the archive</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#00f0ff] group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={onTodayImageClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#8ae3f5] hover:text-[#ff00a0] bg-transparent hover:bg-[#ff00a0]/10 border border-transparent hover:border-[#ff00a0]/30 rounded-xl transition-all cursor-pointer"
          >
            <span>Today’s image</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff00a0]" />
          </button>
        </div>
      </div>

      {/* Slim Stats & Telemetry Metadata Strip */}
      <div className="relative z-10 w-full border-t border-white/[0.08] bg-[#050010]/80 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-[11px] font-mono tracking-wider text-[#7ea0b8]">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
            <span className="font-semibold">CATALOG: NASA IMAGE &amp; VIDEO ARCHIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>RESOLUTIONS: 4K TO 100MP ORIGINAL PLATES</span>
            <span className="text-white/20">|</span>
            <span className="text-[#8ae3f5]">INDEX STATUS: LIVE SYNCHRONIZED</span>
            <span className="text-white/20">|</span>
            <span className="text-[#ff5d00]">PUBLIC DOMAIN U.S. GOV</span>
          </div>
          <div className="text-[#ff00a0] font-semibold">
            OBSERVATORY REF: <span className="tabular-nums">2026.11.07</span>
          </div>
        </div>
      </div>
    </section>
  );
}
