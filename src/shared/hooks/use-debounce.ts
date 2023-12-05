import { useCallback, useRef } from 'react';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

export { useDebounce };
