import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import ViewToggle from '../components/ViewToggle/ViewToggle';
import ItemCard from '../components/ItemCard/ItemCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import ErrorState from '../components/ErrorState/ErrorState';
import Pagination from '../components/Pagination/Pagination';
import { useAppContext } from '../context/AppContext';
import { fetchMovies, searchMovies, fetchGenres } from '../services/api';
import useDebounce from '../hooks/useDebounce';

const SKELETON_COUNT = 20;

const HomePage = () => {
  const {
    viewMode,
    searchQuery,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    setCurrentPage,
  } = useAppContext();

  const debouncedSearch = useDebounce(searchQuery, 400);
  const isSearching = debouncedSearch.trim().length > 0;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // ── Genre list query ───────────────────────────────────────────────
  const { data: genreData } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: Infinity,
  });
  const genres = genreData?.genres || [];

  // ── Main movie query ───────────────────────────────────────────────
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: isSearching
      ? ['search', debouncedSearch, currentPage]
      : ['movies', currentPage, selectedGenre],
    queryFn: isSearching
      ? () => searchMovies({ query: debouncedSearch, page: currentPage })
      : () => fetchMovies({ page: currentPage, genreId: selectedGenre }),
    placeholderData: (prev) => prev,
  });

  const movies = data?.results || [];
  const totalPages = data?.totalPages || 0;
  const totalResults = data?.totalResults || 0;

  const showSkeletons = isLoading || (isFetching && movies.length === 0);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      {/* ── Hero Header ──────────────────────────────────────────── */}
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
            <span className="text-xs font-medium text-brand-violet">Live from TMDB Database</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.1]">
            <span className="text-text-primary">Explore the World of</span>
            <br />
            <span className="gradient-text">Cinema</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
            Browse thousands of movies with ratings, genres, and rich details — all in one place.
          </p>

          {/* Search bar */}
          <SearchBar />
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Controls Row ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Genre filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="genre-all"
              onClick={() => { setSelectedGenre(''); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                !selectedGenre && !isSearching
                  ? 'bg-brand-gradient text-white shadow-md'
                  : 'text-text-secondary border border-white/[0.08] hover:text-text-primary hover:bg-white/[0.05]'
              }`}
            >
              All
            </button>
            {genres.slice(0, 8).map((g) => (
              <button
                key={g.id}
                id={`genre-${g.id}`}
                onClick={() => { setSelectedGenre(String(g.id)); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedGenre === String(g.id) && !isSearching
                    ? 'bg-brand-gradient text-white shadow-md'
                    : 'text-text-secondary border border-white/[0.08] hover:text-text-primary hover:bg-white/[0.05]'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Right: result count + view toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {!isLoading && totalResults > 0 && (
              <span className="text-xs text-text-muted">
                {totalResults.toLocaleString()} {isSearching ? 'results' : 'movies'}
                {isFetching && <span className="ml-2 text-brand-violet animate-pulse">Updating…</span>}
              </span>
            )}
            <ViewToggle />
          </div>
        </div>

        {/* ── Search heading ──────────────────────────────────── */}
        {isSearching && !isLoading && (
          <div className="mb-5 fade-up">
            <p className="text-text-secondary text-sm">
              Showing results for{' '}
              <span className="text-text-primary font-medium">"{debouncedSearch}"</span>
            </p>
          </div>
        )}

        {/* ── Error State ──────────────────────────────────────── */}
        {isError && (
          <ErrorState
            message={error?.message || 'Failed to load movies. Please check your connection.'}
            onRetry={refetch}
          />
        )}

        {/* ── Grid / List ──────────────────────────────────────── */}
        {!isError && (
          <>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
                  : 'flex flex-col gap-3'
              }
            >
              {showSkeletons
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <SkeletonCard key={i} viewMode={viewMode} />
                  ))
                : movies.map((movie, i) => (
                    <div key={movie.id} className="fade-up" style={{ animationDelay: `${i * 30}ms` }}>
                      <ItemCard movie={movie} viewMode={viewMode} index={i} />
                    </div>
                  ))
              }
            </div>

            {/* Empty state */}
            {!isLoading && !isFetching && movies.length === 0 && !isError && (
              <div className="flex flex-col items-center justify-center py-24 text-center fade-up">
                <div className="w-20 h-20 rounded-2xl bg-bg-elevated border border-white/[0.06] flex items-center justify-center mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="text-text-primary font-semibold mb-1">No results found</h3>
                <p className="text-text-muted text-sm">Try a different search term or genre.</p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && movies.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <span>
            Built with <span className="text-brand-violet">♥</span> using React + Node.js
          </span>
          <span>
            Powered by{' '}
            <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
              TMDB API
            </a>
          </span>
          <span>© {new Date().getFullYear()} CineExplorer</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
