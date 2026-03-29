const tmdbService = require('../services/tmdbService');

/**
 * GET /api/movies
 * Returns paginated list of popular movies.
 * Query params: page (number), genreId (number)
 */
const getMovies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const genreId = req.query.genreId || '';
    const data = await tmdbService.discoverMovies({ page, genreId });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/movies/search
 * Search movies by query with pagination.
 * Query params: q (string), page (number)
 */
const searchMovies = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const data = await tmdbService.searchMovies({ query, page });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/movies/:id
 * Returns full details of a single movie.
 */
const getMovieById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const err = new Error('Invalid movie ID');
      err.statusCode = 400;
      throw err;
    }
    const data = await tmdbService.getMovieById(id);
    res.json(data);
  } catch (err) {
    // Propagate TMDB 404 as our own 404
    if (err.response?.status === 404) {
      err.statusCode = 404;
      err.message = 'Movie not found';
    }
    next(err);
  }
};

/**
 * GET /api/movies/genres
 * Returns all available genre options.
 */
const getGenres = async (_req, res, next) => {
  try {
    const genres = await tmdbService.getGenres();
    res.json({ genres });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMovies, searchMovies, getMovieById, getGenres };
