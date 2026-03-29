/**
 * Central error handling middleware.
 * Catches errors forwarded via next(err) and returns structured JSON responses.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  const isDev = process.env.NODE_ENV !== 'production';

  // Normalise status code
  const statusCode = err.statusCode || err.status || 500;

  // Log stack only in development
  if (isDev) {
    console.error(`\n❌  [${statusCode}] ${err.message}`);
    if (err.stack) console.error(err.stack);
  } else {
    console.error(`[${new Date().toISOString()}] Error ${statusCode}: ${err.message}`);
  }

  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(isDev && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
