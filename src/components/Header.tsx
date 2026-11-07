import { useState } from 'react';
import { Search, Bookmark, Menu, X } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onFocusSearch: () => void;
}

export function Header({ savedCount, onOpenSaved, onFocusSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050010]/75 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with vibrant cosmic presence */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-[0.22em] text-[#f4f1eb] font-['Cinzel'] hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff] group-hover:scale-125 transition-transform" />
          <span>ACROOOSVERSE</span>
        </a>

        {/* Zone 2: Clean single-line nav links with cyan/magenta hover feedback */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#7ea0b8]">
          <button
            onClick={() => handleNavClick('archive')}
            className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none focus-visible:text-[#00f0ff]"
          >
            Explore
          </button>
          <button
            onClick={() => handleNavClick('collections')}
            className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none focus-visible:text-[#00f0ff]"
          >
            Collections
          </button>
          <button
            onClick={() => handleNavClick('missions')}
            className="hover:text-[#ff5d00] transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none focus-visible:text-[#ff5d00]"
          >
            Missions
          </button>
          <button
            onClick={() => handleNavClick('field-notes')}
            className="hover:text-[#ff00a0] transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none focus-visible:text-[#ff00a0]"
          >
            Field Notes
          </button>
          <button
            onClick={onOpenSaved}
            className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:text-[#00f0ff]"
          >
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="font-mono text-[11px] text-[#00f0ff] font-bold tabular-nums px-1.5 py-0.5 rounded-md bg-[#00f0ff]/15 border border-[#00f0ff]/30">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Actions (Search + Field Book button + mobile hamburger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onFocusSearch}
            aria-label="Focus search input"
            className="p-2.5 text-[#7ea0b8] hover:text-[#00f0ff] hover:bg-white/[0.06] rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSaved}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider text-[#f4f1eb] bg-white/[0.04] hover:bg-[#00f0ff]/10 border border-white/10 hover:border-[#00f0ff]/50 rounded-xl transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] whitespace-nowrap shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Field Book</span>
            {savedCount > 0 && (
              <span className="text-[#00f0ff] font-bold tabular-nums">
                ({savedCount})
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 text-[#7ea0b8] hover:text-[#f4f1eb] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0018]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 text-xs uppercase tracking-widest text-[#7ea0b8] animate-fade-in">
          <button
            onClick={() => handleNavClick('archive')}
            className="block w-full text-left py-2 hover:text-[#00f0ff] transition-colors"
          >
            Explore Archive
          </button>
          <button
            onClick={() => handleNavClick('collections')}
            className="block w-full text-left py-2 hover:text-[#00f0ff] transition-colors"
          >
            Curated Collections
          </button>
          <button
            onClick={() => handleNavClick('missions')}
            className="block w-full text-left py-2 hover:text-[#ff5d00] transition-colors"
          >
            Observatory Missions
          </button>
          <button
            onClick={() => handleNavClick('field-notes')}
            className="block w-full text-left py-2 hover:text-[#ff00a0] transition-colors"
          >
            Astronomical Field Notes
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSaved();
            }}
            className="block w-full text-left py-2 text-[#00f0ff] flex items-center justify-between"
          >
            <span>Saved Field Records</span>
            <span className="font-mono font-bold">({savedCount})</span>
          </button>
        </div>
      )}
    </header>
  );
}
