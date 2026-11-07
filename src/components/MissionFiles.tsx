import { useState } from 'react';
import { MISSIONS_LIST } from '../data/curatedData';
import { MissionDossier } from '../types';
import { ArrowRight, ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { ShareUtilityDock } from './ShareUtilityDock';

interface MissionFilesProps {
  onSelectMission: (query: string, missionName: string) => void;
  onOpenZoom: (mission: MissionDossier) => void;
  onShowToast: (msg: string) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string, data: any) => void;
}

export function MissionFiles({
  onSelectMission,
  onOpenZoom,
  onShowToast,
  isSaved,
  onToggleSave,
}: MissionFilesProps) {
  const [expandedMissionId, setExpandedMissionId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMissionId(expandedMissionId === id ? null : id);
  };

  return (
    <section id="missions" className="py-20 relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-white/10">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-[#ff5d00] mb-1 font-semibold">
              INSTRUMENTATION &amp; PLATFORMS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb]">
              Mission files
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8ae3f5]">
            <Radio className="w-3.5 h-3.5 text-[#ff5d00] animate-pulse" />
            <span>ACTIVE OBSERVATORY DOSSIERS · CLICK TO ZOOM</span>
          </div>
        </div>

        {/* Mission Cards Grid with Solar Orange Accents & Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MISSIONS_LIST.map((mission: MissionDossier) => {
            const isExpanded = expandedMissionId === mission.id;
            const saved = isSaved(mission.id);

            return (
              <article
                key={mission.id}
                onClick={() => onOpenZoom(mission)}
                className="glass-panel glass-panel-solar p-6 sm:p-8 flex flex-col justify-between relative cursor-pointer group"
              >
                {/* Floating Share Utility Dock at Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <ShareUtilityDock
                    title={mission.name}
                    idOrNasaId={mission.id}
                    imageUrl={mission.imageUrl}
                    canonicalUrl={`${window.location.origin}${window.location.pathname}#mission=${mission.id}`}
                    onShowToast={onShowToast}
                    isSaved={saved}
                    onToggleSave={() => onToggleSave(mission.id, mission)}
                    variant="card"
                  />
                </div>

                <div>
                  {/* Top line with Acronym and status */}
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono pr-20">
                    <span className="text-[#ff5d00] tracking-widest font-bold text-sm">
                      {mission.acronym}
                    </span>
                    <span className="text-[#8ae3f5] truncate text-[11px]">
                      {mission.status}
                    </span>
                  </div>

                  {/* Mission Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond'] text-[#f4f1eb] group-hover:text-[#ff5d00] transition-colors mt-4 mb-2">
                    {mission.name}
                  </h3>

                  {/* Key Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono my-4 py-3 border-y border-white/10">
                    <div>
                      <span className="block text-[#7ea0b8] uppercase text-[10px]">Launch</span>
                      <span className="text-[#f4f1eb] font-medium">{mission.launchDate}</span>
                    </div>
                    <div>
                      <span className="block text-[#7ea0b8] uppercase text-[10px]">Archive</span>
                      <span className="text-[#00f0ff] font-medium">{mission.catalogCount}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#7ea0b8] leading-relaxed line-clamp-3 mb-4">
                    {mission.description}
                  </p>

                  {/* Collapsible Technical Specifications */}
                  {isExpanded && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs font-mono text-[#7ea0b8] animate-fade-in bg-white/[0.02] p-4 rounded-xl"
                    >
                      <div>
                        <span className="text-[#ff5d00] block uppercase text-[10px] font-semibold">
                          Destination / Orbit:
                        </span>
                        <span className="text-[#f4f1eb]">{mission.destination}</span>
                      </div>
                      <div>
                        <span className="text-[#00f0ff] block uppercase text-[10px] font-semibold">
                          Primary Payloads:
                        </span>
                        <span className="text-[#f4f1eb]">{mission.primaryInstrument}</span>
                      </div>
                      <div>
                        <span className="text-[#ff00a0] block uppercase text-[10px] font-semibold">
                          Seminal Discovery:
                        </span>
                        <span className="text-[#e8e4dc] leading-relaxed font-sans text-xs">
                          {mission.keyDiscovery}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3"
                >
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(mission.id, e)}
                    className="text-xs font-mono text-[#8ae3f5] hover:text-[#f4f1eb] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse Specs' : 'Full Specifications'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-[#ff5d00]" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[#ff5d00]" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenZoom(mission)}
                      className="text-xs font-mono text-[#00f0ff] hover:underline cursor-pointer"
                    >
                      Zoom Dossier
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectMission(mission.searchQuery, mission.name)}
                      className="px-4 py-2 bg-[#ff5d00]/15 hover:bg-[#ff5d00] border border-[#ff5d00]/40 text-[#ff5d00] hover:text-[#050010] text-xs font-mono font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <span>Filter Archive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
