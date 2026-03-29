import { useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const inputRef = useRef(null);

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        ref={inputRef}
        id="search-input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies by title..."
        className="
          w-full h-12 pl-11 pr-12
          bg-bg-elevated/60 border border-white/[0.1]
          rounded-xl text-sm text-text-primary placeholder-text-muted
          focus:outline-none focus:border-brand-purple/60 focus:bg-bg-elevated
          transition-all duration-200
          hover:border-white/[0.18]
        "
        aria-label="Search movies"
        autoComplete="off"
      />

      {/* Clear button */}
      {searchQuery && (
        <button
          id="search-clear-btn"
          onClick={handleClear}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            w-7 h-7 rounded-lg
            flex items-center justify-center
            text-text-muted hover:text-text-primary
            hover:bg-white/[0.08]
            transition-all duration-150
          "
          aria-label="Clear search"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Active search glow */}
      {searchQuery && (
        <div className="absolute inset-0 rounded-xl ring-1 ring-brand-purple/30 pointer-events-none" />
      )}
    </div>
  );
};

export default SearchBar;
