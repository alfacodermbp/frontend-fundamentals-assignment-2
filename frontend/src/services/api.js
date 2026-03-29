import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p';

if (!API_KEY) {
  console.error('[CineExplorer] VITE_TMDB_API_KEY is not set in frontend/.env');
}

// Axios instance pointing directly at TMDB (browser has full internet access)
const tmdb = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  params: { api_key: API_KEY },
});

// Response interceptor — surface clean errors
tmdb.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const msg =
      err.response?.data?.status_message ||
      err.message ||
      'Failed to reach TMDB';
    const error = new Error(msg);
    error.status = err.response?.status || 0;
    return Promise.reject(error);
  }
);

// ── In-memory genre map ────────────────────────────────────────────
let _genreMap = null;

const getGenreMap = async () => {
  if (_genreMap) return _genreMap;
  const data = await tmdb.get('/genre/movie/list');
  _genreMap = data.genres.reduce((acc, g) => ({ ...acc, [g.id]: g.name }), {});
  return _genreMap;
};

// ── Normalize a raw TMDB movie object ────────────────────────────
const normalize = (movie, genreMap) => ({
  id: movie.id,
  title: movie.title || movie.name || 'Untitled',
  overview: movie.overview || '',
  poster: movie.poster_path  ? `${IMAGE_BASE}/w500${movie.poster_path}`  : null,
  backdrop: movie.backdrop_path ? `${IMAGE_BASE}/w1280${movie.backdrop_path}` : null,
  rating: Math.round((movie.vote_average || 0) * 10) / 10,
  voteCount: movie.vote_count || 0,
  releaseDate: movie.release_date || '',
  year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
  genres: (movie.genre_ids || []).map((id) => genreMap[id]).filter(Boolean),
  popularity: movie.popularity || 0,
  language: movie.original_language || '',
});

const safePage = (p) => Math.min(Math.max(parseInt(p) || 1, 1), 500);

// ── Public API helpers ────────────────────────────────────────────

/** Fetch paginated popular movies with optional genre filter */
export const fetchMovies = async ({ page = 1, genreId = '' } = {}) => {
  const gm = await getGenreMap();
  const params = {
    page: safePage(page),
    sort_by: 'popularity.desc',
    include_adult: false,
  };
  if (genreId) params.with_genres = genreId;

  const data = await tmdb.get('/discover/movie', { params });
  return {
    results: data.results.map((m) => normalize(m, gm)),
    page: data.page,
    totalPages: Math.min(data.total_pages, 500),
    totalResults: data.total_results,
  };
};

/** Search movies by query */
export const searchMovies = async ({ query = '', page = 1 } = {}) => {
  const q = query.trim();
  if (!q) return fetchMovies({ page });

  const gm = await getGenreMap();
  const data = await tmdb.get('/search/movie', {
    params: { query: q, page: safePage(page), include_adult: false },
  });
  return {
    results: data.results.map((m) => normalize(m, gm)),
    page: data.page,
    totalPages: Math.min(data.total_pages, 500),
    totalResults: data.total_results,
  };
};

/** Fetch single movie details */
export const fetchMovieById = async (id) => {
  const gm = await getGenreMap();
  const data = await tmdb.get(`/movie/${id}`);
  return normalize({ ...data, genre_ids: data.genres.map((g) => g.id) }, gm);
};

/** Fetch all genres */
export const fetchGenres = async () => {
  const gm = await getGenreMap();
  return {
    genres: Object.entries(gm).map(([id, name]) => ({ id: Number(id), name })),
  };
};

export default tmdb;
