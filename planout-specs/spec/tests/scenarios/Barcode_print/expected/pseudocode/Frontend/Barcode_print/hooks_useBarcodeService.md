import { useState } from 'react';

/**
 * Hook: useBarcodeService
 * Purpose: Manages API communication for barcode generation.
 */
export const useBarcodeService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateBarcode = async (payload: { product_id: string, quantity: number }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Note: API CONTRACTS is empty, assuming POST /products/barcode/generate
      const response = await fetch('/products/barcode/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to generate barcode');
      
      // Handle successful response (e.g., trigger browser print or download)
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { generateBarcode, isLoading, error };
};