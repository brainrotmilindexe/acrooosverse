import { FIELD_NOTES, HERO_IMAGE } from '../data/curatedData';
import { FieldNote } from '../types';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { ShareUtilityDock } from './ShareUtilityDock';

interface FieldNotesProps {
  onOpenZoom: (note: FieldNote) => void;
  onShowToast: (msg: string) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string, data: any) => void;
}

export function FieldNotes({
  onOpenZoom,
  onShowToast,
  isSaved,
  onToggleSave,
}: FieldNotesProps) {
  return (
    <section id="field-notes" className="py-20 relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-white/10">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-[#ff00a0] mb-1 font-semibold">
              OBSERVATORY LOGS &amp; ESSAYS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb]">
              Astronomical field notes
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8ae3f5]">
            <BookOpen className="w-3.5 h-3.5 text-[#ff00a0]" />
            <span>SPECTROSCOPIC &amp; CARTOGRAPHIC MEMOIRS · CLICK TO ZOOM</span>
          </div>
        </div>

        {/* 3 Editorial Articles with Neon Magenta Accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FIELD_NOTES.map((note) => {
            const saved = isSaved(note.catalogId);

            return (
              <article
                key={note.id}
                onClick={() => onOpenZoom(note)}
                className="glass-panel glass-panel-magenta flex flex-col justify-between overflow-hidden relative cursor-pointer group"
              >
                {/* Image Stage */}
                <div className="aspect-[16/10] overflow-hidden bg-black/60 relative rounded-t-2xl">
                  <img
                    src={note.imageUrl || HERO_IMAGE}
                    alt={note.title || 'Observatory Field Note'}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = HERO_IMAGE;
                    }}
                    className="w-full h-full object-cover brightness-[0.8] group-hover:scale-106 group-hover:brightness-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050010] via-transparent to-transparent" />
                  
                  {/* Catalog ID tag */}
                  <div className="absolute top-3 left-3 font-mono text-[10px] uppercase text-[#ff00a0] font-bold bg-[#050010]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                    {note.catalogId}
                  </div>

                  {/* Floating Share Utility Dock at Top Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <ShareUtilityDock
                      title={note.title}
                      idOrNasaId={note.catalogId}
                      imageUrl={note.imageUrl}
                      canonicalUrl={`${window.location.origin}${window.location.pathname}#note=${note.id}`}
                      onShowToast={onShowToast}
                      isSaved={saved}
                      onToggleSave={() => onToggleSave(note.catalogId, note)}
                      variant="card"
                    />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8ae3f5] mb-2 tracking-wide">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#ff00a0]" />
                        {note.date}
                      </span>
                      <span className="text-white/20">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {note.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb] group-hover:text-[#ff00a0] transition-colors mb-2">
                      {note.title}
                    </h3>

                    <p className="text-xs text-[#00f0ff] font-mono mb-3">
                      {note.subtitle}
                    </p>

                    <p className="text-xs text-[#7ea0b8] font-light leading-relaxed line-clamp-3">
                      {note.previewSnippet}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8ae3f5] truncate max-w-[170px]">
                      By {note.author.split(',')[0]}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#ff00a0] group-hover:text-[#00f0ff] underline underline-offset-4 transition-colors font-semibold">
                      Read Entry →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
