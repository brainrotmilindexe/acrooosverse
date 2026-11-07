import { useEffect, useState } from 'react';
import { NasaImageItem } from '../types';
import { HERO_IMAGE } from '../data/curatedData';
import {
  X,
  Bookmark,
  Check,
  ExternalLink,
  Copy,
  Calendar,
  Building,
  User,
  Hash,
  Maximize2,
  Minimize2,
} from 'lucide-react';

const FALLBACK_PLATE_URL = 'https://images-assets.nasa.gov/image/PIA25438/PIA25438~thumb.jpg';

interface DetailModalProps {
  item: NasaImageItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (item: NasaImageItem) => void;
  onShowToast: (message: string) => void;
}

export function DetailModal({
  item,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onShowToast,
}: DetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(
    () => item?.originalUrl || item?.previewUrl || HERO_IMAGE || FALLBACK_PLATE_URL
  );

  useEffect(() => {
    if (item) {
      setImgSrc(item.originalUrl || item.previewUrl || HERO_IMAGE || FALLBACK_PLATE_URL);
    }
  }, [item]);

  // Handle ESC key to close modal
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
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, fullscreenImage, onClose]);

  if (!isOpen || !item) return null;

  const handleCopyCitation = async () => {
    const year = item.date_created
      ? new Date(item.date_created).getFullYear()
      : 'n.d.';
    const centerInfo = item.center ? ` Center: ${item.center}.` : '';
    const citation = `"${item.title}." (${year}). NASA ID: ${item.nasa_id}.${centerInfo} NASA Image and Video Library. Permanent Archive: https://images.nasa.gov/details/${item.nasa_id}`;

    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      onShowToast('Citation copied to clipboard');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onShowToast('Could not access clipboard');
    }
  };

  const formattedDate = item.date_created
    ? new Date(item.date_created).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Undated Archival Record';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0c0e14] border border-white/15 shadow-2xl overflow-hidden my-auto text-[#f4f1eb]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with ID and close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07080c]/80 text-xs font-mono text-[#9e988c]">
          <div className="flex items-center gap-2">
            <span className="text-[#c99738] font-bold">ACROOOSVERSE ARCHIVE</span>
            <span className="text-white/20">/</span>
            <span>PLATE REF: {item.nasa_id}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#9e988c] hover:text-[#f4f1eb] hover:bg-white/5 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Observation Image */}
          <div className="relative group bg-black/80 overflow-hidden flex items-center justify-center border border-white/10">
            <img
              src={imgSrc || item.originalUrl || item.previewUrl || FALLBACK_PLATE_URL}
              alt={item.title || 'Astronomical observation plate'}
              referrerPolicy="no-referrer"
              onError={() => {
                // If original high-res failed or is 404, fallback to previewUrl
                if (item.previewUrl && imgSrc !== item.previewUrl) {
                  setImgSrc(item.previewUrl);
                } else if (imgSrc !== FALLBACK_PLATE_URL) {
                  setImgSrc(FALLBACK_PLATE_URL);
                }
              }}
              className={`w-full max-h-[60vh] object-contain transition-transform duration-300 ${
                fullscreenImage ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setFullscreenImage(!fullscreenImage)}
            />

            {/* Lightbox / Zoom toggle */}
            <button
              onClick={() => setFullscreenImage(!fullscreenImage)}
              className="absolute bottom-4 right-4 p-2 bg-[#0c0e14]/90 border border-white/20 text-[#f4f1eb] hover:text-[#c99738] transition-colors"
              title={fullscreenImage ? 'Standard view' : 'Zoom image'}
            >
              {fullscreenImage ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Title & Metadata Strip */}
          <div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9e988c] mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c99738]" />
                {formattedDate}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#c99738]" />
                Center: {item.center || 'NASA Headquarters'}
              </span>
              {item.photographer && (
                <>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#c99738]" />
                    Credit: {item.photographer}
                  </span>
                </>
              )}
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#c99738]" />
                NASA ID: {item.nasa_id}
              </span>
            </div>

            <h2
              id="modal-headline"
              className="text-2xl sm:text-3xl lg:text-4xl font-normal font-['Cormorant_Garamond'] text-[#f4f1eb] leading-tight"
            >
              {item.title}
            </h2>
          </div>

          {/* Scientific Description */}
          <div className="prose prose-invert max-w-none text-sm text-[#9e988c] font-light leading-relaxed border-t border-white/10 pt-6 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#c99738]">
              OBSERVATORY CATALOG NOTES &amp; MISSION CONTEXT
            </div>
            <p className="whitespace-pre-line text-[#e8e4dc]">
              {item.description || 'No detailed astronomical narrative provided for this catalog entry.'}
            </p>
          </div>

          {/* Keywords if present */}
          {item.keywords && item.keywords.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="text-xs font-mono text-[#9e988c] flex flex-wrap items-center gap-2">
                <span className="text-[#c99738]">Index keywords:</span>
                {item.keywords.slice(0, 10).map((kw, idx, arr) => (
                  <span key={idx}>
                    {kw}
                    {idx < arr.length - 1 && <span className="text-white/20 ml-2">/</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Ribbon */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Left Actions: Save + Copy Citation */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onToggleSave(item)}
                className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 border ${
                  isSaved
                    ? 'bg-[#c99738] text-[#07080c] border-[#c99738] font-bold'
                    : 'bg-[#11141c] hover:bg-[#181d28] text-[#f4f1eb] border-white/15 hover:border-[#c99738]/50'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved in Field Book</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-[#c99738]" />
                    <span>Save to Field Book</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyCitation}
                className="px-4 py-2.5 bg-[#11141c] hover:bg-[#181d28] border border-white/15 hover:border-[#c99738]/50 text-[#f4f1eb] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#c99738]" />
                    <span>Citation Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#9e988c]" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>

            {/* Right External Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={
                  item.originalUrl ||
                  `https://images-assets.nasa.gov/image/${item.nasa_id}/${item.nasa_id}~orig.jpg`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#9e988c] hover:text-[#f4f1eb] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2"
              >
                <span>View Original NASA Image</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={item.sourceUrl || `https://images.nasa.gov/details/${item.nasa_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#c99738] hover:text-[#dfb25a] bg-transparent border border-[#c99738]/40 hover:border-[#c99738] transition-colors flex items-center gap-2"
              >
                <span>NASA Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
