import { useEffect, useState } from 'react';

/**
 * Debounces a value by the given delay (ms).
 * Returns the debounced value — updates only after the user stops typing.
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
