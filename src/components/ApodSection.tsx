import { useState } from 'react';
import { ApodData, NasaImageItem } from '../types';
import { ExternalLink, Bookmark, Check, Calendar, User, Maximize2 } from 'lucide-react';
import { ShareUtilityDock } from './ShareUtilityDock';
import { HERO_IMAGE } from '../data/curatedData';

const APOD_FALLBACK = HERO_IMAGE || 'https://images-assets.nasa.gov/image/PIA25438/PIA25438~thumb.jpg';

interface ApodSectionProps {
  apod: ApodData;
  isLoading: boolean;
  onOpenDetail: (item: NasaImageItem) => void;
  isSaved: boolean;
  onToggleSave: (item: NasaImageItem) => void;
  onShowToast: (msg: string) => void;
}

export function ApodSection({
  apod,
  isLoading,
  onOpenDetail,
  isSaved,
  onToggleSave,
  onShowToast,
}: ApodSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const safeApodUrl = apod?.url || APOD_FALLBACK;

  // Convert APOD to NasaImageItem format
  const apodAsItem: NasaImageItem = {
    nasa_id: `APOD-${apod.date || '2026-11-07'}`,
    title: apod.title || 'Astronomy Observation',
    description: apod.explanation || '',
    date_created: `${apod.date || '2026-11-07'}T00:00:00Z`,
    center: 'NASA Astronomy Picture of the Day',
    photographer: apod.copyright || 'NASA / APOD Archive',
    keywords: ['APOD', 'Cosmos', 'Astronomy Picture of the Day'],
    previewUrl: safeApodUrl,
    originalUrl: apod.hdurl || safeApodUrl,
    sourceUrl: `https://apod.nasa.gov/apod/ap${(apod.date || '2026-11-07').replace(/-/g, '').slice(2)}.html`,
  };

  return (
    <section id="apod" className="py-20 relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-[#00f0ff] mb-1 font-semibold">
              EPHEMERIS &amp; DAILY OBSERVATION
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb]">
              Today in the cosmos
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8ae3f5]">
            <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="tabular-nums font-semibold">{apod.date}</span>
            <span className="text-white/20">·</span>
            <span className="text-[#ff5d00]">NASA APOD ARCHIVE</span>
          </div>
        </div>

        {/* Feature Glass Card with Zoom Trigger & Share Utility Dock */}
        <div
          onClick={() => onOpenDetail(apodAsItem)}
          className="group relative cursor-pointer glass-panel p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch overflow-hidden"
        >
          {/* Floating Share Utility Dock at Top Right */}
          <div className="absolute top-4 right-4 z-20">
            <ShareUtilityDock
              title={apod.title}
              idOrNasaId={apodAsItem.nasa_id}
              imageUrl={apod.hdurl || apod.url}
              canonicalUrl={apodAsItem.sourceUrl}
              onShowToast={onShowToast}
              isSaved={isSaved}
              onToggleSave={() => onToggleSave(apodAsItem)}
              variant="card"
            />
          </div>

          {/* Image Stage */}
          <div className="lg:col-span-7 relative group/img overflow-hidden rounded-xl bg-black/50 min-h-[340px] sm:min-h-[460px] flex items-center justify-center border border-white/10">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center min-h-[380px] bg-white/[0.02] animate-pulse">
                <span className="font-mono text-xs text-[#00f0ff]">
                  Scanning telescope ephemeris…
                </span>
              </div>
            ) : (
              <>
                <img
                  src={safeApodUrl}
                  alt={apod.title || 'Astronomy Picture of the Day'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = APOD_FALLBACK;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050010]/80 via-transparent to-transparent pointer-events-none" />

                {/* Inspect Plate Overlay Trigger */}
                <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-lg bg-[#050010]/85 backdrop-blur-md border border-[#00f0ff]/40 text-[#00f0ff] text-xs font-mono tracking-wider flex items-center gap-2 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click Card to Zoom Plate</span>
                </div>
              </>
            )}
          </div>

          {/* Description & Metadata Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-2">
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase font-semibold">
                ASTRONOMY PICTURE OF THE DAY
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb] leading-tight group-hover:text-[#00f0ff] transition-colors">
                {apod.title}
              </h3>

              {apod.copyright && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#8ae3f5]">
                  <User className="w-3.5 h-3.5 text-[#ff5d00]" />
                  <span>Credit: {apod.copyright}</span>
                </div>
              )}

              <div className="text-sm text-[#e8e4dc] font-light leading-relaxed">
                <p>
                  {expanded
                    ? apod.explanation
                    : `${apod.explanation.slice(0, 360)}…`}
                </p>
                {apod.explanation.length > 360 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(!expanded);
                    }}
                    className="mt-2 text-xs font-mono uppercase tracking-wider text-[#00f0ff] hover:text-[#8ae3f5] underline underline-offset-4 cursor-pointer"
                  >
                    {expanded ? 'Show Less' : 'Read Full Field Entry'}
                  </button>
                )}
              </div>
            </div>

            {/* Actions Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => onToggleSave(apodAsItem)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 border cursor-pointer ${
                  isSaved
                    ? 'bg-[#00f0ff] text-[#050010] border-[#00f0ff] font-bold shadow-[0_0_15px_#00f0ff]'
                    : 'bg-white/5 hover:bg-white/10 text-[#f4f1eb] border-white/15 hover:border-[#00f0ff]/50'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved in Field Book</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>Save to Field Book</span>
                  </>
                )}
              </button>

              {apod.hdurl && (
                <a
                  href={apod.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#8ae3f5] hover:text-[#00f0ff] bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 transition-all flex items-center gap-2"
                >
                  <span>High-Res Master</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
