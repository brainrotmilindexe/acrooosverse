import { useEffect } from 'react';
import { NasaImageItem } from '../types';
import { X, Trash2, Copy, ExternalLink, Bookmark, Eye } from 'lucide-react';
import { ShareUtilityDock } from './ShareUtilityDock';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedRecords: NasaImageItem[];
  onRemoveSaved: (nasa_id: string) => void;
  onClearAll: () => void;
  onOpenDetail: (item: NasaImageItem) => void;
  onExportCitations: () => void;
  onShowToast: (msg: string) => void;
}

export function SavedModal({
  isOpen,
  onClose,
  savedRecords,
  onRemoveSaved,
  onClearAll,
  onOpenDetail,
  onExportCitations,
  onShowToast,
}: SavedModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-[12px] overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#080114]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden my-auto text-[#f4f1eb]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#120024]/70 text-xs font-mono text-[#8ae3f5]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-[#f4f1eb] font-bold">FIELD BOOK · SAVED OBSERVATIONS</span>
            <span className="text-[#00f0ff] font-bold tabular-nums">({savedRecords.length})</span>
          </div>

          <div className="flex items-center gap-4">
            {savedRecords.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={onExportCitations}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#00f0ff] hover:text-[#8ae3f5] transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Bibliography</span>
                </button>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              aria-label="Close saved records view"
              className="p-1.5 text-[#8ae3f5] hover:text-[#00f0ff] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
          {savedRecords.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Bookmark className="w-7 h-7" />
              </div>
              <h3
                id="saved-modal-title"
                className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb]"
              >
                Your field book is currently empty.
              </h3>
              <p className="text-xs text-[#7ea0b8] max-w-md mx-auto leading-relaxed">
                As you traverse the archive, click the bookmark icon or share dock on any
                observation plate to pin it to your personal astronomical journal.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#00f0ff] hover:bg-[#8ae3f5] text-[#050010] font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_#00f0ff] cursor-pointer"
                >
                  Explore Imagery Archive
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Mobile batch toolbar */}
              <div className="sm:hidden flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
                <button
                  onClick={onExportCitations}
                  className="text-[#00f0ff] flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Bibliography</span>
                </button>
                <button
                  onClick={onClearAll}
                  className="text-red-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {/* Grid of Saved Plates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecords.map((item) => (
                  <article
                    key={item.nasa_id}
                    onClick={() => onOpenDetail(item)}
                    className="glass-panel flex flex-col justify-between overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-black/60 relative overflow-hidden rounded-t-2xl">
                      <img
                        src={item.previewUrl || 'https://images-assets.nasa.gov/image/PIA21422/PIA21422~thumb.jpg'}
                        alt={item.title || 'Saved celestial observation'}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images-assets.nasa.gov/image/PIA21422/PIA21422~thumb.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 brightness-90"
                      />

                      {/* Floating Share Utility Dock */}
                      <div className="absolute top-2 left-2 z-10">
                        <ShareUtilityDock
                          title={item.title}
                          idOrNasaId={item.nasa_id}
                          imageUrl={item.originalUrl || item.previewUrl}
                          canonicalUrl={item.sourceUrl}
                          onShowToast={onShowToast}
                          variant="card"
                        />
                      </div>

                      <div className="absolute top-2 right-2 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveSaved(item.nasa_id);
                          }}
                          aria-label="Remove saved record"
                          className="p-1.5 rounded-lg bg-black/75 hover:bg-red-900/80 text-white/80 hover:text-red-200 border border-white/15 transition-colors cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#00f0ff] bg-[#050010]/85 px-2 py-0.5 rounded border border-white/10">
                        {item.nasa_id}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-['Cormorant_Garamond'] text-lg font-bold text-[#f4f1eb] group-hover:text-[#00f0ff] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-[#7ea0b8] line-clamp-2 font-light">
                          {item.description}
                        </p>
                      </div>

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono"
                      >
                        <button
                          type="button"
                          onClick={() => onOpenDetail(item)}
                          className="text-[#00f0ff] hover:text-[#8ae3f5] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>

                        <a
                          href={item.sourceUrl || `https://images.nasa.gov/details/${item.nasa_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7ea0b8] hover:text-[#f4f1eb] flex items-center gap-1"
                        >
                          <span>NASA.gov</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
