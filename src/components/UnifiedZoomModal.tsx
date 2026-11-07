import { useEffect, useState, useRef } from 'react';
import { ZoomModalTarget } from '../types';
import { ShareUtilityDock } from './ShareUtilityDock';
import { HERO_IMAGE } from '../data/curatedData';

const FALLBACK_PLATE_IMAGE = 'https://images-assets.nasa.gov/image/PIA25438/PIA25438~thumb.jpg';

const getInitialSrc = (t: ZoomModalTarget | null): string => {
  if (!t) return HERO_IMAGE || FALLBACK_PLATE_IMAGE;
  if (t.type === 'nasa_image') {
    return t.data.originalUrl || t.data.previewUrl || HERO_IMAGE || FALLBACK_PLATE_IMAGE;
  }
  if (t.type === 'collection') return t.data.image || HERO_IMAGE || FALLBACK_PLATE_IMAGE;
  if (t.type === 'mission') return t.data.imageUrl || HERO_IMAGE || FALLBACK_PLATE_IMAGE;
  if (t.type === 'field_note') return t.data.imageUrl || HERO_IMAGE || FALLBACK_PLATE_IMAGE;
  return HERO_IMAGE || FALLBACK_PLATE_IMAGE;
};

interface UnifiedZoomModalProps {
  target: ZoomModalTarget | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: (nasaId: string) => boolean;
  onToggleSave: (nasaId: string, itemData?: any) => void;
  onShowToast: (msg: string) => void;
  onSelectCollectionOrMission?: (query: string, label: string) => void;
}

export function UnifiedZoomModal({
  target,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onShowToast,
  onSelectCollectionOrMission,
}: UnifiedZoomModalProps) {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(() => getInitialSrc(target));
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Set initial image and sync
  useEffect(() => {
    if (!target) return;
    setCurrentImageSrc(getInitialSrc(target));
    setFullscreenImage(false);
  }, [target]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Focus modal container
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, fullscreenImage, onClose]);

  if (!isOpen || !target) return null;

  // Helpers for extracting item-specific details
  const getModalMeta = () => {
    switch (target.type) {
      case 'nasa_image': {
        const item = target.data;
        const year = item.date_created
          ? new Date(item.date_created).getFullYear()
          : 'n.d.';
        return {
          id: item.nasa_id,
          title: item.title,
          badge: `NASA ID: ${item.nasa_id}`,
          imageUrl: currentImageSrc || item.previewUrl,
          canonicalUrl: item.sourceUrl || `https://images.nasa.gov/details/${item.nasa_id}`,
          dateStr: item.date_created
            ? new Date(item.date_created).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Archival Plate',
          year,
        };
      }
      case 'collection': {
        const item = target.data;
        return {
          id: item.id,
          title: item.title,
          badge: item.subtitle,
          imageUrl: item.image,
          canonicalUrl: `${window.location.origin}${window.location.pathname}#collection=${item.id}`,
          dateStr: item.platesCount,
          year: '2026',
        };
      }
      case 'mission': {
        const item = target.data;
        return {
          id: item.id,
          title: item.name,
          badge: `${item.acronym} · ${item.status}`,
          imageUrl: item.imageUrl,
          canonicalUrl: `${window.location.origin}${window.location.pathname}#mission=${item.id}`,
          dateStr: `Launch: ${item.launchDate}`,
          year: item.launchDate,
        };
      }
      case 'field_note': {
        const item = target.data;
        return {
          id: item.catalogId,
          title: item.title,
          badge: `${item.catalogId} · ${item.telescope}`,
          imageUrl: item.imageUrl,
          canonicalUrl: `${window.location.origin}${window.location.pathname}#note=${item.id}`,
          dateStr: `${item.date} · ${item.readTime}`,
          year: 'Archival',
        };
      }
    }
  };

  const meta = getModalMeta();
  const saved = isSaved(meta.id);

  const handleCopyCitation = async () => {
    let citation = '';
    if (target.type === 'nasa_image') {
      const item = target.data;
      const center = item.center ? ` Center: ${item.center}.` : '';
      citation = `"${item.title}." (${meta.year}). NASA ID: ${item.nasa_id}.${center} NASA Image and Video Library. Permanent Archive: https://images.nasa.gov/details/${item.nasa_id}`;
    } else if (target.type === 'collection') {
      citation = `ACROOOSVERSE Curated Sector: "${target.data.title}." Archive: ${target.data.platesCount}. Query: "${target.data.query}".`;
    } else if (target.type === 'mission') {
      citation = `NASA Mission Dossier: "${target.data.name}" (${target.data.acronym}). Instruments: ${target.data.primaryInstrument}. Launch: ${target.data.launchDate}.`;
    } else if (target.type === 'field_note') {
      citation = `ACROOOSVERSE Field Note: "${target.data.title}" by ${target.data.author}. Ref: ${target.data.catalogId}. Coordinates: ${target.data.coordinates}.`;
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(citation);
        setCopiedCitation(true);
        onShowToast('Citation copied to clipboard');
        setTimeout(() => setCopiedCitation(false), 2500);
      }
    } catch {
      onShowToast('Could not access clipboard');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="zoom-modal-title"
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-[12px] overflow-y-auto animate-fade-in outline-none"
      onClick={onClose}
    >
      {/* Centered Expanded Detail Modal with Fluid Zoom Transition */}
      <div
        className="relative w-full max-w-5xl bg-[#080114]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.18),0_0_30px_rgba(255,0,160,0.12)] overflow-hidden my-auto text-[#f4f1eb] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating prominent Close control */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#050010]/90 text-white/80 hover:text-[#00f0ff] hover:bg-[#120024] border border-white/20 hover:border-[#00f0ff]/60 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
        >
          {/* Close X SVG */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Modal Top Bar: Badge, Title & Share Utility Dock */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-[#120024]/60 pr-16 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#00f0ff] font-bold tracking-widest uppercase">
              {target.type === 'nasa_image'
                ? 'ACROOOSVERSE PLATE'
                : target.type === 'collection'
                ? 'CURATED SECTOR'
                : target.type === 'mission'
                ? 'MISSION DOSSIER'
                : 'ASTRONOMICAL FIELD NOTE'}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#8ae3f5] truncate max-w-[200px] sm:max-w-md">
              {meta.badge}
            </span>
          </div>

          {/* Share Utility Dock inside modal header */}
          <ShareUtilityDock
            title={meta.title}
            idOrNasaId={meta.id}
            imageUrl={meta.imageUrl}
            canonicalUrl={meta.canonicalUrl}
            onShowToast={onShowToast}
            isSaved={saved}
            onToggleSave={() => onToggleSave(meta.id, target.data)}
            variant="modal"
          />
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* High-Resolution Media Stage with Fullscreen/Zoom Toggle */}
          <div className="relative group rounded-xl overflow-hidden bg-black/90 border border-white/10 flex items-center justify-center min-h-[260px] sm:min-h-[380px]">
            <img
              src={currentImageSrc || getInitialSrc(target) || FALLBACK_PLATE_IMAGE}
              alt={meta.title || 'Astronomical observation plate'}
              referrerPolicy="no-referrer"
              onError={() => {
                if (
                  target.type === 'nasa_image' &&
                  target.data.previewUrl &&
                  currentImageSrc !== target.data.previewUrl
                ) {
                  setCurrentImageSrc(target.data.previewUrl);
                } else if (currentImageSrc !== FALLBACK_PLATE_IMAGE) {
                  setCurrentImageSrc(FALLBACK_PLATE_IMAGE);
                }
              }}
              className={`w-full max-h-[58vh] object-contain transition-transform duration-300 ${
                fullscreenImage ? 'scale-130 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setFullscreenImage(!fullscreenImage)}
            />

            {/* Lightbox / Zoom toggle floating button */}
            <button
              onClick={() => setFullscreenImage(!fullscreenImage)}
              className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-[#050010]/85 border border-white/20 text-[#8ae3f5] hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all shadow-md"
              title={fullscreenImage ? 'Standard view' : 'Zoom view'}
            >
              {fullscreenImage ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6m0 0L14 14m-5 7H3v-6m0 0l7-7"/>
                </svg>
              )}
            </button>
          </div>

          {/* Heading and Tracked Cyan Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8ae3f5] mb-2 tracking-wide">
              <span>{meta.dateStr}</span>
              {target.type === 'nasa_image' && (
                <>
                  <span className="text-white/20">·</span>
                  <span>Center: {target.data.center || 'NASA'}</span>
                  {target.data.photographer && (
                    <>
                      <span className="text-white/20">·</span>
                      <span>Credit: {target.data.photographer}</span>
                    </>
                  )}
                  <span className="text-white/20">·</span>
                  <span className="text-[#00f0ff]">ID: {target.data.nasa_id}</span>
                </>
              )}
              {target.type === 'field_note' && (
                <>
                  <span className="text-white/20">·</span>
                  <span>Author: {target.data.author}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-[#00f0ff]">{target.data.coordinates}</span>
                </>
              )}
            </div>

            <h2
              id="zoom-modal-title"
              className="text-2xl sm:text-4xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb] leading-tight"
            >
              {meta.title}
            </h2>
          </div>

          {/* Body Content Specific to target type */}
          {target.type === 'nasa_image' && (
            <div className="space-y-4 pt-4 border-t border-white/10 text-sm font-light leading-relaxed text-[#e8e4dc]">
              <div className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
                ASTRONOMICAL OBSERVATION &amp; SCIENTIFIC RECORD
              </div>
              <p className="whitespace-pre-line">
                {target.data.description ||
                  'No detailed astronomical narrative cataloged for this specific plate.'}
              </p>

              {target.data.keywords && target.data.keywords.length > 0 && (
                <div className="pt-3 flex flex-wrap items-center gap-2 text-xs font-mono text-[#7ea0b8]">
                  <span className="text-[#00f0ff]">Keywords:</span>
                  {target.data.keywords.slice(0, 10).map((kw, idx, arr) => (
                    <span key={idx}>
                      {kw}
                      {idx < arr.length - 1 && <span className="text-white/20 ml-2">/</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {target.type === 'collection' && (
            <div className="space-y-4 pt-4 border-t border-white/10 text-sm leading-relaxed text-[#e8e4dc]">
              <div className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
                SECTOR ARCHIVAL DOSSIER · {target.data.subtitle}
              </div>
              <p className="text-base text-[#f4f1eb]">
                {target.data.description}
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs space-y-2 text-[#8ae3f5]">
                <div>
                  <span className="text-white/40 uppercase">Total Indexed Records:</span>{' '}
                  <strong className="text-[#00f0ff]">{target.data.platesCount}</strong>
                </div>
                <div>
                  <span className="text-white/40 uppercase">Default Search Parameter:</span>{' '}
                  <code className="text-[#ff5d00]">"{target.data.query}"</code>
                </div>
              </div>
            </div>
          )}

          {target.type === 'mission' && (
            <div className="space-y-5 pt-4 border-t border-white/10 text-sm leading-relaxed text-[#e8e4dc]">
              <div className="font-mono text-xs uppercase tracking-widest text-[#ff5d00]">
                TELEMETRY &amp; SCIENTIFIC PAYLOADS
              </div>
              <p>{target.data.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                  <span className="text-white/40 uppercase text-[10px] block">
                    Orbit &amp; Destination
                  </span>
                  <span className="text-[#f4f1eb] font-medium">{target.data.destination}</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                  <span className="text-white/40 uppercase text-[10px] block">
                    Instrumentation
                  </span>
                  <span className="text-[#00f0ff] font-medium">
                    {target.data.primaryInstrument}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
                <div className="font-mono text-[10px] uppercase text-[#ff00a0] mb-1">
                  Key Scientific Discovery
                </div>
                <p className="text-[#f4f1eb]">{target.data.keyDiscovery}</p>
              </div>
            </div>
          )}

          {target.type === 'field_note' && (
            <div className="space-y-5 pt-4 border-t border-white/10 text-sm leading-relaxed text-[#e8e4dc]">
              <div className="font-mono text-xs uppercase tracking-widest text-[#ff00a0]">
                FULL OBSERVATORY MEMOIR
              </div>
              <div className="space-y-4 text-base font-light">
                {target.data.fullEssay.split('\n\n').map((para, idx) => (
                  <p key={idx} className="whitespace-pre-line leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Action Ribbon at bottom */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Bookmark Save */}
              <button
                type="button"
                onClick={() => onToggleSave(meta.id, target.data)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 border ${
                  saved
                    ? 'bg-[#00f0ff] text-[#050010] border-[#00f0ff] font-bold shadow-[0_0_15px_#00f0ff]'
                    : 'bg-white/5 hover:bg-white/10 text-[#f4f1eb] border-white/15 hover:border-[#00f0ff]/50'
                }`}
              >
                {/* Bookmark icon */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                </svg>
                <span>{saved ? 'Saved in Field Book' : 'Save to Field Book'}</span>
              </button>

              {/* Copy Citation */}
              <button
                type="button"
                onClick={handleCopyCitation}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#00f0ff]/50 text-[#f4f1eb] text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 text-[#00f0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <span>{copiedCitation ? 'Citation Copied' : 'Copy Citation'}</span>
              </button>
            </div>

            {/* Context Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {target.type === 'nasa_image' && (
                <>
                  <a
                    href={
                      target.data.originalUrl ||
                      `https://images-assets.nasa.gov/image/${target.data.nasa_id}/${target.data.nasa_id}~orig.jpg`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#8ae3f5] hover:text-[#00f0ff] bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>View Original NASA Image</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>

                  <a
                    href={target.data.sourceUrl || `https://images.nasa.gov/details/${target.data.nasa_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#00f0ff] hover:text-[#f4f1eb] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/40 transition-all flex items-center gap-2"
                  >
                    <span>NASA Record</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </>
              )}

              {target.type === 'collection' && onSelectCollectionOrMission && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectCollectionOrMission(target.data.query, target.data.title);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#00f0ff] hover:bg-[#8ae3f5] text-[#050010] font-bold text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
                >
                  <span>Explore Sector in Archive</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              )}

              {target.type === 'mission' && onSelectCollectionOrMission && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectCollectionOrMission(target.data.searchQuery, target.data.name);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#ff5d00] hover:bg-[#ff7b2b] text-[#050010] font-bold text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(255,93,0,0.4)] transition-all flex items-center gap-2"
                >
                  <span>Filter Archive by Mission</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
