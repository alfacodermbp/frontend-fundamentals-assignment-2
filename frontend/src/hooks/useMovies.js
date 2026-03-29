import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/api';

/**
 * Fetches a paginated list of popular movies.
 * Uses React Query for caching and background refetching.
 */
const useMovies = ({ page = 1, genreId = '' } = {}) => {
  return useQuery({
    queryKey: ['movies', page, genreId],
    queryFn: () => fetchMovies({ page, genreId }),
    placeholderData: (prev) => prev, // keep previous data while loading next page
  });
};

export default useMovies;
