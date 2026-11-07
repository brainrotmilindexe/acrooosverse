import React, { useState } from 'react';
import { NasaImageItem } from '../types';
import {
  Search,
  RotateCcw,
  Loader2,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Eye,
} from 'lucide-react';
import { ShareUtilityDock } from './ShareUtilityDock';

interface ArchiveExplorerProps {
  items: NasaImageItem[];
  totalHits: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  searchQuery: string;
  activeFilter: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string, queryOverride?: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  onOpenDetail: (item: NasaImageItem) => void;
  isSaved: (nasa_id: string) => boolean;
  onToggleSave: (item: NasaImageItem) => void;
  onResetSearch: () => void;
  onShowToast: (msg: string) => void;
}

const FILTER_TABS = [
  { id: 'all', label: 'All imagery', query: 'deep space cosmos' },
  { id: 'deep-space', label: 'Deep space', query: 'jwst hubble nebula galaxy' },
  { id: 'mars', label: 'Mars', query: 'mars perseverance rover crater' },
  { id: 'moon', label: 'Moon', query: 'moon apollo lunar surface' },
  { id: 'earth', label: 'Earth', query: 'earth orbit iss atmosphere' },
  { id: 'nebulae', label: 'Nebulae', query: 'emission nebula stellar nursery' },
  { id: 'telescopes', label: 'Telescopes', query: 'telescope observatory space telescope' },
];

export function ArchiveExplorer({
  items,
  totalHits,
  isLoading,
  isLoadingMore,
  error,
  searchQuery,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onLoadMore,
  hasMore,
  onOpenDetail,
  isSaved,
  onToggleSave,
  onResetSearch,
  onShowToast,
}: ArchiveExplorerProps) {
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchChange(searchInput.trim());
    }
  };

  const handleTabClick = (tab: typeof FILTER_TABS[0]) => {
    setSearchInput(tab.id === 'all' ? '' : tab.label);
    onFilterChange(tab.id, tab.query);
  };

  return (
    <section id="archive" className="py-20 relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-[#00f0ff] mb-1 font-semibold">
              OBSERVATORY INDEX · NASA LIBRARY
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb]">
              Recently uncovered
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#8ae3f5]">
            <div className="flex items-center gap-2">
              <span className="text-[#00f0ff] font-bold tabular-nums text-sm">
                {totalHits.toLocaleString()}
              </span>
              <span>observations cataloged</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-[#ff00a0]">PUBLIC DOMAIN ARCHIVE</span>
          </div>
        </div>

        {/* Search Bar & Interactive Filter Chips */}
        <div className="mb-10 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-xl">
            <div className="flex-1 flex items-center px-4 bg-[#0c0018]/80 backdrop-blur-md border border-white/15 rounded-xl focus-within:border-[#00f0ff] focus-within:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all">
              <Search className="w-4 h-4 text-[#00f0ff] shrink-0 mr-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by mission, target, or celestial coordinate…"
                className="w-full py-3 bg-transparent text-sm text-[#f4f1eb] placeholder-[#7ea0b8]/70 focus:outline-none font-sans"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    onResetSearch();
                  }}
                  className="text-xs text-[#7ea0b8] hover:text-[#00f0ff] font-mono px-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#00f0ff]/15 hover:bg-[#00f0ff] border border-[#00f0ff]/40 text-[#00f0ff] hover:text-[#050010] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Query
            </button>
          </form>

          {/* Filter Chips with vibrant active electric cyan styling */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-xl transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                    isActive
                      ? 'bg-[#00f0ff] text-[#050010] border-[#00f0ff] font-bold shadow-[0_0_20px_rgba(0,240,255,0.45)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-[#7ea0b8] hover:text-[#f4f1eb] border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Query Feedback */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-[#8ae3f5] bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>
                Active query: <strong className="text-[#f4f1eb]">"{searchQuery}"</strong>
              </span>
            </div>
            <button
              onClick={onResetSearch}
              className="text-[#ff5d00] hover:text-[#ff7b2b] underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filter</span>
            </button>
          </div>
        )}

        {/* Loading Skeleton State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="glass-panel animate-pulse overflow-hidden p-0"
              >
                <div className="aspect-[4/3] bg-white/[0.05]" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
                  <div className="h-5 w-3/4 bg-white/[0.08] rounded" />
                  <div className="h-3 w-full bg-white/[0.04] rounded" />
                  <div className="h-3 w-2/3 bg-white/[0.04] rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="p-8 text-center glass-panel border-red-500/30 max-w-xl mx-auto my-12">
            <p className="font-mono text-sm text-red-300 mb-4">{error}</p>
            <button
              onClick={onResetSearch}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-[#f4f1eb] rounded-xl"
            >
              Load Curated Archive
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && items.length === 0 && (
          <div className="p-12 text-center glass-panel max-w-xl mx-auto my-12 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#00f0ff] font-bold">
              NO MATCHING PLATES FOUND
            </div>
            <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#f4f1eb]">
              The cosmos returned silence for this coordinate.
            </h3>
            <p className="text-xs text-[#7ea0b8] max-w-md mx-auto">
              Try searching with broader astronomical terminology (e.g. "telescope",
              "galaxy", "nebula", "Apollo", "mars").
            </p>
            <button
              onClick={onResetSearch}
              className="px-5 py-2.5 bg-[#00f0ff] text-[#050010] font-bold text-xs font-mono uppercase tracking-wider rounded-xl shadow-[0_0_15px_#00f0ff]"
            >
              Reset to All Imagery
            </button>
          </div>
        )}

        {/* Responsive Photography Grid with Core Card Zoom and Share Utility Dock */}
        {!isLoading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const saved = isSaved(item.nasa_id);
              const formattedDate = item.date_created
                ? new Date(item.date_created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : 'Archival Plate';

              return (
                <article
                  key={item.nasa_id}
                  onClick={() => onOpenDetail(item)}
                  className="group glass-panel flex flex-col justify-between overflow-hidden relative cursor-pointer"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60 rounded-t-2xl">
                    <img
                      src={item.previewUrl || 'https://images-assets.nasa.gov/image/PIA21422/PIA21422~thumb.jpg'}
                      alt={item.title || 'Astronomical observation'}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images-assets.nasa.gov/image/PIA21422/PIA21422~thumb.jpg';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 brightness-[0.85] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050010] via-transparent to-transparent opacity-80" />

                    {/* Floating Share Utility Dock at Top Right */}
                    <div className="absolute top-3 right-3 z-10">
                      <ShareUtilityDock
                        title={item.title}
                        idOrNasaId={item.nasa_id}
                        imageUrl={item.originalUrl || item.previewUrl}
                        canonicalUrl={item.sourceUrl}
                        onShowToast={onShowToast}
                        isSaved={saved}
                        onToggleSave={() => onToggleSave(item)}
                        variant="card"
                      />
                    </div>

                    {/* NASA Center Metadata Overlay at Bottom Left */}
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-wider text-[#8ae3f5] bg-[#050010]/85 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {item.center || 'NASA'}
                    </div>
                  </div>

                  {/* Editorial Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean unboxed metadata with tracked cyan-gray */}
                      <div className="flex items-center gap-2 text-xs font-mono text-[#8ae3f5] mb-2 tracking-wide">
                        <span>{formattedDate}</span>
                        <span aria-hidden="true" className="text-white/20">·</span>
                        <span className="truncate max-w-[150px] text-[#00f0ff]">
                          ID: {item.nasa_id}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb] group-hover:text-[#00f0ff] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="mt-2.5 text-xs text-[#7ea0b8] font-light leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Actions Footer */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono"
                    >
                      <button
                        type="button"
                        onClick={() => onOpenDetail(item)}
                        className="text-[#00f0ff] hover:text-[#8ae3f5] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Plate</span>
                      </button>

                      <a
                        href={item.sourceUrl || `https://images.nasa.gov/details/${item.nasa_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7ea0b8] hover:text-[#f4f1eb] flex items-center gap-1 transition-colors"
                        title="View on NASA official portal"
                      >
                        <span>NASA.gov</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && items.length > 0 && hasMore && (
          <div className="mt-14 text-center">
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.04] hover:bg-[#00f0ff]/15 border border-white/15 hover:border-[#00f0ff]/50 rounded-xl text-xs font-mono uppercase tracking-[0.2em] text-[#f4f1eb] transition-all disabled:opacity-50 shadow-md cursor-pointer"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#00f0ff]" />
                  <span>Scanning deep index…</span>
                </>
              ) : (
                <>
                  <span>Load Next Page of Records</span>
                  <ChevronDown className="w-4 h-4 text-[#00f0ff]" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
