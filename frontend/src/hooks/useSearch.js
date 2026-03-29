import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/api';
import useDebounce from './useDebounce';

/**
 * Debounced movie search hook.
 * Only fires the API request after the user stops typing for 400ms.
 */
const useSearch = ({ query = '', page = 1 } = {}) => {
  const debouncedQuery = useDebounce(query, 400);

  return useQuery({
    queryKey: ['search', debouncedQuery, page],
    queryFn: () => searchMovies({ query: debouncedQuery, page }),
    enabled: debouncedQuery.length > 0, // don't search with empty string
    placeholderData: (prev) => prev,
  });
};

export default useSearch;
