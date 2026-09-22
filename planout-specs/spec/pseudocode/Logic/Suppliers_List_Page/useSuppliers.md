import { useState, useEffect } from 'react';

/**
 * Hook to manage the state of the Supplier List Page.
 */
export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async (page, search) => {
    setLoading(true);
    try {
      const data = await fetchSuppliers(page, search);
      setSuppliers(data);
    } catch (error) {
      console.error("Error loading suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(1, "");
  }, []);

  return { suppliers, loading, loadData };
}