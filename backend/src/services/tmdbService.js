const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
const API_KEY = process.env.TMDB_API_KEY;

// Axios instance with shared config
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
  params: { api_key: API_KEY },
});

// Genre id → name mapping (populated on first request)
let genreMap = {};

const fetchGenreMap = async () => {
  if (Object.keys(genreMap).length > 0) return genreMap;
  const { data } = await tmdbClient.get('/genre/movie/list');
  genreMap = data.genres.reduce((acc, g) => ({ ...acc, [g.id]: g.name }), {});
  return genreMap;
};

/**
 * Normalise a raw TMDB movie object into a consistent shape.
 */
const normaliseMovie = (movie, genres) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  poster: movie.poster_path
    ? `${TMDB_IMAGE_BASE}/w500${movie.poster_path}`
    : null,
  backdrop: movie.backdrop_path
    ? `${TMDB_IMAGE_BASE}/w1280${movie.backdrop_path}`
    : null,
  rating: Math.round(movie.vote_average * 10) / 10,
  voteCount: movie.vote_count,
  releaseDate: movie.release_date,
  year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
  genres: (movie.genre_ids || []).map((id) => genres[id]).filter(Boolean),
  popularity: movie.popularity,
  language: movie.original_language,
});

// ── Public Service Methods ─────────────────────────────────────────────

/**
 * Discover popular movies with optional genre filter.
 */
const discoverMovies = async ({ page = 1, genreId = '' } = {}) => {
  const genres = await fetchGenreMap();
  const params = { page, sort_by: 'popularity.desc', include_adult: false };
  if (genreId) params.with_genres = genreId;

  const { data } = await tmdbClient.get('/discover/movie', { params });
  return {
    results: data.results.map((m) => normaliseMovie(m, genres)),
    page: data.page,
    totalPages: Math.min(data.total_pages, 500), // TMDB caps at 500
    totalResults: data.total_results,
  };
};

/**
 * Search movies by query string.
 */
const searchMovies = async ({ query, page = 1 } = {}) => {
  if (!query || query.trim().length === 0) {
    return discoverMovies({ page });
  }
  const genres = await fetchGenreMap();
  const { data } = await tmdbClient.get('/search/movie', {
    params: { query: query.trim(), page, include_adult: false },
  });
  return {
    results: data.results.map((m) => normaliseMovie(m, genres)),
    page: data.page,
    totalPages: Math.min(data.total_pages, 500),
    totalResults: data.total_results,
  };
};

/**
 * Get full details for a single movie.
 */
const getMovieById = async (id) => {
  const { data } = await tmdbClient.get(`/movie/${id}`);
  const genres = data.genres.reduce((acc, g) => ({ ...acc, [g.id]: g.name }), {});
  return normaliseMovie({ ...data, genre_ids: data.genres.map((g) => g.id) }, genres);
};

/**
 * Fetch all genre options for filtering UI.
 */
const getGenres = async () => {
  const genres = await fetchGenreMap();
  return Object.entries(genres).map(([id, name]) => ({ id: Number(id), name }));
};

module.exports = { discoverMovies, searchMovies, getMovieById, getGenres };
