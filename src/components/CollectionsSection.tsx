import { ArrowRight, Compass } from 'lucide-react';
import { HERO_IMAGE, ORBITAL_IMAGE } from '../data/curatedData';
import { CollectionSector } from '../types';
import { ShareUtilityDock } from './ShareUtilityDock';

export const COLLECTIONS: CollectionSector[] = [
  {
    id: 'deep-space',
    query: 'deep space nebula galaxy',
    title: 'Deep Space',
    subtitle: 'COSMIC DAWN & NEBULAE',
    description: 'Ancient infrared fields, emission nebulae, and galactic collisions imaged by JWST and Hubble.',
    image: HERO_IMAGE,
    platesCount: '34,800+ plates',
  },
  {
    id: 'mars',
    query: 'mars perseverance rover',
    title: 'Mars',
    subtitle: 'THE RED PLANET',
    description: 'Sedimentary river deltas, dune fields, and rocky outcrops explored by robotic rovers and orbiters.',
    image: 'https://images-assets.nasa.gov/image/PIA24545/PIA24545~thumb.jpg',
    platesCount: '21,400+ plates',
  },
  {
    id: 'moon',
    query: 'moon apollo artemis',
    title: 'Our Moon',
    subtitle: 'LUNAR ARCHIVES',
    description: 'Pristine regolith vistas, impact craters, Apollo expedition heritage, and Artemis lunar transits.',
    image: 'https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~thumb.jpg',
    platesCount: '15,600+ plates',
  },
  {
    id: 'earth',
    query: 'earth orbit international space station',
    title: 'Earth from Orbit',
    subtitle: 'THE BLUE MARBLE',
    description: 'Atmospheric limblight, aurora borealis, oceanic reflections, and continental night light mosaics.',
    image: ORBITAL_IMAGE,
    platesCount: '48,100+ plates',
  },
];

interface CollectionsSectionProps {
  onSelectCollection: (query: string, label: string) => void;
  onOpenZoom: (collection: CollectionSector) => void;
  onShowToast: (msg: string) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string, data: any) => void;
}

export function CollectionsSection({
  onSelectCollection,
  onOpenZoom,
  onShowToast,
  isSaved,
  onToggleSave,
}: CollectionsSectionProps) {
  return (
    <section id="collections" className="py-20 relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-white/10">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-[#00f0ff] mb-1 font-semibold">
              CURATED VISTAS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb]">
              Begin somewhere
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8ae3f5]">
            <Compass className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>SELECT A SECTOR TO ZOOM DOSSIER OR EXPLORE ARCHIVE</span>
          </div>
        </div>

        {/* 4 Vibrant Glass Collection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((c) => {
            const saved = isSaved(c.id);

            return (
              <div
                key={c.id}
                onClick={() => onOpenZoom(c)}
                className="group text-left glass-panel flex flex-col justify-between overflow-hidden relative cursor-pointer"
              >
                {/* Image Aspect ratio container with overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60 rounded-t-2xl">
                  <img
                    src={c.image || HERO_IMAGE}
                    alt={c.title || 'Curated space sector'}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = HERO_IMAGE;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-[0.82] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050010] via-transparent to-transparent opacity-90" />

                  {/* Plates count badge */}
                  <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider text-[#8ae3f5] bg-[#050010]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                    {c.platesCount}
                  </div>

                  {/* Floating Share Utility Dock at Top Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <ShareUtilityDock
                      title={c.title}
                      idOrNasaId={c.id}
                      imageUrl={c.image}
                      canonicalUrl={`${window.location.origin}${window.location.pathname}#collection=${c.id}`}
                      onShowToast={onShowToast}
                      isSaved={saved}
                      onToggleSave={() => onToggleSave(c.id, c)}
                      variant="card"
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest uppercase text-[#00f0ff] font-semibold mb-1">
                      {c.subtitle}
                    </div>
                    <h3 className="text-2xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb] group-hover:text-[#00f0ff] transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#7ea0b8] leading-relaxed line-clamp-3">
                      {c.description}
                    </p>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#8ae3f5] group-hover:text-[#00f0ff] transition-colors">
                      Zoom Sector Dossier
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCollection(c.query, c.title);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#00f0ff]/10 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-[#050010] border border-[#00f0ff]/40 transition-all font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
