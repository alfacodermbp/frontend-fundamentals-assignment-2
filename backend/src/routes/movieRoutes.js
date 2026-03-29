const { Router } = require('express');
const {
  getMovies,
  searchMovies,
  getMovieById,
  getGenres,
} = require('../controllers/movieController');

const router = Router();

// GET /api/movies/genres  — must be before /:id to avoid conflict
router.get('/genres', getGenres);

// GET /api/movies/search?q=&page=
router.get('/search', searchMovies);

// GET /api/movies?page=&genreId=
router.get('/', getMovies);

// GET /api/movies/:id
router.get('/:id', getMovieById);

module.exports = router;
