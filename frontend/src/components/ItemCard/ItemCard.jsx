import { useState } from 'react';

const FALLBACK_POSTER = 'https://via.placeholder.com/500x750/13131f/7c3aed?text=No+Image';

/** Returns the correct CSS class for the rating badge. */
const getRatingClass = (rating) => {
  if (rating >= 7) return 'rating-high';
  if (rating >= 5) return 'rating-medium';
  return 'rating-low';
};

/** Star icon helper */
const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/* ── Grid Card ──────────────────────────────────────────────────────── */
const GridCard = ({ movie, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="glass-card overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${index * 60}ms` }}
      id={`movie-card-${movie.id}`}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-bg-elevated">
        <img
          src={imgError ? FALLBACK_POSTER : (movie.poster || FALLBACK_POSTER)}
          alt={movie.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Rating overlay */}
        <div className="absolute top-2.5 right-2.5">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${getRatingClass(movie.rating)}`}>
            <StarIcon />
            {movie.rating.toFixed(1)}
          </span>
        </div>
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-card/95 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-text-primary text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-violet transition-colors duration-200">
          {movie.title}
        </h3>
        <p className="text-text-muted text-xs mb-2.5">{movie.year}</p>

        {/* Genre chips */}
        {movie.genres?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-brand-purple/10 text-brand-violet border border-brand-purple/20"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Overview */}
        <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
          {movie.overview || 'No description available.'}
        </p>
      </div>
    </article>
  );
};

/* ── List Card ──────────────────────────────────────────────────────── */
const ListCard = ({ movie, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="glass-card overflow-hidden cursor-pointer group flex gap-0"
      style={{ animationDelay: `${index * 40}ms` }}
      id={`movie-list-${movie.id}`}
    >
      {/* Poster - compact */}
      <div className="relative w-20 sm:w-28 flex-shrink-0 overflow-hidden bg-bg-elevated">
        <img
          src={imgError ? FALLBACK_POSTER : (movie.poster || FALLBACK_POSTER)}
          alt={movie.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-semibold text-text-primary text-sm leading-snug group-hover:text-brand-violet transition-colors duration-200">
              {movie.title}
            </h3>
            <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${getRatingClass(movie.rating)}`}>
              <StarIcon />
              {movie.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-text-muted text-xs mb-2">{movie.year}</p>
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 hidden sm:block">
            {movie.overview || 'No description available.'}
          </p>
        </div>

        {/* Genre chips */}
        {movie.genres?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-brand-purple/10 text-brand-violet border border-brand-purple/20"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

/* ── Exported ItemCard — switches based on viewMode ─────────────────── */
const ItemCard = ({ movie, viewMode = 'grid', index = 0 }) => {
  return viewMode === 'list'
    ? <ListCard movie={movie} index={index} />
    : <GridCard movie={movie} index={index} />;
};

export default ItemCard;
