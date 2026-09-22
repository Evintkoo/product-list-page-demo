import { useState } from 'react';

export const useSupplierStatus = (supplierId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStatus = async (payload: { is_active: boolean }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/suppliers/${supplierId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update supplier status');
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading, error };
};