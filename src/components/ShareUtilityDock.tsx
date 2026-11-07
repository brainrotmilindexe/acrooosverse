import React from 'react';

interface ShareUtilityDockProps {
  title: string;
  idOrNasaId: string;
  imageUrl: string;
  canonicalUrl?: string;
  onShowToast: (msg: string) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  variant?: 'card' | 'modal';
}

export function ShareUtilityDock({
  title,
  idOrNasaId,
  imageUrl,
  canonicalUrl,
  onShowToast,
  isSaved,
  onToggleSave,
  variant = 'card',
}: ShareUtilityDockProps) {
  // Direct Link URL: use canonical NASA detail if provided or stable app deep link
  const directLinkUrl =
    canonicalUrl ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(idOrNasaId)}`
      : `https://images.nasa.gov/details/${encodeURIComponent(idOrNasaId)}`);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(directLinkUrl);
        onShowToast('Direct link copied to clipboard');
      } else {
        onShowToast('Clipboard unavailable');
      }
    } catch {
      onShowToast('Failed to copy link');
    }
  };

  const handleShareToX = (e: React.MouseEvent) => {
    e.stopPropagation();
    const tweetText = `Explore "${title}" in the ACROOOSVERSE deep space archive:`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(directLinkUrl)}&hashtags=NASA,Space,Astronomy`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowToast('Initiating celestial asset download…');

    try {
      // Try fetching as blob for immediate named download
      const res = await fetch(imageUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Fetch failed');
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `ACROOOSVERSE-${idOrNasaId.replace(/[^a-zA-Z0-9_-]/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
      onShowToast('Download completed');
    } catch {
      // Fallback: direct window or anchor target
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = '_blank';
      link.download = `ACROOOSVERSE-${idOrNasaId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onShowToast('Opened master plate in new window');
    }
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | ACROOOSVERSE`,
          text: `Celestial observation: ${title}`,
          url: directLinkUrl,
        });
      } catch (err: unknown) {
        // User cancelled or unsupported
        if ((err as Error)?.name !== 'AbortError') {
          handleCopyLink(e);
        }
      }
    } else {
      handleCopyLink(e);
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const isModal = variant === 'modal';

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center gap-1.5 transition-all duration-300 ${
        isModal
          ? 'p-1.5 bg-[#050010]/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg'
          : 'p-1 bg-[#050010]/85 backdrop-blur-md rounded-xl border border-white/15 shadow-xl opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 sm:translate-x-2 sm:group-hover:translate-x-0'
      }`}
      aria-label="Celestial plate actions dock"
    >
      {/* Save Toggle if available */}
      {onToggleSave && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          title={isSaved ? 'Remove from Field Book' : 'Save to Field Book'}
          aria-label={isSaved ? 'Remove from Field Book' : 'Save to Field Book'}
          className={`p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] ${
            isSaved
              ? 'bg-[#00f0ff] text-[#050010] shadow-[0_0_10px_#00f0ff]'
              : 'text-white/80 hover:text-[#00f0ff] hover:bg-white/10'
          }`}
        >
          {/* Bookmark icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
        </button>
      )}

      {/* Copy Direct Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        title="Copy direct link"
        aria-label="Copy direct link"
        className="p-1.5 rounded-lg text-white/80 hover:text-[#00f0ff] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
      >
        {/* Link icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </button>

      {/* Share to X */}
      <button
        type="button"
        onClick={handleShareToX}
        title="Share to X"
        aria-label="Share observation on X"
        className="p-1.5 rounded-lg text-white/80 hover:text-[#ff00a0] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff00a0]"
      >
        {/* X / Twitter icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      {/* Download Asset */}
      <button
        type="button"
        onClick={handleDownload}
        title="Download high-resolution plate"
        aria-label="Download image asset"
        className="p-1.5 rounded-lg text-white/80 hover:text-[#ff5d00] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5d00]"
      >
        {/* Download icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>

      {/* Native Share button if supported */}
      {hasNativeShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          title="Share via device"
          aria-label="Share via system dialog"
          className="p-1.5 rounded-lg text-white/80 hover:text-[#00f0ff] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
        >
          {/* Share-2 icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      )}
    </div>
  );
}
