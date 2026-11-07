import { useState, useEffect, useRef, useCallback } from 'react';
import {
  NasaImageItem,
  ApodData,
  CollectionSector,
  MissionDossier,
  FieldNote,
  ZoomModalTarget,
} from './types';
import { INITIAL_CURATED_RECORDS, FALLBACK_APOD } from './data/curatedData';
import { searchNasaImages, fetchApod } from './services/nasaApi';
import { useSavedRecords } from './hooks/useSavedRecords';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ApodSection } from './components/ApodSection';
import { CollectionsSection } from './components/CollectionsSection';
import { ArchiveExplorer } from './components/ArchiveExplorer';
import { MissionFiles } from './components/MissionFiles';
import { FieldNotes } from './components/FieldNotes';
import { UnifiedZoomModal } from './components/UnifiedZoomModal';
import { SavedModal } from './components/SavedModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  // Archive data states
  const [items, setItems] = useState<NasaImageItem[]>(INITIAL_CURATED_RECORDS);
  const [totalHits, setTotalHits] = useState<number>(142850);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // APOD state
  const [apod, setApod] = useState<ApodData>(FALLBACK_APOD);
  const [isApodLoading, setIsApodLoading] = useState<boolean>(true);

  // Core Card Zoom target (shared across all sections)
  const [zoomTarget, setZoomTarget] = useState<ZoomModalTarget | null>(null);

  // Saved / Field Book Modal
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Saved records hook
  const {
    savedRecords,
    isSaved,
    toggleSave,
    removeSaved,
    clearAllSaved,
    getExportBibliography,
  } = useSavedRecords();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Trigger Toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  // Fetch APOD on mount
  useEffect(() => {
    let mounted = true;
    fetchApod()
      .then((data) => {
        if (mounted) {
          setApod(data);
          setIsApodLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setIsApodLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Check URL fragment for deep links on mount (e.g., #record=PIA25438)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash.startsWith('#record=')) {
      const recordId = decodeURIComponent(hash.replace('#record=', ''));
      const found = items.find((i) => i.nasa_id === recordId);
      if (found) {
        setZoomTarget({ type: 'nasa_image', data: found });
      }
    }
  }, [items]);

  // Fetch search results
  const performSearch = useCallback(
    async (query: string, pageNum: number = 1, append: boolean = false) => {
      if (pageNum === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      try {
        const { items: newItems, totalHits: hits } = await searchNasaImages(
          query,
          pageNum,
          12
        );

        if (append) {
          setItems((prev) => [...prev, ...newItems]);
        } else {
          setItems(
            newItems.length > 0
              ? newItems
              : pageNum === 1 && !query
              ? INITIAL_CURATED_RECORDS
              : []
          );
        }

        setTotalHits(hits);
        setPage(pageNum);
        setHasMore(newItems.length >= 12);
      } catch (err: unknown) {
        console.warn('Search query error:', err);
        if (!append) {
          setError(
            'Unable to reach NASA Image Library servers at this moment. Showing curated archival plates.'
          );
          setItems(INITIAL_CURATED_RECORDS);
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  // Handle Search input from Hero or Archive Bar
  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setActiveFilter('custom');
    performSearch(newQuery, 1, false);

    const archiveElement = document.getElementById('archive');
    if (archiveElement) {
      archiveElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle filter tabs
  const handleFilterChange = (filterId: string, queryOverride?: string) => {
    setActiveFilter(filterId);
    const queryToUse = queryOverride || '';
    setSearchQuery(queryToUse);
    performSearch(queryToUse, 1, false);
  };

  // Handle Collection Card selection
  const handleSelectCollection = (collectionQuery: string) => {
    setSearchQuery(collectionQuery);
    setActiveFilter(collectionQuery.split(' ')[0] || 'custom');
    performSearch(collectionQuery, 1, false);

    const archiveElement = document.getElementById('archive');
    if (archiveElement) {
      archiveElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Mission Card selection
  const handleSelectMission = (missionQuery: string) => {
    setSearchQuery(missionQuery);
    setActiveFilter('missions');
    performSearch(missionQuery, 1, false);

    const archiveElement = document.getElementById('archive');
    if (archiveElement) {
      archiveElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Load More
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      performSearch(searchQuery || 'cosmos', nextPage, true);
    }
  };

  // Reset to initial curated state
  const handleResetSearch = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setError(null);
    setItems(INITIAL_CURATED_RECORDS);
    setTotalHits(142850);
  };

  // Generic Toggle Save for any item
  const handleGenericToggleSave = (idOrNasaId: string, itemData?: any) => {
    // If it's already a NasaImageItem
    if (itemData && itemData.nasa_id) {
      toggleSave(itemData);
      showToast(isSaved(itemData.nasa_id) ? 'Removed plate from field book' : 'Saved plate to field book');
      return;
    }

    // If it's a collection or mission, map to a saved NasaImageItem representation
    if (itemData) {
      const mappedItem: NasaImageItem = {
        nasa_id: idOrNasaId,
        title: itemData.title || itemData.name,
        description: itemData.description,
        date_created: itemData.launchDate || '2026-11-07T00:00:00Z',
        center: itemData.acronym || 'ACROOOSVERSE',
        previewUrl: itemData.image || itemData.imageUrl || '',
        originalUrl: itemData.image || itemData.imageUrl || '',
        sourceUrl: `${window.location.origin}${window.location.pathname}#record=${idOrNasaId}`,
      };
      toggleSave(mappedItem);
      showToast(isSaved(idOrNasaId) ? 'Removed from field book' : 'Saved to field book');
    }
  };

  // Export bibliography action
  const handleExportCitations = async () => {
    const text = getExportBibliography();
    if (!text) {
      showToast('No saved records to export');
      return;
    }
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        showToast('All citations copied to clipboard in bibliography format');
      }
    } catch {
      showToast('Unable to copy to clipboard');
    }
  };

  const scrollToArchive = () => {
    const el = document.getElementById('archive');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToApod = () => {
    const el = document.getElementById('apod');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const isModalOpen = zoomTarget !== null;

  return (
    <div className="relative min-h-screen cosmic-bg text-[#f4f1eb] selection:bg-[#00f0ff]/30 selection:text-white">
      {/* Subtle Animated Starfield Layer */}
      <div className="starfield-layer" aria-hidden="true" />

      {/* Main Page Container with Smooth Scale-Down Transition on Zoom Modal Open */}
      <div
        className={`relative z-10 flex flex-col transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          isModalOpen ? 'page-zoom-scaled' : 'page-zoom-normal'
        }`}
      >
        {/* Top Bar Navigation */}
        <Header
          savedCount={savedRecords.length}
          onOpenSaved={() => setIsSavedModalOpen(true)}
          onFocusSearch={handleFocusSearch}
        />

        {/* Hero Section */}
        <Hero
          onSearch={handleSearch}
          searchInputRef={searchInputRef}
          onExploreClick={scrollToArchive}
          onTodayImageClick={scrollToApod}
        />

        {/* Today in the cosmos (APOD) Section */}
        <ApodSection
          apod={apod}
          isLoading={isApodLoading}
          onOpenDetail={(item) => setZoomTarget({ type: 'nasa_image', data: item })}
          isSaved={isSaved(`APOD-${apod.date}`)}
          onToggleSave={(item) => handleGenericToggleSave(item.nasa_id, item)}
          onShowToast={showToast}
        />

        {/* Begin Somewhere Curated Collections */}
        <CollectionsSection
          onSelectCollection={handleSelectCollection}
          onOpenZoom={(col: CollectionSector) => setZoomTarget({ type: 'collection', data: col })}
          onShowToast={showToast}
          isSaved={(id) => isSaved(id)}
          onToggleSave={(id, data) => handleGenericToggleSave(id, data)}
        />

        {/* Recently Uncovered Archive Grid */}
        <ArchiveExplorer
          items={items}
          totalHits={totalHits}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          error={error}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onSearchChange={handleSearch}
          onFilterChange={handleFilterChange}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          onOpenDetail={(item) => setZoomTarget({ type: 'nasa_image', data: item })}
          isSaved={isSaved}
          onToggleSave={(item) => handleGenericToggleSave(item.nasa_id, item)}
          onResetSearch={handleResetSearch}
          onShowToast={showToast}
        />

        {/* Mission Files Dossier Section */}
        <MissionFiles
          onSelectMission={handleSelectMission}
          onOpenZoom={(mission: MissionDossier) => setZoomTarget({ type: 'mission', data: mission })}
          onShowToast={showToast}
          isSaved={(id) => isSaved(id)}
          onToggleSave={(id, data) => handleGenericToggleSave(id, data)}
        />

        {/* Astronomical Field Notes Section */}
        <FieldNotes
          onOpenZoom={(note: FieldNote) => setZoomTarget({ type: 'field_note', data: note })}
          onShowToast={showToast}
          isSaved={(id) => isSaved(id)}
          onToggleSave={(id, data) => handleGenericToggleSave(id, data)}
        />

        {/* Observatory Footer */}
        <Footer />
      </div>

      {/* Centered Expanded Detail Modal (Core Card Zoom) */}
      <UnifiedZoomModal
        target={zoomTarget}
        isOpen={isModalOpen}
        onClose={() => setZoomTarget(null)}
        isSaved={isSaved}
        onToggleSave={handleGenericToggleSave}
        onShowToast={showToast}
        onSelectCollectionOrMission={(query, label) => {
          setZoomTarget(null);
          handleSearch(query);
        }}
      />

      {/* Saved / Field Book Modal */}
      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedRecords={savedRecords}
        onRemoveSaved={(id) => {
          removeSaved(id);
          showToast('Removed plate from field book');
        }}
        onClearAll={() => {
          clearAllSaved();
          showToast('All saved plates cleared');
        }}
        onOpenDetail={(item) => {
          setIsSavedModalOpen(false);
          setZoomTarget({ type: 'nasa_image', data: item });
        }}
        onExportCitations={handleExportCitations}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
