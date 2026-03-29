import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchQuery } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar-blur bg-bg-primary/80 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">Cine</span>
              <span className="text-text-primary">Explorer</span>
            </span>
          </div>

          {/* ── Desktop nav links ────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {['Discover', 'Trending', 'Top Rated'].map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all duration-200 focus-ring"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* ── Right side ──────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Live search indicator */}
            {searchQuery && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                <span className="text-xs text-brand-violet font-medium">Searching</span>
              </div>
            )}

            {/* GitHub link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary border border-white/[0.08] hover:border-white/[0.16] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────────────────────────── */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.06] py-3 space-y-1">
            {['Discover', 'Trending', 'Top Rated'].map((item) => (
              <button
                key={item}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
