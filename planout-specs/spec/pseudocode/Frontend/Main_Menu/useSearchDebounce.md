// Logic: Debounce hook for search input
import { useEffect, useState } from 'react';

export const useSearchDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// ORPHAN_FIELD: tabId
// ORPHAN_FIELD: searchQuery
// ORPHAN_FIELD: isProductsMenuOpen
// ORPHAN_FIELD: isProfileMenuOpen
// ORPHAN_FIELD: isNotificationOpen